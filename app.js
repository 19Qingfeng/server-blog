const handlerBlogRouter = require("./src/router/blog.js");
const handleUserRouter = require("./src/router/user.js");
const { access } = require('./src/helpers/logs')
const { normazilerHeader } = require("./src/helpers/utils");
const queryString = require("querystring");
const { get, set } = require("./src/db/redis");

/* 
  app.js只处理入口(公共参数和公共逻辑) 各个路由单独使用func处理(关注各自数据)
  各个路由页面关心路由返回的数据 并不关心res.end等等之类的 
  只返回数据 而app.js处理 请求和返回
  总结：app.js处理请求和响应，各个router处理各自路由的返回数据。
*/

// 设置cookie过期时间为一天
const getCookieExpires = () => {
  const d = new Date(); // 获得当前时间
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000); // 重新设置时间 设置到期时间
  return d.toGMTString(); // cookie规定的时间格式 GMTString
};

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    normazilerHeader(req.headers, "Content-Type");
    if (req.method.toLowerCase() !== "post") {
      resolve({});
      return;
    }
    if (req.headers["Content-Type"] !== "application/json;charset=UTF-8") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      } else {
        resolve(JSON.parse(postData));
      }
    });
  });
};

/* 
  注意下这里 理解不要出现误区
  1. app.js中并没有被export的代码，可以理解为闭包。没有被导出的方法和变量在启动服务(代码run起来的时候)就已经创建，并且服务不终止那么这之中的变量如果不手动销毁那么就会一直保存在内存中。
  2. serverHandler 这个函数是每次收到请求之后会执行的。所以serverHandler函数作用域是每次收到请求之后开始创建，等待请求完毕垃圾回收，serverHanlder中的内存变量会被释放。

  举一个简单的比方:
  1. 定义一个test变量，在app.js中并非在serverHanlder中的话。前一次请求去改变这个变量的值，后一次请求访问到的是改变之后的值。(缓存在了内存中)
  2. 定义一个test变量，在app.js中同时也在serverHanlder中。前一次请求改变这个变量的值，后一次请求再次访问这个值，仍然是重新初始化的值。(请求结束函数作用域结束会销毁)
*/
const serverHanlder = (req, res) => {
  // 访问日志
  access(`${req.method} --  ${req.url}  --  ${Date.now()} -- ${req.headers['user-agent']}`)


  // 返回格式
  res.setHeader("Content-Type", "application/json;charset=utf-8;");

  const url = req.url;
  // req添加path属性 每个router文件直接使用
  req.path = url.split("?")[0];

  // 解析query
  req.query = queryString.parse(url.split("?")[1]);

  // 解析cookie
  const cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(";").forEach((item) => {
    if (!item) return;
    const [key, value] = item.split("=");
    cookie[key.trim()] = value.trim();
  });
  req.cookie = cookie;

  // 解析session userId
  let needSetCookie = false;
  let userId = cookie.userId;
  if (!userId) {
    userId = `${Date.now()}_${Math.random()}`;
    set(userId, {});
    needSetCookie = true;
  }
  req.sessionId = userId;

  Promise.all([get(req.sessionId), getPostData(req)]).then(
    ([sessionData, postData]) => {
      // 查询redis 获得用户信息
      if (!sessionData) {
        set(req.sessionId, {});
        req.session = {};
      } else {
        req.session = sessionData;
      }

      // 获得postData
      req.body = postData;

      // 处理blog路由
      const blogResult = handlerBlogRouter(req, res);
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader(
              "Set-Cookie",
              `userId=${
                req.sessionId
              }; path=/; httpOnly; expire=${getCookieExpires()};`
            );
          }
          res.end(JSON.stringify(blogData));
        });
        // promise存在直接return
        return;
      }

      // 处理userData
      const userData = handleUserRouter(req, res);
      if (userData) {
        if (needSetCookie) {
          // 千万注意cookie每个key=value;结束后有一个空格
          res.setHeader(
            "Set-Cookie",
            `userId=${
              req.sessionId
            }; path=/; httpOnly; expire=${getCookieExpires()};`
          );
        }
        userData.then((data) => {
          res.end(JSON.stringify(data));
        });
        return;
      }

      if (!req.expireLogin) {
        // 未命中路由 返回404状态码 第二个参数为status描述 不传可重载
        res.writeHead(404, { "Content-Type": "text/plain" }); // 改变状态码
        res.write("404 Not find"); // 返回文本内容
        res.end(); // 结束
      }
    }
  );
};

module.exports = serverHanlder;

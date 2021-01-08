const Koa = require("koa");
// app当前请求实例
const app = new Koa();
const views = require("koa-views");
// postData中json处理
const json = require("koa-json");
// 错误处理
const onerror = require("koa-onerror");
// post处理
const bodyparser = require("koa-bodyparser");
// 日志
const logger = require("koa-logger");
// 处理session插件
const session = require("koa-generic-session");
// 链接redis插件
const redisStore = require("koa-redis");

const blog = require("./routes/index");
const users = require("./routes/users");

const login = require("./middleware/loginCheck");

// redis配置
const { REDIS_CONFIG } = require("./conf/db");

// error handler
onerror(app);

// middlewares

// bodyparser和json中间件处理post请求中postData nodejs中req.on('data'),on('end')异步处理得到请求数据。
// 经过bodyparser和json处理后，就可以通过ctx.request.body获取postData了.
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());

// 日志
app.use(logger());

app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);



/* 
  ctx.session.username = 'wanghaoyu'
  设置后 koa-generic-session就会在redis中对应的value存入一条数据(存在直接添加 不存在则新建一条数据)
  key值是自动生成的加密串 value是自己设置的值(这里默认配置了cookie内容，以及进行ctx.session赋值时也会存入)
  当每次用户访问时候 他会自动根据cookie中携带的key(默认是koa:sess)进行redis中去查找值
  将redis中查询到对应的值 赋值给ctx.session提供给我们使用


  ！ 赋值--存入redis--下发key到cookie中

  也就是说通过ctx.session赋值操作它会自动生成key value存入redis中去，并且将key当作set-cookie进行下发。

  ！读取--接口请求--通过cookie截取key--redis查找value--放入ctx.session中

  当每次请求进入的时候，这个中间件已经根据配置中的前缀截取到cookie中的key(默认是koa:sess:后的key)然后去redis中查找value，找到之后将value放入ctx.session提供给我们使用。
*/

// 处理session
// 增加session中存储加密密钥
// 配置session 配置完成后就可以通过ctx.session获得访问的session(解析之后的cookie key在redis中查找出来的value)了，也就是用户登陆相关redis存储信息。
// 以及通过ctx.session.xxx=aaa 就可以通过在session中存储xxx为aaa,同时存储在redis中，同时下发key以cookie到客户端做持久化存储。 不过是key是加密的(加密待定)
app.keys = ["wanghaoyu_"];

app.use(
  session({
    // 配置cookie
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
    // 配置redis
    store: redisStore({
      all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.post}`,
    }),
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  // 获取当前时间 获取结束之后执行next await异步交给其他中间件处理
  await next();
  // 等待其他中间件处理后 在开始处理之后的逻辑
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
// allowedMethods 是针对路由没有匹配到的处理 找不到的路由处理
app.use(login);
app.use(blog.routes(), blog.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;

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

// 处理session
// 增加session中存储加密密钥
app.keys = ["wanghaoyu_"];
// 配置session 配置完成后就可以通过ctx.session获得访问的session(解析之后的cookie)了。
// 以及通过ctx.session.xxx=aaa 就可以通过在redis中存储xxx为aaa 不过是key是加密的

/* 
  ctx.session.username = 'wanghaoyu'
  设置后 koa-generic-session就会在redis中对应的value存入一条数据(存在直接添加 不存在则新建一条数据)
  key值是自动生成的加密串 value是cookie + ctx.session中自己设置的值
  当每次用户访问时候 他会自动根据cookie中携带的key进行redis中去查找值
  将redis中查询到对应的值 赋值给ctx.session进行处理

  也就是说通过ctx.session赋值操作就会自动生成cookie并且存入redis中下发key
  进行ctx.session取值时 这个中间件已经根据cookie中的key在redis中查出value保存在ctx.session中了。
*/

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

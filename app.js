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
      // 链接redis 暂时写死
      all: "127.0.0.1:6379",
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
app.use(blog.routes(), blog.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;

// koa-router插件独立于koa koa-router独立处理koa-router(koa不处理路由)
const router = require("koa-router")();

/* 

  1. 路由中间件函数必须使用async函数
  2. ctx可以理解为req和res的集合体
  3. next就是交与下一个中间件处理
  4. ctx.query 获取url查询params
  5. ctx.request.body 获取post请求postData (request.body 就是通过app中的bodyparse和json中间件处理后得到的)
  6. ctx.body 返回body数据

*/

router.prefix("/api/blog");

// ctx为context上下文 next 中间件函数next方法
router.get("/list", async (ctx, next) => {
  console.log(ctx.session);
  // 通过ctx.session访问session 并且已经存储在了redis中
  if (!ctx.session.test) {
    ctx.session.test = 0;
  }
  ctx.session.test++;
  const query = ctx.query;
  ctx.body = {
    error: 0,
    query,
    session: ctx.session,
    data: ["获取博客列表"],
  };
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});

module.exports = router;

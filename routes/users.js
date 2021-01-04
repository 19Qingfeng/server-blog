const router = require("koa-router")();

/* 

  prefix 在router上增加前缀 实际路由地址 = router.preifx + router.get()  

*/

router.prefix("/api/user");

router.post("/login", async function (ctx, next) {
  // ctx.request.body 获取post请求data
  const { username, password } = ctx.request.body;
  ctx.body = {
    error: 0,
    username,
    password
  };
});

// 不写async 默认是会兼容的 但是不写async无法写await next
router.get("/bar", function (ctx, next) {
  ctx.body = "this is a users/bar response";
});

module.exports = router;

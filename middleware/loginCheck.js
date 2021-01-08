/* 
  ctx.session.username = 'wanghaoyu'
  设置后 koa-generic-session就会在redis中对应的value存入一条数据(存在直接添加 不存在则新建一条数据)
  key值是自动生成的加密串 value是cookie + ctx.session中自己设置的值
  当每次用户访问时候 他会自动根据cookie中携带的key进行redis中去查找值
  将redis中查询到对应的值 赋值给ctx.session进行处理
*/

const login = async (ctx, next) => {
  if (ctx.session.username) {
    console.log(ctx.session.username);
    await next();
    return;
  }
  console.log(ctx.session.username);
  ctx.status = 401;
  ctx.body = {
    message: "登陆过期",
    data: {},
    errno: 400,
  };
};

module.exports = login;

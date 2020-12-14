const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { set } = require("../db/redis");

const handleUserRouter = (req, res) => {
  const method = req.method.toLowerCase();
  const path = req.path;

  // 登陆接口
  if (method === "post" && path === "/api/user/login") {
    const { username, password } = req.body;
    const result = login(username, password);
    return result.then((data) => {
      // 登陆成功之后 更新redis的值
      if (data.username) {
        set(req.sessionId, {
          username,
          password,
        });
        return new SuccessModel(data);
      }
      return new ErrorModel("用户名或密码不正确");
    });
  }

  // 测试接口
  // if (method === "get" && path === "/api/user/login-test") {
  //   if (req.session.username) {
  //     return new Promise((res) => {
  //       res(new SuccessModel({ data: req.session }));
  //     });
  //   }
  //   return Promise.resolve(new ErrorModel('暂未登陆'))
  // }
};

module.exports = handleUserRouter;

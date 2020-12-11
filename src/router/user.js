const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require("../model/resModel");

const handleUserRouter = (req,res) => {
  const method = req.method.toLowerCase()
  const path = req.path

  // 登陆接口
  if(method === 'post' && path === '/api/user/login') {
    const { username,password } = req.body
    const result = login(username,password)
    return result.then(data => {
      return data.username ? new SuccessModel(data) : new ErrorModel('用户名或密码不正确')
    })
  }
}

module.exports = handleUserRouter
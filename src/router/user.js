const handleUserRouter = (req,res) => {
  const method = req.method.toLowerCase()
  const path = req.path


  // 登陆接口
  if(method === 'post' && path === '/api/user/login') {

  }

}

module.exports = handleUserRouter
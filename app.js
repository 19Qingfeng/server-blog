const handlerBolgRouter = require("./src/router/blog.js")
const handleUserRouter = require("./src/router/user.js")


/* 
  app.js只处理入口 各个路由单独使用func处理
  各个路由页面关心路由返回的数据 并不关心res.end等等之类的 
  只返回数据 而app.js处理 请求和返回
  总结：app.js处理请求和响应，各个router处理各自路由的返回数据。
*/ 

const serverHanlder = (req,res) => {
  // 返回格式
  res.setHeader('Content-Type','application/json;charset=utf-8;')


  const url = req.url
  // req添加path属性 每个router文件直接使用
  req.path = url.split('?')[0]

  // 处理blog路由
  const blogData = handlerBolgRouter(req,res)

  if(blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  // 处理userData
  const userData = handleUserRouter(req,res)

  if(userData) {
    res.end(JSON.stringify(userData))
    return
  }

  // 未命中路由 返回404状态码 第二个参数为status描述 不传可重载
  res.writeHead(404,{'Content-Type':'text/plain'}) // 改变状态码
  res.write('404 Not find') // 返回文本内容
  res.end() // 结束

}

module.exports = serverHanlder
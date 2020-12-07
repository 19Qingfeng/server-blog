const handlerBolgRouter = require("./src/router/blog.js")
const handleUserRouter = require("./src/router/user.js")



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
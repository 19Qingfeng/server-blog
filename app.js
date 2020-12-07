const serverHanlder = (req,res) => {
  // 返回格式
  res.setHeader('ContentType','applicaiton/json')
  // mock返回数据
  const responseData = {
    name:'wanghaoyu shi ju shen',
    site:'http://hycoding.com',
    env:process.env.NODE_ENV
  }
  res.end(JSON.stringify(responseData))
}

module.exports = serverHanlder
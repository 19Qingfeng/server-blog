const { getList , getDetail } = require("../controller/blog")
const { SucessModel } = require("../model/resModel")
const handlerBlogRouter = (req,res) => {
  const method = req.method.toLowerCase()
  const path = req.path

  // 获取博客列表
  if(method === 'get' && path === '/api/blog/list') {
    const { author='', keyword='' } = req.query
    const listData = getList(author,keyword)
    return new SucessModel(listData)
  }

  // 获取博客详情
  if(method === 'get' && path === '/api/blog/detail') {
    const { id } = req.query
    return new SucessModel(getDetail(id))
  }

  // 新建博客
  if(method === 'post' && path === '/api/blog/new') {
   
  }

  // 更新博客
  if(method === 'post' && path === '/api/blog/update') {

  }

  // 删除博客
  if(method === 'post' && path === '/api/blog/del') {

  }

}

module.exports = handlerBlogRouter
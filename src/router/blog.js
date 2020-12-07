const handlerBlogRouter = (req,res) => {
  const method = req.method.toLowerCase()
  const path = req.path

  // 获取博客列表
  if(method === 'get' && path === '/api/blog/list') {
    return {
      msg:'这是博客列表'
    }
  }

  // 获取博客详情
  if(method === 'get' && path === '/api/blog/detail') {
    return {
      msg:'获取博客详情'
    }
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
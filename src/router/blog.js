const { getList, 
        getDetail, 
        newBlog, 
        updateBlog 
      } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handlerBlogRouter = (req, res) => {
  const method = req.method.toLowerCase();
  const path = req.path;
  const { id } = req.query;

  // 获取博客列表
  if (method === "get" && path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query;
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }

  // 获取博客详情
  if (method === "get" && path === "/api/blog/detail") {
    return new SuccessModel(getDetail(id));
  }

  // 新建博客
  if (method === "post" && path === "/api/blog/new") {
    const blogData = req.body;
    const data = newBlog(blogData)
    return new SuccessModel(data)
  }

  // 更新博客
  if (method === "post" && path === "/api/blog/update") {
    console.log(req.body),'body'
    const result = updateBlog(id,req.body)
    const responseData = result ? new SuccessModel() : new ErrorModel('更新博客失败')
    return responseData
  }

  // 删除博客
  if (method === "post" && path === "/api/blog/del") {
  }
};

module.exports = handlerBlogRouter;

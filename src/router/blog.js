const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handlerBlogRouter = (req, res) => {
  const method = req.method.toLowerCase();
  const path = req.path;
  const { id } = req.query;

  // 获取博客列表
  if (method === "get" && path === "/api/blog/list") {
    const { author = "", keyword = "" } = req.query;
    const result = getList(author, keyword);
    return result.then((listData) => {
      return new SuccessModel(listData);
    });
  }

  // 获取博客详情
  if (method === "get" && path === "/api/blog/detail") {
    const result = getDetail(id);
    return result.then((data) => {
      return new SuccessModel(data);
    });
  }

  // 新建博客
  if (method === "post" && path === "/api/blog/new") {
    const blogData = req.body;
    const result = newBlog(blogData);
    return result.then((data) => new SuccessModel(data));
  }

  // 更新博客
  if (method === "post" && path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    const responseData = result
      ? new SuccessModel()
      : new ErrorModel("更新博客失败");
    return responseData;
  }

  // 删除博客
  if (method === "post" && path === "/api/blog/del") {
    const result = delBlog(id);
    const responseData = result
      ? new SuccessModel()
      : new ErrorModel("删除博客失败");
    return responseData;
  }
};

module.exports = handlerBlogRouter;

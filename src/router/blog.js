const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");

// 获取cookie过期时间
const getCookieExpires = () => {
  const d = new Date() // 获得当前时间
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000)) // 重新设置时间 设置到期时间
  return d.toGMTString() // cookie规定的时间格式 GMTString
}

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
    return result.then(boolean => {
      return boolean ? new SuccessModel(true): new ErrorModel("更新博客失败");
    })
  }

  // 删除博客
  if (method === "post" && path === "/api/blog/del") {
    const result = delBlog(id);
    return result.then(boolean => {
      return boolean ? new SuccessModel(boolean) : new ErrorModel("删除失败")
    })
  }
};

module.exports = handlerBlogRouter;

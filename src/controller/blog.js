// 抽离路由中的逻辑维护 处理逻辑返回数据 仅仅处理业务
const getList = (author,keyword) => {
  return [
    {
      id:1,
      title:'标题1',
      content:'博客内容',
      createTime:1607427817990,
      author:'wanghaoyu'
    },
    {
      id:2,
      title:'标题2',
      content:'博客内容B',
      createTime:1607427817990,
      author:'wanghaoyu-2'
    },
  ]
}

const getDetail = (id) => {
  return {
    id,
    title:'标题A',
    content:'内容A',
    createTime:1607427817990,
    author:'wanghaoyu'
  }
}

const newBlog = (blogData = {}) => {
  return {
    id:3, // 新建博客插入到数据表中的id返回给前端
  }
}

const updateBlog = (id,data = {}) => {
  return true
}

const delBlog = (id) => {
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
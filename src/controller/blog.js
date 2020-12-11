const { exec } = require("../db/mysql");
// 抽离路由中的逻辑维护 处理逻辑返回数据 仅仅处理业务
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author=${author} `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += "order by createTime desc;";
  return exec(sql);
};

const getDetail = (id) => {
  let sql = `select * from blogs where 1=1 `;
  if (id) {
    sql += `and id=${id} `;
  }
  sql += `order by createTime desc;`;
  return exec(sql).then((data) => {
    return data[0] ? data[0] : {};
  });
};

const newBlog = (blogData = {}) => {
  /* 因为新建博客的时候前端是不用传递author的 新建一定是登陆的 所以这里暂时使用假数据 */
  const mockAuth = "wanghaoyu";
  const { author = mockAuth, title, content, createTime } = blogData;
  let sql = `
    insert into blogs (title,content,createTime,author) values (
      '${title}','${content}',${createTime},'${author}'
    )
  `;
  return exec(sql).then((result) => {
    return { id: result.insertId };
  });
};

const updateBlog = (id, data = {}) => {
  return true;
};

const delBlog = (id) => {
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};

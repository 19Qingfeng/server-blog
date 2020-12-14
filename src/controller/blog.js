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
  const { author, title, content, createTime } = blogData;
  let sql = `
    insert into blogs (title,content,createTime,author) values (
      '${title}','${content}',${createTime},'${author}'
    )
  `;
  return exec(sql).then((result) => {
    return { id: result.insertId };
  });
};

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData;
  const date = Date.now();
  let sql = `update blogs set title='${title}',content='${content}',createTime=${date} where id=${id}`;
  return exec(sql).then((update) => {
    return !!update.affectedRows;
  });
};

// 正常业务逻辑都是软删除 本质也就是更新status 下发数据时候根据status过滤 or 查询时候根据status查询
// author假数据 只能删除自己的文章
const delBlog = (id, author) => {
  let sql = `delete from blogs where 1=1 and author='${author}' `;
  if (id) {
    sql += `and id=${id} `;
  }
  sql += `order by createTime desc;`;
  return exec(sql).then((result) => {
    return !!result.affectedRows;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};

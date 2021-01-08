const xss = require("xss");
const { exec } = require("../db/mysql");
const { handlePromise } = require("../helpers/promise");

const getBlogList = async (author, keyword) => {
  let sqlString = "select * from blogs where 1=1";
  if (author) {
    sqlString += ` and author=${author}`;
  } else if (keyword) {
    sqlString += ` and keyword='%${keyword}%'`;
  }
  sqlString += " order by createtime desc;";
  return await exec(sqlString);
};

const getBlogDetail = async (id) => {
  let sqlString = `select * from blogs where id=${id}`;
  const data = await exec(sqlString);
  if (data.length) {
    return Promise.resolve(data[0]);
  }
  return Promise.reject("id不存在");
};

const addNewBlog = async (blogData) => {
  let { title, content, author } = blogData;
  title = xss(title);
  content = xss(content);
  author = "wanghaoyu";
  const createTime = Date.now();
  const sqlString = `insert into blogs (title,content,createTime,author) values ('${title}','${content}','${createTime}','${author}')`;
  const result = await exec(sqlString);
  return result.insertId;
};

const deleteBlog = async (id) => {
  id = xss(id);
  const author = "wanghaoyu";
  const sqlString = `delete from blogs where id='${id}' and author='${author}'`;
  const [, result] = await handlePromise(exec(sqlString));
  if (result.affectedRows > 0) {
    return true;
  }
  return Promise.reject("删除失败");
};

module.exports = {
  getBlogList,
  getBlogDetail,
  addNewBlog,
  deleteBlog,
};

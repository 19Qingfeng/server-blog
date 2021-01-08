const xss = require("xss");
const { exec } = require("../db/mysql");

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

module.exports = {
  getBlogList,
  getBlogDetail,
};

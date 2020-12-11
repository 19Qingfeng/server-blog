const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db");

// 创建链接数据库对象
const con = mysql.createConnection(MYSQL_CONFIG);

// 开始链接
con.connect();

// 统一执行sql函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}

// con.end()

module.exports = {
  exec,
};

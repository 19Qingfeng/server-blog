const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../conf/db");

// 创建mysql链接实例
const sql = mysql.createConnection(MYSQL_CONFIG);

// 链接mysql
sql.connect();

// 执行sql语句
const exec = async (sqlString) => {
  return new Promise((resolve, reject) => {
    sql.query(sqlString, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
};

module.exports = {
  exec,
  // 转译
  escape: mysql.escape,
};

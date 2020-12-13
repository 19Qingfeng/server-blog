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

// con.end() 注意nodejs中对于模块机制的缓存 所以这里的文件内是一个单例
// 所以不能退出 Redis同理，如果退出的话那么就下次无法链接了 第二次引用这个文件只会执行exec但是mysql已经end关闭了。

module.exports = {
  exec,
};
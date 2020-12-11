const env = process.env.NODE_ENV;

let MYSQL_CONFIG;
// 开发环境
// if (env === "dev") {
  MYSQL_CONFIG = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "wanghaoyu0017",
    database: "myblog",
  };
// }

// 开发环境
if (env === "production") {
  MYSQL_CONFIG = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "wanghaoyu0017",
    database: "myblog",
  };
}

module.exports = {
  MYSQL_CONFIG,
};

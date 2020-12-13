const env = process.env.NODE_ENV;

let MYSQL_CONFIG;
let REDIS_CONFIG;
// 开发环境
// if (env === "dev") {
MYSQL_CONFIG = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "wanghaoyu0017",
  database: "myblog",
};
REDIS_CONFIG = {
  port: 6379,
  host: "127.0.0.1",
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
  REDIS_CONFIG = {
    port: 6379,
    host: "127.0.0.1",
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
};

// 设置数据库-redis配置

const env = process.env.NODE_ENV;

let MYSQL_CONFIG, REDIS_CONFIG;

if (env === "dev") {
  MYSQL_CONFIG = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "wanghaoyu0017",
    database: "myblog",
  };
  REDIS_CONFIG = {
    host: "127.0.0.1",
    port: "6379",
  };
}

if (env === "production") {
  MYSQL_CONFIG = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "wanghaoyu0017",
    database: "myblog",
  };
  REDIS_CONFIG = {
    host: "127.0.0.1",
    port: "6379",
  };
}

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
};

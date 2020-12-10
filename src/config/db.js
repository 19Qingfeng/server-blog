const env = process.env.NODE_ENV;

let MYSQL_CONFIG;
// 开发环境
if (env === "development") {
  MYSQL_CONFIG = {
    host: "localhost",
    port: "8000",
    user: "root",
    password: "wanghaoyu0017",
    database: "myblog",
  };
}

// 开发环境
if (env === "production") {
  MYSQL_CONFIG = {
    host: "localhost",
    port: "8000",
    user: "root",
    password: "wanghaoyu0017",
    database: "myblog",
  };
}

module.exports = {
  MYSQL_CONFIG,
};

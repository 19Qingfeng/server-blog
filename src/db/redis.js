const redis = require("redis");
const { REDIS_CONFIG } = require("../config/db");
const { isPlainObject } = require("../helpers/utils");

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on("error", (e) => {
  console.error("Redis Error:", e);
});

// set的话不需要返回值 所以不用promise去写 直接去设置
function set(key, value) {
  if (isPlainObject(value)) value = JSON.stringify(value);
  redisClient.set(key, value, redis.print);
}

// get 需要及时获取
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, value) => {
      if (error) {
        reject(error);
        return;
      }
      //  redis查询 如果没有查到 也就传入key value不存在那么就是null
      if (value === null) resolve(null);
      // 尝试转换JSON
      try {
        value = JSON.parse(value);
        resolve(value);
      } catch (e) {
        resolve(value);
      }
    });
  });
}

module.exports = {
  get,
  set,
};

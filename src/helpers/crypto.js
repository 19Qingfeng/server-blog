// 加密算法
const crypto = require("crypto");

const secret = "wanghaoyu";

// 检查支持的Hash算法
crypto.getHashes();

function md5(content) {
  // 创建md5 Hash实例
  let md5 = crypto.createHash("md5");
  // 实例加密
  md5.update(content);
  // 获取实例16进制结果
  // digest 方法参数用于指定加密后的返回值的格式，不传参默认返回加密后的 Buffer，常用的参数有 hex 和 Base64，hex 代表十六进制，加密后长度为 32，Base64 的结果长度为 24，以 == 结尾。
  return md5.digest('hex');
  // return md5.update(content).digest()
}

// 加密函数
function genPassword(password = 123) {
  password = `key=${secret}&value=${password}`;
  return md5(password);
}

module.exports = {
  genPassword
}

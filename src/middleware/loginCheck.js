const { ErrorModel } = require('../model/resModel')

const loginCheck = (req, res) => {
  const username = req.session.username;
  if (!username) {
    const expireInfo = JSON.stringify(new ErrorModel('暂未登陆'))
    // 未登陆
    res.writeHead(401)
    res.end(expireInfo);
    req.expireLogin = true
    return true
  }
};

module.exports = {
  loginCheck,
};

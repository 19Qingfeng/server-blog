const { exec, escape } = require("../db/mysql");
const { genPassword } = require("../helpers/crypto");

const login = (username, password) => {
  username = escape(username);
  password = genPassword(password)
  password = escape(password);
  let sql = `select username,realname from users where username=${username} and password=${password};`;
  return exec(sql).then((data) => {
    return data[0] || {};
  });
};

module.exports = {
  login,
};

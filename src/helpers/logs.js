const path = require("path");
const fs = require("fs");

function writeLog(stream, log) {
  stream.write(log + "\n");
}

function createWriteStream(filename) {
  const fullFileName = path.join(__dirname, "../", "../", "logs", filename);
  return fs.createWriteStream(fullFileName, {
    flags: "a",
  });
}

// accessWriteStream没有调用end() 所以永远不会结束 来一个就会写一个
const accessWriteStream = createWriteStream("access.log");

// 访问日志
function access(log) {
  if (process.env.NODE_ENV === "production") {
    writeLog(accessWriteStream, log);
  }
}

const errorWriteStream = createWriteStream('error.log')
// 错误日志
function errorLog(log) {
  if (process.env.NODE_ENV === "production") {
    writeLog(accessWriteStream, log);
  }
}

module.exports = {
  access,
};

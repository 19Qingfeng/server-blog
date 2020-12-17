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

const accessWriteStream = createWriteStream("access.log");

// 书写访问日志
function access(log) {
  if (process.env.NODE_ENV === "production") {
    writeLog(accessWriteStream, log);
  }
}

module.exports = {
  access,
};

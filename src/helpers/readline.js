const path = require("path");
const fs = require("fs");
const readline = require("readline");

// 逐行读取access.log 日志分析
const fullFileName = path.join(__dirname, "../", "../", "logs/access.log");
// 创建读取流
const readStream = fs.createReadStream(fullFileName);

// readline 基于stream的
const rl = readline.createInterface({
  input: readStream,
});

let chrome = 0;
let sum = 0;

// 读完一行触发
rl.on("line", (lineData) => {
  if (!lineData) return;
  sum++;
  console.log(lineData,'\n')
  if (lineData.indexOf("Chrome") !== -1) {
    console.log(lineData + "\n");
    chrome++;
  }
});
rl.on("close", () => {
  console.log("Chrome占比", (chrome / sum) * 100 + "%");
});

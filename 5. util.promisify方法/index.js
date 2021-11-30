/*
  util.promisify 方法
  “Takes a function following the common error-first callback style, 
  i.e. taking an (err, value) => ... callback as the last argument, 
  and returns a version that returns promises.”
  接收一个遵循普通 错误优先 风格的回调函数
  返回它的 promise 版本
*/

const util = require('util');
const fs = require('fs');
const path = require('path');

let mineReadFile = util.promisify(fs.readFile);
mineReadFile(path.join(__dirname + '/resource/content.txt')).then((value) => {console.log(value.toString())})
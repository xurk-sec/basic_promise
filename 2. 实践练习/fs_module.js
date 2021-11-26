const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'resource/a.txt'), {flag: 'r'},(err, data)=>{  // 由于运行环境的不同，相对路径会有所改变，会出现读不到文件的情况。因此正确写法是利用path模块，（__dirname表示当前文件路径）绝对路径+相对路径，精准找到所需文件。
  // 若有异常，则抛出
  if(err) throw err;
  // 输出文件内容
  console.log(data.toString());   // 不用toString()的话，输出的是Buffer，看不懂内容。
})
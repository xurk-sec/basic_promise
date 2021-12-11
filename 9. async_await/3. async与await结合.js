const fs = require('fs');
const path = require('path');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);

// 使用回调函数的方式实现
// fs.readFile(path.join(__dirname, './resource/1.txt'), (err, data1) => {
//   if(err) throw err;
//   fs.readFile(path.join(__dirname, './resource/2.txt'), (err, data2) => {
//     if(err) throw err;
//     fs.readFile(path.join(__dirname, './resource/3.txt'), (err, data3) => {
//       console.log((data1 + data2 + data3).toString());
//     })
//   })
// })

// async 与 await
async function main(){
  // 错误处理也比纯回调函数更方面
  try{
    // 读取第一个文件的内容
    let data1 = await mineReadFile(path.join(__dirname, './resource/1.txt'));
    let data2 = await mineReadFile(path.join(__dirname, './resource/2.txt'));
    let data3 = await mineReadFile(path.join(__dirname, './resource/3.txt'));

    console.log((data1 + data2 + data3).toString());
  }catch(e){
    console.log(e);
  }
}

main();
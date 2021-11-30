const fs = require('fs');
const rela_path = require('path');
// const 
function reading(path){
  return new Promise((resolve, reject) => {   // 返回的是一个 Promise 对象
    fs.readFile(rela_path.join(__dirname, path), (err, data) => {
      if(err){
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

reading('./resource/content.txt').then((value) => {
  console.log('Read Success: ' + value.toString());
}, (reason) => {
  throw reason;
})

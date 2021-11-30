// 1. 引入 express
const express = require('express');

// 2. 创建应用对象
const app = express();

// 3. 创建路由规划
app.get('/server', (request, response)=>{
  // 设置允许跨域
  response.setHeader('Access-Control-Allow-Origin', '*');

  // 设置响应体
  response.send('HELLO PROMISE!');
})

// 4. 监听端口启动服务
app.listen(8000, ()=>{
  console.log('服务已启动，8000端口监听中...');
})
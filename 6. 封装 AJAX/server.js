const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');

  response.send('HELLO PACKAGING AJAX!');
})

app.listen('8000', () => {
  console.log('8000端口已启动，正在监听中...');
})
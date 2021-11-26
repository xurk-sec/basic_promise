const btn_promise = document.getElementById('promise');
var flag = true;  // 锁（为了让结构清晰，这里没加锁，old加锁了）

btn_promise.addEventListener('click', function(){
    
  let num = random();

  // Promise 形式
  // resolve 异步任务成功时调用 都是函数类型的数据
  // reject  异步任务失败时调用 都是函数类型的数据
  const p = new Promise((resolve, reject)=>{   // 接收一个函数形式的参数
    // Promise 可以包裹一个异步操作
    setTimeout(()=>{
      if(num <= 30){
        resolve(num);    // 将 Promise 对象（p）的状态设置为 成功
      } else {
        reject(num);     // 将 Promise 对象（p）的状态设置为 失败
      }
    }, 1000)
    // 完成了对异步任务的封装
  });

  // 调用 then 方法
  p.then((value)=>{    // 接收两个参数且都为函数类型。 第一个为对象成功时的回调，第二个为对象失败时的回调。
    alert('你中奖啦！您的中奖号码为：' + value);
  }, (reason)=>{
    alert('谢谢惠顾！您的号码为：' + reason);
  })

})


function random(){
  return Math.floor(Math.random()*100 + 1); // 向下整除
}
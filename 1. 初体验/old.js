const btn_old = document.getElementById('old');
var flag = true;  // 锁

btn_old.addEventListener('click', ()=>{
  // 普通方法（回调函数）
  if(flag){
    flag = false;
    let num = random();

    setTimeout(()=>{
      if(num <= 30){
        alert('你中奖啦!');
      } else {
        alert('谢谢惠顾');
      }
      flag = true;
    }, 1000)
  }
})


function random(){
  return Math.floor(Math.random()*100 + 1);
}
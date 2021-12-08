// 覆盖全局的 promise。 new 的时候，调用的是这个新写的 promise。
function Promise(executor){
  // 添加属性
  this.PromiseState = 'pending';
  this.PromiseResult = null;
  // 保存回调 (数组形式应对多个回调的情况，否则会发生覆盖)
  this.callbacks = []

  // 保存实例对象的 this 值
  const self = this;

  // resolve 函数
  function resolve(data){
    // 判断状态 (限制状态只能被修改一次)
    if(self.PromiseState != 'pending') return;
    // 1. 修改对象状态（是实例对象上的一个属性：promiseState）
    self.PromiseState = 'fulfilled';
    // 2. 设置对象结果值（是实例对象上的一个属性：promiseResult）
    self.PromiseResult = data;
    // 调用成功的回调函数 (用于执行器为异步任务的情况) （状态改变的位置：回调函数真正执行的时候）
    self.callbacks.forEach(item => {
      item.onResolved(data);
    })
  }
  // reject 函数
  function reject(data){
    if(self.PromiseState != 'pending') return;
    self.PromiseState = 'rejected';
    self.PromiseResult = data;
    self.callbacks.forEach(item => {
      item.onRejected(data);
    })
  }

  // 用于响应抛出异常（改变状态）
  try{
    // 在内部是同步调用 执行器函数 的（官方的 Promise 也是这样的）
    executor(resolve, reject);  // 两个参数都是函数类型，所以需要在前面写出这两个函数的定义与实现
  } catch(e){
    reject(e);
  }
}

// 添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
  const self = this;
  // then 方法的返回值也是一个 promise 对象
  return new Promise((resolve, reject) => {
    // 封装函数
    function callBack(type){
      try{
        let result = type(self.PromiseResult);
        // 设置新 promise 的状态、值 (应对三种情况)
        if(result instanceof Promise){
          // 如果是 promise 类型的对象：新 promise 状态取决于 promise 状态
          result.then(v => {
            resolve(v);
          }, r => {
            reject(r);
          })
        } else {
          // 非 promise ：新 promise 状态为 fulfilled
          resolve(result);
        }
      } catch(e) {
        reject(e);
      }
    }

    // 调用回调函数 PromiseSatte (同步方法的回调函数在 then 方法中执行)
    if(this.PromiseState == 'fulfilled'){
      callBack(onResolved);
    }

    // 执行器同步执行过 rejected 的情况
    if(this.PromiseState == 'rejected'){
      callBack(onRejected);
    }

    // 判断 pending 的状态  (用于执行器为异步任务的情况)（异步方法的回调函数在 状态改变处/时执行）
    if(this.PromiseState == 'pending'){
      // 保存回调函数
      this.callbacks.push({
        // 异步任务情况：（不考虑设置 then 的返回结果）的情况
        // onResolved,   // 简写（键名和键值相同）
        // onRejected    // onRejected: onRejected
        // 异步任务 情况下，then 方法的返回结果
        onResolved: function(){
          callBack(onResolved);
        },
        onRejected: function(){
          callBack(onRejected);  
        }    
      })
    }
  })
}
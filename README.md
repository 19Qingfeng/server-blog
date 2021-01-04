# server-blog
💙 Creating a blog system by nodejs.

+ node

源生node代码实现。

+ express

express实现。

+ koa

koa实现。



## KOA 中的中间件机制

koa 中每一个中间件其实就是一个 async 函数。

比如`app.use(json())`json()返回的其实就是一个 async 函数。

- app.use()注册中间件
- 中间件格式都是 async 函数机制
- next()函数代表执行下一个中间件
- 碰到 await 后，会处理 await 之中的同步逻辑，而 await 之后的异步逻辑会等待处理结束后向洋葱一样在向外执行。

通过这个例子就能很好的明白了 async 中间件的洋葱模型处理。

```
const promise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};

const test1 = async () => {
  console.log(1);
  await promise();
  console.log(2);
};

const test2 = () => {
  console.log(3);
};
test1();
test2();

// 打印结果 1 3 2 (2s后打印的2)

```
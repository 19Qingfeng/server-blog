# server-blog

💙 Creating a blog system by nodejs.

### Node.js 原生实现～。

#### 关于项目文件拆分

##### 1. bin/www.js

项目入口文件，仅仅关于 server 的逻辑

- createServer
- port
  > 之类的 server 逻辑。

###### 2. app.js

处理项目技术层面架构，项目所使用到的各种技术层面以及对于获得请求内容的统一处理和对于响应数据的方法处理。

###### 3. router 文件夹

维护各个不同模块之间的路由 api 路径，分别处理各个模块不同路径下的路由处理。

- blog.js
- user.js

##### 4. controller

根据不同路由模块划分文件，仅仅关于数据层面处理。针对不同路由定义的不同方法下发到 controller 参数，controller 接受参数返回处理逻辑返回对应数据。

### 目录流程

www.js (createServer) => app.js (res,req Format) => router (split router module and method) => controller (handle data)

### Nodejs 常见攻击防范

##### 1. sql 注入攻击。

利用请求时携带的参数注入 sql 语句，比如

```
{
    "username":"xixi2' -- ", // post请求中携带的 "' -- "为sql查询注释语句，这样就可以借助代码漏洞不需要密码进行登陆
    "password":"mima123213asdfsafd"
}

{
  "username":"xixi2; delete from users;" // 后果不堪设想
}
```

预防方式很简单:

使用 escape 函数进行执行

```
const { exec, escape } = require("../db/mysql");

const login = (username, password) => {
  username = escape(username)
  password = escape(password)
  let sql = `select username,realname from users where username=${username} and password=${password};`;
  return exec(sql).then((data) => {
    return data[0] || {}
  });
};

module.exports = {
  login,
};

```

Tips:

- sql 语句使用 scape()转译后，关键字比如 password，之前需要使用单引号`'password'`，现在就不需要了。


##### 2. XSS攻击

首先，XSS攻击前server和front都应该预防。

攻击方式: 在页面嵌入js脚本获取网页信息。

比方说: 博客系统中，用户注册，注册之后新建了一个博客。写入内容，内容中嵌入js脚本，展示的时候就会运行js脚本。如果别的用户看这篇博客，那么也会运行这段脚本了。

预防方式: 转换生成js的符号。
> &,<,>,",',/
> 转译的脏活和累活可以交给一些第三方库，比方:`npm install xss`
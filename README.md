# server-blog

💙 Creating a blog system by nodejs.

### Node.js 原生实现～。

#### 关于项目文件拆分

1. bin/www.js

项目入口文件，仅仅关于 server 的逻辑

- createServer
- port
  > 之类的 server 逻辑。

2. app.js

处理项目技术层面架构，项目所使用到的各种技术层面以及对于获得请求内容的统一处理和对于响应数据的方法处理。

3. router 文件夹

维护各个不同模块之间的路由 api 路径，分别处理各个模块不同路径下的路由处理。

- blog.js
- user.js

4. controller

根据不同路由模块划分文件，仅仅关于数据层面处理。针对不同路由定义的不同方法下发到controller参数，controller接受参数返回处理逻辑返回对应数据。


### 目录流程


www.js (createServer) => app.js (res,req Format) => router (split router module and method) => controller (handle data)

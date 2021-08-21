
### 1、数据库
启动项目前一定要在创建好 shakeblog数据库，以下是执行数据库命令：
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 shakeblog 数据库
$ CREATE DATABASE IF NOT EXISTS shakeblog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2、修改 Koa2 项目数据库配置
请在根目录下的 [|——config/config.js](https://github.com/LFB/nodejs-koa-blog/blob/master/config/config.js) 文件下修改您本地的数据库名字（`shakeblog`）和数据库密码 ( `password` )。

根目录都是 Node.js + Koa2 API 开发源代码，重点是 app 文件夹下的 api 开发；根目录下的 frontend-boblog 文件夹下都是前端网站项目源代码；根目录下的 admin 文件夹下都是后台管理系统的源代码。

### 3、以下是启动服务端项目的操作命令：
```
# 进入项目根目录
$ cd nodejs-koa-blog

# 安装依赖包
$ npm install

# 启动 Node.js Koa2 项目
$ npm run dev
```

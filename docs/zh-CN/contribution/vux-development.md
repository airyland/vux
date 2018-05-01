---
title: VUX 源码本地运行
---

# VUX 源码本地运行

> phantomjs 可能会遇到无法下载的问题，建议先用 cnpm 全局安装

``` bash
cnpm install -g phantomjs-prebuilt
```

::: tip
请更新 `NodeJS` 版本到 `v7.6.0` 以上，`build` 命令逐步使用 `async`。
:::

``` bash
yarn # 使用 yarn.lock 保证依赖版本一致
yarn dev # 或者 npm run dev


yarn dev -- --env.include datetime,alert # 只运行部分组件，耗时短
```

## 本地查看文档

``` bash
npm run doc:build // 构建文档
cd docs
yarn
npm run dev // 耗时较长
```

## 文档相关命令

> docs 目录下的相关命令，它们是 npm run doc:build 的一部分，但是可以单独运行

``` bash
node compile // 生成文档路由
node component-contributions // 从 git 记录里获取每个组件提交历史

npm run doc:dev // 运行
```

## 构建部分文档

文档页面比较多等待 build 命令会长，因此可以只构建部分文档方便快速查看。

``` bash
cd docs
node compile --include datetime // 只构建 datetime 相关文档，多个时以英文逗号分隔，如：datetime,alert
npm run dev
```

## 官网文档部署说明

线上页面有 `30分钟` 页面缓存，定时每 `20分钟` 构建一次，因此提交后可能会需要 `1小时` 才会更新到官网。

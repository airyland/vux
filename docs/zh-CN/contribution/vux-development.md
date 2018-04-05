---
title: VUX 源码本地运行
---

# VUX 源码本地运行

::: tip
请更新 `NodeJS` 版本到 `v7.6.0` 以上，`build` 命令逐步使用 `async`。
:::

``` bash
yarn // 使用 yarn.lock 保证依赖版本一致
yarn dev
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
node compile --include datetime // 只构建 datetime 相关文档
npm run dev
```

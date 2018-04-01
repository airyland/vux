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
npm run build-docs // 构建文档
cd docs
yarn
node compile // 生成文档路由
node component-contributions // 从 git 记录里获取每个组件提交历史
npm run dev // 耗时较长
```

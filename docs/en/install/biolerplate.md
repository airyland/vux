---
title: VUX 入门教程
---

# 快速入门

::: warning
vux@2.x 推荐`webpack+vue-loader`方式的开发，如果要使用`umd`文件，请参照<router-link to="/zh-CN/install/umd.html">文档</router-link>。不建议使用引入`script`的方式进行开发，因为它会带来一系列的开发、维护、效率、部署问题。<br>
**Life is short, use webpack.**
:::

## vux2 模板

::: tip
[vux2](http://github.com/airyland/vux2) 模板 fork 自 [webpack](https://github.com/vuejs-templates/webpack) 模板，基本和官方同步。
:::

默认为 webpack2 模板

``` bash
npm install vue-cli -g # 如果还没安装
vue init airyland/vux2 projectPath

cd projectPath
npm install --registry=https://registry.npm.taobao.org # 或者 cnpm install 或者  yarn
npm run dev #  或者  yarn dev
```

## 使用淘宝 npm 镜像

### cnpm

你可以直接使用 `cnpm` 来加速模块下载。

### yarn

或者如果你已经用上了 `yarn`，建议配置淘宝源：

``` bash
yarn config set registry https://registry.npm.taobao.org
yarn
```
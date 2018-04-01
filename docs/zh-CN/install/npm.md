---
title: VUX 安装使用
---

# 安装使用(webpack)

::: warning
如果你从没使用过 `VUX`，请参考 <router-link to="/zh-CN/install/biolerplate.html">快速入门</router-link>。<br>
不推荐使用 `umd` 方式引用组件，但是如果不得不使用，可以参考 <router-link to="/zh-CN/install/umd.html">umd 构建</router-link>
:::

直接安装或者更新：

``` js
npm install vux --save
```

或者使用 `yarn`

``` js
yarn add vux // 安装
yarn upgrade vux // 更新
```

如果你是从`0.x`更新，请参考： <router-link to="/zh-CN/install/upgrade-to-vux2.html" style="color:#42b983;">更新到`2.x`</router-link>


::: warning
vux2必须配合`vux-loader`使用, 请在`build/webpack.base.conf.js`里参照如下代码进行配置：
:::

``` js
const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})
```

::: warning
vux@0.x 已经停止维护，请尽快迁移到 vue@2.x & vuex@2.x & vux@2.x，虽然要花点时间，但是完全值得。
:::
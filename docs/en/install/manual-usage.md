---
title: VUX 手动配置使用
---

# 手动配置使用

::: tip
注意的是下面事项并非表示 VUX 使用繁琐，部分只是出于确保有正确的依赖和配置，而部分是出于优化。
:::

::: warning
请将 `babel-loader` 的配置写到 `.babelrc` 里而不是使用 `options`，否则可能会出错。
:::

折腾能力强的同学参考一下，下面即`airyland/vux2`模板主要处理的事项:

- 引入 `reset.less`，默认样式不包含reset，并且部分用户自己有一套reset样式，因此需要在`App.vue`进行手动引入

  ``` html
  <style lang="less">
  @import '~vux/src/styles/reset.less';
  </style>
  ```

- 配置 `vue-loader`（通过配置vux-loader实现）

  ``` js
  // vux-loader
  plugins: [{
    name: 'vux-ui'
  }]
  ```
- 配置`babel-loader`以正确编译 VUX 的js源码（通过配置vux-loader实现）

  ``` js
  plugins: [{
    name: 'vux-ui'
  }]
  ```
- 安装`less-loader`以正确编译less源码

  ``` bash
  npm install less less-loader --save-dev
  ```
- 安装 `yaml-loader` 以正确进行语言文件读取

  ``` bash
  npm install yaml-loader --save-dev
  ```

- 添加 `viewport` meta

  ``` html
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
  ```
- 添加 `Fastclick` 移除移动端点击延迟

  ``` js
  const FastClick = require('fastclick')
  FastClick.attach(document.body)
  ```
- 添加 `vue-router`（如果不需要前端路由，可忽略）

  ``` js
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  ```

- 添加 webpack plugin, 在构建后去除重复css代码（通过配置vux-loader实现）

  ``` js
  plugins: [{
    name: 'duplicate-style'
  }]
  ```

- 如果你使用 `webpack-simple` 模板或者 webpack 配置里缺少 .vue extension 配置，请记得配置：

  ``` js
  resolve: {
    extensions: ['.js', '.vue', '.json']
  ```
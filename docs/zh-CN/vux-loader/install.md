---
title: vux-loader 使用
---

# vux-loader 使用

## 安装

``` bash
npm install vux-loader --save-dev
```

## 使用

为了降低使用成本及不侵入原来配置，只需要调用`merge`方法对原来`webpack`配置进行操作：

``` js
const webpackConfig = {} // 原来的 webpack.base.js 配置

const vuxLoader = require('vux-loader')

module.exports = vuxLoader.merge(webpackConfig, {
  options: {},
  plugins: [{
    name: 'vux-ui'
  }]
})
```

::: warning
更新配置后需要重新运行 `npm run dev` 命令。
:::

## Options

- `env` 非必选，定义当前环境变量，只在 vux-loader 里使用，用来判断哪些插件需要被执行(如果plugin有定义envs的话)，目的是实现一份配置多个环境使用。


## Plugins

插件为一个数组列表，根据需要可以添加你需要的插件，插件名为必须，有些组件不需要额外配置选项。

公用参数为:

- `name` `必须`，插件名字
- `envs` `非必须`，数组，当前插件在哪些环境变量里执行，不定义则默认执行

下面的插件配置代码将省略 `plugins:[]`的书写。

::: tip
当使用默认配置时，可以使用简写

``` js
plugins: ['vux-ui']
```

等同于

``` js
plugins: [{
  name: 'vux-ui'
}]
```
:::
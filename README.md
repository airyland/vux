<p align="center">
  <a href="http://vux.li">
    <img src="https://raw.githubusercontent.com/airyland/vux/master/logo.png">
  </a>
</p>
<p align="center">Be Cool with Vue and WeUI.</p>
<p align="center">Vux = Vue + WeUI + A Bunch of Components </p>
<p align="center">
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/v/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://vux.li/next-badge" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/dm/vux.svg?style=flat-square" alt="">
  </a>
  <a href="http://issuestats.com/github/airyland/vux">
    <img src="http://issuestats.com/github/airyland/vux/badge/issue?style=flat-square" alt="">
  </a>
  <a href="http://issuestats.com/github/airyland/vux">
    <img src="http://issuestats.com/github/airyland/vux/badge/pr?style=flat-square" alt="">
  </a>
</p>

## Docs

+ [中文文档](https://vuxjs.gitbooks.io/vux/content/)

## Importance notice

+ This is not an Official Project of Wechat.
+ [For 中文开发者]提问题时若使用`不能用`,`没效果`,`有问题`,`报错`此类模糊表达，但又没给出任何代码截图报错的，将**绝对**不会有任何反馈。([参阅 《提问的智慧》](https://github.com/tvvocold/How-To-Ask-Questions-The-Smart-Way))

## Demo

<p align="center">
  <a href="https://vux.li/?x-page=github_readme">https://vux.li</a><br/>
  (You can view the demos' codes in <a href="https://github.com/airyland/vux/tree/master/src/demos"><strong>/src/demos</strong></a>)<br/>
  <img src="https://raw.githubusercontent.com/airyland/vux/master/assets/qr.png" width="300">
</p>

## Component List

> If you need a new component, don't hesitate to raise an issue.

<p align="center">
	<img src="https://raw.githubusercontent.com/airyland/vux/master/assets/components.png" width="980">
</p>

## Usage by importing UMD modules

``` bash
# install vue-cli
npm install -g vue-cli

# init a webpack project
vue init webpack my-project
cd my-project
npm install
npm install vux
npm run dev
```

``` html
<template>
  <div>
    <group>
      <cell title="vue" value="cool"></cell>
    </group>
  </div>
</template>

<script>
import Group from 'vux/dist/components/group'
import Cell from 'vux/dist/components/cell'

export default {
  components: {
    Group,
    Cell
  }
}
</script>

<style>
@import '~vux/dist/vux.css';
</style>
```

## Usage by importing .vue file

> make sure less and less-loader are installed

> add a js loader in webpack.base.conf.js

``` js
{
  test: /vux.src.*?js$/,
  loader: 'babel'
}
```

> import the components you need

``` js
import Group from 'vux/src/components/group'
import Cell from 'vux/src/components/cell'
```

> you can use a shorter path by adding resolve.alias in webpack.base.conf.js

``` js
resolve: {
  alias: {
    'vux-components': 'vux/src/components/'
  }
}
```

> now you can import like this:

``` js
import Group from 'vux-components/group'
import Cell from 'vux-components/cell'
```

## Usage by including scripts

> You can download vux from the [releases](https://github.com/airyland/vux/releases)

> or  install from bower `bower install vux`


> checkout examples/scripts.html

``` html
<!--include Vux style-->
<link rel="stylesheet" href="vux/vux.css">
<!--include Vue yourself-->
<script src="vue.js"></script>

<div id="demo">
  <group>
    <cell title="vue" value="cool"></cell>
  </group>
</div>

<!--include the components you need-->
<script src="vux/components/dist/group/index.js"></script>
<script src="vux/components/dist/cell/index.js"></script>

<script>
// register components
Vue.component('group', vuxGroup)
Vue.component('cell', vuxCell)

new Vue({
  el: '#demo'
})
</script>
```


## Remove click delays

``` js
const FastClick = require('fastclick')
FastClick.attach(document.body)
```

## Async loading Components

``` js
// import Countup from './demos/Countup'

const Countup = function (resolve) {
  require(['./demos/Countup'], resolve) // webpack will do the rest things
}
```

## Development Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# you can also custom host and port
npm run dev -- --host 127.0.0.1 --port 8085

# build for production with minification
npm run build

# build components before publishing
npm run xbuild

# publish and deploy to gh-pages
npm run xpublish

# run unit tests
npm test
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Components

<p align="center">
  <img src="https://raw.githubusercontent.com/airyland/vux/master/assets/vux.png" width="600">
</p>

## Maintainers
+ [airyland](https://github.com/airyland)
+ [lichunqiang](https://github.com/lichunqiang)
+ [graysheeep](https://github.com/graysheeep)
+ [unclay](https://github.com/unclay)

## Vux is Inspired or Powered By:
+ [Vue](https://github.com/vuejs/vue)
+ [WeUI](https://github.com/weui/weui)
+ [FrozenUI](https://github.com/frozenui/frozenui)
+ [Ant Design](https://github.com/ant-design/ant-design)
+ [Ant Design Mobile](http://github.com/ant-design/ant-design-mobile)
+ [XScroll](https://github.com/huxiaoqi567/xscroll)
+ [Ionic](https://github.com/driftyco/ionic)
+ [SUI Mobile](https://github.com/sdc-alibaba/SUI-Mobile)
+ [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe)

## License

MIT

## Donate

It takes much time and energy to maintain and improve this project. It Vux helps you, you may want to buy me a coffee :).

<p align="center">
  <img src="https://o3e85j0cv.qnssl.com/vux_pay.png" width="450">
</p>

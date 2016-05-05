<p align="center">
  <a href="http://vux.li">
    <img src="https://raw.githubusercontent.com/airyland/vux/master/logo.png">
  </a>
</p>
<p align="center">Be Cool with Vue and WeUI.</p>
<p align="center">
  <a href="https://www.google.com/">
    <img src="https://img.shields.io/badge/Fuck%20-Baidu-ff0000.svg">
  </a>
  <a href="https://vux.bearychat.com">
    <img src="https://img.shields.io/badge/chat-%20on%20bearychat%20-82c547.svg">
  </a>
</p>
<p align="center">Vux = Vue + WeUI + A Bunch of Components </p>
<p align="center">
  <a href="https://circleci.com/gh/airyland/vux">
    <img src="https://circleci.com/gh/airyland/vux.svg?style=shield" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/v/vux.svg?style=flat-square" alt="">
  </a>
  <a href="https://www.npmjs.com/package/vux">
    <img src="https://img.shields.io/npm/dm/vux.svg?style=flat-square" alt="">
  </a>
  <a href="http://issuestats.com/github/airyland/vux">
    <img src="http://issuestats.com/github/airyland/vux/badge/issue" alt="">
  </a>
</p>

## Importance notice

+ This is not an Official Project of Wechat.
+ :warning: Before vux@0.1.0, Components' API may `change` any time.
+ If you are interested in improving vux, just email me to join [Vux@Teambition](https://www.teambition.com/project/56f37e966d3fb3142656b764/tasks/scrum/56f37e969aff544c264e23ec)

## Demo

<p align="center">
  <a href="https://vux.li/?x-page=github_readme">https://vux.li</a><br/>
  <img src="https://raw.githubusercontent.com/airyland/vux/master/qr.png" width="300">
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
import Group from 'vux/components/group'
import Cell from 'vux/components/cell'

export default {
  components: {
    Group,
    Cell
  }
}
</script>

<style>
@import '~vux/vux.css';
</style>
```

## Usage by importing .vue file

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
<script src="vux/components/group/index.js"></script>
<script src="vux/components/cell/index.js"></script>

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

## Work in Progress
 
This project is still in progress, so do not rely on this for anything important before production-ready version released. And pull requests are welcome.

## Development Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

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
  <img src="https://raw.githubusercontent.com/airyland/vux/master/vux.png" width="600">
</p>

## Liscence

MIT




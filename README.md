<p align="center">
  <a href="http://vux.li">
    <img src="https://raw.githubusercontent.com/airyland/vux/master/logo.png">
  </a>
</p>
<p align="center">
  <a href="https://gitter.im/airyland/vux?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge">
    <img src="https://badges.gitter.im/airyland/vux.svg">
  </a>
</p>
<p align="center">VUX = Vue + Weui + Components </p>
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

## Demo

<p align="center">
  <a href="https://vux.li/?x-page=github_readme">https://vux.li</a><br/>
  <img src="https://raw.githubusercontent.com/airyland/vux/master/qr.png" width="300">
</p>

## Usage for new Vue Project

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
import { Group, Cell } from 'vux'

// or you can import the components you need
// by this way, you can reduce webpack bundle size
import Group from 'vux/components/group/'
import Cell from 'vux/components/cell/'

export default {
  components: {
    Group,
    Cell
  }
}
</script>

<style>
@import 'vux/vux.css'
</style>
```

## Usage by including scripts

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

# build every single component to /components
npm run xbuild

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




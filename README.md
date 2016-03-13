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
    <img src="https://circleci.com/gh/airyland/vux.svg?style=svg" alt="">
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

## Usage

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
import { Style, Group, Cell } from 'vux'
export default {
  components: {
    Style, // style component is necessary
    Group,
    Cell
  }
}
</script>
```

## Remove click delays

include Fastclick

`<script type="text/javascript" src="./static/vendors/fastclick.1.0.6.min.js"></script>`

then 

``` js
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}
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




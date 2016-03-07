<p align="center">
  <a href="http://gulpjs.com">
    <img src="https://raw.githubusercontent.com/airyland/vux/master/logo.png">
  </a>
  <p align="center">VUX = Vue + Weui + Components </p>
</p>

## Demo

<p align="center">
  <a href="https://vux.li/?x-page=github_readme">https://vux.li</a>
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




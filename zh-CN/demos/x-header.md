---
nav: zh-CN
---


### XHeader_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-header"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/x-header" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <x-header>This is the page title.</x-header>
    <br>
    <x-header :left-options="{showBack: false}">do not show Back</x-header>
    <br>
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">with more menu</x-header>
    <br>
    <x-header>with right link<a slot="right">Feedback</a></x-header>
    <br>
    <x-header>long long long long long long long text<a slot="right">Feedback</a></x-header>
    <br>
    <x-header>with left slot<a slot="left">Close</a></x-header>
    <br>
    <x-header style="background-color:#000;">custom background color</x-header>
    <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
  </div>
</template>

<script>
import { XHeader, Actionsheet } from 'vux'

export default {
  components: {
    XHeader,
    Actionsheet
  },
  data () {
    return {
      menus: {
        menu1: 'Take Photo',
        menu2: 'Choose from photos'
      },
      showMenus: false
    }
  }
}
</script>
```
#### 文档

#### Github Issue
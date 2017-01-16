---
nav: zh-CN
---


### Countup_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fcountup"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/countup" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div style="text-align:center;">
    <countup :start-val="1" :end-val="1388" :duration="2" class="demo1"></countup>
    <br/>
    <countup :end-val="88.88" :duration="3" :decimals="2" class="demo1"></countup>
    <br>
    <countup :end-val="1024" :duration="4" :start="doStart" class="demo1"></countup>
    <div style="padding:0 15px;">
      <x-button @click.native="doStart=true" type="primary">Start</x-button>
    </div>
  </div>
</template>

<script>
import { Countup, XButton } from 'vux'

export default {
  components: {
    Countup,
    XButton
  },
  data () {
    return {
      doStart: false
    }
  }
}
</script>

<style scoped>
.demo1 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 6em;
  color: #04BE02;
}
</style>

```
#### 文档

#### Github Issue
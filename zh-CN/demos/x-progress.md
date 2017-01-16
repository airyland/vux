---
nav: zh-CN
---


### XProgress_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-progress"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/x-progress" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <br>
    <x-progress :percent="percent1"></x-progress>
    <br>
    <box gap="10px">
      <x-progress :percent="percent2" :show-cancel="false"></x-progress>
    </box>
  </div>
</template>

<script>
import { XProgress, Box } from 'vux'

export default {
  components: {
    XProgress,
    Box
  },
  data () {
    return {
      percent1: 30,
      percent2: 60
    }
  }
}
</script>

```
#### 文档

#### Github Issue
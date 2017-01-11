---
nav: zh-CN
---


### XDialog_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-dialog"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/x-dialog" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div style="height: 1000px">
    <group>
      <x-switch v-model="show" title="Toggle"></x-switch>
    </group>
    <group style="padding-top: 300px">
      <x-switch v-model="showNoScroll" title="背景不可滚动"></x-switch>
    </group>
    <x-dialog v-model="show" class="dialog-demo">
      <p class="dialog-title">I'm a bg scroll Dialog.</p>
      <div class="img-box">
        <img src="../assets/demo/dialog/01.jpg" style="max-width:100%">
      </div>
      <span class="vux-close" @click="show=false"></span>
    </x-dialog>
    <x-dialog v-model="showNoScroll" class="dialog-demo" :scroll="false">
      <p class="dialog-title">I'm a no scroll Dialog.</p>
      <div class="img-box">
        <img src="../assets/demo/dialog/01.jpg" style="max-width:100%">
      </div>
      <span class="vux-close" @click="showNoScroll=false"></span>
    </x-dialog>
  </div>
</template>

<script>
import { XDialog, XButton, Group, XSwitch } from 'vux'

export default {
  components: {
    XDialog,
    XButton,
    Group,
    XSwitch
  },
  ready () {
    setTimeout(() => {
      this.show = true
    }, 10)
  },
  data () {
    return {
      show: false,
      showNoScroll: false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';
.dialog-demo {
  .weui_dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>

```
#### 文档

#### Github Issue
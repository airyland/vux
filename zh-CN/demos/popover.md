---
nav: zh-CN
---


### Popover_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fpopover"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/popover" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div style="text-align:center;">
    <popover placement="top" style="margin: 20px;" @on-show="onShow" @on-hide="onHide">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on top') }}</button>
    </popover>

    <popover placement="bottom" style="margin: 20px;">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on bottom') }}</button>
    </popover>

    <popover placement="left" style="margin: 20px;">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on left') }}</button>
    </popover>

    <popover placement="right" style="margin: 20px;">
      <div slot="content" class="popover-demo-content">
        hello world
      </div>
      <button class="btn btn-default">{{ $t('Popover on right') }}</button>
    </popover>
  </div>
</template>



<script>
import { Popover } from 'vux'

export default {
  components: {
    Popover
  },
  methods: {
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    }
  }
}
</script>

<style scoped>
.popover-demo-content {
  padding: 5px 10px;
}
</style>

```
#### 文档

#### Github Issue
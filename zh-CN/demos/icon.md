---
nav: zh-CN
---


### Icon_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Ficon"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/icon" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <box gap="10px 10px">
      <icon type="success"></icon>
      <icon type="info"></icon>
      <icon type="info_circle"></icon>
      <icon type="warn"></icon>
      <icon type="waiting"></icon>
      <icon type="waiting_circle"></icon>
      <icon type="safe_success"></icon>
      <icon type="safe_warn"></icon>
      <icon type="success_circle"></icon>
      <icon type="success_no_circle"></icon>
      <icon type="circle"></icon>
      <icon type="download"></icon>
      <icon type="cancel"></icon>
      <icon type="search"></icon>
      <icon type="clear"></icon>
      <br/>
      <icon type="success" class="icon_big"></icon>
      <icon type="info" class="icon_big"></icon>
      <icon type="safe_success" class="icon_big"></icon>
      <icon type="safe_warn" class="icon_big"></icon>
    </box>
  </div>
</template>

<script>
import { Box, Icon } from 'vux'

export default {
  components: {
    Box,
    Icon
  }
}
</script>

```
#### 文档

#### Github Issue
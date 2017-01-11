---
nav: zh-CN
---


### LoadMore_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fload-more"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/load-more" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <load-more :tip="$t('正在加载')"></load-more>
    <load-more :show-loading="false" :tip="$t('暂无数据')" background-color="#fbf9fe"></load-more>
    <load-more :show-loading="false" background-color="#fbf9fe"></load-more>
  </div>
</template>



<script>
import { LoadMore } from 'vux'

export default {
  components: {
    LoadMore
  }
}
</script>
```
#### 文档

#### Github Issue
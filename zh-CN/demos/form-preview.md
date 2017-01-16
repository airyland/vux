---
nav: zh-CN
---


### FormPreview_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fform-preview"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/form-preview" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <form-preview :header-label="$t('付款金额')" header-value="¥2400.00" :bodyItems="list" :footer-buttons="buttons1"></form-preview>
    <br>
    <form-preview :header-label="$t('付款金额')" header-value="¥2400.00" :bodyItems="list" :footer-buttons="buttons2"></form-preview>
    <br>
    <form-preview :header-label="$t('付款金额')" header-value="¥2400.00" :bodyItems="list"></form-preview>
  </div>
</template>



<script>
import { FormPreview } from 'vux'

export default {
  components: {
    FormPreview
  },
  data () {
    return {
      list: [{
        label: '商品',
        value: '电动打蛋机'
      }, {
        label: '标题标题',
        value: '名字名字名字'
      }, {
        label: '标题标题',
        value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
      }],
      buttons1: [{
        style: 'default',
        text: '辅助操作'
      }, {
        style: 'primary',
        text: '操作'
      }],
      buttons2: [{
        style: 'primary',
        text: '操作'
      }]
    }
  }
}
</script>
```
#### 文档

#### Github Issue
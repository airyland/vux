---
nav: zh-CN
---


### Qrcode_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fqrcode"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/qrcode" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div style="text-align:center;margin-top:15px;">
    <divider>{{ $t('Notice: It cannot be extracted by Wechat') }}</divider>
    <qrcode value="https://vux.li"></qrcode>
    <br>
    <br>
    <qrcode :value="value" :fg-color="fgColor"></qrcode>
    <br>
    <span>{{ $t('current url') }}: {{value}}</span>
    <br>
    <span>{{ $t('current fgColor') }}: {{fgColor}}</span>
  </div>
</template>



<script>
import { Qrcode, Divider } from 'vux'

export default {
  mounted () {
    setInterval(() => {
      this.value = `https://vux.li?t=${Math.random()}`
      this.fgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }, 1000)
  },
  components: {
    Qrcode,
    Divider
  },
  data () {
    return {
      value: 'https://vux.li',
      fgColor: '#000000'
    }
  }
}
</script>
```
#### 文档

#### Github Issue
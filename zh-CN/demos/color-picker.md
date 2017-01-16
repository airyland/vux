---
nav: zh-CN
---


### ColorPicker_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fcolor-picker"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/color-picker" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <div style="padding: 15px;">
      <color-picker :colors="colors1" v-model="color1"></color-picker>
      <br>
      <color-picker :colors="colors1" v-model="color1" size="middle"></color-picker>
    </div>
    <group title="as a cell's content">
      <cell :title="'Color:' + color1">
        <color-picker slot="value" :colors="colors1" v-model="color1" size="small"></color-picker>
      </cell>
    </group>
    <group title="a cell without title">
      <cell primary="content">
        <color-picker slot="value" :colors="colors1" v-model="color1" size="middle"></color-picker>
      </cell>
    </group>
  </div>
</template>

<script>
import { ColorPicker, Group, Cell } from 'vux'

export default {
  components: {
    ColorPicker,
    Group,
    Cell
  },
  data () {
    return {
      color1: '#FFEF7D',
      colors1: ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff']
    }
  }
}
</script>

```
#### 文档

#### Github Issue
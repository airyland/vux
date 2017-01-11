---
nav: zh-CN
---


### Radio_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fradio"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/radio" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group title="default">
      <radio :options="radio001" @on-change="change"></radio>
    </group>

    <group title="preselect 'China'">
      <radio :options="radio001" value="China"></radio>
    </group>

    <group :title="'fill mode value is '+radio001Value">
      <radio fill-mode :options="radio001" v-model="radio001Value" @on-change="change"></radio>
    </group>

    <group title="fill mode with custom placeholder and label">
      <radio fill-mode fill-label="Other" fill-placeholder="填写其他的哦" :options="radio001" @on-change="change"></radio>
    </group>

    <group title="object options">
      <radio fill-mode fill-label="Other" fill-placeholder="other" :options="radio003" @on-change="change"></radio>
    </group>
  </div>
</template>

<script>
import { Radio, Group, DevTip } from 'vux'

export default {
  components: {
    Radio,
    Group,
    DevTip
  },
  data () {
    return {
      radio001: [ 'China', 'Japan' ],
      radio001Value: 'China',
      radio002Value: 'Japan',
      radio003: [{
        key: '001',
        value: 'radio001'
      }, {
        key: '002',
        value: 'radio002'
      }]
    }
  },
  methods: {
    change (value) {
      console.log('change:', value)
    }
  }
}
</script>

```
#### 文档

#### Github Issue
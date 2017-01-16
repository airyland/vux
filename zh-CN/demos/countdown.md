---
nav: zh-CN
---


### Countdown_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fcountdown"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/countdown" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group title="auto countdown">
      <cell title="15s" v-model="value">
        <countdown slot="value" v-model="time1" @on-finish="finish" v-show="show"></countdown>
      </cell>
    </group>
    <group title="manually">
      <x-switch title="start" v-model="start"></x-switch>
      <cell title="15s">
        <countdown slot="value" v-model="time2" :start="start" @on-finish="finish2"></countdown>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Countdown, XSwitch } from 'vux'

export default {
  components: {
    Group,
    Cell,
    Countdown,
    XSwitch
  },
  methods: {
    finish (index) {
      this.show = false
      this.value = 'completed'
      console.log('current index', index)
    },
    finish2 (index) {
      this.start = false
      this.time = 20
    }
  },
  data () {
    return {
      show: true,
      time1: 15,
      time2: 15,
      value: '',
      start: false
    }
  }
}
</script>
```
#### 文档

#### Github Issue
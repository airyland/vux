---
nav: zh-CN
---


### XCircle_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-circle"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/x-circle" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div class="vux-circle-demo">
    <br>
    <div style='width:150px;height:150px;'>
      <x-circle :percent="percent1" :stroke-width="10" stroke-color="#04BE02">
        <span>{{percent1}}</span>
      </x-circle>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <x-circle :percent="percent1" :stroke-width="5" stroke-color="#04BE02">
        <span>{{percent1}}</span>
      </x-circle>
    </div>
    <br>
    <div style='width:50px;height:50px;'>
      <x-circle :percent="percent1" :stroke-width="5" stroke-color="#04BE02">
        <span>{{percent1}}</span>
      </x-circle>
    </div>
    <br>
    <div style="width:180px;">
      <range v-model="percent1" :min="0" :max="100"></range>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <x-circle :percent="100" :stroke-width="3" stroke-color="#04BE02">
        <icon type="success"></icon>
      </x-circle>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <x-circle :percent="percent2" :stroke-width="6" :trail-width="6" :stroke-color="strokeColor2" trail-color="#ececec">
        <span :style="{color: strokeColor2}">{{percent2}}%</span>
      </x-circle>
    </div>
  </div>
</template>

<script>
import { XCircle, Range, Icon } from 'vux'

export default {
  ready () {
    setInterval(this.update2, 2000)
  },
  components: {
    XCircle,
    Range,
    Icon
  },
  data () {
    return {
      percent1: 10,
      percent2: 30,
      strokeColor2: '#3FC7FA'
    }
  },
  methods: {
    update2 () {
      const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A']
      this.percent2 = parseInt(Math.random() * 100, 10)
      this.strokeColor2 = colorMap[parseInt(Math.random() * 3, 10)]
    }
  }
}
</script>

<style scoped>
.vux-circle-demo {
  text-align: center;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
</style>

```
#### 文档

#### Github Issue
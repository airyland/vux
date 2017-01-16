---
nav: zh-CN
---


### Clocker_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fclocker"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/clocker" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <p style="padding:15px;">
      <span>Normal Usage</span>
      <clocker :time="time1"></clocker>
    </p>

    <group title="Use in cell">
      <cell title="Date:0801">
        <clocker time="2017-08-01" slot="value"></clocker>
      </cell>
    </group>

    <group title="custom template">
      <cell title="Date:0801">
        <clocker time="2017-08-01" slot="value">
          <span style="color:red">%D 天</span>
          <span style="color:green">%H 小时</span>
          <span style="color:blue">%M 分 %S 秒</span>
        </clocker>
      </cell>
      <cell title="20180808">
        <clocker time="2018-08-08" slot="value">
          <span class="day">%_D1</span>
          <span class="day">%_D2</span>天
          <span class="day">%_H1</span>
          <span class="day">%_H2</span>时
          <span class="day">%_M1</span>
          <span class="day">%_M2</span>分
          <span class="day">%_S1</span>
          <span class="day">%_S2</span>秒
        </clocker>
      </cell>
    </group>

  </div>
</template>

<script>
import { Clocker, Cell, Group } from 'vux'

export default {
  components: {
    Clocker,
    Cell,
    Group
  },
  ready () {
    setTimeout(() => {
      this.time1 = '2017-08-13 22:54'
    }, 5000)
  },
  data () {
    return {
      time1: '2017-07-13 21:54'
    }
  }
}
</script>

<style scoped>
.day {
  background-color:#000;
  color:#fff;
  text-align:center;
  display:inline-block;
  padding:0 3px;
  border-radius:3px;
}
</style>

```
#### 文档

#### Github Issue
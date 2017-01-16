---
nav: zh-CN
---


### Calendar_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fcalendar"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/calendar" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group>
      <calendar v-model="demo1" :title="$t('Basic Usage')" disable-past></calendar>
    </group>
    <group>
      <calendar v-model="demo2" :title="$t('set value as TODAY')" disable-past></calendar>
    </group>
    <group>
      <calendar v-model="demo3" :title="$t('disable future')" disable-future></calendar>
    </group>
  </div>
</template>



<script>
import { Group, Calendar, Cell } from 'vux'

export default {
  components: {
    Calendar,
    Group,
    Cell
  },
  data () {
    return {
      demo1: '',
      demo2: 'TODAY',
      demo3: 'TODAY'
    }
  }
}
</script>

```
#### 文档

#### Github Issue
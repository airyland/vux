---
nav: zh-CN
---


### Selector_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fselector"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/selector" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group :title="'no placeholder, the current value is : ' + defaultValue">
      <selector title="省份" :options="list" v-model="defaultValue"></selector>
    </group>

    <group title="with placeholder">
      <selector placeholder="请选择省份" title="省份" :options="list" @on-change="onChange"></selector>
    </group>

    <group title="without title">
      <selector placeholder="请选择省份" :options="list"></selector>
    </group>

    <group title="set value=广西">
      <selector v-model="value1" title="省份" :options="plainList" @on-change="onChange"></selector>
    </group>

    <group title="readonly, displays just like a cell">
      <selector value="gd" readonly title="省份" :options="list"></selector>
    </group>

    <group title="use plain options">
      <selector value="C" title="Selector" :options="list1" @on-change="onChange"></selector>
    </group>

    <group title='multi selector'>
      <selector placeholder="请选择省份" title="省份" :options="list"></selector>
      <selector v-model="value2" title="省份" :options="list"></selector>
    </group>
  </div>
</template>

<script>
import { Selector, Group } from 'vux'

export default {
  components: {
    Group,
    Selector
  },
  data () {
    return {
      defaultValue: '',
      plainList: ['广东', '广西'],
      list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
      value1: '广西',
      value2: 'gd',
      list1: ['A', 'B', 'C']
    }
  },
  methods: {
    onChange (val) {
      console.log(val)
    }
  }
}
</script>

```
#### 文档

#### Github Issue
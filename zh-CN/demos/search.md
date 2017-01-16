---
nav: zh-CN
---


### Search_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fsearch"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/search" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <img src="../assets/demo/filter_bg.jpg" style="width: 100%">
    <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value"></search>
    <br>
    <group>
      <cell title="static position demo" is-link link="/component/search-static"></cell>
    </group>
  </div>
</template>

<script>
import { Search, Group, Cell } from 'vux'

export default {
  components: {
    Search,
    Group,
    Cell
  },
  methods: {
    resultClick (item) {
      window.alert('you click the result item: ' + JSON.stringify(item))
    },
    getResult (val) {
      this.results = val ? getResult(this.value) : []
    }
  },
  data () {
    return {
      results: [],
      value: ''
    }
  }
}

function getResult (val) {
  let rs = []
  for (let i = 0; i < 8; i++) {
    rs.push({
      title: `${val} result: ${i + 1} `,
      other: i
    })
  }
  return rs
}
</script>

```
#### 文档

#### Github Issue
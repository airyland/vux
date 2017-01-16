---
nav: zh-CN
---


### Loading_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Floading"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/loading" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show1" @on-change="show1change"></x-switch>
    </group>
    <loading v-model="show1" :text="text1"></loading>
  </div>
</template>



<script>
import { Loading, Group, XSwitch } from 'vux'

export default {
  components: {
    Loading,
    Group,
    XSwitch
  },
  data () {
    return {
      show1: false,
      text1: 'Processing'
    }
  },
  methods: {
    show1change (val) {
      if (val) {
        tick(0, (percent) => {
          if (percent === 100) {
            this.show1 = false
            this.text1 = 'Start processing'
            return
          }
          this.text1 = `${percent}% completed`
        })
      }
    }
  }
}

function tick (i, cb) {
  setTimeout(function () {
    i++
    cb(i)
    if (i < 100) {
      tick(i, cb)
    }
  }, 50)
}
</script>

```
#### 文档

#### Github Issue
---
nav: zh-CN
---


### Confirm_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fconfirm"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/confirm" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show"></x-switch>
    </group>
    <confirm v-model="show" :title="$t('confirm deleting the item')" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow" @on-hide="onHide">
      <p style="text-align:center;">{{ $t('Are you sure?') }}</p>
    </confirm>
  </div>
</template>



<script>
import { Confirm, Group, XSwitch } from 'vux'
export default {
  components: {
    Confirm,
    Group,
    XSwitch
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    onCancel () {
      console.log('on cancel')
    },
    onConfirm () {
      console.log('on confirm')
    },
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    }
  }
}
</script>
```
#### 文档

#### Github Issue
---
nav: zh-CN
---


### XSwitch_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-switch"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/x-switch" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group :title="$t('Basic Usage')">
      <x-switch :title="$t('default false')"></x-switch>
      <x-switch :title="$t('default true')" :inline-desc="value1 + ''" v-model="value1"></x-switch>
    </group>
    <group :title="$t('disabled')">
      <x-switch :title="$t('default false')" disabled></x-switch>
      <x-switch :title="$t('default true')" :value="true" disabled></x-switch>
    </group>
    <group :title="$t('html title')">
      <x-switch disabled :title="$t('switch red')"></x-switch>
    </group>
  </div>
</template>



<script>
import { XSwitch, Group } from 'vux'

export default {
  components: {
    XSwitch,
    Group
  },
  data () {
    return {
      value1: true
    }
  }
}
</script>

```
#### 文档

#### Github Issue
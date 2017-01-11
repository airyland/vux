---
nav: zh-CN
---


### XNumber_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-number"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/x-number" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group :title="$t('Default')">
      <x-number :name="$t('Quantity')" :title="$t('Quantity')"></x-number>
    </group>

    <group :title="$t('listen')">
      <x-number :title="$t('Quantity')" :value="0" :min="0" @on-change="change"></x-number>
    </group>

    <group :title="$t('set width=100px')">
      <x-number :title="$t('Quantity')" width="100px"></x-number>
    </group>

    <group :title="$t('set step=0.5')">
      <x-number :title="$t('Quantity')" :step="0.5"></x-number>
    </group>

    <group :title="$t('set value=1, min=-5 and max=8')">
      <x-number :title="$t('Quantity')" :min="-5" :max="8" :value="1"></x-number>
    </group>

    <group :title="$t('fillable = false')">
      <x-number :value="10" :title="$t('Quantity')" :fillable="false"></x-number>
    </group>
    
    <group :title="$t('use with other group elements')">
      <x-number :title="$t('Quantity')" :min="-5" :max="8" :value="1" type="inline"></x-number>
      <x-number :title="$t('Quantity')" :min="-5" :max="8" :value="1" type="inline"></x-number>
      <x-switch :title="$t('Switch Component')" :value.sync="true"></x-switch>
    </group>
  </div>
</template>



<script>
import { Group, XNumber, XSwitch } from 'vux'

export default {
  components: {
    XNumber,
    Group,
    XSwitch
  },
  methods: {
    change (val) {
      console.log('change', val)
    }
  }
}
</script>

```
#### 文档

#### Github Issue
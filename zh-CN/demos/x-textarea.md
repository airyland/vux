---
nav: zh-CN
---


### XTextarea_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-textarea"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/x-textarea" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group title="textarea">
      <x-textarea :max="20" placeholder="请填写详细信息"></x-textarea>
    </group>
    <group title="和input一起使用">
      <x-input placeholder="标题"></x-input>
      <x-textarea :max="200" name="description" placeholder="描述"></x-textarea>
    </group>
    <group title="不显示计数器">
      <x-textarea :max="200" name="detail" placeholder="请填写详细信息" :show-counter="false"></x-textarea>
    </group>
    <group title="set height=200">
      <x-textarea :max="200" placeholder="请填写详细信息" :show-counter="false" :height="200" :rows="8" :cols="30"></x-textarea>
    </group>
    <group title="autosize">
      <x-textarea placeholder="Type something" :show-counter="false" :rows="1" ref="autosize"></x-textarea>
    </group>
  </div>
</template>

<script>
import { XTextarea, Group, XInput } from 'vux'
import Autosize from 'autosize'

export default {
  components: {
    XTextarea,
    Group,
    XInput
  },
  mounted () {
    Autosize(this.$refs.autosize.$refs.textarea)
  },
  beforeDestroy () {
    Autosize.destroy(this.$refs.autosize.$refs.textarea)
  }
}
</script>

```
#### 文档

#### Github Issue
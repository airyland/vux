---
nav: zh-CN
---


### XButton_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-button"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/x-button" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <divider>default</divider>
    <box gap="10px 10px">
      <x-button>submit</x-button>
      <x-button type="primary">primary</x-button>
      <x-button type="warn">Delete</x-button>
      
      <divider>mini</divider>
      <x-button mini>submit</x-button>
      <x-button mini type="primary">primary</x-button>
      <x-button mini type="warn">Delete</x-button>
      <br>
      <x-button mini plain>submit</x-button>
      <x-button mini plain type="primary">primary</x-button>

      <divider>plain</divider>
      <x-button plain>submit</x-button>
      <x-button plain type="primary">primary</x-button>
      
      <divider>disabled</divider>
      <x-button disabled>disable submit</x-button>
      <x-button type="primary" disabled>disable primary</x-button>
      <x-button type="warn" disabled>disable Delete</x-button>

      <divider>use :text and :disabled</divider>
      <x-button :text="submit001" :disabled="disable001" @click.native="processButton001" type="primary"></x-button>

      <divider>combined with flexbox</divider>
      <flexbox>
        <flexbox-item>
          <x-button type="primary">primary</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn">Delete</x-button>
        </flexbox-item>
      </flexbox>
      <divider>combined with flexbox</divider>
      <flexbox>
        <flexbox-item>
          <x-button type="default">default</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary">primary</x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button type="warn">Delete</x-button>
        </flexbox-item>
      </flexbox>

    </box>

  </div>
</template>

<script>
import { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider } from 'vux'

export default {
  components: {
    XButton,
    Box,
    GroupTitle,
    Group,
    Flexbox,
    FlexboxItem,
    Divider
  },
  methods: {
    change (value) {
      console.log('change:', value)
    },
    processButton001 () {
      this.submit001 = 'processing'
      this.disable001 = true
    }
  },
  data () {
    return {
      submit001: 'click me',
      disable001: false
    }
  }
}
</script>


```
#### 文档

#### Github Issue
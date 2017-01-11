---
nav: zh-CN
---


### Step_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fstep"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/step" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div style="width: 95%;margin: 0 auto;">
    <br>
    <div>
      <step v-model="step1" background-color='#fbf9fe'>
        <step-item title="步骤1" description="step 1"></step-item>
        <step-item title="步骤2" description="step 2"></step-item>
        <step-item title="步骤3" description="step 3"></step-item>
      </step>
    </div>
    <divider>切换到下一步</divider>
    <div>
      <step v-model="step2" background-color='#fbf9fe' gutter="20px">
        <step-item title="已完成"></step-item>
        <step-item title="进行中"></step-item>
        <step-item title="待完成"></step-item>
      </step>
      <div class="btn_wrap">
        <x-button type="primary" @click.native="nextStep">下一步</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Step, StepItem, XButton, Divider } from 'vux'

export default {
  components: {
    Step,
    StepItem,
    XButton,
    Divider
  },
  data () {
    return {
      step1: 1,
      step2: 0
    }
  },
  methods: {
    nextStep () {
      this.step2 ++
    }
  }
}
</script>

<style>
.btn_wrap {
  padding: 0 1rem;
  margin-top: 2rem;
}
</style>

```
#### 文档

#### Github Issue
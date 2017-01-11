---
nav: zh-CN
---


### Toast_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Ftoast"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/toast" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>
    <group>
      <x-switch :title="$t('Basic Usage')" v-model="show1"></x-switch>
      <x-switch :title="$t('type:text')" v-model="show2"></x-switch>
      <x-switch :title="$t('type:cancel')" v-model="show3"></x-switch>
      <x-switch :title="$t('type:warn')" v-model="show4"></x-switch>
      <x-switch :title="$t('time:1s')" v-model="show5"></x-switch>
      <x-switch :title="$t('long text')" v-model="show6"></x-switch>
    </group>
    <toast v-model="show1" @on-hide="onHide">{{ $t('Basic Usage') }}</toast>
    <toast v-model="show2" type="text">{{$t('success')}}</toast>
    <toast v-model="show3" type="cancel">{{$t('type:cancel')}}</toast>
    <toast v-model="show4" type="warn">{{$t('type:warn')}}</toast>
    <toast v-model="show5" :time="1000">{{$t('time:1s')}}</toast>
    <toast v-model="show6" type="text" width="20em">{{$t('show me code')}}</toast>
    <group :title="$t('prop:text')">
      <x-switch :title="$t('type:success')" v-model="show7"></x-switch>
      <x-switch :title="$t('type:text')" v-model="show8"></x-switch>
    </group>
    <toast v-model="show7" text="Hello World"></toast>
    <toast v-model="show8" type="text" text="Hello World"></toast>
    <group :title="$t('As a plugin(>=v0.1.3)')">
      <x-switch :title="$t('default')" v-model="show9" @on-change="onChange"></x-switch>
    </group>
  </div>
</template>



<script>
import { Toast, Group, XSwitch } from 'vux'
export default {
  components: {
    Toast,
    Group,
    XSwitch
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    onChange (val) {
      const _this = this
      if (val) {
        this.$vux.toast.show({
          text: 'Hello World',
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
            _this.show9 = false
          }
        })
      } else {
        this.$vux.toast.hide()
      }
    }
  },
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false
    }
  }
}
</script>

```
#### 文档

#### Github Issue
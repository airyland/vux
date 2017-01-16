---
nav: zh-CN
---


### XInput_COM

<img width="100" src="http://qr.topscan.com/api.php?text=http%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Fx-input"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="http://vux.li/demos/v2/#/component/x-input" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
<template>
  <div>

    <group title="禁用内置验证及显示成功或者错误样式">
      <x-input title="禁用验证" placeholder="I'm placeholder" novalidate :icon-type="iconType" :show-clear="false"></x-input>
    </group>
    <br>
    <x-button @click.native="iconType = 'success'"> set success</x-button>
    <x-button @click.native="iconType = 'error'"> set error</x-button>
    <x-button @click.native="iconType = ''"> set empty</x-button>

    <group title="is-type传入function">
      <x-input title="必须输入2333" :is-type="be2333" placeholder="I'm placeholder"></x-input>
    </group>

    <group title="html title">
      <x-input :title='`<span style="${style}">hello</span>`' placeholder="I'm placeholder"></x-input>
    </group>
    <x-button @click.native="style = 'color:red;'">set red</x-button>
    <x-button @click.native="style = 'color:green'">set green</x-button>
    <x-button @click.native="style = 'color:#000'">set default</x-button>

    <group title="Default">
      <x-input title="message" placeholder="I'm placeholder"></x-input>
    </group>

    <group title="不显示清除按钮">
      <x-input title="message" required placeholder="I'm placeholder" :show-clear="false" autocapitalize="characters"></x-input>
    </group>

    <group title="set is-type=china-name">
      <x-input title="姓名" name="username" placeholder="请输入姓名" is-type="china-name"></x-input>
    </group>

    <group title="set keyboard=number and is-type=china-mobile">
      <x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>

    <group title="set is-type=email">
      <x-input title="邮箱" name="email" placeholder="请输入邮箱地址" is-type="email"></x-input>
    </group>

    <group title="set min=2 and max=5">
      <x-input title="2-5个字符" placeholder="" :min="2" :max="5"></x-input>
    </group>

    <group title="确认输入">
      <x-input title="请输入6位数字" type="text" placeholder="" v-model="password" :min="6" :max="6" @on-change="change"></x-input>
      <x-input title="请确认6位数字" v-model="password2" type="text" placeholder="" :equal-with="password"></x-input>
    </group>

    <group title="验证码" class="weui_cells_form">
      <x-input title="验证码" class="weui_vcode">
        <img slot="right" src="http://weui.github.io/weui/images/vcode.jpg">
      </x-input>
      <x-input title="发送验证码" class="weui_vcode">
        <x-button slot="right" type="primary">发送验证码</x-button>
      </x-input>
    </group>

    <group title="check if value is valid when required===true">
      <x-input title="message" placeholder="I'm placeholder" ref="input01" required></x-input>
      <cell title="click to get valid value" :value="'$valid value:' + valid1" @click.native="getValid1"></cell>
    </group>

     <group title="check if value is valid when required===false">
      <x-input title="message" placeholder="I'm placeholder" :required="false" ref="input02" @click.native="getValid2"></x-input>
      <cell title="click to get valid value" :value="'$valid value:' + valid2" @click.native="getValid2"></cell>
    </group>

  </div>
</template>

<script>
import { XInput, Group, XButton, Cell } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data () {
    return {
      password: '123465',
      password2: '',
      valid1: false,
      valid2: false,
      iconType: '',
      be2333: function (value) {
        return {
          valid: value === '2333',
          msg: 'Must be 2333'
        }
      },
      style: ''
    }
  },
  methods: {
    getValid1 () {
      this.valid1 = this.$refs.input01.valid
    },
    getValid2 () {
      this.valid2 = this.$refs.input02.valid
    },
    change (val) {
      console.log(val)
    }
  }
}
</script>
<style scoped>
.weui_cell_ft .weui_btn {
  margin-left: 5px;
  vertical-align: middle;
  display: inline-block;
}
.red {
  color: red;
}
.green {
  color: green;
}
</style>

```
#### 文档

#### Github Issue
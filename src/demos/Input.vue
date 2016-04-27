<template>
  <div>

    <group title="Default">
      <x-input title="message" placeholder="I'm placeholder"></x-input>
    </group>

    <group title="不显示清除按钮">
      <x-input title="message" placeholder="I'm placeholder" :show-clear="false"></x-input>
    </group>

    <group title="set is-type=china-name">
      <x-input title="姓名" placeholder="请输入姓名" is-type="china-name"></x-input>
    </group>

    <group title="set keyboard=number and is-type=china-mobile">
      <x-input title="手机号码" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
    </group>

    <group title="set is-type=email">
      <x-input title="邮箱" placeholder="请输入邮箱地址" is-type="email"></x-input>
    </group>

    <group title="set min=2 and max=5">
      <x-input title="2-5个字符" placeholder="" :min="2" :max="5"></x-input>
    </group>

    <group title="确认输入">
      <x-input title="请输入6位数字" type="text" placeholder="" :value.sync="password" :min="6" :max="6" @on-change="change"></x-input>
      <x-input title="请确认6位数字" type="text" placeholder="" :equal-with="password"></x-input>
    </group>

    <group title="验证码" class="weui_cells_form">
      <x-input title="验证码" class="weui_vcode">
        <img slot="right" src="http://weui.github.io/weui/images/vcode.jpg">
      </x-input>
      <x-input title="发送验证码" class="weui_vcode">
        <x-button slot="right" type="primary">发送验证码</x-button>
      </x-input>
    </group>

  </div>
</template>

<script>
import { XInput, Group, XButton } from '../components/'

export default {
  components: {
    XInput,
    XButton,
    Group
  },
  data: function () {
    return {
      password: '123465'
    }
  },
  methods: {
    change: function (val) {
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
</style>

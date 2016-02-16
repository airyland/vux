<template>
  <div>

    <group title="Default">
      <x-input title="message" placeholder="I'am placeholder"></x-input>
    </group>

    <group title="set is_type=china_name">
      <x-input title="姓名" placeholder="请输入姓名" is_type="china_name"></x-input>
    </group>

    <group title="set keyboard=number and is_type=china_mobile">
      <x-input title="手机号码" placeholder="请输入手机号码" keyboard="number" is_type="china_mobile"></x-input>
    </group>

    <group title="set is_type=email">
      <x-input title="邮箱" placeholder="请输入邮箱地址" is_type="email"></x-input>
    </group>

    <group title="set is_type=url">
      <x-input title="地址" placeholder="请输入URL地址" is_type="url"></x-input>
    </group>

    <group title="set is_type=ip">
      <x-input title="ip地址" placeholder="请输入ip地址" is_type="ip"></x-input>
    </group>


    <group title="set min=2 and max=5">
      <x-input title="2-5个字符" placeholder="" :min=2 :max=5></x-input>
    </group>

  </div>
</template>

<script>
  import XInput from '../components/Input'
  import Group from '../components/Group'
  export default {
    components: {
      XInput,
      Group
    }
  }
</script>
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

<i18n>
Default:
  zh-CN: 默认
Quantity:
  zh-CN: 数量
listen:
  en: listen to on-change events (printed on console)
  zh-CN: 监听 on-change 事件，在调试窗口中输出
set width=100px:
  zh-CN: 设置宽度为100px
set step=0.5:
  zh-CN: 设置步长为0.5
set value=1, min=-5 and max=8:
  zh-CN: 设置值为1，最小值为-5，最大值为8
fillable = false:
  zh-CN: 设置不可输入
use with other group elements:
  zh-CN: 和其他group子元素一起使用
Switch Component:
  zh-CN: Switch 组件
</i18n>

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

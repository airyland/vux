<template>
  <div>
    <group label-width="4em" label-margin-right="2em" label-align="right">
      <x-input title="上报人" v-model="value1"></x-input>
      <x-input title="图标" placeholder="I'm placeholder">
        <img slot="restricted-label" style="display:inline-block;vertical-align:middle;" src="http://dn-placeholder.qbox.me/110x110/FF2D55/000" width="24" height="24">
      </x-input>
      <selector title="隐患类别" :options="['工艺技术', '其他']" v-model="value2"></selector>
      <selector title="隐患类别" placeholder="Placeholder" :options="['工艺技术', '其他']" v-model="value7"></selector>
      <selector title="隐患类别" :options="['工艺技术', '其他']" v-model="value8"></selector>
      <x-input title="隐患部位" placeholder="必填" v-model="value3"></x-input>
      <x-input title="密码" type="password" placeholder="必填" v-model="value4"></x-input>
      <popup-picker title="请选择" :data="list" v-model="value5" value-text-align="left"></popup-picker>
      <popup-picker title="请选择" placeholder="Required" :data="list" v-model="value6" value-text-align="left"></popup-picker>
       <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XInput, Selector, PopupPicker, ChinaAddressData, XAddress } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XInput,
    Selector,
    PopupPicker,
    XAddress
  },
  data () {
    return {
      addressData: ChinaAddressData,
      addressValue: ['广东省', '深圳市', '南山区'],
      value1: '张三',
      value2: '工艺技术',
      value3: '',
      value7: '',
      value8: '',
      value4: '',
      value5: ['A'],
      value6: [],
      list: [['A', 'B', 'C']]
    }
  }
}
</script>

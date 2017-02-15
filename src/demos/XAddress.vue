<template>
  <div>
    <group>
      <x-address @on-hide="logHide" @on-show="logShow" :title="title" v-model="value" :list="addressData" placeholder="请选择地址" inline-desc="可以设置placeholder"></x-address>
      <cell title="上面value值" :value="value"></cell>
    </group>
    <br>
    <group label-width="4em" label-align="left">
      <x-address :title="title2" v-model="value2" raw-value :list="addressData" value-text-align="left"></x-address>
    </group>
    <br/>
    <div style="padding: 0 15px;">
      <x-button type="primary" @click.native="changeData">改变数据</x-button>
    </div>
    <br/>

    <group>
      <x-address title="二级省市" v-model="value3" raw-value :list="addressData"></x-address>
    </group>
    <group>
      <x-address title="只显示省市" v-model="value4" raw-value :list="addressData" hide-district></x-address>
      <cell title="value值" :value="value4"></cell>
      <cell title="转换成文字值" :value="getName(value4)"></cell>
    </group>

    <br/>
    <group title="错误的地址将不能正确渲染到相应位置">
      <x-address title="错误的值" v-model="value5" raw-value :list="addressData" inline-desc="广东省, 深圳 市, 南山区"></x-address>
    </group>
  </div>
</template>

<script>
import { Group, XAddress, ChinaAddressData, XButton, Cell, Value2nameFilter as value2name } from 'vux'

export default {
  components: {
    Group,
    XAddress,
    XButton,
    Cell
  },
  data () {
    return {
      title: '默认为空',
      value: [],
      title2: '设置值',
      value2: ['广东省', '深圳市', '南山区'],
      value3: ['广东省', '中山市', '--'],
      addressData: ChinaAddressData,
      value4: [],
      value5: ['广东省', '深圳 市', '南山区']
    }
  },
  methods: {
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    },
    getName (value) {
      return value2name(value, ChinaAddressData)
    },
    logHide (str) {
      console.log('on-hide', str)
    },
    logShow (str) {
      console.log('on-show')
    }
  }
}
</script>

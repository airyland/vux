<template>
  <div>
    <group>
      <address :title="title" :value.sync="value" :list="addressData" placeholder="请选择地址" inline-desc="可以设置placeholder"></address>
      <cell title="上面value值" :value="value | json"></cell>
      <address :title="title2" :value.sync="value2" raw-value :list="addressData"></address>
      <address title="二级省市" :value.sync="value3" raw-value :list="addressData"></address>
    </group>
    <br/>
    <x-button type="primary" @click="changeData">改变数据</x-button>
    <br/>
    <group>
      <address title="只显示省市" :value.sync="value4" raw-value :list="addressData" hide-district></address>
    </group>
  </div>
</template>

<script>
import { Group, Address, AddressChinaData, XButton, Cell } from '../components'

export default {
  components: {
    Group,
    Address,
    XButton,
    Cell
  },
  data () {
    return {
      title: '默认为空',
      value: [],
      title2: '手动设定',
      value2: ['广东省', '深圳市', '南山区'],
      value3: ['海南省', '儋州市', '--'],
      addressData: AddressChinaData,
      value4: []
    }
  },
  methods: {
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    }
  }
}
</script>

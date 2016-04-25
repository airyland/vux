<template>
  <div>
    <group>
      <address :title="title" :value.sync="value" :list="addressData"></address>
      <address :title="title2" :value.sync="value2" raw-value :list="addressData"></address>
      <address title="二级省市" :value.sync="value3" raw-value :list="addressData"></address>
    </group>
    <br/>
    <x-button type="primary" @click="changeData">改变数据</x-button>
  </div>
</template>

<script>
import { Group, Address, AddressChinaData, XButton } from '../components/'

export default {
  components: {
    Group,
    Address,
    XButton
  },
  data () {
    return {
      title: '默认为北京',
      value: [],
      title2: '手动设定',
      value2: ['广东省', '深圳市', '南山区'],
      value3: ['海南省', '儋州市', '--'],
      addressData: AddressChinaData
    }
  },
  methods: {
    changeData: function () {
      this.value2 = ['430000', '430400', '430407']
    }
  }
}
</script>

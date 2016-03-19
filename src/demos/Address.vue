<template>
  <div>
    <group>
      <address :title="title" :value.sync="value" :list="addressData"></address>
      <address :title="title2" :value.sync="value2" raw-value :list="addressData"></address>
    </group>
  </div>
</template>

<script>
import { Group, Address, AddressChinaData } from '../components/'

export default {
  components: {
    Group,
    Address
  },
  data () {
    return {
      title: '默认为北京',
      value: [],
      title2: '手动设定',
      value2: ['广东省', '深圳市', '南山区'],
      addressData: AddressChinaData
    }
  }
}
</script>
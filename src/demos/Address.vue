<template>
  <div>
    <group>
      <address @on-hide="logHide" @on-show="logShow" :title="title" :value.sync="value" :list="addressData" placeholder="请选择地址" inline-desc="可以设置placeholder"></address>
      <cell title="上面value值" :value="value | json"></cell>
      <address :title="title2" :value.sync="value2" raw-value :list="addressData"></address>
      <address title="二级省市" :value.sync="value3" raw-value :list="addressData"></address>
    </group>
    <br/>
    <x-button type="primary" @click="changeData">改变数据</x-button>
    <br/>
    <group>
      <address title="只显示省市" :value.sync="value4" raw-value :list="addressData" hide-district></address>
      <cell title="value值" :value="value4 | json"></cell>
      <cell title="转换成文字值" :value="getName(value4)"></cell>
    </group>

    <br/>
    <group title="错误的地址将不能正确渲染">
      <address title="广东省, 深圳 市, 南山区" :value.sync="value5" raw-value :list="addressData"></address>
    </group>
  </div>
</template>

<script>
import { Group, Address, AddressChinaData, XButton, Cell } from '../components'
import value2name from '../filters/value2name'

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
      value4: [],
      value5: ['广东省', '深圳 市', '南山区']
    }
  },
  methods: {
    changeData () {
      this.value2 = ['430000', '430400', '430407']
    },
    getName (value) {
      return value2name(value, AddressChinaData)
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

<template>
  <div>
    <group title="single column">
      <popup-picker :title="title1" :data="list1" :value.sync="value1"></popup-picker>
    </group>
    <br>
    <div class="picker-buttons">
      <x-button type="primary" @click="changeList10">重新赋值列表</x-button>
      <x-button type="primary" @click="changeList11">push方式更改列表</x-button>
    </div>
    <group title="double columns">
      <popup-picker :title="title2" :data="list2" :value.sync="value2"></popup-picker>
    </group>
    <br>

    <group title="chained columns">
      <popup-picker :title="title3" :data="list3" :columns="3" :value.sync="value3"></popup-picker>
      <popup-picker :title="title4" :data="list3" :columns="3" :value.sync="value4" show-name></popup-picker>
    </group>

    <br>
    <div class="picker-buttons">
      <x-button type="primary" @click="changeList21">push方式更改列表</x-button>
    </div>

  </div>
</template>

<script>
import { PopupPicker, Group, Picker, XButton } from '../components'

export default {
  components: {
    PopupPicker,
    Group,
    Picker,
    XButton
  },
  methods: {
    changeList10 () {
      this.list1 = [['小米1', 'iPhone1', '华为1', '情怀1', '三星1', '其他1', '不告诉你1']]
    },
    changeList11 () {
      this.list1[0].push('我是push条目')
    },
    changeList20 () {

    },
    changeList21 () {
      this.list3.push({
        name: '美国002_007',
        value: '0007',
        parent: 'usa002'
      })
    }
  },
  data () {
    return {
      title1: '手机机型',
      title2: '详细机型',
      title3: '联动显示值',
      title4: '联动显示文字',
      list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
      list2: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']],
      list3: [{
        name: '中国',
        value: 'china',
        parent: 0
      }, {
        name: '美国',
        value: 'USA',
        parent: 0
      }, {
        name: '广东',
        value: 'china001',
        parent: 'china'
      }, {
        name: '广西',
        value: 'china002',
        parent: 'china'
      }, {
        name: '美国001',
        value: 'usa001',
        parent: 'USA'
      }, {
        name: '美国002',
        value: 'usa002',
        parent: 'USA'
      }, {
        name: '广州',
        value: 'gz',
        parent: 'china001'
      }, {
        name: '深圳',
        value: 'sz',
        parent: 'china001'
      }, {
        name: '广西001',
        value: 'gx001',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'gx002',
        parent: 'china002'
      }, {
        name: '美国001_001',
        value: '0003',
        parent: 'usa001'
      }, {
        name: '美国001_002',
        value: '0004',
        parent: 'usa001'
      }, {
        name: '美国002_001',
        value: '0005',
        parent: 'usa002'
      }, {
        name: '美国002_002',
        value: '0006',
        parent: 'usa002'
      }],
      value1: ['iPhone'],
      value2: ['iPhone', '华为3'],
      value3: [],
      value4: []
    }
  }
}
</script>

<style scoped>
.picker-buttons {
  margin: 0 15px;
}
</style>


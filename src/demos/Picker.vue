<template>
  <div>
    <group-title>默认，不设置默认值时选中第一个</group-title>
    <picker :data='years' :value.sync='year1' @on-change='change'></picker>
    <br>
    <group-title>异步加载及动态改变数据</group-title>
    <picker :data='years001' :value.sync='year001' @on-change='change'></picker>
    <br>
    <x-button type="primary" @click="changeValue([[1,3,5,7,9,11],[2,3,4,5],['a','b','c']])">Set Data1</x-button>
    <x-button type="primary" @click="changeValue([[1,3,5,7,9,11],[2,3,4,5]])">Set Data1</x-button>
    <x-button type="primary" @click="changeValue([[2,4,6,8,10,11]])">Set Data2</x-button>
    <br>
    <group-title>设置默认值时</group-title>
    <picker :data='years' :value.sync='year2' @on-change='change'></picker>
    <br>
    <group-title>双向绑定</group-title>
    <picker :data='years' :value.sync='year3' @on-change='change3'></picker>
    <select v-model='year5'>
      <option v-for='one in years[0]' value='{{one.value}}'>{{one.name}}</option>
    </select>
    <br>
    <group-title>非联动多列</group-title>
    <picker :data='years1' :value.sync='year4' @on-change='change'></picker>
    <br>
    <group-title>五列</group-title>
    <picker :data='year6' :value.sync='year6Value' @on-change='change'></picker>
    <br>
    <group-title>地区联动: 当前值{{year7Value}}</group-title>
    <picker :data='year7' :columns=3 :value.sync='year7Value' @on-change='change'></picker>
    <x-button @click="setData1" type="primary">set Value to ["USA", "usa002", "0005"]</x-button>
    <x-button @click="setData2" type="primary">set Value to ["china", "china002", "gz"]</x-button>
    <x-button @click="setList" type="primary">set List</x-button>
  </div>
</template>

<script>
import { Picker, GroupTitle, XButton } from '../components'

let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  ready () {},
  components: {
    Picker,
    GroupTitle,
    XButton
  },
  methods: {
    changeValue (value) {
      this.years001 = value
    },
    change (value) {
      console.log('new Value', value)
    },
    change3 (value) {
      this.year5 = value[0]
    },
    setData1 () {
      this.year7Value = ['USA', 'usa002', '0005']
    },
    setData2 () {
      this.year7Value = ['china', 'china002', 'gz']
    },
    setList () {
      this.year7.push({
        name: '美国002_003',
        value: '0007',
        parent: 'usa002'
      })
    }
  },
  computed: {},
  watch: {
    year5: {
      handler (val) {
        this.year3[0] = val
        this.year3.$set(0, val)
      },
      deep: true
    },
    change3 (value) {
      this.year5 = value[0]
    }
  },
  data () {
    return {
      years: [years],
      years001: [],
      year001: [''],
      years1: [years, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
      year1: [''],
      year2: ['2002'],
      year3: ['2005'],
      year4: ['2002', '4'],
      year5: ['2005'],
      year6: [
        ['你', '我', '他'],
        ['you', 'I', 'him'],
        ['ni', 'wo', 'ta'],
        [1, 2, 3, 4, 5],
        [5, 4, 3, 2, 1]
      ],
      year6Value: ['我', 'him', 'ni', '1', '2'],
      year7: [{
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
        value: 'gz',
        parent: 'china002'
      }, {
        name: '广西002',
        value: 'sz',
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
      year7Value: []
    }
  }
}
</script>

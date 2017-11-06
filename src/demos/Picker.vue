<template>
  <div>
    <group-title> {{ $t('Normal usage, the first one is selected without setting default value') }} {{year1}}</group-title>
    <picker :data='years' v-model='year1' @on-change='change'></picker>
    <br>
    <group-title> {{ $t('Asynchronous loading and dynamic change of data') }} </group-title>
    <picker :data='years001' v-model='year001' @on-change='change'></picker>
    <br>
    <group>
      <cell :title="$t('Current value')" :value="year001"></cell>
    </group>
    <x-button type="primary" @click.native="changeValue([['1','3','5','7','9','11'],['2','3','4','5'],['a','b','c']])"> {{ $t('Set Data 1') }} </x-button>
    <x-button type="primary" @click.native="changeValue([['1','3','5','7','9','11'],['2','3','4','5']])">{{ $t('Set Data 2') }} </x-button>
    <x-button type="primary" @click.native="changeValue([['2','4','6','8','10','11']])">{{ $t('Set Data 3') }} </x-button>
    <br>
    <group-title> {{ $t('With default value') }} </group-title>
    <picker :data='years' v-model='year2' @on-change='change'></picker>
    <br>
    <group-title> {{ $t('Two-way data binding') }} </group-title>
    <picker :data='years' v-model='year3' @on-change='change3'></picker>
    <select v-model='year5'>
      <option v-for='one in years[0]' :value='one.value'>{{one.name}}</option>
    </select>
    <br>
    <group-title> {{ $t('Multi cols in non chained-mode') }} </group-title>
    <picker :data='years1' v-model='year4' @on-change='change'></picker>
    <br>
    <group-title> {{ $t('Five columns') }} </group-title>
    <picker :data='year6' v-model='year6Value' @on-change='change'></picker>
    <br>
    <group-title>{{ $t('Locations in chained-mode') }}: {{ $t('Current value') }} {{year7Value}} <br> {{ $t('Text corresponding to the value') }}: {{$refs.picker1&&$refs.picker1.getNameValues()}}</group-title>
    <picker :data='year7' :columns=3 v-model='year7Value' @on-change='change' ref="picker1"></picker>
    <x-button @click.native="setData1" type="primary"> {{ $t('Set value to') }} ["USA", "usa002", "0005"]</x-button>
    <x-button @click.native="setData2" type="primary"> {{ $t('Set value to') }} ["china", "china002", "gz"]</x-button>
    <x-button @click.native="setList" type="primary">Set List</x-button>
    <br>
    <group-title> {{ $t('3 cols data but only show 2 cols') }} </group-title>
    <picker :data='year7' :fixed-columns="2" :columns=3 v-model='year8Value' @on-change='change'></picker>
  </div>
</template>

<i18n>
  'Normal usage, the first one is selected without setting default value':
    zh-CN: 默认，不设置默认值时选中第一个
  Asynchronous loading and dynamic change of data:
    zh-CN: 异步加载及动态改变数据
  Set data 1:
    zh-CN: 设置数值1
  Set data 2:
    zh-CN: 设置数值2
  Set data 3:
    zh-CN: 设置数值3
  With default value:
    zh-CN: 设置默认值时
  Two-way data binding:
    zh-CN: 双向绑定
  Multi cols in non chained-mode:
    zh-CN: 非联动多列
  Five columns:
    zh-CN: 五列
  Locations in chained-mode:
    zh-CN: 地区联动
  Text corresponding to the value:
    zh-CN: 选中值所对应的文字
  3 cols data but only show 2 cols:
    zh-CN: 3列的数据，只显示两列
</i18n>

<script>
import { Cell, Group, Picker, GroupTitle, XButton } from 'vux'

let years = []
for (var i = 2000; i <= 2030; i++) {
  years.push({
    name: i + '年',
    value: i + ''
  })
}
export default {
  components: {
    Picker,
    GroupTitle,
    XButton,
    Cell,
    Group
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
  watch: {
    year5: {
      handler (val) {
        this.year3[0] = val
        // this.year3.$set(0, val)
        this.$set(this.year3, 0, val)
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
      year001: [],
      years1: [years, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
      year1: [''],
      year2: ['2002'],
      year3: ['2005'],
      year4: ['2002', '4'],
      year5: '2005',
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
      year7Value: [],
      year8Value: []
    }
  }
}
</script>

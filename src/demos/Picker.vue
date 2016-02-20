<template>
<div>
  <group-title>联动</group-title>
  <picker :chain_data="year7" :value.sync="year7Value" @change="change"></picker>
  <br>
  <group-title>默认，不设置默认值时选中第一个</group-title>
  <picker :data="years" :value.sync="year1" @change="change"></picker>
  <br>
  <group-title>设置默认值时</group-title>
  <picker :data="years" :value.sync="year2" @change="change"></picker>
  <br>
  <group-title>双向绑定</group-title>
  <picker :data="years" :value.sync="year3" @change="change3"></picker>
  <select v-model="year5">
    <option v-for="one in years[0]" value="{{one.value}}">{{one.name}}</option>
  </select>
  <br>
  <group-title>多列</group-title>
  <picker :data="years1" :value.sync="year4" @change="change"></picker>
  <br>
  <group-title>五列</group-title>
  <picker :data="year6" :value.sync="year6Value" @change="change"></picker>
</div>
</template>

<script>
  import { Picker, GroupTitle } from '../components/'
  let years = [];
  for (var i = 2000; i <= 2030; i++) {
    years.push({
      name: i + '年',
      value: i + ''
    })
  }
  export default {
    ready () {
    },
    components: {
      Picker,
      GroupTitle
    },
    methods: {
      change: function (value) {
        console.log('new Value', value)
      },
      change3: function (value) {
        this.year5 = value[0]
      }
    },
    computed: {
    },
    data: function () {
      return {
        years: [years],
        years1: [years, [1,2,3,4,5,6,7,8,9,10,11,12]],
        year1: [''],
        year2: ['2002'],
        year3: ['2005'],
        year4: ['2002','4'],
        year5: ['2005'],
        year6: [['你','我','他'],['you','I','him'],['ni','wo','ta'],[1,2,3,4,5],[5,4,3,2,1]],
        year6Value: ['我','him','ni','1','2'],
        year7: {
          "0":['中国','美国'],
          "1":{
            "中国":["广东",'广西'],
            "美国":['美国001','美国002']
          },
          "2":{
            "广东":['深圳','广州'],
            "广西":['广西001','广西002'],
            "美国001":['美国0001','美国0002'],
            "美国002":['美国0003','美国0004']
          }       
        },
        year7Value: []
      }
    },
    watch: {
      year5: {
        handler: function (val) {
          this.year3[0] = val
          this.year3.$set(0,val)
        },
        deep: true
      },
      year3: {
        handler:function (val){
        this.year5 = val[0]
      },
      deep: true
    }
    }
  }
</script>
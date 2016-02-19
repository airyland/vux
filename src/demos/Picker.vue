<template>
<div>
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
        year6Value: ['我','him','ni','1','2']
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
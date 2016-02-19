<template>
<div>
  <group-title>默认，不设置默认值时选中第一个</group-title>
  <picker :data="years" :value.sync="year1" @change="change"></picker>
  <br>
  <group-title>多列</group-title>
  <picker :data="years1" :value.sync="year4" @change="change"></picker>
  <br>
  <group-title>设置默认值时</group-title>
  <picker :data="years" :value.sync="year2" @change="change"></picker>
  <br>
  <group-title>双向绑定</group-title>
  <picker :data="years" :value.sync="year3" @change="change"></picker>
  <select v-model="year3">
    <option v-for="one in years[0]" value="{{one.value}}">{{one.name}}</option>
  </select>
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
      }
    },
    data: function () {
      return {
        years: [years],
        years1: [years, years],
        year1: '',
        year2: '2002',
        year3: '2005',
        year4: ''
      }
    }
  }
</script>
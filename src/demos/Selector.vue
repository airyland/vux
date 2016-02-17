<template>
  <div>
    <group title="no placeholder">
      <selector title="省份" :options="list"></selector>
    </group>

    <group title="with placeholder">
      <selector placeholder="请选择省份" title="省份" :options="list" @change="change"></selector>
    </group>

    <group title="without title">
      <selector placeholder="请选择省份" :options="list"></selector>
    </group>
    
    <group title="set value=广西">
      <selector :selected.sync="selected1" :value.sync="value1" title="省份" :options="list"></selector>
    </group>

    <group title="readonly">
      <selector selected="广东" :readonly=true title="省份" :options="list"></selector>
    </group>

    <group title='multi selector'>
     <selector placeholder="请选择省份" title="省份" :options="list" type="inline"></selector>
     <selector selected="广西" title="省份" :options="list"></selector>
    </group>
  </div>
</template>

<script>
  import { Selector, Group } from '../components/'
  export default {
    components: {
      Group,
      Selector
    },
    data: function () {
      return {
        list: [{ text: '广东', value: 'gd'}, {text: '广西', value: 'gx'}],
        selected1: '广西',
        value1: ''
      }
    },
    methods: {
      change: function (val) {
        console.log(val)
      }
    }
  }
</script>
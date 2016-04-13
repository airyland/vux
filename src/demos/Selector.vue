<template>
  <div>
    <group :title="'no placeholder, the current value is : ' + defaultValue">
      <selector title="省份" :options="list" :value.sync="defaultValue"></selector>
    </group>

    <group title="with placeholder">
      <selector placeholder="请选择省份" title="省份" :options="list" @on-change="onChange"></selector>
    </group>

    <group title="without title">
      <selector placeholder="请选择省份" :options="list"></selector>
    </group>

    <group title="set value=广西">
      <selector :value.sync="value1" title="省份" :options="plainList" @on-change="onChange"></selector>
    </group>

    <group title="readonly, displays just like a cell">
      <selector value="gd" readonly title="省份" :options="list"></selector>
    </group>

    <group title="use plain options">
      <selector value="C" title="Selector" :options="list1" @on-change="onChange"></selector>
    </group>

    <group title='multi selector'>
      <selector placeholder="请选择省份" title="省份" :options="list"></selector>
      <selector :value.sync="value2" title="省份" :options="list"></selector>
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
      defaultValue: '',
      plainList: ['广东', '广西'],
      list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
      value1: '广西',
      value2: 'gd',
      list1: ['A', 'B', 'C']
    }
  },
  methods: {
    onChange: function (val) {
      console.log(val)
    }
  }
}
</script>

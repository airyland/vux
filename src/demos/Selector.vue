<template>
  <div>
    <group :title="'no placeholder, the current value is : ' + defaultValue">
      <selector title="省份" :options="list" v-model="defaultValue"></selector>
    </group>

    <group title="with placeholder">
      <selector placeholder="请选择省份" v-model="demo01" title="省份" name="district" :options="list" @on-change="onChange"></selector>
    </group>

    <group title="without title">
      <selector placeholder="请选择省份" v-model="demo02" :options="list"></selector>
    </group>

    <group title="set value=广西">
      <selector v-model="value1" title="省份" :options="plainList" @on-change="onChange"></selector>
    </group>

    <group title="readonly, displays just like a cell">
      <selector value="gd" readonly title="省份" :options="list"></selector>
    </group>

    <group title="use plain options">
      <selector value="C" title="Selector" :options="list1" @on-change="onChange"></selector>
    </group>

    <group title='multi selector'>
      <selector placeholder="请选择省份" title="省份" :options="list"></selector>
      <selector v-model="value2" title="省份" :options="list"></selector>
    </group>

    <group :title="'boolean selector: ' + value3">
      <selector v-model="value3" title="Vux Is Cool" :options="list2"></selector>
    </group>
  </div>
</template>

<script>
import { Selector, Group } from 'vux'

export default {
  components: {
    Group,
    Selector
  },
  data () {
    return {
      demo01: '',
      demo02: '',
      defaultValue: '',
      plainList: ['广东', '广西'],
      list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
      list2: [{key: true, value: '是'}, {key: false, value: '否'}],
      value1: '广西',
      value2: 'gd',
      value3: true,
      list1: ['A', 'B', 'C']
    }
  },
  methods: {
    onChange (val) {
      console.log(val)
    }
  }
}
</script>

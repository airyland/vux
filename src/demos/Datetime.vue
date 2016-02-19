<template>
<div>
  <group title="默认 YYYY-MM-DD">
    <datetime :value.sync="value1" @change="change" title="生日"></datetime>
  </group>

  <group title="YYYY-MM-DD HH:II">
    <datetime :value.sync="value2" format="YYYY-MM-DD HH:II" @change="change" title="开始时间" inline_desc="精确到分钟"></datetime>
  </group>

  <group title="可以直接通过value指定placeholder">
    <datetime :value.sync="value3" format="YYYY-MM-DD HH:II" @change="change" title="开始时间"></datetime>
  </group>

  <group title="指定最小，最大年份">
    <datetime :value.sync="value4" :min_year=2000 :max_year=2016 format="YYYY-MM-DD HH:II" @change="change" title="两千年后的时间"></datetime>
  </group>

</div>
</template>

<script>
import { Datetime, Group } from '../components/'
export default {
  ready () {
  },
  components: {
    Datetime,
    Group
  },
  data: function () {
    return {
      value1: '2016-02-11',
      value2: '',
      value3: '请选择',
      value4: '请选择'
    }
  },
  methods: {
    change: function (value) {
      console.log('change', value)
    }
  }
}
</script>

<style>

</style>
<template>
<div>
  <group title="default format: YYYY-MM-DD">
    <datetime :value.sync="value1" @change="change" title="Birthday"></datetime>
  </group>

  <group title="YYYY-MM-DD HH:II">
    <datetime :value.sync="value2" format="YYYY-MM-DD HH:II" @change="change" title="start time" inline-desc="select hour and minute"></datetime>
  </group>

  <group title="value as placeholder">
    <datetime :value.sync="value3" format="YYYY-MM-DD HH:II" @change="change" title="start time"></datetime>
  </group>

  <group title="specified min-year and max-year">
    <datetime :value.sync="value4" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:II" @change="change" title="years after 2000"></datetime>
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
      value3: 'please select',
      value4: 'please select'
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
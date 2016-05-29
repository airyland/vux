<template>
  <div>
    <group title="default format: YYYY-MM-DD">
      <datetime :value.sync="value1" @on-change="change" title="Birthday"></datetime>
    </group>

    <group title="YYYY-MM-DD HH:mm">
      <datetime :value.sync="value2" format="YYYY-MM-DD HH:mm" @on-change="change" title="start time" inline-desc="select hour and minute"></datetime>
    </group>

    <group title="value as placeholder">
      <datetime :value.sync="value3" format="YYYY-MM-DD HH:mm" @on-change="change" title="start time"></datetime>
    </group>

    <group title="specified min-year and max-year">
      <datetime :value.sync="value4" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" title="years after 2000"></datetime>
    </group>

    <group title="specified template text in Chinese">
      <datetime :value.sync="value5" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" @on-change="change" title="Chinese" year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
    </group>

  </div>
</template>

<script>
import { Datetime, Group } from '../components'

export default {
  components: {
    Datetime,
    Group
  },
  data () {
    return {
      value1: '2016-02-11',
      value2: '',
      value3: 'please select',
      value4: 'please select',
      value5: '请选择日期'
    }
  },
  methods: {
    change (value) {
      console.log('change', value)
    }
  }
}
</script>

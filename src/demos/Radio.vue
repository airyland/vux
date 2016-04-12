<template>
  <div>
    <group title="default">
      <radio :options="radio001" @on-change="change"></radio>
    </group>

    <group title="preselect 'China'">
      <radio :options="radio001" value="China"></radio>
    </group>

    <group :title="'fill mode value is '+radio001Value">
      <radio fill-mode :options="radio001" :value.sync="radio001Value" @on-change="change"></radio>
    </group>

    <group title="fill mode with custom placeholder and label">
      <radio fill-mode fill-label="Other" fill-placeholder="填写其他的哦" :options="radio001" @on-change="change"></radio>
    </group>

    <group title="object options">
      <radio fill-mode fill-label="Other" fill-placeholder="other" :options="radio003" @on-change="change"></radio>
    </group>
  </div>
</template>

<script>
import { Radio, Group, DevTip } from '../components/'

export default {
  components: {
    Radio,
    Group,
    DevTip
  },
  data: function () {
    return {
      radio001: [ 'China', 'Japan' ],
      radio001Value: 'China',
      radio002Value: 'Japan',
      radio003: [{
        key: '001',
        value: 'radio001'
      }, {
        key: '002',
        value: 'radio002'
      }]
    }
  },
  methods: {
    change: function (value) {
      console.log('change:', value)
    }
  }
}
</script>

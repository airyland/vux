<template>
  <div>
    <group title="English">
      <cell title="Default" primary="content">
        <calendar slot="value" :value.sync="demo1"></calendar>
      </cell>
      <cell title="select hours" primary="content">
        <calendar slot="value" :value.sync="demo2" hours></calendar>
      </cell>
      <cell title="disable past date" primary="content">
        <calendar slot="value" :value.sync="demo3" disable-past></calendar>
      </cell>
    </group>
    <group title="中文">
      <cell title="中文星期" primary="content">
        <calendar slot="value" :value.sync="demo4" :date-list="dateList" disable-past></calendar>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Calendar, Cell } from '../components/'

export default {
  components: {
    Calendar,
    Group,
    Cell
  },
  data () {
    return {
      demo1: 'Select date',
      demo2: 'date and hour',
      demo3: 'Select date',
      demo4: '请选择',
      dateList: ['日', '一', '二', '三', '四', '五', '六']
    }
  }
}
</script>

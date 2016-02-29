<template>
  <div>
    <group>
      <cell title="Default" primary="right">
        <calendar slot="value" :value.sync="demo1"></calendar>
      </cell>
      <cell title="select hours" primary="right">
        <calendar slot="value" :value.sync="demo2" hours></calendar>
      </cell>
      <cell title="disable past date" primary="right">
        <calendar slot="value" :value.sync="demo3" disable-past></calendar>
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
      demo3: 'Select date'
    }
  }
}
</script>
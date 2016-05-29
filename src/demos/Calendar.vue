<template>
  <div>
    <group title="default">
      <calendar :value.sync="demo1" title="Calendar" disable-past></calendar>
    </group>
    <group title="set value as TODAY">
      <calendar :value.sync="demo2" title="Calendar" disable-past></calendar>
    </group>
  </div>
</template>

<script>
import { Group, Calendar, Cell } from '../components'

export default {
  components: {
    Calendar,
    Group,
    Cell
  },
  data () {
    return {
      demo1: '',
      demo2: 'TODAY'
    }
  }
}
</script>

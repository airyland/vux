<template>
  <div>
    <span v-text="time1 | date-formatter 'YYYY-MM-DD'"></span>
    <br/>
    <span v-text="time2 | date-formatter 'YYYY-MM-DD HH:mm:ss'"></span>
  </div>
</template>

<script>
import { DateFormatter } from '../components'

export default {
  filters: {
    DateFormatter
  },
  data () {
    return {
      time1: new Date('2016/01/03 19:19:19'),
      time2: new Date('2016-01-03 09:09:09')
    }
  }
}
</script>
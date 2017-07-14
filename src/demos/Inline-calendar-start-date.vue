<template>
<div>
  <divider>set start-date as TODAY</divider>
  <inline-calendar
  start-date="TODAY"
  end-date="2017-06-18">
  </inline-calendar>
   <divider>set end-date as TODAY</divider>
  <inline-calendar
  end-date="TODAY">
  </inline-calendar>
  
</div>
</template>

<script>
import { InlineCalendar, Divider } from 'vux'

export default {
  data () {
    return {
    }
  },
  components: {
    InlineCalendar,
    Divider
  }
}
</script>


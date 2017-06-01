<template>
  <div>
    <inline-calendar>
      <template slot="each-day" scope="props">
        <span v-show="props.isShow">{{ getStr(props.child.day) }}</span>
      </template>
    </inline-calendar>
  </div>
</template>

<script>
import { InlineCalendar } from 'vux'

const listMap = {
  '8': '捌',
  '6': '陆',
  '9': '玖'
}
export default {
  components: {
    InlineCalendar
  },
  methods: {
    getStr (day) {
      return listMap[day] || day
    }
  }
}
</script>

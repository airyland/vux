<template>
  <div>
    <inline-calendar>
      <template slot="each-day" slot-scope="props"><!-- use scope="props" when vue < 2.5.0 -->
        <span v-show="props.isShow" :class="props.className">{{ props.date.date }}</span>
      </template>
    </inline-calendar>
  </div>
</template>

<script>
import { InlineCalendar } from 'vux'

export default {
  components: {
    InlineCalendar
  }
}
</script>

<template>
  <div>
    <v-chart :data="data">
      <v-scale x :tick-count="0" />
      <v-scale y :min="0" />
      <v-tooltip show-crosshairs show-x-value/>
      <v-area />
      <v-line />
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VScale, VAxis } from 'vux'

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VScale,
    VAxis
  },
  data () {
    return {
      data: [
        { time: 'Jan.', tem: 1000 },
        { time: 'Feb.', tem: 2200 },
        { time: 'Mar.', tem: 2000 },
        { time: 'Apr.', tem: 2600 },
        { time: 'May.', tem: 2000 },
        { time: 'Jun.', tem: 2600 },
        { time: 'Jul.', tem: 2800 },
        { time: 'Aug.', tem: 2000 }
      ]
    }
  }
}
</script>

<demo>
title: 基础面积图
</demo>
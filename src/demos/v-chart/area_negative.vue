<template>
  <div>
    <v-chart
      :data="data">
      <v-scale x :tick-count="0" />
      <v-scale y :nice="false" :min="-100" :max="100" />
      <v-tooltip />
      <v-area />
      <v-line />
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VScale } from 'vux'

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VScale
  },
  data () {
    return {
      tooltip: {
        showItemMarker: false,
        onShow (ev) {
          const { items } = ev
          items[0].name = items[0].title
        }
      },
      data: [
        { month: 'Jan.', value: 6.06 },
        { month: 'Feb.', value: 82.2 },
        { month: 'Mar.', value: -22.11 },
        { month: 'Apr.', value: 21.53 },
        { month: 'May.', value: -21.74 },
        { month: 'Jun.', value: 73.61 },
        { month: 'Jul.', value: 53.75 },
        { month: 'Aug.', value: 60.32 }
      ]
    }
  }
}
</script>

<demo>
title: 带负值面积图
</demo>

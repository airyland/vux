<template>
  <div>
    <v-chart
      :data="data">
      <v-scale x type="timeCat" :tick-count="3" />
      <v-scale y :min="0"/>
      <v-area :colors="gradient" shape="smooth" />
      <v-line :colors="gradient" shape="smooth" />
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
      gradient: [
        [0, '#FE6384'],
        [1, '#f7f7f7']
      ],
      data: [
        { time: '2016-08-08 00:00:00', tem: 10 },
        { time: '2016-08-08 00:10:00', tem: 22 },
        { time: '2016-08-08 00:30:00', tem: 16 },
        { time: '2016-08-09 00:35:00', tem: 26 },
        { time: '2016-08-09 01:00:00', tem: 12 },
        { time: '2016-08-09 01:20:00', tem: 26 },
        { time: '2016-08-10 01:40:00', tem: 18 },
        { time: '2016-08-10 02:00:00', tem: 26 },
        { time: '2016-08-10 02:20:00', tem: 12 }
      ]
    }
  }
}
</script>

<demo>
title: 渐变填充面积图
</demo>

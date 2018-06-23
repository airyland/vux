<template>
  <div>
    <v-chart ref="demo" :data="data">
      <v-scale x field="月份" />
      <v-scale y field="月均降雨量" />
      <v-bar series-field="name" adjust="stack" />
      <v-tooltip show-value-in-legend />
    </v-chart>

    <x-button type="primary" plain @click.native="$refs.demo.rerender()">rerender</x-button>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton, VScale } from 'vux'

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    VScale
  },
  data () {
    return {
      data: [
        { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
        { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
        { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
        { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
        { name: 'London', 月份: 'May.', 月均降雨量: 47 },
        { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
        { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
        { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
        { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
        { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
        { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
        { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
        { name: 'Berlin', 月份: 'May.', 月均降雨量: 52.6 },
        { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
        { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
        { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 }
      ]
    }
  }
}
</script>

<demo>
title: 层叠柱状图
</demo>

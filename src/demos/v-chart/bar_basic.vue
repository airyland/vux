<template>
  <div>
    <v-chart
      ref="demo"
      :data="data">
      <v-bar />
      <v-tooltip :show-item-marker="false" />
    </v-chart>

    <x-button type="primary" plain @click.native="$refs.demo.rerender()">rerender</x-button>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, XButton } from 'vux'

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton
  },
  data () {
    return {
      data: [
        { year: '1951 年', sales: 38 },
        { year: '1952 年', sales: 52 },
        { year: '1956 年', sales: 61 },
        { year: '1957 年', sales: 145 },
        { year: '1958 年', sales: 48 },
        { year: '1959 年', sales: 38 },
        { year: '1960 年', sales: 38 },
        { year: '1962 年', sales: 38 }
      ]
    }
  }
}
</script>

<demo>
title: 基础柱状图
</demo>

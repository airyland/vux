<template>
  <div>
    <v-chart ref="demo" :data="data">
      <v-scale x field="year" />
      <v-scale y field="percent" :min="0" :max="0.5" :formatter="formatter" />
      <v-bar series-field="country" adjust="stack" />
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
      formatter: function (val) {
        return (val * 100).toFixed(0) + '%'
      },
      data: [
        { country: 'Europe', year: '1750', value: 163, percent: 0.24511278195488723 },
        { country: 'Asia', year: '1750', value: 502, percent: 0.7548872180451128 },
        { country: 'Europe', year: '1800', value: 203, percent: 0.24224343675417662 },
        { country: 'Asia', year: '1800', value: 635, percent: 0.7577565632458234 },
        { country: 'Europe', year: '1850', value: 276, percent: 0.2543778801843318 },
        { country: 'Asia', year: '1850', value: 809, percent: 0.7456221198156682 },
        { country: 'Europe', year: '1900', value: 408, percent: 0.3011070110701107 },
        { country: 'Asia', year: '1900', value: 947, percent: 0.6988929889298893 },
        { country: 'Europe', year: '1950', value: 547, percent: 0.2806567470497691 },
        { country: 'Asia', year: '1950', value: 1402, percent: 0.7193432529502309 },
        { country: 'Europe', year: '1999', value: 729, percent: 0.16708686683474674 },
        { country: 'Asia', year: '1999', value: 3634, percent: 0.8329131331652533 },
        { country: 'Europe', year: '2050', value: 628, percent: 0.10651289009497965 },
        { country: 'Asia', year: '2050', value: 5268, percent: 0.8934871099050203 },
        { country: 'Europe', year: '2100', value: 828, percent: 0.10227272727272728 },
        { country: 'Asia', year: '2100', value: 7268, percent: 0.8977272727272727 }
      ]
    }
  }
}
</script>

<demo>
title: 百分比柱状图
</demo>

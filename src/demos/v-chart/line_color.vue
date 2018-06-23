<template>
  <div>
    <v-chart :data="data">
      <v-line series-field="type" />
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VAxis, VTooltip } from 'vux'

/*
* [
*   {"date":"2010-01-10","type":"能源","value":99.9},
*   {"date":"2010-01-10","type":"金属","value":96.6}
* ]
*/
import data from './line_color.json'

export default {
  components: {
    VChart,
    VLine,
    VAxis,
    VTooltip
  },
  data () {
    return {
      data
    }
  }
}
</script>

<demo>
order: 1
title: 折线图:对比
</demo>
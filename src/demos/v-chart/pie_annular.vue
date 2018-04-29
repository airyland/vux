<template>
  <div>
    <v-chart
      :data="data"
      :padding="[20, 'auto']">
      <v-tooltip disabled />
      <v-scale y :options="yOptions" />
      <v-pie :radius="0.85" :inner-radius="0.7" series-field="name" :colors="['#FE5D4D','#3BA4FF','#737DDE']" />
      <v-legend :options="legendOptions" />
      <v-guide type="html" :options="htmlOptions" />
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VPie, VGuide, VScale } from 'vux'

const data = [
  { name: '股票类', percent: 83.59, a: '1' },
  { name: '债券类', percent: 2.17, a: '1' },
  { name: '现金类', percent: 14.24, a: '1' }
]

const map = {}
data.map(obj => {
  map[obj.name] = obj.percent + '%'
})

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    VPie,
    VGuide,
    VScale
  },
  data () {
    return {
      map,
      htmlOptions: {
        position: [ '50%', '45%' ],
        html: `
          <div style="width: 250px;height: 40px;text-align: center;">
            <div style="font-size: 16px">总资产</div>
            <div style="font-size: 24px">133.08 亿</div>
          </div>`
      },
      legendOptions: {
        position: 'right',
        itemFormatter (val) {
          return val + '  ' + map[val]
        }
      },
      yOptions: {
        formatter (val) {
          return val * 100 + '%'
        }
      },
      data
    }
  }
}
</script>

<demo>
title: '环图: 资产配置'
</demo>

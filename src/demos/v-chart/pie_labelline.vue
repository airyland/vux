<template>
  <div>
    <v-chart :data="data">
      <v-labelline-pie :radius="0.75" series-field="name" />
      <v-pielabel :options="options"></v-pielabel>
    </v-chart>
  </div>
</template>

<script>
import { VChart, VLine, VArea, VTooltip, VLegend, VBar, VLabellinePie, VScale, VPielabel } from 'vux'

const map = {
  '芳华': '40%',
  '妖猫传': '20%',
  '机器之血': '18%',
  '心理罪': '15%',
  '寻梦环游记': '5%',
  '其他': '2%'
}

export default {
  components: {
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    VLabellinePie,
    VPielabel,
    VScale
  },
  data () {
    return {
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
      map,
      data: [
        { name: '芳华', percent: 0.4, a: '1' },
        { name: '妖猫传', percent: 0.2, a: '1' },
        { name: '机器之血', percent: 0.18, a: '1' },
        { name: '心理罪', percent: 0.15, a: '1' },
        { name: '寻梦环游记', percent: 0.05, a: '1' },
        { name: '其他', percent: 0.02, a: '1' }
      ],
      options: {
        skipOverlapLabels: true,
        sidePadding: 40,
        label1: function label1 (data, color) {
          return {
            text: data.name,
            fill: color
          }
        },
        label2: function label2 (data, color) {
          return {
            text: `${data.percent * 100}%`,
            fill: color
          }
        }
      }
    }
  }
}
</script>

<demo>
  title: 饼图
</demo>

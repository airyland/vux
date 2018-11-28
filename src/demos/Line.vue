<template lang='html'>
  <div>
    <x-line
      :data="data"
      :tooltip="tooltip"
      :x-field-options="{
        type: 'timeCat',
        range: [ 0, 1 ],
        tickCount: 3
      }">
    </x-line>

    <x-line :data="days" :tooltip="tooltip2" shape="dash" :point-style="{
      stroke: '#fff',
      lineWidth: 1
    }">
    </x-line>
  </div>
</template>

<script>
import { Line as XLine } from 'vux'

export default {
  components: {
    XLine
  },
  methods: {
  },
  data () {
    return {
      tooltip: {
        showItemMarker: false,
        onShow (ev) {
          console.log(ev)
          const { items } = ev
          items[0].name = items[0].title
        }
      },
      tooltip2: {
        showCrosshairs: true,
        showItemMarker: false,
        onShow (ev) {
          console.log(ev)
          const { items } = ev
          items[0].name = items[0].title
        }
      },
      days: [
        { day: '周一', value: 300 },
        { day: '周二', value: 400 },
        { day: '周三', value: 350 },
        { day: '周四', value: 500 },
        { day: '周五', value: 490 },
        { day: '周六', value: 600 },
        { day: '周日', value: 900 }
      ],
      data: [
        { date: '2017-06-05', value: 116 },
        { date: '2017-06-06', value: 129 },
        { date: '2017-06-07', value: 135 },
        { date: '2017-06-08', value: 86 },
        { date: '2017-06-09', value: 73 },
        { date: '2017-06-10', value: 85 },
        { date: '2017-06-11', value: 73 },
        { date: '2017-06-12', value: 68 },
        { date: '2017-06-13', value: 92 },
        { date: '2017-06-14', value: 130 },
        { date: '2017-06-15', value: 245 },
        { date: '2017-06-16', value: 139 },
        { date: '2017-06-17', value: 115 },
        { date: '2017-06-18', value: 111 },
        { date: '2017-06-19', value: 309 },
        { date: '2017-06-20', value: 206 },
        { date: '2017-06-21', value: 137 },
        { date: '2017-06-22', value: 128 },
        { date: '2017-06-23', value: 85 },
        { date: '2017-06-24', value: 94 },
        { date: '2017-06-25', value: 71 },
        { date: '2017-06-26', value: 106 },
        { date: '2017-06-27', value: 84 },
        { date: '2017-06-28', value: 93 },
        { date: '2017-06-29', value: 85 },
        { date: '2017-06-30', value: 73 },
        { date: '2017-07-01', value: 83 },
        { date: '2017-07-02', value: 125 },
        { date: '2017-07-03', value: 107 },
        { date: '2017-07-04', value: 82 },
        { date: '2017-07-05', value: 44 },
        { date: '2017-07-06', value: 72 },
        { date: '2017-07-07', value: 106 },
        { date: '2017-07-08', value: 107 },
        { date: '2017-07-09', value: 66 },
        { date: '2017-07-10', value: 91 },
        { date: '2017-07-11', value: 92 },
        { date: '2017-07-12', value: 113 },
        { date: '2017-07-13', value: 107 },
        { date: '2017-07-14', value: 131 },
        { date: '2017-07-15', value: 111 },
        { date: '2017-07-16', value: 64 },
        { date: '2017-07-17', value: 69 },
        { date: '2017-07-18', value: 88 },
        { date: '2017-07-19', value: 77 },
        { date: '2017-07-20', value: 83 },
        { date: '2017-07-21', value: 111 },
        { date: '2017-07-22', value: 57 },
        { date: '2017-07-23', value: 55 },
        { date: '2017-07-24', value: 60 }
      ]
    }
  }
}
</script>

<style lang='css'>
</style>

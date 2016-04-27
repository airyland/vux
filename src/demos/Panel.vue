<template>
  <div>
    <group title="switch the type">
      <radio title="type" :value.sync="type" :options="['1', '2', '3']"></radio>
    </group>
    <panel header="图文组合列表" footer="查看更多" :list="list" :type="type"></panel>
  </div>
</template>

<script>
import { Panel, Group, Radio } from '../components'

export default {
  components: {
    Panel,
    Group,
    Radio
  },
  data () {
    return {
      type: '1',
      list: [{
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题一',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
      }, {
        src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '标题二',
        desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
      }]
    }
  }
}
</script>
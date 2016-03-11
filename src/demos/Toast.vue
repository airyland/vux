<template>
  <div>
    <group>
      <switch title="默认" :value.sync="show"></switch>
      <switch title="设置出现时间1s" :value.sync="show1"></switch>
    </group>
    <toast :show.sync="show">处理成功</toast>
    <toast :show.sync="show1" :time=1000>1s关闭</toast>
  </div>
</template>

<script>
import { Toast, Group, Switch } from '../components/'
export default {
  components: {
    Toast,
    Group,
    Switch
  },
  data () {
    return {
      show: false,
      show1: false
    }
  }
}
</script>
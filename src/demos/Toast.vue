<template>
  <div>
    <group>
      <switch title="开关" :value.sync="show"></switch>
    </group>
    <toast :show.sync="show">处理成功</toast>
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
      show: false
    }
  }
}
</script>
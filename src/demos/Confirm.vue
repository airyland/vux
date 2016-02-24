<template>
  <div>
    <group>
      <switch title="开关" :value.sync="show"></switch>
    </group>
    <confirm :show.sync="show" title="温馨提示">确认要放弃吗？</confirm>
  </div>
</template>

<script>
import { Confirm, Group, Switch } from '../components/'
export default {
  components: {
    Confirm,
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
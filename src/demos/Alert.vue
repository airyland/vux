<template>
  <div>
    <group>
      <switch title="开关" :value.sync="show"></switch>
    </group>
    <alert :show.sync="show" title="操作提示">消息发送成功</alert>
  </div>
</template>

<script>
import { Alert, Group, Switch } from '../components/'
export default {
  components: {
    Alert,
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
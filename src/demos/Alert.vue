<template>
  <div>
    <group>
      <switch title="Toggle" :value.sync="show"></switch>
    </group>
    <alert :show.sync="show" title="congratulations">Message is sent successfully~</alert>
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

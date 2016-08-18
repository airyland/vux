<template>
  <div>
    <br>
    <progress :percent="percent1"></progress>
    <br>
    <box gap="10px">
      <progress :percent="percent1" :show-cancel="false"></progress>
    </box>
  </div>
</template>

<script>
import { Progress, Box } from '../components'

export default {
  components: {
    Progress,
    Box
  },
  data () {
    return {
      percent1: 50
    }
  }
}
</script>

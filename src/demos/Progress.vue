<template>
  <div>
    <progress></progress>
    <br/>
    <progress :percent.sync="percent1"></progress>
    <br/>
    <progress :template="2"></progress>
    <br/>
    <progress :template="3"></progress>
    <br/>
    <progress :template="4"></progress>
  </div>
</template>

<script>
import { Progress } from '../components'

export default {
  components: {
    Progress
  },
  data () {
    return {
      percent1: 50
    }
  }
}
</script>

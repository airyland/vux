<template>
  <div>
    <div style="padding:15px;">
      <check-icon :value.sync="demo1">Do you agree? ({{ demo1 }})</check-icon>
      <br>
      <br>
      <check-icon :value.sync="demo2" type="plain">Do you agree?({{ demo2 }})</check-icon>
    </div>
  </div>
</template>

<script>
import { CheckIcon } from 'vux'

export default {
  components: {
    CheckIcon
  },
  data () {
    return {
      demo1: false,
      demo2: true
    }
  }
}
</script>

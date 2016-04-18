<template>
  <div>
    <p style="text-align:center">shake your phone</p>
    <shake @shake="shake" :threshold=5></shake>
  </div>
</template>

<script>
import { Shake } from '../components/'

export default {
  components: {
    Shake
  },
  methods: {
    'on-shake': function () {
      alert('share')
    }
  }
}
</script>

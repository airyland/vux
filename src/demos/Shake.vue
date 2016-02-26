<template>
  <div>
    <p style="text-align:center">shake your phone</p>
    <shake @shake="shake" :threshold=5></shake>
  </div>
</template>

<script>
import Shake from '../components/Shake'
export default {
  components: {
    Shake
  },
  methods: {
    shake: function () {
      alert('share')
    }
  }
}
</script>
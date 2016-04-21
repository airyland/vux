<template>
  <div>
    <number-roller :number="number" :width="6"></number-roller>
  </div>
</template>

<script>
import NumberRoller from '../components/number-roller'

export default {
  components: {
    NumberRoller
  },
  ready () {
    setInterval(() => {
      this.number = 100000 + Math.round(Math.random() * 899999)
    }, 3000)
  },
  data () {
    return {
      number: 123765
    }
  }
}
</script>
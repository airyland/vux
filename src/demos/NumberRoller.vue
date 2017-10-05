<template>
  <div>
    <number-roller :number="number" :width="6"></number-roller>
    <divider>set width dynamically</divider>
    <number-roller :number="number2" :width="length"></number-roller>
  </div>
</template>

<script>
import { NumberRoller, Divider } from 'vux'

export default {
  components: {
    NumberRoller,
    Divider
  },
  created () {
    setInterval(() => {
      this.number = 100000 + Math.round(Math.random() * 899999)
    }, 3000)
    setTimeout(() => {
      this.number2 = 333
    }, 3000)
    setTimeout(() => {
      this.number2 = 333
    }, 5000)
    setTimeout(() => {
      this.number2 = 88
    }, 8000)
  },
  computed: {
    length () {
      return String(this.number2).length
    }
  },
  data () {
    return {
      number: 123765,
      number2: 88
    }
  }
}
</script>

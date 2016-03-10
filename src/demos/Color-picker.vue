<template>
  <div style="padding: 15px;">
    <color-picker :colors="colors1" :value.sync="color1"></color-picker>
    <br>
    <color-picker :colors="colors1" :value.sync="color1" size="middle"></color-picker>
    <br>
    <color-picker :colors="colors1" :value.sync="color1" size="small"></color-picker>
    <br>
    <p>You pick color: {{color1}}</p>
  </div>
</template>

<script>
import { ColorPicker } from '../components/'
export default {
  components: {
    ColorPicker
  },
  data () {
    return {
      color1: '#FFEF7D',
      colors1: ['#FF3B3B', '#FFEF7D', '#8AEEB1', '#8B8AEE', '#CC68F8', '#fff']
    }
  }
}
</script>
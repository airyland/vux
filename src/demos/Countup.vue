<template>
  <div style="text-align:center;">
    <countup :start-val="1" :end-val="1388" :duration="4" class="demo1"></countup>
    <br/>
    <countup :end-val="88.88" :duration="3" :decimals="2" class="demo1"></countup>
  </div>
</template>

<script>
import { Countup } from '../components/'

export default {
  components: {
    Countup
  }
}
</script>

<style scoped>
.demo1 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 8em;
  color: #04BE02;
}
</style>

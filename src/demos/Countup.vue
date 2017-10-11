<template>
  <div style="text-align:center;">
    <countup :start-val="1" :end-val="1388" :duration="2" class="demo1"></countup>
    <br/>
    <countup :end-val="88.88" :duration="3" :decimals="2" class="demo1"></countup>
    <br>
    <countup :end-val="1024" :duration="4" :start="doStart" class="demo1"></countup>
    <div style="padding:0 15px;">
      <x-button @click.native="doStart=true" type="primary"> {{ $t('Start') }} </x-button>
    </div>
  </div>
</template>

<script>
import { Countup, XButton } from 'vux'

export default {
  components: {
    Countup,
    XButton
  },
  data () {
    return {
      doStart: false
    }
  }
}
</script>

<style scoped>
.demo1 {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 6em;
  color: #04BE02;
}
</style>

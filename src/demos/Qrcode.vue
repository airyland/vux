<template>
  <div style="text-align:center;margin-top:15px;">
    <divider>Notice: It cannot be extracted by Wechat</divider>
    <qrcode value="https://vux.li"></qrcode>
    <br>
    <br>
    <qrcode :value="value" :fg-color="fgColor"></qrcode>
    <br>
    <span>current url: {{value}}</span>
    <br>
    <span>current fgColor: {{fgColor}}</span>
  </div>
</template>

<script>
import Qrcode from '../components/qrcode'
import { Divider } from '../components'

export default {
  ready () {
    setInterval(() => {
      this.value = `https://vux.li?t=${Math.random()}`
      this.fgColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }, 1000)
  },
  components: {
    Qrcode,
    Divider
  },
  data () {
    return {
      value: 'https://vux.li',
      fgColor: '#000000'
    }
  }
}
</script>
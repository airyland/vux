<template>
  <div style="text-align:center;margin-top:15px;">
    <divider>{{ $t('default type = img') }}</divider>
    <qrcode value="https://vux.li?x-page=demo_qrcode" type="img"></qrcode>
    <br>
    <br>
    <divider>{{ $t('type = canvas') }}</divider>
    <qrcode value="https://vux.li?x-page=demo_qrcode"></qrcode>
    <br>
    <qrcode :value="value" :fg-color="fgColor"></qrcode>
    <br>
    <span>{{ $t('current url') }}: {{value}}</span>
    <br>
    <span>{{ $t('current fgColor') }}: {{fgColor}}</span>
  </div>
</template>

<i18n>
default type = img:
  zh-CN: '默认类型为 img，可以在微信里长按识别'
type = canvas:
  zh-CN: '类型为 canvas'
current url:
  zh-CN: 当前url
current fgColor:
  zh-CN: 当前颜色
</i18n>

<script>
import { Qrcode, Divider } from 'vux'

export default {
  mounted () {
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
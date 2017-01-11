<template>
  <div style="text-align:center;margin-top:15px;">
    <divider>{{ $t('Notice: It cannot be extracted by Wechat') }}</divider>
    <qrcode value="https://vux.li"></qrcode>
    <br>
    <br>
    <qrcode :value="value" :fg-color="fgColor"></qrcode>
    <br>
    <span>{{ $t('current url') }}: {{value}}</span>
    <br>
    <span>{{ $t('current fgColor') }}: {{fgColor}}</span>
  </div>
</template>

<i18n>
'Notice: It cannot be extracted by Wechat':
  zh-CN: 注意：canvas不能在微信里长按识别
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
<template>
  <div>
    <group>
      <x-switch :title="$t('Show Me')" v-model="show"></x-switch>
    </group>

    <div v-transfer-dom>
      <alert v-model="show" :title="$t('Congratulations')" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</alert>
    </div>

    <group :title="$t('Use as a plugin')">
      <cell :title="$t('Show Me')" @click.native="showPlugin" is-link></cell>
      <cell :title="$t('will auto close in 3s')" @click.native="showPluginAuto" is-link></cell>
    </group>
  </div>
</template>

<i18n>
Show Me:
  zh-CN: 显示
Use as a plugin:
  zh-CN: 以插件方式调用
Congratulations:
  zh-CN: 恭喜
Your Message is sent successfully~:
  zh-CN: 消息已成功发送
Do you agree?:
  zh-CN: 同意不?
will auto close in 3s:
  zh-CN: 3秒后关闭
</i18n>

<script>
import { Alert, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Alert,
    Group,
    XSwitch,
    Cell
  },
  data () {
    return {
      show: false,
      show1: false
    }
  },
  methods: {
    onHide () {
      console.log('on hide')
    },
    onShow () {
      console.log('on show')
    },
    showPlugin () {
      this.$vux.alert.show({
        title: 'Vux is Cool',
        content: this.$t('Do you agree?'),
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding now')
        }
      })
    },
    showPluginAuto () {
      this.showPlugin()
      setTimeout(() => {
        this.$vux.alert.hide()
      }, 3000)
    }
  }
}
</script>

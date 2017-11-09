<template>
  <div>
    <group>
      <x-switch :title="$t('Show Me')" v-model="show"></x-switch>
    </group>
    <div v-transfer-dom>
      <alert v-model="show" :title="$t('Congratulations')" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</alert>
    </div>

    <group title="Prop: content">
      <x-switch :title="$t('Show Me')" v-model="show2"></x-switch>
    </group>
    <div v-transfer-dom>
      <alert v-model="show2" :title="$t('Congratulations')" :content="$t('Your Message is sent successfully~')"></alert>
    </div>

    <group :title="$t('Use as a plugin')">
      <cell :title="$t('Show Me')" @click.native="showPlugin" is-link></cell>
      <cell :title="$t('Will auto close in 3s')" @click.native="showPluginAuto" is-link></cell>
    </group>

    <group :title="$t('Use as a module')">
      <cell :title="$t('Show Me')" @click.native="showModule" is-link></cell>
      <cell :title="$t('Will auto close in 3s')" @click.native="showModuleAuto" is-link></cell>
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
Will auto close in 3s:
  zh-CN: 3秒后关闭
</i18n>

<script>
import { AlertModule, Alert, Group, XSwitch, Cell, TransferDomDirective as TransferDom } from 'vux'

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
      show1: false,
      show2: false
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
        title: 'VUX is Cool',
        content: this.$t('Do you agree?'),
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding now')
        }
      })
    },
    showModule () {
      AlertModule.show({
        title: 'VUX is Cool',
        content: this.$t('Do you agree?'),
        onShow () {
          console.log('Module: I\'m showing')
        },
        onHide () {
          console.log('Module: I\'m hiding now')
        }
      })
    },
    showModuleAuto () {
      this.showModule()
      setTimeout(() => {
        AlertModule.hide()
      }, 3000)
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

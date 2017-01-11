<template>
  <div>
    <group>
      <x-switch :title="$t('Show Me')" v-model="show"></x-switch>
    </group>
    <alert v-model="show" :title="$t('Congratulations')" @on-show="onShow" @on-hide="onHide"> {{ $t('Your Message is sent successfully~') }}</alert>
    <group :title="$t('Use as a plugin')">
      <x-switch :title="$t('Show Me')" v-model="show1" @on-change="onChange"></x-switch>
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
</i18n>

<script>
import { Alert, Group, XSwitch } from 'vux'

export default {
  components: {
    Alert,
    Group,
    XSwitch
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
    onChange (val) {
      const _this = this
      if (val) {
        this.$vux.alert.show({
          title: 'Vux is Cool',
          content: this.$t('Do you agree?'),
          onShow () {
            console.log('Plugin: I\'m showing')
          },
          onHide () {
            console.log('Plugin: I\'m hiding')
            _this.show1 = false
          }
        })
      } else {
        this.$vux.alert.hide()
      }
    }
  }
}
</script>

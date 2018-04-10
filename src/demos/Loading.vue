<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show1" @on-change="show1change"></x-switch>
      <x-switch :title="$t('No loading text')" v-model="show2" @on-change="show2change"></x-switch>
    </group>
    <div v-transfer-dom>
      <loading :show="show1" :text="text1"></loading>
    </div>
    <div v-transfer-dom>
      <loading :show="show2" text=""></loading>
    </div>
    <div style="padding: 15px;">
      <x-button @click.native="showLoading" type="primary">{{ $t('Show loading') }}</x-button>
    </div>
    <div style="padding: 15px;">
      <x-button @click.native="showDelayLoading" type="primary">{{ $t('Show delay loading') }}</x-button>
    </div>
  </div>
</template>

<i18n>
Show loading:
  en: show loading (close in 2s)
  zh-CN: 显示loading (2s后关闭)
Show delay loading:
  en: show loading delay after 1s
  zh-CN: 延时1s后显示
No loading text:
  zh-CN: 无提示文字
</i18n>

<script>
import { Loading, Group, XSwitch, XButton, TransferDomDirective as TransferDom } from 'vux'

export default {
  directives: {
    TransferDom
  },
  components: {
    Loading,
    Group,
    XSwitch,
    XButton
  },
  data () {
    return {
      show1: false,
      show2: false,
      text1: 'Processing'
    }
  },
  methods: {
    showLoading () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 2000)
    },
    showDelayLoading () {
      this.$vux.loading.show({
        text: 'Loading',
        delay: 1e3
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 2000)
    },
    show1change (val) {
      if (val) {
        tick(0, (percent) => {
          if (percent === 100) {
            this.show1 = false
            return
          }
          this.text1 = `${percent}%`
        })
      }
    },
    show2change (val) {
      if (val) {
        tick(0, (percent) => {
          if (percent === 100) {
            this.show2 = false
            return
          }
        })
      }
    }
  }
}

function tick (i, cb) {
  setTimeout(function () {
    i++
    cb(i)
    if (i < 100) {
      tick(i, cb)
    }
  }, 10)
}
</script>

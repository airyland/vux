<template>
  <div>
    <group>
      <x-switch :title="$t('Toggle')" v-model="show1" @on-change="show1change"></x-switch>
    </group>
    <div v-transfer-dom>
      <loading v-model="show1" :text="text1"></loading>
    </div>
    <div style="padding: 15px;">
      <x-button @click.native="showLoading" type="primary">显示loading(2s后关闭)</x-button>
    </div>
  </div>
</template>

<i18n>
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

<template>
  <div>
    <div style="padding:15px;">
      <x-button @click.native="show=true" plain type="primary">show popup</x-button>
    </div>

    <div v-transfer-dom>
      <popup v-model="show" @on-first-show="onFirstShow">
        <div id="js_ximg_popup" style="max-height:500px;overflow-y:scroll;">
          <div style="padding:15px;">
            <x-button @click.native="show=false" plain type="primary">close popup</x-button>
          </div>
          <div v-for="src in list" class="x-img-popup">
            <x-img :src="src" :webp-src="`${src}?type=webp`" container="#js_ximg_popup"></x-img>
          </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { XImg, Popup, TransferDom, XButton } from 'vux'

export default {
  components: {
    XImg,
    Popup,
    XButton
  },
  directives: {
    TransferDom
  },
  methods: {
    onFirstShow () {
      this.$vux.bus && this.$vux.bus.$emit('vux:after-view-enter')
    }
  },
  data () {
    return {
      show: false,
      list: [
        'https://o5omsejde.qnssl.com/demo/test1.jpg',
        'https://o5omsejde.qnssl.com/demo/test2.jpg',
        'https://o5omsejde.qnssl.com/demo/test0.jpg',
        'https://o5omsejde.qnssl.com/demo/test4.jpg',
        'https://o5omsejde.qnssl.com/demo/test5.jpg',
        'https://o5omsejde.qnssl.com/demo/test6.jpg',
        'https://o5omsejde.qnssl.com/demo/test7.jpg',
        'https://o5omsejde.qnssl.com/demo/test8.jpg'
      ]
    }
  }
}
</script>

<style scoped>
.x-img-popup {
  text-align:center;
  min-height:200px;
}
</style>

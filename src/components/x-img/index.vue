<template>
  <img :src="defaultSrc" :data-src="currentSrc" class="vux-x-img"/>
</template>

<script>
import Blazy from 'vux-blazy'
import { isSupported, detectWebp } from '../../libs/webp-support'
import uuidMixin from '../../libs/mixin_uuid'

export default {
  name: 'x-img',
  mixins: [uuidMixin],
  created () {
    this.$vux && this.$vux.bus && this.$vux.bus.$on('vux:after-view-enter', this.init)
  },
  methods: {
    init () {
      const _this = this

      this.blazy && this.blazy.destroy()
      this.$el.src = this.defaultSrc
      this.$el.className = this.$el.className.replace('b-loaded', '')

      this.blazy = new Blazy({
        scroller: this.scroller,
        container: this.container,
        selector: `#vux-ximg-${this.uuid}`,
        offset: _this.offset,
        errorClass: _this.errorClass,
        successClass: _this.successClass,
        success (ele) {
          _this.$emit('on-success', _this.src, ele)
        },
        error (ele, msg) {
          _this.$emit('on-error', _this.src, ele, msg)
        }
      })
    }
  },
  mounted () {
    this.$el.setAttribute('id', `vux-ximg-${this.uuid}`)
    this.$nextTick(() => {
      setTimeout(() => {
        this.init()
      }, this.delay)
    })
    detectWebp()
  },
  computed: {
    currentSrc () {
      if (isSupported() && this.webpSrc) {
        return this.webpSrc
      }
      return this.src
    }
  },
  props: {
    src: String,
    webpSrc: String,
    defaultSrc: {
      type: String,
      default: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
    },
    errorClass: String,
    successClass: String,
    offset: {
      type: Number,
      default: 100
    },
    scroller: Object,
    container: String,
    delay: {
      type: Number,
      default: 0
    }
  },
  watch: {
    src (val) {
      this.init()
    }
  },
  beforeDestroy () {
    this.blazy && this.blazy.destroy()
    this.blazy = null
    this.$vux && this.$vux.bus && this.$vux.bus.$off('vux:after-view-enter', this.init)
  }
}
</script>

<style>
.vux-x-img, .b-lazy {
  transition: opacity 500ms ease-in-out;
  max-width: 100%;
}
.b-lazy {
  opacity: 0;
}

.b-lazy.b-loaded {
  opacity: 1;
}
</style>

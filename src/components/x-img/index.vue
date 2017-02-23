<template>
  <img :src="defaultSrc" :data-src="currentSrc" class="vux-x-img"/>
</template>

<script>
import Blazy from 'vux-blazy'
import webpSupport from 'webp-support'
import uuidMixin from '../../libs/mixin_uuid'

export default {
  mixins: [uuidMixin],
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        const _this = this
        const id = `vux-ximg-${this.uuid}`
        this.$el.setAttribute('id', id)
        // this.$el.setAttribute('data-src', this.src)
        this.blazy = new Blazy({
          scroller: this.scroller,
          container: this.container,
          selector: `#${id}`,
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
      }, this.delay)
    })
  },
  computed: {
    currentSrc () {
      if (webpSupport() && this.webpSrc) {
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
      defaut: 100
    },
    scroller: Object,
    container: String,
    delay: {
      type: Number,
      default: 100
    }
  },
  beforeDestroy () {
    this.blazy && this.blazy.destroy()
  }
}
</script>

<style>
.b-lazy {
  transition: opacity 500ms ease-in-out;
  max-width: 100%;
  opacity: 0;
}

.b-lazy.b-loaded {
  opacity: 1;
}
</style>

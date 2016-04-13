<template>
  <img :src="defaultSrc" :class="class"/>
</template>

<script>
import Blazy from 'blazy'
import webpSupport from 'webp-support'
import Base from '../../libs/base'

export default {
  mixins: [Base],
  compiled () {
    // use webp or default
    if (webpSupport() && this.src && this.webpSrc) {
      this.src = this.webpSrc
    }
  },
  ready () {
    const _this = this
    const id = `vux-ximg-${this.uuid}`
    this.$el.setAttribute('id', id)
    this.$el.setAttribute('data-src', this.src)
    this.blazy = new Blazy({
      selector: `#${id}`,
      offset: _this.offset,
      errorClass: _this.errorClass,
      successClass: _this.successClass,
      success: function (ele) {
        _this.$dispatch('success', _this.src, ele)
      },
      error: function (ele, msg) {
        _this.$dispatch('error', _this.src, ele, msg)
      }
    })
  },
  props: {
    src: {
      type: String
    },
    webpSrc: {
      type: String
    },
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
    class: {
      type: String
    }
  },
  beforeDestroy () {
    this.blazy && this.blazy.destroy()
  }
}
</script>

<style>
.b-lazy {
  -webkit-transition: opacity 500ms ease-in-out;
  -moz-transition: opacity 500ms ease-in-out;
  -o-transition: opacity 500ms ease-in-out;
  transition: opacity 500ms ease-in-out;
  max-width: 100%;
  opacity: 0;
}
.b-lazy.b-loaded {
  opacity: 1;
}
</style>

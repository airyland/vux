<template>
  <div :style="{height: height + 'px',position: 'relative', overflow: 'hidden'}">
    <slot></slot>
  </div>
</template>

<script>
import Blur from './blur'

export default {
  ready () {
    this._blur = new Blur(this.$el, {
      url: this.url,
      blurAmount: this.blurAmount,
      imageClass: 'vux-bg-blur',
      duration: 100, // If the image needs to be faded in, how long that should take
      opacity: 1 // Specify the final opacity that the image will have
    })
  },
  props: {
    blurAmount: {
      type: Number,
      default: 10
    },
    url: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 200
    }
  },
  watch: {
    blurAmount (blurAmount) {
      this._blur.setBlurAmount(blurAmount)
      this._blur.generateBlurredImage(this.url)
    },
    url (url) {
      this._blur.generateBlurredImage(url)
    }
  }
}
</script>

<style lang="less">
.vux-bg-blur {
  z-index: -2;
  opacity: 0;
  position: absolute;
  min-height: 100%;
  display: block;
  top: 0;
  max-height: none;
  /* Add this CSS to remove transparent border around the image */
  left: -20%;
  top: -20%;
  width: 140%;
  height: 140%;
  transition: opacity linear 0.8s;
}
/*
An element with this class is added by the plugin to provide an overlay above the blurred image
It could drastically improve the appearance of the blurred image for content readability
*/
.vux-bg-blur-overlay {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%);
}
</style>

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
      imageClass: 'bg-blur',
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
    blurAmount: function (blurAmount) {
      this._blur.setBlurAmount(blurAmount)
      this._blur.generateBlurredImage(this.url)
    },
    url: function (url) {
      this._blur.generateBlurredImage(url)
    }
  }
}
</script>

<style>
.bg-blur {
  z-index: -2;
  opacity: 0;
  position: absolute;
  min-height: 100%;
  height: auto;
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
.bg-blur-overlay {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+100&amp;0.15+0,1+100 */
  /* IE9 SVG, needs conditional override of 'filter' to 'none' */
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwMDAwMCIgc3RvcC1vcGFjaXR5PSIwLjE1Ii8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
  background: -moz-linear-gradient(top,  rgba(0,0,0,0.15) 0%, rgba(0,0,0,1) 100%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0.15)), color-stop(100%,rgba(0,0,0,1))); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(top,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(top,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* IE10+ */
  background: linear-gradient(to bottom,  rgba(0,0,0,0.15) 0%,rgba(0,0,0,1) 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#26000000', endColorstr='#000000',GradientType=0 ); /* IE6-8 */
}
</style>

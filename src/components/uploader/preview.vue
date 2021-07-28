<template>
  <!-- Root element of PhotoSwipe. Must have class pswp. -->
  <div id="previewer" class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <!-- Background of PhotoSwipe.
    It's a separate element as animating opacity is faster than rgba().-->
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
      <!-- Container that holds slides.
        PhotoSwipe keeps only 3 of them in the DOM to save memory.
      Don't modify these 3 pswp__item elements, data is added later on.-->
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <!--  Controls are self-explanatory. Order can be changed. -->
          <div class="pswp__counter"></div>
          <slot name="button-after"></slot>
          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
          <button class="pswp__button pswp__button--share" title="Share"></button>
          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
          <slot name="button-before"></slot>
          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
    <div class="vux-uploader_del" v-if="!readonly" @click="handleDelete"></div>
  </div>
</template>
<script>
import PhotoSwipe from 'x-photoswipe/dist/photoswipe'
import UI from 'x-photoswipe/dist/photoswipe-ui-default'

export default {
  name: 'Previewer',
  props: {
    current: {
      type: Number
    },
    visible: {
      type: Boolean
    },
    list: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  },
  watch: {
    list (newVal, oldVal) {
      if (!this.photoswipe) {
        return
      }
      if (newVal.length && newVal.length - oldVal.length === -1) {
        const index = this.getCurrentIndex()
        this.photoswipe.invalidateCurrItems()
        this.photoswipe.items.splice(index, 1)
        let goToIndex = index
        if (goToIndex > this.photoswipe.items.length - 1) {
          goToIndex = 0
        }
        if (goToIndex > 0) {
          this.photoswipe.goTo(goToIndex)
        }
        this.photoswipe.updateSize(true)
        this.photoswipe.ui.update()
      } else if (!newVal.length) {
        this.close()
      }
    }
  },
  methods: {
    init (index) {
      const self = this
      const showItem = this.list[index]
      if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
        const img = new Image()
        img.onload = function () {
          showItem.w = this.width
          showItem.h = this.height
          self.doInit(index)
        }
        img.src = showItem.src
      } else {
        this.doInit(index)
      }
    },
    doInit (index) {
      const self = this
      let options = Object.assign(
        {
          history: false,
          shareEl: false,
          fullscreenEl: false,
          tapToClose: true,
          index: index
        },
        this.options
      )
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.list, options)
      this.photoswipe.listen('gettingData', function (index, item) {
        if (!item.w || !item.h || item.w < 1 || item.h < 1) {
          const img = new Image()
          img.onload = function () {
            item.w = this.width
            item.h = this.height
            self.photoswipe.updateSize(true)
          }
          img.src = item.src
        }
      })
      this.photoswipe.init()
      this.photoswipe.listen('close', () => {
        this.$emit('on-close')
      })
      this.photoswipe.listen('afterChange', (a, b) => {
        this.$emit('on-index-change', {
          currentIndex: this.getCurrentIndex()
        })
      })
    },
    show (index) {
      this.init(index)
    },
    getCurrentIndex () {
      if (this.photoswipe) {
        return this.photoswipe.getCurrentIndex()
      }
    },
    close () {
      this.photoswipe && this.photoswipe.close()
    },
    goTo (index) {
      this.photoswipe && this.photoswipe.goTo(index)
    },
    prev () {
      this.photoswipe && this.photoswipe.prev()
    },
    next () {
      this.photoswipe && this.photoswipe.next()
    },
    handleDelete () {
      this.$emit('on-delete', this.getCurrentIndex())
    }
  }
}
</script>
<style src="x-photoswipe/dist/photoswipe.css"></style>
<style src="x-photoswipe/dist/default-skin/default-skin.css"></style>
<style lang="less">
.vux-uploader_del {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0d0d0d;
  color: #ffffff;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-family: 'weui';
  &:after {
    color: #ffffff;
    font-size: 22px;
    content: '\EA11';
  }
}
</style>

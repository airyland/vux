<template>
  <!-- Slider main container -->
  <div class="vux-swiper-container">
    <!-- Additional required wrapper -->
    <div class="vux-swiper-wrapper">
      <!-- Slides -->
      <slot></slot>
    </div>
    <!-- If we need pagination -->
    <div v-if="pagination" class="vux-swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div v-if="prevButton" class="vux-swiper-button-prev"></div>
    <div v-if="nextButton" class="vux-swiper-button-next"></div>
  </div>
</template>

<script>
// import Swiper from './swiper' // use this if you have global import dom lib like Doom7,Zepto,jQuery
import Swiper from './swiper.dom' // no dom lib imported

const getProps = () => {
  return {
    direction: {
      type: String
    },
    touchEventsTarget: {
      type: String
    },
    initialSlide: {
      type: Number
    },
    speed: {
      type: Number
    },
    // autoplay
    autoplay: {
      type: [Boolean, Number]
    },
    autoplayDisableOnInteraction: {
      type: Boolean
    },
    autoplayStopOnLast: {
      type: Boolean
    },
    // To support iOS's swipe-to-go-back gesture (when being used in-app,with UIWebView).
    iOSEdgeSwipeDetection: {
      type: Boolean
    },
    iOSEdgeSwipeThreshold: {
      type: Number
    },
    // Free mode
    freeMode: {
      type: Boolean
    },
    freeModeMomentum: {
      type: Boolean
    },
    freeModeMomentumRatio: {
      type: Number
    },
    freeModeMomentumBounce: {
      type: Boolean
    },
    freeModeMomentumBounceRatio: {
      type: Number
    },
    freeModeSticky: {
      type: Boolean
    },
    freeModeMinimumVelocity: {
      type: Number
    },
    // Autoheight
    autoHeight: {
      type: Boolean
    },
    // Set wrapper width
    setWrapperSize: {
      type: Boolean
    },
    // Virtual Translate
    virtualTranslate: {
      type: Boolean
    },
    // Effects
    // Parallax
    // Scrollbar
    // Keyboard Mousewheel
    // Hash Navigation
    // Breakpoints
    breakpoints: {
      type: Object
    },
    // Slides grid
    spaceBetween: {
      type: Number
    },
    slidesPerView: {
      type: [Number, String]
    },
    slidesPerColumn: {
      type: Number
    },
    slidesPerColumnFill: {
      type: String
    },
    slidesPerGroup: {
      type: Number
    },
    centeredSlides: {
      type: Boolean
    },
    slidesOffsetBefore: {
      type: Number
    }, // in px
    slidesOffsetAfter: {
      type: Number
    }, // in px
    // Round length
    roundLengths: {
      type: Boolean
    },
    // Touches
    touchRatio: {
      type: Number
    },
    touchAngle: {
      type: Number
    },
    simulateTouch: {
      type: Boolean
    },
    shortSwipes: {
      type: Boolean
    },
    longSwipes: {
      type: Boolean
    },
    longSwipesRatio: {
      type: Number
    },
    longSwipesMs: {
      type: Number
    },
    followFinger: {
      type: Boolean
    },
    onlyExternal: {
      type: Boolean
    },
    threshold: {
      type: Number
    },
    touchMoveStopPropagation: {
      type: Boolean
    },
    // Unique Navigation Elements
    uniqueNavElements: {
      type: Boolean
    },
    // Pagination
    pagination: {
      type: Boolean // Whether or not show pagination, default false
    },
    paginationElement: {
      type: String
    },
    paginationClickable: {
      type: Boolean
    },
    paginationHide: {
      type: Boolean
    },
    paginationBulletRender: {
      type: Function
    },
    paginationProgressRender: {
      type: Function
    },
    paginationFractionRender: {
      type: Function
    },
    paginationCustomRender: {
      type: Function
    },
    paginationType: {
      type: String
    }, // 'bullets' or 'progress' or 'fraction' or 'custom'
    // Resistance
    resistance: {
      type: Boolean
    },
    resistanceRatio: {
      type: Number
    },
    // Next/prev buttons
    nextButton: {
      // type: [String,Object],
      type: Boolean // Whether or not show nextButton, default false
    },
    prevButton: {
      // type: [String,Object],
      type: Boolean // Whether or not show prevButton, default false
    },
    // Progress
    watchSlidesProgress: {
      type: Boolean
    },
    watchSlidesVisibility: {
      type: Boolean
    },
    // Cursor
    grabCursor: {
      type: Boolean
    },
    // Clicks
    preventClicks: {
      type: Boolean
    },
    preventClicksPropagation: {
      type: Boolean
    },
    slideToClickedSlide: {
      type: Boolean
    },
    // Lazy Loading
    lazyLoading: {
      type: Boolean
    },
    lazyLoadingInPrevNext: {
      type: Boolean
    },
    lazyLoadingInPrevNextAmount: {
      type: Number
    },
    lazyLoadingOnTransitionStart: {
      type: Boolean
    },
    // Images
    preloadImages: {
      type: Boolean
    },
    updateOnImagesReady: {
      type: Boolean
    },
    // loop
    loop: {
      type: Boolean
    },
    loopAdditionalSlides: {
      type: Number
    },
    loopedSlides: {
      type: Number
    },
    // Control
    // Swiping/no swiping
    allowSwipeToPrev: {
      type: Boolean
    },
    allowSwipeToNext: {
      type: Boolean
    },
    swipeHandler: {
      type: String
    }, // '.swipe-handler',
    noSwiping: {
      type: Boolean
    },
    noSwipingClass: {
      type: String
    },
    // NS
    // Observer
    observer: {
      type: Boolean
    },
    observeParents: {
      type: Boolean
    },
    // Accessibility
    // Callbacks
    runCallbacksOnInit: {
      type: Boolean
    }
    // Callbacks:
  }
}

export default {
  props: getProps(),
  ready () {
    let keys = Object.keys(getProps())
    let _props = {}
    keys.forEach((item) => {
      this[item] && (_props[item] = this[item])
    })
    Object.assign(_props, {
      // Use Boolean type
      pagination: _props.pagination && this.$el.querySelector('.vux-swiper-pagination'),
      nextButton: _props.nextButton && this.$el.querySelector('.vux-swiper-button-next'),
      prevButton: _props.prevButton && this.$el.querySelector('.vux-swiper-button-prev'),
      // init callback
      onInit: this._events['init'] && ((swiper) => { // fixd onInit
        this.$emit('init', swiper)
      })
    })
    // init
    this.swiper = new Swiper(this.$el, _props)
    // bind callbacks event
    for (let k in this._events) {
      if (k && !k.startsWith('hook')) {
        let e = k.replace(/(-\w)/g, function (s) {
          return s.toUpperCase().substring(1)
        })
        this.swiper.on(e, (swiper, evt) => {
          this.$emit(k, swiper, evt)
        })
      }
    }
  },
  beforeDestroy () {
    this.swiper && this.swiper.destroy(true, true)
  }
}
</script>

<style lang="less">
.vux-swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  /* Fix of Webkit flickering */
  z-index: 1;
}

.vux-swiper-container-no-flexbox .vux-swiper-slide {
  float: left;
}

.vux-swiper-container-vertical > .vux-swiper-wrapper {
  flex-direction: column;
}

.vux-swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  transition-property: transform;
  box-sizing: content-box;
}

.vux-swiper-container-android .vux-swiper-slide,
.vux-swiper-wrapper {
  transform: translate3d(0px,0,0);
}

.vux-swiper-container-multirow > .vux-swiper-wrapper {
  flex-wrap: wrap;
}

.vux-swiper-container-free-mode > .vux-swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto;
}

.vux-swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}


/* Auto Height */

.vux-swiper-container-autoheight,
.vux-swiper-container-autoheight .vux-swiper-slide {
  height: auto;
}

.vux-swiper-container-autoheight .vux-swiper-wrapper {
  align-items: flex-start;
  transition-property: transform,height;
}


/* Arrows */
.vux-swiper-button-prev,
.vux-swiper-button-next {
  position: absolute;
  top: 50%;
  width: 27px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;
}

.vux-swiper-button-prev.vux-swiper-button-disabled,
.vux-swiper-button-next.vux-swiper-button-disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}

.vux-swiper-button-prev,
.vux-swiper-container-rtl .vux-swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
  left: 10px;
  right: auto;
}

.vux-swiper-button-prev.vux-swiper-button-black,
.vux-swiper-container-rtl .vux-swiper-button-next.vux-swiper-button-black {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
}

.vux-swiper-button-prev.vux-swiper-button-white,
.vux-swiper-container-rtl .vux-swiper-button-next.vux-swiper-button-white {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
}

.vux-swiper-button-next,
.vux-swiper-container-rtl .vux-swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
  right: 10px;
  left: auto;
}

.vux-swiper-button-next.vux-swiper-button-black,
.vux-swiper-container-rtl .vux-swiper-button-prev.vux-swiper-button-black {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
}

.vux-swiper-button-next.vux-swiper-button-white,
.vux-swiper-container-rtl .vux-swiper-button-prev.vux-swiper-button-white {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
}


/* Pagination Styles */
.vux-swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 300ms;
  transform: translate3d(0,0,0);
  z-index: 10;
}

.vux-swiper-pagination.vux-swiper-pagination-hidden {
  opacity: 0;
}


/* Common Styles */
.vux-swiper-pagination-fraction,
.vux-swiper-pagination-custom,
.vux-swiper-container-horizontal > .vux-swiper-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 100%;
}


/* Bullets */
.vux-swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
}

button.vux-swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  appearance: none;
}

.vux-swiper-pagination-clickable .vux-swiper-pagination-bullet {
  cursor: pointer;
}

.vux-swiper-pagination-white .vux-swiper-pagination-bullet {
  background: #fff;
}

.vux-swiper-pagination-bullet-active {
  opacity: 1;
  background: #007aff;
}

.vux-swiper-pagination-white .vux-swiper-pagination-bullet-active {
  background: #fff;
}

.vux-swiper-pagination-black .vux-swiper-pagination-bullet-active {
  background: #000;
}

.vux-swiper-container-vertical > .vux-swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  transform: translate3d(0px,-50%,0);
}

.vux-swiper-container-vertical > .vux-swiper-pagination-bullets .vux-swiper-pagination-bullet {
  margin: 5px 0;
  display: block;
}

.vux-swiper-container-horizontal > .vux-swiper-pagination-bullets .vux-swiper-pagination-bullet {
  margin: 0 5px;
}


/* Progress */
.vux-swiper-pagination-progress {
  background: rgba(0,0,0,0.25);
  position: absolute;
}

.vux-swiper-pagination-progress .vux-swiper-pagination-progressbar {
  background: #007aff;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transform-origin: left top;
}

.vux-swiper-container-rtl .vux-swiper-pagination-progress .vux-swiper-pagination-progressbar {
  transform-origin: right top;
}

.vux-swiper-container-horizontal > .vux-swiper-pagination-progress {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}

.vux-swiper-container-vertical > .vux-swiper-pagination-progress {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}

.vux-swiper-pagination-progress.vux-swiper-pagination-white {
  background: rgba(255,255,255,0.5);
}

.vux-swiper-pagination-progress.vux-swiper-pagination-white .vux-swiper-pagination-progressbar {
  background: #fff;
}

.vux-swiper-pagination-progress.vux-swiper-pagination-black .vux-swiper-pagination-progressbar {
  background: #000;
}

/* Preloader */
.vux-swiper-lazy-preloader {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
  transform-origin: 50%;
  animation: vux-swiper-preloader-spin 1s steps(12,end) infinite;
}

.vux-swiper-lazy-preloader:after {
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  background-position: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
}

.vux-swiper-lazy-preloader-white:after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
}

@keyframes vux-swiper-preloader-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>

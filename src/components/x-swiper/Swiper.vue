<template>
<!-- Slider main container -->
<div class="swiper-container">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
  <!-- Slides -->
  <slot></slot>
  </div>
  <!-- If we need pagination -->
  <div v-if="pagination" class="swiper-pagination"></div>
  
  <!-- If we need navigation buttons -->
  <div v-if="prevButton" class="swiper-button-prev"></div>
  <div v-if="nextButton" class="swiper-button-next"></div>

</div>
</template>

<script>
// import Swiper from './swiper'
import Swiper from './swiper.dom' // no dom lib

export default {
  props: {
    direction: {
      type: String,
      default: 'horizontal'
    },
    touchEventsTarget: {
      type: String,
      default: 'container'
    },
    initialSlide: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 300
    },
    // autoplay
    autoplay: {
      type: [Boolean, Number],
      default: false
    },
    autoplayDisableOnInteraction: {
      type: Boolean,
      default: true
    },
    autoplayStopOnLast: {
      type: Boolean,
      default: false
    },
    // To support iOS's swipe-to-go-back gesture (when being used in-app,with UIWebView).
    iOSEdgeSwipeDetection: {
      type: Boolean,
      default: false
    },
    iOSEdgeSwipeThreshold: {
      type: Number,
      default: 20
    },
    // Free mode
    freeMode: {
      type: Boolean,
      default: false
    },
    freeModeMomentum: {
      type: Boolean,
      default: true
    },
    freeModeMomentumRatio: {
      type: Number,
      default: 1
    },
    freeModeMomentumBounce: {
      type: Boolean,
      default: true
    },
    freeModeMomentumBounceRatio: {
      type: Number,
      default: 1
    },
    freeModeSticky: {
      type: Boolean,
      default: false
    },
    freeModeMinimumVelocity: {
      type: Number,
      default: 0.02
    },
    // Autoheight
    autoHeight: {
      type: Boolean,
      default: false
    },
    // Set wrapper width
    setWrapperSize: {
      type: Boolean,
      default: false
    },
    // Virtual Translate
    virtualTranslate: {
      type: Boolean,
      default: false
    },
    // Effects
    // Parallax
    // Scrollbar
    // Keyboard Mousewheel
    // Hash Navigation
    // Breakpoints
    breakpoints: {
      type: Object,
      default: undefined
    },
    // Slides grid
    spaceBetween: {
      type: Number,
      default: 0
    },
    slidesPerView: {
      type: [Number, String],
      default: 1
    },
    slidesPerColumn: {
      type: Number,
      default: 1
    },
    slidesPerColumnFill: {
      type: String,
      default: 'column'
    },
    slidesPerGroup: {
      type: Number,
      default: 1
    },
    centeredSlides: {
      type: Boolean,
      default: false
    },
    slidesOffsetBefore: {
      type: Number,
      default: 0
    }, // in px
    slidesOffsetAfter: {
      type: Number,
      default: 0
    }, // in px
    // Round length
    roundLengths: {
      type: Boolean,
      default: false
    },
    // Touches
    touchRatio: {
      type: Number,
      default: 1
    },
    touchAngle: {
      type: Number,
      default: 45
    },
    simulateTouch: {
      type: Boolean,
      default: true
    },
    shortSwipes: {
      type: Boolean,
      default: true
    },
    longSwipes: {
      type: Boolean,
      default: true
    },
    longSwipesRatio: {
      type: Number,
      default: 0.5
    },
    longSwipesMs: {
      type: Number,
      default: 300
    },
    followFinger: {
      type: Boolean,
      default: true
    },
    onlyExternal: {
      type: Boolean,
      default: false
    },
    threshold: {
      type: Number,
      default: 0
    },
    touchMoveStopPropagation: {
      type: Boolean,
      default: true
    },
    // Unique Navigation Elements
    uniqueNavElements: {
      type: Boolean,
      default: true
    },
    // Pagination
    pagination: {
      type: Boolean,
      default: false
    },
    paginationElement: {
      type: String,
      default: 'span'
    },
    paginationClickable: {
      type: Boolean,
      default: false
    },
    paginationHide: {
      type: Boolean,
      default: false
    },
    paginationBulletRender: {
      type: Function,
      default: null
    },
    paginationProgressRender: {
      type: Function,
      default: null
    },
    paginationFractionRender: {
      type: Function,
      default: null
    },
    paginationCustomRender: {
      type: Function,
      default: null
    },
    paginationType: {
      type: String,
      default: 'bullets'
    }, // 'bullets' or 'progress' or 'fraction' or 'custom'
    // Resistance
    resistance: {
      type: Boolean,
      default: true
    },
    resistanceRatio: {
      type: Number,
      default: 0.85
    },
    // Next/prev buttons
    nextButton: {
      // type: [String,Object],
      type: Boolean,
      default: false
    },
    prevButton: {
      // type: [String,Object],
      type: Boolean,
      default: false
    },
    // Progress
    watchSlidesProgress: {
      type: Boolean,
      default: false
    },
    watchSlidesVisibility: {
      type: Boolean,
      default: false
    },
    // Cursor
    grabCursor: {
      type: Boolean,
      default: false
    },
    // Clicks
    preventClicks: {
      type: Boolean,
      default: true
    },
    preventClicksPropagation: {
      type: Boolean,
      default: true
    },
    slideToClickedSlide: {
      type: Boolean,
      default: false
    },
    // Lazy Loading
    lazyLoading: {
      type: Boolean,
      default: false
    },
    lazyLoadingInPrevNext: {
      type: Boolean,
      default: false
    },
    lazyLoadingInPrevNextAmount: {
      type: Number,
      default: 1
    },
    lazyLoadingOnTransitionStart: {
      type: Boolean,
      default: false
    },
    // Images
    preloadImages: {
      type: Boolean,
      default: true
    },
    updateOnImagesReady: {
      type: Boolean,
      default: true
    },
    // loop
    loop: {
      type: Boolean,
      default: false
    },
    loopAdditionalSlides: {
      type: Number,
      default: null
    },
    loopedSlides: {
      type: Number,
      default: null
    },
    // Control
    // Swiping/no swiping
    allowSwipeToPrev: {
      type: Boolean,
      default: true
    },
    allowSwipeToNext: {
      type: Boolean,
      default: true
    },
    swipeHandler: {
      type: String,
      default: null
    }, // '.swipe-handler',
    noSwiping: {
      type: Boolean,
      default: true
    },
    noSwipingClass: {
      type: String,
      default: 'swiper-no-swiping'
    },
    // NS
    // Observer
    observer: {
      type: Boolean,
      default: false
    },
    observeParents: {
      type: Boolean,
      default: false
    },
    // Accessibility
    // Callbacks
    runCallbacksOnInit: {
      type: Boolean,
      default: true
    }
    // Callbacks:
  },
  ready () {
    // console.log(this._events.ooo)
    this.swiper = new Swiper(this.$el, {
      direction: this.direction,
      touchEventsTarget: this.touchEventsTarget,
      initialSlide: this.initialSlide,
      speed: this.speed,
      // autoplay
      autoplay: this.autoplay,
      autoplayDisableOnInteraction: this.autoplayDisableOnInteraction,
      autoplayStopOnLast: this.autoplayStopOnLast,
      // To support iOS's swipe-to-go-back gesture (when being used in-app,with UIWebView).
      iOSEdgeSwipeDetection: this.iOSEdgeSwipeDetection,
      iOSEdgeSwipeThreshold: this.iOSEdgeSwipeThreshold,
      // Free mode
      freeMode: this.freeMode,
      freeModeMomentum: this.freeModeMomentum,
      freeModeMomentumRatio: this.freeModeMomentumRatio,
      freeModeMomentumBounce: this.freeModeMomentumBounce,
      freeModeMomentumBounceRatio: this.freeModeMomentumBounceRatio,
      freeModeSticky: this.freeModeSticky,
      freeModeMinimumVelocity: this.freeModeMinimumVelocity,
      // Autoheight
      autoHeight: this.autoHeight,
      // Set wrapper width
      setWrapperSize: this.setWrapperSize,
      // Virtual Translate
      virtualTranslate: this.virtualTranslate,
      // Effects
      // Parallax
      // Scrollbar
      // Keyboard Mousewheel
      // Hash Navigation
      // Breakpoints
      breakpoints: this.breakpoints,
      // Slides grid
      spaceBetween: this.spaceBetween,
      slidesPerView: this.slidesPerView,
      slidesPerColumn: this.slidesPerColumn,
      slidesPerColumnFill: this.slidesPerColumnFill,
      slidesPerGroup: this.slidesPerGroup,
      centeredSlides: this.centeredSlides,
      slidesOffsetBefore: this.slidesOffsetBefore, // in px
      slidesOffsetAfter: this.slidesOffsetAfter, // in px
      // Round length
      roundLengths: this.roundLengths,
      // Touches
      touchRatio: this.touchRatio,
      touchAngle: this.touchAngle,
      simulateTouch: this.simulateTouch,
      shortSwipes: this.shortSwipes,
      longSwipes: this.longSwipes,
      longSwipesRatio: this.longSwipesRatio,
      longSwipesMs: this.longSwipesMs,
      followFinger: this.followFinger,
      onlyExternal: this.onlyExternal,
      threshold: this.threshold,
      touchMoveStopPropagation: this.touchMoveStopPropagation,
      // Unique Navigation Elements
      uniqueNavElements: this.uniqueNavElements,
      // Pagination
      pagination: this.pagination && this.$el.querySelector('.swiper-pagination'),
      paginationElement: this.paginationElement,
      paginationClickable: this.paginationClickable,
      paginationHide: this.paginationHide,
      paginationBulletRender: this.paginationBulletRender,
      paginationProgressRender: this.paginationProgressRender,
      paginationFractionRender: this.paginationFractionRender,
      paginationCustomRender: this.paginationCustomRender,
      paginationType: this.paginationType, // 'bullets' or 'progress' or 'fraction' or 'custom'
      // Resistance
      resistance: this.resistance,
      resistanceRatio: this.resistanceRatio,
      // Next/prev buttons
      nextButton: this.nextButton && this.$el.querySelector('.swiper-button-next'),
      prevButton: this.nextButton && this.$el.querySelector('.swiper-button-prev'),
      // Progress
      watchSlidesProgress: this.watchSlidesProgress,
      watchSlidesVisibility: this.watchSlidesVisibility,
      // Cursor
      grabCursor: this.grabCursor,
      // Clicks
      preventClicks: this.preventClicks,
      preventClicksPropagation: this.preventClicksPropagation,
      slideToClickedSlide: this.slideToClickedSlide,
      // Lazy Loading
      lazyLoading: this.lazyLoading,
      lazyLoadingInPrevNext: this.lazyLoadingInPrevNext,
      lazyLoadingInPrevNextAmount: this.lazyLoadingInPrevNextAmount,
      lazyLoadingOnTransitionStart: this.lazyLoadingOnTransitionStart,
      // Images
      preloadImages: this.preloadImages,
      updateOnImagesReady: this.updateOnImagesReady,
      // loop
      loop: this.loop,
      loopAdditionalSlides: this.loopAdditionalSlides,
      loopedSlides: this.loopedSlides,
      // Control
      // Swiping/no swiping
      allowSwipeToPrev: this.allowSwipeToPrev,
      allowSwipeToNext: this.allowSwipeToNext,
      swipeHandler: this.swipeHandler, // '.swipe-handler',
      noSwiping: this.noSwiping,
      noSwipingClass: this.noSwipingClass,
      // NS
      // Observer
      observer: this.observer,
      observeParents: this.observeParents,
      // Accessibility
      // Callbacks
      runCallbacksOnInit: this.runCallbacksOnInit,
      // Callbacks:
      onInit: this._events['init'] && ((swiper) => { // fixd onInit
        this.$emit('init', swiper)
      })
    })
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
    this.swiper.destroy(true, true)
  }
}
</script>

<style lang="less">
.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  /* Fix of Webkit flickering */
  z-index: 1;
}

.swiper-container-no-flexbox .swiper-slide {
  float: left;
}

.swiper-container-vertical > .swiper-wrapper {
  -webkit-box-orient: vertical;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
}

.swiper-container-android .swiper-slide,
.swiper-wrapper {
  -webkit-transform: translate3d(0px,0,0);
  transform: translate3d(0px,0,0);
}

.swiper-container-multirow > .swiper-wrapper {
  -webkit-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.swiper-container-free-mode > .swiper-wrapper {
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  margin: 0 auto;
}

.swiper-slide {
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}


/* Auto Height */

.swiper-container-autoheight,
.swiper-container-autoheight .swiper-slide {
  height: auto;
}

.swiper-container-autoheight .swiper-wrapper {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-transition-property: -webkit-transform,height;
  transition-property: transform,height;
}


/* Arrows */
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  width: 27px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  -webkit-background-size: 27px 44px;
  background-size: 27px 44px;
  background-position: center;
  background-repeat: no-repeat;
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.35;
  cursor: auto;
  pointer-events: none;
}

.swiper-button-prev,
.swiper-container-rtl .swiper-button-next {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
  left: 10px;
  right: auto;
}

.swiper-button-prev.swiper-button-black,
.swiper-container-rtl .swiper-button-next.swiper-button-black {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
}

.swiper-button-prev.swiper-button-white,
.swiper-container-rtl .swiper-button-next.swiper-button-white {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
}

.swiper-button-next,
.swiper-container-rtl .swiper-button-prev {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E");
  right: 10px;
  left: auto;
}

.swiper-button-next.swiper-button-black,
.swiper-container-rtl .swiper-button-prev.swiper-button-black {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23000000'%2F%3E%3C%2Fsvg%3E");
}

.swiper-button-next.swiper-button-white,
.swiper-container-rtl .swiper-button-prev.swiper-button-white {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%23ffffff'%2F%3E%3C%2Fsvg%3E");
}


/* Pagination Styles */
.swiper-pagination {
  position: absolute;
  text-align: center;
  -webkit-transition: 300ms;
  transition: 300ms;
  -webkit-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
  z-index: 10;
}

.swiper-pagination.swiper-pagination-hidden {
  opacity: 0;
}


/* Common Styles */
.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-container-horizontal > .swiper-pagination-bullets {
  bottom: 10px;
  left: 0;
  width: 100%;
}


/* Bullets */
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
}

button.swiper-pagination-bullet {
  border: none;
  margin: 0;
  padding: 0;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
}

.swiper-pagination-clickable .swiper-pagination-bullet {
  cursor: pointer;
}

.swiper-pagination-white .swiper-pagination-bullet {
  background: #fff;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: #007aff;
}

.swiper-pagination-white .swiper-pagination-bullet-active {
  background: #fff;
}

.swiper-pagination-black .swiper-pagination-bullet-active {
  background: #000;
}

.swiper-container-vertical > .swiper-pagination-bullets {
  right: 10px;
  top: 50%;
  -webkit-transform: translate3d(0px,-50%,0);
  transform: translate3d(0px,-50%,0);
}

.swiper-container-vertical > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 5px 0;
  display: block;
}

.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 5px;
}


/* Progress */
.swiper-pagination-progress {
  background: rgba(0,0,0,0.25);
  position: absolute;
}

.swiper-pagination-progress .swiper-pagination-progressbar {
  background: #007aff;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transform-origin: left top;
  transform-origin: left top;
}

.swiper-container-rtl .swiper-pagination-progress .swiper-pagination-progressbar {
  -webkit-transform-origin: right top;
  transform-origin: right top;
}

.swiper-container-horizontal > .swiper-pagination-progress {
  width: 100%;
  height: 4px;
  left: 0;
  top: 0;
}

.swiper-container-vertical > .swiper-pagination-progress {
  width: 4px;
  height: 100%;
  left: 0;
  top: 0;
}

.swiper-pagination-progress.swiper-pagination-white {
  background: rgba(255,255,255,0.5);
}

.swiper-pagination-progress.swiper-pagination-white .swiper-pagination-progressbar {
  background: #fff;
}

.swiper-pagination-progress.swiper-pagination-black .swiper-pagination-progressbar {
  background: #000;
}

/* Preloader */
.swiper-lazy-preloader {
  width: 42px;
  height: 42px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -21px;
  margin-top: -21px;
  z-index: 10;
  -webkit-transform-origin: 50%;
  transform-origin: 50%;
  -webkit-animation: swiper-preloader-spin 1s steps(12,end) infinite;
  animation: swiper-preloader-spin 1s steps(12,end) infinite;
}

.swiper-lazy-preloader:after {
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%236c6c6c'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
  background-position: 50%;
  -webkit-background-size: 100%;
  background-size: 100%;
  background-repeat: no-repeat;
}

.swiper-lazy-preloader-white:after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D'0%200%20120%20120'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%3E%3Cdefs%3E%3Cline%20id%3D'l'%20x1%3D'60'%20x2%3D'60'%20y1%3D'7'%20y2%3D'27'%20stroke%3D'%23fff'%20stroke-width%3D'11'%20stroke-linecap%3D'round'%2F%3E%3C%2Fdefs%3E%3Cg%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(30%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(60%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(90%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(120%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.27'%20transform%3D'rotate(150%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.37'%20transform%3D'rotate(180%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.46'%20transform%3D'rotate(210%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.56'%20transform%3D'rotate(240%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.66'%20transform%3D'rotate(270%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.75'%20transform%3D'rotate(300%2060%2C60)'%2F%3E%3Cuse%20xlink%3Ahref%3D'%23l'%20opacity%3D'.85'%20transform%3D'rotate(330%2060%2C60)'%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
}

@-webkit-keyframes swiper-preloader-spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes swiper-preloader-spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
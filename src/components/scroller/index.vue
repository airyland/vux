<template>
  <div :style="styles">
    <div class="xs-container">
      <slot></slot>
      <slot name="pulldown"></slot>
      <slot name="pullup"></slot>
    </div>
  </div>
</template>

<script>
import objectAssign from 'object-assign'
import XScroll from 'vux-xscroll/build/cmd/xscroll.js'
import Pulldown from 'vux-xscroll/build/cmd/plugins/pulldown'
import Pullup from 'vux-xscroll/build/cmd/plugins/pullup'

const pulldownDefaultConfig = () => ({
  content: 'Pull Down To Refresh',
  height: 60,
  autoRefresh: false,
  downContent: 'Pull Down To Refresh',
  upContent: 'Release To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pulldown-'
})

const pullupDefaultConfig = () => ({
  content: 'Pull Up To Refresh',
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: 'Release To Refresh',
  upContent: 'Pull Up To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pullup-'
})

export default {
  name: 'scroller',
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          pulldownStatus: '',
          pullupStatus: ''
        }
      }
    },
    height: String,
    lockX: Boolean,
    lockY: Boolean,
    scrollbarX: Boolean,
    scrollbarY: Boolean,
    bounce: {
      type: Boolean,
      default: true
    },
    useOriginScroll: {
      type: Boolean,
      default: false
    },
    useTransition: {
      type: Boolean,
      default: true
    },
    preventDefault: {
      type: Boolean,
      default: false
    },
    stopPropagation: Boolean,
    boundryCheck: {
      type: Boolean,
      default: true
    },
    gpuAcceleration: {
      type: Boolean,
      default: true
    },
    usePulldown: {
      type: Boolean,
      default: false
    },
    usePullup: {
      type: Boolean,
      default: false
    },
    /**
    * refer to: http://xscroll.github.io/node_modules/xscroll/doc/PullDown.html
    */
    pulldownConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    pullupConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    enableHorizontalSwiping: {
      type: Boolean,
      default: false
    },
    scrollBottomOffset: {
      type: Number,
      default: 0
    }
  },
  methods: {
    reset (scrollPosition, duration, easing) {
      if (scrollPosition) {
        if (typeof scrollPosition.left !== 'undefined') {
          this._xscroll.scrollLeft(scrollPosition.left, duration, easing)
        }
        if (typeof scrollPosition.top !== 'undefined') {
          this._xscroll.scrollTop(scrollPosition.top, duration, easing)
        }
      }
      this._xscroll && this._xscroll.resetSize()
    },
    donePulldown () {
      this.pulldown.reset(() => {
        // repaint
        this.reset()
      })
      this.currentValue.pulldownStatus = 'default'
    },
    disablePullup () {
      // this._xscroll.unplug(this.pullup)
      this.pullup.stop()
      this.currentValue.pullupStatus = 'disabled'
    },
    enablePullup () {
      this.currentValue.pullupStatus = 'default'
      this.pullup.restart()
    },
    donePullup () {
      this.pullup.complete()
      this.reset()
      this.currentValue.pullupStatus = 'default'
    },
    getStyles () {
      let height = this.height
      if (!this.height && (this.$el && !this.$el.style.height) && this.lockX) {
        height = `${document.documentElement.clientHeight}px`
        this.reset()
      }

      if (this.height && this.height.indexOf('-') === 0) {
        height = `${document.documentElement.clientHeight + parseInt(this.height)}px`
      }
      this.styles = {
        height: `${height}`
      }
    }
  },
  created () {
    if (!this.value) {
      this.currentValue = {
        pulldownStatus: '',
        pullupStatus: ''
      }
    } else {
      this.currentValue = this.value
    }
    this.handleOrientationchange = () => {
      setTimeout(() => {
        this.reset()
      }, 100)
    }
  },
  data () {
    return {
      currentValue: {},
      styles: {}
    }
  },
  watch: {
    currentValue: {
      handler: function (val) {
        this.$emit('input', pure(val))
      },
      deep: true
    },
    height () {
      this.getStyles()
    },
    value: {
      handler: function (val) {
        if (val.pullupStatus === 'default' && this.currentValue.pullupStatus !== 'default') {
          this.donePullup()
        }
        if (val.pulldownStatus === 'default' && this.currentValue.pulldownStatus !== 'default') {
          this.donePulldown()
        }
        if (val.pullupStatus === 'disabled' && this.currentValue.pullupStatus !== 'disabled') {
          this.disablePullup()
        }
        if (val.pullupStatus === 'enabled' && this.currentValue.pullupStatus === 'disabled') {
          this.enablePullup()
        }
      },
      deep: true
    }
  },
  mounted () {
    this.uuid = Math.random().toString(36).substring(3, 8)
    this.$nextTick(() => {
      this.$el.setAttribute('id', `vux-scroller-${this.uuid}`)
      let content = null
      if (this.$slots.default) {
        content = this.$slots.default[0].elm
      }
      if (!content) {
        throw new Error('no content is found')
      }

      this._xscroll = new XScroll({
        renderTo: `#vux-scroller-${this.uuid}`,
        lockX: this.lockX,
        lockY: this.lockY,
        scrollbarX: this.scrollbarX,
        scrollbarY: this.scrollbarY,
        content: content,
        bounce: this.bounce,
        useOriginScroll: this.useOriginScroll,
        useTransition: this.useTransition,
        preventDefault: this.preventDefault,
        boundryCheck: this.boundryCheck,
        gpuAcceleration: this.gpuAcceleration,
        stopPropagation: this.stopPropagation
      })

      this._xscroll.on('scroll', () => {
        if (this._xscroll) {
          const top = this._xscroll.getScrollTop()
          this.$emit('on-scroll', {
            top: top,
            left: this._xscroll.getScrollLeft()
          })
          const containerHeight = this._xscroll.containerHeight
          const scrollHeight = this._xscroll.height
          if (top >= containerHeight - scrollHeight - this.scrollBottomOffset) {
            this.$emit('on-scroll-bottom')
          }
        }
      })

      if (this.usePulldown) {
        // if use slot=pulldown
        let container = this.$slots.pulldown
        let config = objectAssign(pulldownDefaultConfig(), this.pulldownConfig)
        if (container) {
          config.container = container[0].elm
        }
        this.pulldown = new Pulldown(config)
        this._xscroll.plug(this.pulldown)
        this.pulldown.on('loading', (e) => {
          this.$emit('on-pulldown-loading', this.uuid)
        })
        this.pulldown.on('statuschange', (val) => {
          this.currentValue.pulldownStatus = val.newVal
        })
      }

      if (this.usePullup) {
        // if use slot=pullup
        let container = this.$slots.pullup
        let config = objectAssign(pullupDefaultConfig(), this.pullupConfig)

        if (container) {
          config.container = container[0].elm
        }
        this.pullup = new Pullup(config)
        this._xscroll.plug(this.pullup)
        this.pullup.on('loading', (e) => {
          this.$emit('on-pullup-loading', this.uuid)
        })
        this.pullup.on('statuschange', (val) => {
          this.currentValue.pullupStatus = val.newVal
        })
      }

      if (this.enableHorizontalSwiping) {
        this._xscroll.on('panstart', (e) => {
          if (e.direction === 2 || e.direction === 4) {
            e.preventDefault()
            if (this.scrollbarY) {
              this._xscroll.userConfig.scrollbarY = false
            }
            this._xscroll.userConfig.lockY = true
          }
        })
        this._xscroll.on('panend', () => {
          if (this.scrollbarY) {
            this._xscroll.userConfig.scrollbarY = true
          }
          this._xscroll.userConfig.lockY = false
        })
      }

      this._xscroll.render()
      window.addEventListener('orientationchange', this.handleOrientationchange, false)
    })
    this.getStyles()
  },
  updated () {
    this.reset()
  },
  beforeDestroy () {
    if (this.pullup) {
      this._xscroll.unplug(this.pullup)
      this.pullup.pluginDestructor()
    }
    if (this.pulldown) {
      this._xscroll.unplug(this.pulldown)
      this.pulldown.pluginDestructor()
    }
    window.removeEventListener('orientationchange', this.handleOrientationchange, false)
    this._xscroll.destroy()
    this._xscroll = null
  }
}

function pure (obj) {
  return JSON.parse(JSON.stringify(obj))
}
</script>

<style>
.xs-plugin-pullup-container {
  text-align: center;
}
</style>

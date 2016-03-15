<template>
  <div>
    <div class="xs-container">
      <slot></slot>
      <slot name="pulldown"></slot>
    </div>
  </div>
</template>

<script>
import XScroll from '../../../node_modules/vux-xscroll/build/cmd/xscroll.js'
import Pulldown from '../../../node_modules/vux-xscroll/build/cmd/plugins/pulldown'

const pulldownDefaultConfig = {
  content: 'Pull Down To Refresh',
  height: 60,
  autoRefresh: false,
  downContent: 'Pull Down To Refresh',
  upContent: 'Release To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pulldown-'
}

export default {
  props: {
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
      default: true
    },
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
    /**
    * refer to: http://xscroll.github.io/node_modules/xscroll/doc/PullDown.html
    */
    pulldownConfig: {
      type: Object,
      default () {
        return {}
      }
    },
    pulldownStatus: {
      type: String,
      default: 'default',
      twoWay: true
    }
  },
  compiled () {
    this.uuid = Math.random().toString(36).substring(3, 8)
  },
  ready () {
    const _this = this
    const uuid = Math.random().toString(36).substring(3, 8)
    this.$el.setAttribute('id', `vux-scroller-${uuid}`)
    let content = null
    const slotChildren = this.$el.querySelector('.xs-container').childNodes
    for (let i = 0; i < slotChildren.length; i++) {
      if (slotChildren[i].nodeType === 1) {
        content = slotChildren[i]
        break
      }
    }
    if (!content) {
      throw new Error('no content is found')
    }

    this._xscroll = new XScroll({
      renderTo: `#vux-scroller-${uuid}`,
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
      gpuAcceleration: this.gpuAcceleration
    })

    if (this.usePulldown) {
      // if use slot=pulldown
      let container = this.$el.querySelector('div[slot="pulldown"]')
      let config = Object.assign(pulldownDefaultConfig, this.pulldownConfig)
      if (container) {
        config.container = container
      }
      this.pulldown = new Pulldown(config)
      this._xscroll.plug(this.pulldown)
      _this.pulldown.on('loading', function (e) {
        _this.$dispatch('pulldown:loading', _this.uuid)
      })
      _this.pulldown.on('statuschange', function (val) {
        _this.pulldownStatus = val.newVal
      })
    }
    this._xscroll.render()
  },
  events: {
    'pulldown:reset': function (uuid) {
      // set pulldown status to default
      this.pulldownStatus = 'default'
      const _this = this
      if (uuid === _this.uuid) {
        _this.pulldown.reset(function () {
          // repaint
          _this._xscroll.render()
        })
      }
    }
  },
  beforeDestroy () {
    this._xscroll.destroy()
    this.pulldown && this.pulldown.pluginDestructor()
  }
}
</script>
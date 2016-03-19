<template>
  <div>
    <div class="xs-container">
      <slot></slot>
      <slot name="pulldown"></slot>
      <slot name="pullup"></slot>
    </div>
  </div>
</template>

<script>
import XScroll from 'vux-xscroll/build/cmd/xscroll.js'
import Pulldown from 'vux-xscroll/build/cmd/plugins/pulldown'
import Pullup from 'vux-xscroll/build/cmd/plugins/pullup'

const pulldownDefaultConfig = {
  content: 'Pull Down To Refresh',
  height: 60,
  autoRefresh: false,
  downContent: 'Pull Down To Refresh',
  upContent: 'Release To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pulldown-'
}

const pullupDefaultConfig = {
  pullUpHeight: 60,
  height: 40,
  autoRefresh: false,
  downContent: 'Release To Refresh',
  upContent: 'Pull Up To Refresh',
  loadingContent: 'Loading...',
  clsPrefix: 'xs-plugin-pullup-'
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
    pulldownStatus: {
      type: String,
      default: 'default',
      twoWay: true
    },
    pullupStatus: {
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
      _this.pulldown = new Pulldown(config)
      _this._xscroll.plug(this.pulldown)
      _this.pulldown.on('loading', function (e) {
        _this.$dispatch('pulldown:loading', _this.uuid)
      })
      _this.pulldown.on('statuschange', function (val) {
        _this.pulldownStatus = val.newVal
      })
    }

    if (this.usePullup) {
      // if use slot=pullup
      let container = this.$el.querySelector('div[slot="pullup"]')
      let config = Object.assign(pullupDefaultConfig, _this.pullupConfig)
      if (container) {
        config.container = container
      }
      _this.pullup = new Pullup(config)
      _this._xscroll.plug(this.pullup)
      _this.pullup.on('loading', function (e) {
        _this.$dispatch('pullup:loading', _this.uuid)
      })
      _this.pullup.on('statuschange', function (val) {
        _this.pullupStatus = val.newVal
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
    },
    'pullup:reset': function (uuid) {
      // set pulldown status to default
      this.pullupStatus = 'default'
      const _this = this
      if (uuid === _this.uuid) {
        _this.pullup.complete()
        _this._xscroll.render()
      }
    },
    'pullup:done': function (uuid) {
      this._xscroll.unplug(this.pullup)
    }
  },
  beforeDestroy () {
    this._xscroll.destroy()
    this.pulldown && this.pulldown.pluginDestructor()
  }
}
</script>

<style>
.xs-plugin-pullup-container {
  text-align: center;
}
</style>
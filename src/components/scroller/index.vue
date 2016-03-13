<template>
  <div>
    <div class="xs-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import XScroll from '../../../node_modules/xscroll/build/cmd/xscroll.js'

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
    }
  },
  ready () {
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
    this._xscroll.render()
  },
  beforeDestroy () {
    this._xscroll.destroy()
  }
}
</script>
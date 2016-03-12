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
      lockX: false,
      lockY: true,
      scrollbarX: false,
      content: content
    })
    this._xscroll.render()
  },
  beforeDestroy () {
    this._xscroll.destroy()
  }
}
</script>
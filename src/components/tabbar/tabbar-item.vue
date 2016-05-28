<template>
  <a href="javascript:;" class="weui_tabbar_item" :class="{'weui_bar_item_on': $parent.index === index}" @click="onClick">
    <div class="weui_tabbar_icon" :class="{'vux-reddot': showDot}">
      <slot name="icon"></slot>
    </div>
    <p class="weui_tabbar_label">
      <slot name="label"></slot>
    </p>
  </a>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    showDot: {
      type: Boolean,
      default: false
    }
  },
  ready () {
    this.$parent.updateIndex()
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.updateIndex()
    })
  },
  methods: {
    onClick () {
      this.selected = true
      this.$parent.index = this.index
    }
  },
  data () {
    return {
      index: -1
    }
  }
}
</script>
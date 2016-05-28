<template>
  <div class="vux-tab-item" :class="[selected ? activeClass : '', {'vux-tab-selected': selected}]" :style="style" @click="tabClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    activeClass: String
  },
  ready () {
    this.$parent.updateIndex()
    if (this.selected) {
      this.tabClick()
    }
  },
  beforeDestroy () {
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.updateIndex()
    })
  },
  watch: {
    selected (val) {
      if (val) {
        this.tabClick()
      }
    }
  },
  methods: {
    tabClick () {
      this.$parent.index = this.index
    }
  },
  computed: {
    style () {
      return {
        borderWidth: this.$parent.lineWidth + 'px',
        borderColor: this.$parent.activeColor,
        color: this.selected ? this.$parent.activeColor : this.$parent.defaultColor,
        border: this.$parent.animate ? 'none' : 'auto'
      }
    }
  },
  data () {
    return {
      index: -1
    }
  }
}
</script>

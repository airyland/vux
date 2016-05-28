<template>
  <div class="weui_tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  ready () {
    this.updateIndex()
  },
  methods: {
    updateIndex () {
      if (!this.$children) return
      this.number = this.$children.length
      let children = this.$children
      for (let i = 0; i < children.length; i++) {
        children[i].index = i
        if (children[i].selected) {
          this.index = i
        }
      }
    }
  },
  data () {
    return {
      index: 0
    }
  }
}
</script>
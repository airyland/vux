const parentMixin = {
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
  props: {
    index: {
      type: Number,
      default: -1
    }
  },
  watch: {
    index (val, oldVal) {
      oldVal > -1 && this.$children[oldVal] && (this.$children[oldVal].selected = false)
      this.$children[val].selected = true
    }
  },
  data () {
    return {
      number: this.$children.length
    }
  }
}

const childMixin = {
  props: {
    selected: {
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
    onItemClick () {
      this.selected = true
      this.$parent.index = this.index
      this.$emit('on-item-click')
    }
  },
  watch: {
    selected (val) {
      if (val) {
        this.$parent.index = this.index
      }
    }
  },
  data () {
    return {
      index: -1
    }
  }
}

export {
  parentMixin,
  childMixin
}


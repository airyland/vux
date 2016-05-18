<template>
  <a class="vux-button-tab-item" :class="class" href="javascript:" :style="style" @click="onClick">
    <slot></slot>
  </a>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick: function () {
      this.$dispatch('on-item-click', this.$el.getAttribute('data-index'))
      this.selected = true
    }
  },
  events: {
    'on-item-click': function (dataIndex) {
      const domIndex = this.$el.getAttribute('data-index')
      this.selected = domIndex === dataIndex
      this.shouldRemoveBorder = (dataIndex - 1) === domIndex - 0
    }
  },
  computed: {
    class () {
      return {
        'vux-button-group-current': this.selected,
        'no-border-right': this.shouldRemoveBorder
      }
    },
    style () {
      if (this.$parent.height) {
        return {
          height: `${this.$parent.height}px`,
          lineHeight: `${this.$parent.height}px`
        }
      }
    }
  },
  data () {
    return {
      shouldRemoveBorder: false
    }
  }
}
</script>
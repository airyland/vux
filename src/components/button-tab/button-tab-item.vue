<template>
  <a class="vux-button-tab-item" :class="{'vux-button-group-current': selected, 'no-border-right': shouldRemoveBorder}" href="javascript:" @click="onClick">
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
  data () {
    return {
      shouldRemoveBorder: false
    }
  }
}
</script>
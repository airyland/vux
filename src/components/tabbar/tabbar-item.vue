<template>
  <a href="javascript:;" class="weui_tabbar_item" :class="{'weui_bar_item_on': selected}" @click="onClick">
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
  methods: {
    onClick: function () {
      this.$dispatch('on-item-click', this.$el.getAttribute('data-index'))
      this.selected = true
    }
  },
  events: {
    'on-item-click': function (dataIndex) {
      this.selected = this.$el.getAttribute('data-index') === dataIndex
    }
  }
}
</script>
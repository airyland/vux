<template>
  <div class="vux-tab-item" :class="[selected?activeClass:'', {'vux-tab-selected':selected}]" :style="{borderWidth:$parent.lineWidth+'px',borderColor:$parent.activeColor,color:selected ? $parent.activeColor : $parent.defaultColor, 'border': $parent.animate ? 'none' : 'auto'}" @click="tabClick()">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      required: false,
      default: false
    },
    'activeClass': {
      type: String
    }
  },
  watch: {
    selected: function (val) {
      if (val) {
        this.tabClick()
      }
    }
  },
  methods: {
    tabClick: function () {
      this.$parent.index = this.$el.getAttribute('data-index')
    }
  }
}
</script>

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
      required: false,
      default: false
    },
    'activeClass': String
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
  }
}
</script>

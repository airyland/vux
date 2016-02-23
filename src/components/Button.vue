<template>
	<a href="javascript:" class="weui_btn" :class="{'weui_btn_disabled':disabled, 'weui_btn_primary':type==='primary', 'weui_btn_warn':type==='warn', 'weui_btn_default':type==='default'}" @click="click">
		{{text}}<slot></slot>
	</a>
</template>

<script>
export default {
  props: {
    type: {
      required: false,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    text: {
      type: String,
      required: false
    }
  },
  methods: {
    click: function () {
      if (!this.disabled) {
        this.$dispatch('click')
      }
    }
  }
}
</script>

<style>
</style>
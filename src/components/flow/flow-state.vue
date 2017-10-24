<template>
  <div class="weui-wepay-flow__li" :class="{'weui-wepay-flow__li_done': isDone}">
    <div class="weui-wepay-flow__state">{{ state }}</div>
    <p :class="`weui-wepay-flow__title-${titlePosition}`">
      <slot name="title">{{ title }}</slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'flow-state',
  props: {
    state: [String, Number],
    title: String,
    isDone: Boolean
  },
  computed: {
    titlePosition () {
      return this.$parent.orientation === 'vertical' ? 'right' : 'bottom'
    }
  }
}
</script>
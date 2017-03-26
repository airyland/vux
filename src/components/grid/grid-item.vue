<template>
  <a href="javascript:;" class="weui-grid" @click="onClick">
    <div class="weui-grid__icon">
      <slot name="icon"><img :src="icon" alt=""></slot>
    </div>
    <p class="weui-grid__label"><slot name="label"><span v-html="label"></span></slot></p>
    <slot></slot>
   </a>
</template>

<script>
import { go } from '../../libs/router'

export default {
  props: ['icon', 'label', 'link'],
  methods: {
    onClick () {
      this.$emit('on-item-click')
      go(this.link, this.$router)
    }
  }
}
</script>

<template>
  <a href="javascript:;" class="weui-grid">
    <div class="weui-grid__icon">
      <slot name="icon"><img :src="icon" alt=""></slot>
    </div>
    <p class="weui-grid__label" v-if="label" v-html="label"><slot name="label"></slot></p>
    <slot></slot>
   </a>
</template>

<script>
export default {
  props: ['icon', 'label']
}
</script>

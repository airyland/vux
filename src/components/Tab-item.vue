<template>
  <div class="vuee-tab-item" :class="{'vuee-tab-selected':selected}"><slot></slot></div>
</template>

<script>
  export default {
    props: {
      selected: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>
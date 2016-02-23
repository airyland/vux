<template>
  <div class="vux-tab-item" :class="{'vux-tab-selected':selected}" :style="{borderWidth:$parent.lineWidth+'px',borderColor:$parent.color,color:$parent.color}"><slot></slot></div>
</template>

<script>
  export default {
    ready () {
    },
    props: {
      selected: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>
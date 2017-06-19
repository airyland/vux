<template>
  <div :style="{margin:gap}"><slot></slot></div>
</template>

<script>
export default {
  name: 'box',
  props: {
    gap: String
  }
}
</script>

<template>
  <div :style="{margin:gap}"><slot></slot></div>
</template>

<script>
  export default {
    props: {
      gap: String
    }
  }
</script>

<template>
  <p class="p">hello</p>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from Component A!'
    }
  }
}
</script>

<style lang="less">
.p {
  color: @theme-p-color;
}
</style>

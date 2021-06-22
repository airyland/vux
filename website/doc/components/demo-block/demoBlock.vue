<template>
  <div>
    <slot name="highlight"></slot>
    <slot></slot>
    <p class="online-part">
      <a href="//gitpod.io/#https://github.com/jdf2e/nutui.git" target="_blank" class="online-btn">在线运行</a>
    </p>
  </div>
</template>
<script>
export default {
  setup() {
    function onlineFun() {
      alert('hello');
    }
    return {
      onlineFun
    };
  }
};
</script>
<style lang="scss" scoped>
.online-part {
  display: flex;
  justify-content: flex-end;
  .online-btn {
    display: block;
    padding: 10px;
    background: #eee;
    cursor: pointer;
  }
}
</style>

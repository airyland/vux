<template>
  <div>
    <div v-orientation="landscape" class="landscape"><div>竖屏观看更合适哦</div></div>
    <div v-orientation="portrait" class="portrait"><div>翻转手机看效果</div></div>
  </div>
</template>

<script>
import Orientation from '../components/orientation/'

export default {
  directives: {
    Orientation
  }
}
</script>

<style scoped>
.landscape, .portrait {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  left: 0;
  top: 0;
  color: #fff;
}
.landscape > div, .portrait > div {
  width: 100%;
  height: 100%;
  text-align: center;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="donate">
    <img src="https://i.loli.net/2017/10/26/59f15b02a1739.jpg" class="donate-img">
    <p class="desc">感谢捐赠，但是捐赠并不会让你在该项目上有任何特权。
    <br>
    购买【世界和我】产品也是支持该项目发展。
    <br>
    （天猫搜索 livingearth）
    </p>
  </div>
</template>

<script>
import { Divider } from 'vux'

export default {
  components: {
    Divider
  }
}
</script>

<style scoped>
.donate {
  text-align: center;
  background-color: #fff;
}
.donate-img {
  max-width: 100%;
}
.desc {
  color: #999;
  font-size: 12px;
}
</style>
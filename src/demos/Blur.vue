<template>
  <div style="">
    <blur :blur-amount=40 :url="url">
      <p class="center"><img :src="url"></p>
    </blur>
    <flexbox :gutter="0">
      <flexbox-item v-for="img in images"><img :src="img" style="width:100%" @click="url = img"/></flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Blur } from '../components'

export default {
  components: {
    Blur,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      images: [
        'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
        'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
      ],
      url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
    }
  }
}
</script>

<style scoped>
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
</style>

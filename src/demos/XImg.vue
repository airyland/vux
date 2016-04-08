<template>
  <div>
    <div v-for="src in list" style="background-color:yellow;text-align:center;">
      <span style="font-size:20px;">Loading</span>
      <x-img :src="src" @success="success" @error="error" class="ximg-demo" error-class="ximg-error" :offset=-300></x-img>
    </div>
  </div>
</template>

<script>
import { XImg } from '../components/'
export default {
  components: {
    XImg
  },
  methods: {
    success: function (src, ele) {
      console.log('success load', src)
      const span = ele.parentNode.querySelector('span')
      ele.parentNode.removeChild(span)
    },
    error: function (src, ele, msg) {
      console.log('error load', msg, src)
      const span = ele.parentNode.querySelector('span')
      span.innerText = 'load error'
    }
  },
  data () {
    return {
      list: [
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test1.jpg',
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test2.jpg',
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test0.jpg',
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test4.jpg',
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test5.jpg',
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test6.jpg',
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test7.jpg',
        'https://cdn.rawgit.com/vux-components/vue-lazyload/gh-pages/dist/test8.jpg'
      ]
    }
  }
}
</script>

<style>
.ximg-demo {
  width: 100%;
  height: auto;
}
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}
</style>

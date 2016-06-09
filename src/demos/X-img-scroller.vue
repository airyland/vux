<template>
  <div>
    <scroller :lock-x :scrollbar-y height="600px" v-ref:scroller style="border-bottom:1px solid green">
      <div>
        <div v-for="src in list" style="background-color:yellow;text-align:center;">
          <span style="font-size:20px;">Loading</span>
          <x-img :src="src" :scroller="$refs.scroller" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="300"></x-img>
        </div>
      </div>
    </scroller>
  </div>
</template>

<script>
import { XImg, Scroller } from '../components'
export default {
  components: {
    XImg,
    Scroller
  },
  methods: {
    success (src, ele) {
      console.log('success load', src)
      const span = ele.parentNode.querySelector('span')
      ele.parentNode.removeChild(span)
    },
    error (src, ele, msg) {
      console.log('error load', msg, src)
      const span = ele.parentNode.querySelector('span')
      span.innerText = 'load error'
    }
  },
  data () {
    return {
      list: [
        'https://o5omsejde.qnssl.com/demo/test1.jpg',
        'https://o5omsejde.qnssl.com/demo/test2.jpg',
        'https://o5omsejde.qnssl.com/demo/test0.jpg',
        'https://o5omsejde.qnssl.com/demo/test4.jpg',
        'https://o5omsejde.qnssl.com/demo/test5.jpg',
        'https://o5omsejde.qnssl.com/demo/test6.jpg',
        'https://o5omsejde.qnssl.com/demo/test7.jpg',
        'https://o5omsejde.qnssl.com/demo/test8.jpg'
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

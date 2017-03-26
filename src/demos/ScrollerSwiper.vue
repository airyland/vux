<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown @on-pulldown-loading="load" enable-horizontal-swiping ref="scroller" height="400px">
       <div class="box2">
          <div style="height:180px;">
            <swiper :list="list" direction="horizontal" auto height="180px"></swiper>
          </div>
          <p v-for="i in 80">placeholder {{i}}</p>
       </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, Swiper } from 'vux'

export default {
  components: {
    Scroller,
    Swiper
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.scroller.reset()
    })
  },
  methods: {
    load (uuid) {
      setTimeout(() => {
        this.$refs.scroller.donePulldown()
      }, 2000)
    }
  },
  data () {
    return {
      list: [{
        url: '',
        img: 'https://static.vux.li/demo/1.jpg',
        title: '如何手制一份秋意的茶？'
      }, {
        url: '',
        img: 'https://static.vux.li/demo/2.jpg',
        title: '茶包VS原叶茶'
      }, {
        url: '',
        img: 'https://static.vux.li/demo/3.jpg',
        title: '播下茶籽，明春可发芽？'
      }]
    }
  }
}
</script>
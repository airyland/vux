<template>
  <div>
    <scroller lock-x scrollbar-y use-pulldown @pulldown:loading="load" enable-horizontal-swiping>
       <div class="box2">
          <swiper :list="list" direction="horizontal" auto :min-moving-distance="20" height="180px"></swiper>
          <p v-for="i in 80">placeholder {{i}}</p>
       </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, Swiper } from '../components'

export default {
  components: {
    Scroller,
    Swiper
  },
  methods: {
    load (uuid) {
      const _this = this
      setTimeout(function () {
        _this.$broadcast('pulldown:reset', uuid)
      }, 2000)
    }
  },
  data () {
    return {
      list: [{
        url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400385458&ampidx=1&ampsn=78f6b8d99715384bdcc7746596d88359&ampscene=19#wechat_redirect',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
        title: '如何手制一份秋意的茶？'
      }, {
        url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400160890&ampidx=1&ampsn=29ef02af25793a11a3f6aec92bfb46c1&ampscene=19#wechat_redirect',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
        title: '茶包VS原叶茶'
      }, {
        url: 'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&ampmid=400094682&ampidx=1&ampsn=8231a2053b772b2108784fccc254d28c&ampscene=19#wechat_redirect',
        img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
        title: '播下茶籽，明春可发芽？'
      }]
    }
  }
}
</script>
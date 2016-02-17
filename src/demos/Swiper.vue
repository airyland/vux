<template>
  <div>
    <swiper :list="list"></swiper>
  <div>
</template>

<script>
  import Swiper from '../components/Swiper/'
  export default {
    components: {
      Swiper
    },
    data: function(){
      return {
        list:  [{
        url:'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&amp;mid=400385458&amp;idx=1&amp;sn=78f6b8d99715384bdcc7746596d88359&amp;scene=19#wechat_redirect',
        img:'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
        title:'如何手制一份秋意的茶？'
      },{
        url:'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&amp;mid=400160890&amp;idx=1&amp;sn=29ef02af25793a11a3f6aec92bfb46c1&amp;scene=19#wechat_redirect',
        img:'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
        title:'茶包VS原叶茶'
      },{
        url:'http://mp.weixin.qq.com/s?__biz=MzAxNjU0MDYxMg==&amp;mid=400094682&amp;idx=1&amp;sn=8231a2053b772b2108784fccc254d28c&amp;scene=19#wechat_redirect',
        img:'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
        title:'播下茶籽，明春可发芽？'
      }]
      }
    }
 }
</script>
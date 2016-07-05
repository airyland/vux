<template>
  <div class="x-swiper-demo">
    <group-title>THX to: <a href="https://github.com/nolimits4web/Swiper" target="_blank">https://github.com/nolimits4web/Swiper</a></group-title>
    <group-title>
    你可以使用和nolimits4web/Swiper差不多所有的属性和事件：
    相比nolimits4web/Swiper去掉了以下插件：
        effects,scroller,controller,hashnav,keyboard,mousewheel,parallax,plugins,ally，
    所以和以上插件相关的设置将不被支持。
    </group-title>

    <x-swiper v-ref:xswiper style="height: 250px;"
    direction="horizontal"
    :pagination="true" :prev-button="true" :next-button="true" :loop="true"
    :autoplay="list.length>1 ? 3000 : false"
    :autoplay-disable-on-Interaction="false"
    :pagination-clickable="true"
    :pagination-bullet-render="paginationBulletRender"
    @init="onSwiperInit"
    @tap="onTap"
    @slide-next-end="onSlideNextEnd">
      <x-swiper-item v-for="item in list">
        <img :src="item.img">
      </x-swiper-item>
    </x-swiper>
  </div>
</template>

<script>
import { XSwiper, XSwiperItem, GroupTitle } from '../components'

const demoList =
[{
  url: 'javascript:',
  img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/1.jpg',
  title: '如何手制一份秋意的茶？'
}, {
  url: 'javascript:',
  img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/2.jpg',
  title: '茶包VS原叶茶'
}, {
  url: 'javascript:',
  img: 'http://7xqzw4.com2.z0.glb.qiniucdn.com/3.jpg',
  title: '播下茶籽，明春可发芽？'
}]

export default {
  components: {
    XSwiper,
    XSwiperItem,
    GroupTitle
  },
  data () {
    return {
      list: demoList
    }
  },
  ready () {
    // you can reference swiper as below
    console.log('ready', this.$refs.xswiper.swiper)
  },
  methods: {
    paginationBulletRender (index, className) {
      // console.log(index, className)
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    },
    onSwiperInit (swiper) {
      console.log('Swiper初始化了')
    },
    onTap (swiper, event) {
      // console.log('onTap', event)
    },
    onSlideNextEnd (swiper) {
      // console.log('onSlideNextEnd')
    }
  }
}
</script>
<style lang="less">
.x-swiper-demo {
    .weui_cells_title {
        word-break: break-all;
    }
    .vux-swiper-container {
        img {
            width: 100%;
            height: 100%;
        }

        .vux-swiper-pagination {
            bottom: 0!important;
            background-image: linear-gradient(180deg,transparent 0,rgba(51,51,51,.3));

            .vux-swiper-pagination-bullet {
                width: 20px;
                height: 20px;

                &.vux-swiper-pagination-bullet-active {
                    background-color: #E84A01;
                }
            }
        }
    }

}
</style>

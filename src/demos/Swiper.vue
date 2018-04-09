<template>
  <div>
    <group-title>THX to: https://github.com/wechatui/swiper</group-title>
    <group-title>list模式下，默认高度为180px, 如果设置aspect-ratio会根据宽度自动计算高度</group-title>
    <swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
    <p class="copyright">Image Source: http://www.gratisography.com/</p>
    <p>current index: {{demo01_index}}</p>
    <x-button @click.native="demo01_index = 0">go to 0</x-button>
    <x-button @click.native="demo01_index = 1">go to 1</x-button>
    <x-button @click.native="demo01_index = 2">go to 2</x-button>

    <br/>
    <br/>
    <swiper :list="demo01_list" v-model="demo02_index" @on-index-change="demo01_onIndexChange"></swiper>
    <br>
    <br>
    <divider>华丽的分割线</divider>


    <group-title>设置aspect-ratio, 将自动根据宽度计算高度</group-title>
    <swiper :list="demo02_list" style="width:85%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></swiper>

    <br/>
    <br/>
    <divider>华丽的分割线</divider>

    <group-title>自动轮播</group-title>
    <swiper :list="demo03_list" auto style="width:80%;margin:0 auto;" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>
    <br/>
    <br/>
    <divider>华丽的分割线</divider>

    <group-title>use swiper-item for image list</group-title>
    <swiper :aspect-ratio="300/800">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index"><img :src="item"></swiper-item>
    </swiper>

    <br>
    <br>

    <group-title>set index = 1 with swiper-item</group-title>
    <swiper :aspect-ratio="300/800" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index">
        <img :src="item">
      </swiper-item>
    </swiper>
    <br>
    {{ swiperItemIndex }}
    <br>
    <x-button @click.native="swiperItemIndex = 0">go to 0</x-button>
    <x-button @click.native="swiperItemIndex = 1">go to 1</x-button>
    <x-button @click.native="swiperItemIndex = 2">go to 2</x-button>


    <br/>
    <br/>
    <divider>华丽的分割线</divider>

    <group-title>Async setting list data</group-title>
    <swiper :list="demo05_list" auto height="180px" @on-index-change="demo05_onIndexChange"></swiper>
    <p> current index: {{demo05_index}}</p>
    <x-button @click.native="demo05_onLoad(1)" type="primary" style="margin: 10px 0;">Load list1</x-button>
    <x-button @click.native="demo05_onLoad(2)" type="primary" style="margin: 10px 0;">Load list2</x-button>

    <br/>
    <br/>
    <divider>华丽的分割线</divider>

    <group-title>引入swiper-item自定义item内容，用height定义高度</group-title>
    <swiper auto height="100px">
      <swiper-item class="black"><h2 class="title fadeInUp animated">它无孔不入</h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated">你无处可藏</h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated">不是它可恶</h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated">而是它不懂你</h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated">我们试图</h2></swiper-item>
      <swiper-item class="black"><h2 class="title fadeInUp animated">做些改变</h2></swiper-item>
    </swiper>

    <br/>
    <br/>
    <divider>华丽的分割线</divider>

    <group-title>垂直方向文字滚动</group-title>
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
      <swiper-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
      <swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>
      <swiper-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
    </swiper>

    <br/>
    <br/>
    <divider>华丽的分割线</divider>

    <group-title>循环模式</group-title>
    <swiper loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
    <p>current index: {{demo06_index}}</p>

    <group-title>循环模式（只有两个且可点击）</group-title>
    <swiper loop auto :list="demo07_list" :index="demo07_index" @on-index-change="demo07_onIndexChange"></swiper>
    <p>current index: {{demo07_index}}</p>
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]

const imgList = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

const urlList = baseList.map((item, index) => ({
  url: 'http://m.baidu.com',
  img: item.img,
  fallbackImg: item.fallbackImg,
  title: `(可点击)${item.title}`
}))

const demoList = imgList.map((one, index) => ({
  url: 'javascript:',
  img: one
}))

const only2ClickList = baseList.slice(0, 2).map(item => {
  item.url = 'http://m.baidu.com'
  return item
})

export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  ready () {

  },
  methods: {
    onSwiperItemIndexChange (index) {
      console.log('demo item change', index)
    },
    demo01_onIndexChange (index) {
      this.demo01_index = index
    },
    demo05_onIndexChange (index) {
      this.demo05_index = index
    },
    demo05_onLoad (id) {
      this.demo05_list = id === 1 ? baseList : demoList
    },
    demo06_onIndexChange (index) {
      this.demo06_index = index
    },
    demo07_onIndexChange (index) {
      this.demo07_index = index
    }
  },
  data () {
    return {
      demo01_list: baseList,
      demo02_list: demoList,
      demo03_list: demoList,
      demo04_list: imgList,
      demo05_list: [],
      demo06_list: urlList,
      demo07_list: only2ClickList,
      demo01_index: 0,
      demo02_index: 1,
      demo05_index: 0,
      demo06_index: 0,
      demo07_index: 0,
      swiperItemIndex: 1
    }
  }
}
</script>

<style scoped>
.copyright {
  font-size: 12px;
  color: #ccc;
  text-align: center;
}
.text-scroll {
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
}
.text-scroll p{
  font-size: 12px;
  text-align: center;
  line-height: 30px;
}
.black {
  background-color: #000;
}
.title{
  line-height: 100px;
  text-align: center;
  color: #fff;
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
.vux-indicator.custom-bottom {
  bottom: 30px;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.swiper-demo-img img {
  width: 100%;
}
</style>

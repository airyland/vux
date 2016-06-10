<template>
  <div>
    <group-title>THX to: https://github.com/wechatui/swiper</group-title>
    <group-title>list模式下，默认高度为180px, 如果设置aspect-ratio会根据宽度自动计算高度</group-title>
    <group-title>默认设置</group-title>
    <swiper :list="list" :index="demo01Index" @on-index-change="onIndexChange1"></swiper>
    <br/>
    current index: {{currentIndex1}}
    <br/>
    <x-button @click="demo01Index = 0">go to 0</x-button>
    <x-button @click="demo01Index = 1">go to 1</x-button>
    <x-button @click="demo01Index = 2">go to 2</x-button>
    <br/>
    <group-title>设置aspect-ratio, 将自动根据宽度计算高度</group-title>
    <swiper :list="list3" style="width:85%;margin:0 auto;" :aspect-ratio="300/800" dots-position="center"></swiper>
    <br/>
    <br/>
    <group-title>自动轮播</group-title>
    <swiper :list="list" auto style="width:80%;margin:0 auto;" height="180px"></swiper>
    <br/>
    <br/>
    <divider>use swiper-item for image list</divider>
    <swiper>
      <swiper-item class="swiper-img" v-for="item in imgList"><img :src="item"></swiper-item>
    </swiper>
    <br>
    <group-title>Async setting list data</group-title>
    <swiper :list="list1" auto height="180px" @on-index-change="onIndexChange"></swiper>
    <p> current index: {{currentIndex}}</p>
    <x-button @click="setData(1)" type="primary" style="margin: 10px 0;">Load list1</x-button>
    <x-button @click="setData(2)" type="primary" style="margin: 10px 0;">Load list2</x-button>
    <br/>
    <br/>
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
    <group-title>垂直方向文字滚动</group-title>
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll">
      <swiper-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
      <swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>
      <swiper-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from '../components'

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

const demoList2 = [
  'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
  'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
  'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
]

const demoList3 = demoList2.map((one, index) => ({
  url: 'javascript:',
  img: one
}))

export default {
  components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  ready () {
    setTimeout(() => {
      this.imgList = demoList2
    }, 5000)
  },
  methods: {
    setData (id) {
      this.list1 = id === 1 ? demoList : demoList3
    },
    onIndexChange (index) {
      this.currentIndex = index
    },
    onIndexChange1 (index) {
      this.currentIndex1 = index
    }
  },
  data () {
    return {
      demo01Index: 0,
      list: demoList,
      list1: [],
      list3: demoList3,
      disableLoadData: false,
      imgList: [],
      currentIndex: 0,
      currentIndex1: 0
    }
  }
}
</script>

<style scoped>
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

.swiper-img img {
  width: 100%;
  display: block;
}
</style>

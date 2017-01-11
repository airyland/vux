<template>
  <div>
    <tab>
      <tab-item :selected="demo1 === '已发货'" @click="demo1 = '已发货'">已发货</tab-item>
      <tab-item :selected="demo1 === '未发货'" @click="demo1 = '未发货'">未发货</tab-item>
      <tab-item :selected="demo1 === '全部订单'" @click="demo1 = '全部订单'">全部订单</tab-item>
    </tab>
    <br/>
    <br/>
    <br/>
    <div style="width: 100%;overflow:scroll;-webkit-overflow-scrolling:touch;">
      <tab style="width:500px;">
        <tab-item :selected="demo1 === '分类1'" @click="demo1 = '分类1'">已发货</tab-item>
        <tab-item :selected="demo1 === '分类2'" @click="demo1 = '分类2'">未发货</tab-item>
        <tab-item :selected="demo1 === '分类3'" @click="demo1 = '分类3'">全部订单</tab-item>
        <tab-item :selected="demo1 === '分类4'" @click="demo1 = '分类4'">全部订单</tab-item>
        <tab-item :selected="demo1 === '分类5'" @click="demo1 = '分类5'">全部订单</tab-item>
      </tab>
    </div>
    
    <br/>
    <br/>
    <br/>
    <divider>different active class</divider>
    <tab :animate="false">
      <tab-item active-class="active-6-1" :selected="demo6 === '已发货'" @click="demo6 = '已发货'">已发货</tab-item>
      <tab-item active-class="active-6-2" :selected="demo6 === '未发货'" @click="demo6 = '未发货'">未发货</tab-item>
      <tab-item active-class="active-6-3" :selected="demo6 === '全部订单'" @click="demo6 = '全部订单'">全部订单</tab-item>
    </tab>
    <br/>
    <br/>
    <br/>
    <divider>no animation</divider>
    <tab :animate="false">
      <tab-item :selected="demo5 === '已发货'" @click="demo5 = '已发货'">已发货</tab-item>
      <tab-item :selected="demo5 === '未发货'" @click="demo5 = '未发货'">未发货</tab-item>
      <tab-item :selected="demo5 === '全部订单'" @click="demo5 = '全部订单'">全部订单</tab-item>
    </tab>
    <br/>
    <br/>
    <br/>
    <divider>disabled</divider>
    <tab>
      <tab-item :selected="demoDisabled === 'A'" @click="demoDisabled = 'A'">A</tab-item>
      <tab-item :selected="demoDisabled === 'B'" @click="demoDisabled = 'B'">B</tab-item>
      <tab-item :selected="demoDisabled === 'Disabled'" disabled>Disabled</tab-item>
    </tab>
    <br/>
    <br/>
    <br/>

    <div>
       <tab :line-width=2 active-color='#fc378c' v-model="index">
        <tab-item class="vux-center" :selected="demo2 === item" v-for="item in list2" @click="demo2 = item">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="100px" :show-dots="false">
        <swiper-item v-for="item in list2">
          <div class="tab-swiper vux-center">{{item}} Container</div>
        </swiper-item>
      </swiper>
    </div>

    <br/>
    <div class="box">
      <x-button @click.native="index=0" :disabled="index === 0" type="primary">go to 0</x-button>
      <x-button @click.native="index=1" :disabled="index === 1" type="primary">go to 1</x-button>

      <x-button @click.native="addTab" :disabled="list2.length === 5" type="primary">Add tab item</x-button>
      <x-button @click.native="removeTab" :disabled="list2.length <= 2" type="primary">Remove tab item</x-button>
      <x-button @click.native="next" type="primary">Active next current: {{index}}</x-button>
      <x-button @click.native="prev" type="primary">Active prev current: {{index}}</x-button>
    </div>
  
    <br/>
    <br/>
    <tab :line-width=2>
      <tab-item :selected="demo3 === item" v-for="(index, item) in list3" :class="{'vux-1px-r': index===0}" @click="demo3 = item">{{item}}</tab-item>
    </tab>
    <br/>
    <br/>
    <br/>
    <sticky>
      <tab :line-width=1>
        <tab-item :selected="demo4 === item" v-for="item in list4" @click="demo4 = item">{{item}}</tab-item>
      </tab>
    </sticky>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
const list = () => ['精选', '美食', '电影', '酒店', '外卖']

export default {
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem
  },
  data () {
    return {
      demo1: '未发货',
      list2: list(),
      demo5: '未发货',
      demo2: '美食',
      list3: ['收到的消息', '发出的消息'],
      demo3: '收到的消息',
      list4: ['正在正映', '即将上映'],
      demo4: '即将上映',
      demo6: '未发货',
      demoDisabled: 'A',
      index: 0
    }
  },
  methods: {
    addTab () {
      if (this.list2.length < 5) {
        this.list2 = list().slice(0, this.list2.length + 1)
      }
    },
    removeTab () {
      if (this.list2.length > 1) {
        this.list2 = list().slice(0, this.list2.length - 1)
      }
    },
    next () {
      if (this.index === this.list2.length - 1) {
        this.index = 0
      } else {
        ++this.index
      }
    },
    prev () {
      if (this.index === 0) {
        this.index = this.list2.length - 1
      } else {
        --this.index
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.box {
  padding: 15px;
}
.active-6-1 {
  color: rgb(252, 55, 140) !important;
  border-color: rgb(252, 55, 140) !important;
}
.active-6-2 {
  color: #04be02 !important;
  border-color: #04be02 !important;
}
.active-6-3 {
  color: rgb(55, 174, 252) !important;
  border-color: rgb(55, 174, 252) !important;
}
.tab-swiper {
  background-color: #fff;
  height: 100px;
}
</style>

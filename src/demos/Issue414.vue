<template>
  <div>
    <tab :line-width=2 :index.sync="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="item in list2" @click="demo2 = item">{{item}}
      </tab-item>
    </tab>
    <swiper :index.sync="index" height="600px" :show-dots="false">
      <swiper-item v-for="(index, item) in list2">
        <card :header="{title:'标题' + index}">
          <div slot="content" class="card-padding">
            <scroller lock-y :scrollbar-x=false stop-propagation>
              <div class="box1">
                <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
              </div>
            </scroller>
          </div>
        </card>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Group, Cell, Tab, TabItem, Swiper, SwiperItem, Card, Scroller } from '../components'

export default {
  components: {
    Group,
    Cell,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Card,
    Scroller
  },
  data () {
    return {
      index: 0,
      list2: ['1', '2', '3']
    }
  }
}
</script>

<style scoped>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
</style>
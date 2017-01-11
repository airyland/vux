<template>
<div class="topic-body">
   <scroller lock-x  use-pullup use-pulldown height="-1.44" @pullup:loading="loadMore" @pulldown:loading="refresh" :pullup-status.sync="pullupStatus" v-ref:scroller>

   <group gutter="0">
      <div class="box2">
        <p v-for="i in n" :style="'position: absolute; visibility: hidden;height:200px;top:' + i * 200 + 'px'">placeholder {{i}}</p>
        <self-goods-list :list="topicGoodsList" :banner="banner" goods-box-class="topic-goods-list" img-class="topic-goods-img" incart ></self-goods-list>
      </div>
    </group>
       <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 0.533333rem; bottom: -0.533333rem; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">上拉加载更多</span>
        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>
  </div>
</template>

<script>
import { SelfGoodsList, Group, Scroller, Spinner } from '../components'
const version = require('../../package.json').version
const interfaces = require('../interfaces.json')

export default {
  components: {
    SelfGoodsList,
    Group,
    Scroller,
    Spinner
  },
  route: {
    data () {
      setTimeout(() => {
        // document.querySelector('.box2').innHtml=''
        this.$http.get(interfaces.topicGoods, {n: '0'})
        .then((response) => {
          console.log('data:' + JSON.stringify(response))
          this.$set('topicGoodsList', response.body.jcdata[0].goods)
        })
      }, 2000)
    }
  },
  methods: {
    loadMore (uuid) {
      var _this = this
      _this.$http.get(interfaces.topicGoods, {n: '9'})
      .then((response) => {
        setTimeout(() => {
          console.log('data:' + JSON.stringify(response.body.jcdata[0].goods))
          _this.topicGoodsList.push(...response.body.jcdata[0].goods)
          _this.n += 10
          _this.$nextTick(() => {
            _this.$broadcast('pullup:reset', uuid)
          })
        }, 2000)
      })
    },
    refresh (uuid) {
      setTimeout(() => {
        // document.querySelector('.box2').innHtml=''
        this.$http.get(interfaces.topicGoods, {n: '0'})
        .then((response) => {
          console.log('data:' + JSON.stringify(response))
          this.$set('topicGoodsList', response.body.jcdata[0].goods)
        })
        this.$nextTick(() => {
          this.$broadcast('pulldown:reset', uuid)
        })
      }, 2000)
    }
  },
  data () {
    return {
      topicGoodsList: [],
      n: 30,
      pullupEnabled: true,
      pullupStatus: 'default',
      banner: '',
      version
    }
  }
}
</script>
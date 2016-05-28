<template>
  <div>
    <divider>Pull Up to Refresh</divider>
    <scroller lock-x scrollbar-y use-pullup height="200px" @pullup:loading="load1">
      <div class="box2">
        <p v-for="i in n1">placeholder {{i}}</p>
      </div>
    </scroller>

    <divider>Chinese: 上拉刷新</divider>
    <scroller lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="200px" @pullup:loading="load2">
      <div class="box2">
        <p v-for="i in n2">占位 {{i}}</p>
      </div>
    </scroller>

    <divider>custom pullup html template</divider>
    <scroller lock-x scrollbar-y use-pullup height="200px" :pullup-status.sync="pullupStatus" @pullup:loading="load3">
      <!--content slot-->
      <div class="box2">
        <p v-for="i in n3">placeholder {{i}}</p>
      </div>

      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
        <span v-show="pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
        <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
    </scroller>

  </div>
</template>

<script>
import { Scroller, Divider, Spinner } from '../components'

export default {
  components: {
    Scroller,
    Divider,
    Spinner
  },
  methods: {
    load1 (uuid) {
      setTimeout(() => {
        this.n1 += 10
        setTimeout(() => {
          this.$broadcast('pullup:reset', uuid)
        }, 10)
      }, 2000)
    },
    load2 (uuid) {
      setTimeout(() => {
        if (this.n2 === 30) {
          this.$broadcast('pullup:done', uuid)
        } else {
          this.n2 += 10
          setTimeout(() => {
            this.$broadcast('pullup:reset', uuid)
          }, 10)
        }
      }, 2000)
    },
    load3 (uuid) {
      setTimeout(() => {
        this.n3 += 10
        setTimeout(() => {
          this.$broadcast('pullup:reset', uuid)
        }, 10)
      }, 2000)
    }
  },
  data () {
    return {
      pullupStatus: 'default',
      n1: 10,
      n2: 10,
      n3: 10,
      pullupConfig2: {
        content: '下拉刷新',
        downContent: '下拉刷新',
        upContent: '释放刷新',
        loadingContent: '加载中'
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
.rotate {
  display: inline-block;
  transform: rotate(-180deg);
}
.pullup-arrow {
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
</style>

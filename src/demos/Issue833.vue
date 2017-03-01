<template>
  <div>
    <scroller height="-98" style="border:1px solid red;" @on-pullup-loading="pullupHandle" @on-pulldown-loading="pulldownHandle" :value="scrollStatus" lock-x scrollbar-y  ref="scroller" use-pulldown use-pullup :pulldown-config="pulldownConfig" :pullup-config="pullupConfig">
      <group title="cell demo" style="padding-bottom:15px;">
        <cell v-for="i in datas" :key="item" title="item" :value="i"></cell>
      </group>
    </scroller>
  </div>
</template>

<script>
import { Group, Cell, Scroller } from 'vux'

export default {
  name: 'scroll',
  components: {
    Group,
    Cell,
    Scroller
  },
  data () {
    return {
      usePullDown: false,
      usePullUp: true,
      scrollStatus: {
        pullupStatus: 'default',
        pulldownStatus: 'default'
      },
      datas: 0,
      pulldownConfig: {
        content: '',
        height: 60,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '释放开始刷新',
        loadingContent: '刷新中...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
      pullupConfig: {
        content: '',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放开始加载',
        upContent: '上拉加载',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
      }
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.datas = 10
    },
    pullupHandle (e) {
      console.log('pullupHandle')
      const that = this
      that.datas += 5
      that.$nextTick(() => {
        that.$refs.scroller.reset()
      })

      that.$refs.scroller.donePullup()
      if (that.datas > 40) {
        that.$refs.scroller.disablePullup()
      }
    },
    pulldownHandle () {
      console.log('pulldownHandle')
      this.datas = 25
      var that = this
      setTimeout(function () {
        that.$nextTick(() => {
          that.$refs.scroller.reset({
            top: 0
          })
        })

        that.$refs.scroller.enablePullup()
      }, 1000)
    }

  }

}
</script>

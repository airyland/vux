<template>
  <div>
    <divider>下拉刷新和上拉加载更多组合</divider>
    <scroller lock-x scrollbar-y use-pullup use-pulldown height="200px" @pullup:loading="loadMore" @pulldown:loading="refresh">
      <div class="box2">
        <p v-for="i in n">placeholder {{i}}</p>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, Divider } from '../components'

export default {
  components: {
    Scroller,
    Divider
  },
  methods: {
    loadMore (uuid) {
      setTimeout(() => {
        this.n += 10
        this.$nextTick(() => {
          this.$broadcast('pullup:reset', uuid)
        })
      }, 2000)
    },
    refresh (uuid) {
      setTimeout(() => {
        this.n = 10
        this.$nextTick(() => {
          this.$broadcast('pulldown:reset', uuid)
        })
      }, 2000)
    }
  },
  data () {
    return {
      n: 10
    }
  }
}
</script>

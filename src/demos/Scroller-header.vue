<template>
  <div class="vux-scroller-header-box">
    <div style="height:46px;">
     <x-header style="position:fixed;left:0;top:0;width:100%;" class="vux-scroller-header">I'm header</x-header>
    </div>
    <scroller lock-x v-ref:scroller height="-46px">
      <div class="box2">
        <p v-for="i in 80">placeholder {{i}}</p>
      </div>
    </scroller>
  </div>
</template>

<script>
import { Scroller, XHeader } from '../components'

export default {
  components: {
    Scroller,
    XHeader
  },
  ready () {
    this.$nextTick(() => {
      this.$refs.scroller.reset()
    })
  }
}
</script>

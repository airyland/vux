<template>
  <div>
    <br/>
    <br/>
    <div class="space-btn" @click="spaceChange">显示间隔</div>
    <div class="space" v-if="showSpace">间隔</div>
    <!-- 新的用法，支持sticky用sticky，否则用fixed  -->
    <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46">
      <tab :line-width="1">
        <tab-item selected>正在正映</tab-item>
        <tab-item>即将上映</tab-item>
      </tab>
    </sticky>
    <div class="vux-sticky-fill" style="height: 44px;"></div>

    <!-- 新的用法，全部fixed定位 -->
    <!-- <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false">
      <tab :line-width="1">
        <tab-item selected>正在正映</tab-item>
        <tab-item>即将上映</tab-item>
      </tab>
    </sticky>
    <div class="vux-sticky-fill" style="height: 44px;"></div> -->

    <!-- 旧的用法 -->
    <!-- <div style="height: 44px;">
      <sticky scroll-box="vux_view_box_body" ref="sticky" :offset="46" :check-sticky-support="false">
        <tab :line-width="1">
          <tab-item selected>正在正映</tab-item>
          <tab-item>即将上映</tab-item>
        </tab>
      </sticky>
    </div> -->
    <p v-for="i in 100">{{i}}<br></p>
  </div>
</template>

<script>
import { Tab, TabItem, Sticky } from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    Sticky
  },
  data () {
    return {
      showSpace: false
    }
  },
  methods: {
    spaceChange () {
      this.showSpace = !this.showSpace
      this.$nextTick(() => {
        this.$refs.sticky.bindSticky()
      })
    }
  }
}
</script>
<style scoped>
  .space-btn {
    padding: 5px 0;
    margin: 10px;
    text-align: center;
    border: 1px red solid;
  }

  .space {
    padding: 30px 0;
    margin: 10px;
    text-align: center;
    border: 1px green solid;
  }
</style>

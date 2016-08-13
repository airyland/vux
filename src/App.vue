<template>
  <div class="weui_tab">
    <loading :show="isLoading"></loading>
    <div class="weui_tab_bd vux-fix-safari-overflow-scrolling">
      <router-view
      transition
      transition-mode="out-in"></router-view>
    </div>
    <tabbar class="vux-demo-tabbar" icon-class="vux-center" v-show="!isTabbarDemo">
      <tabbar-item v-link="{path:'/'}" :selected="route.path === '/'">
        <span class="demo-icon-22 vux-demo-tabbar-icon-home" slot="icon">&#xe637;</span>
        <span slot="label">Home</span>
      </tabbar-item>
      <tabbar-item v-link="{path:'/demo'}" :selected="isDemo">
        <span class="demo-icon-22" slot="icon">&#xe633;</span>
        <span slot="label"><span v-if="componentName" class="vux-demo-tabbar-component">{{componentName}}</span><span v-else>Demos</span></span>
      </tabbar-item>
      <tabbar-item v-link="{path:'/project/donate'}" :selected="route.path === '/project/donate'" show-dot>
        <span class="demo-icon-22" slot="icon">&#xe630;</span>
        <span slot="label">Donate</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import store from './vuex/store'
import { Tabbar, TabbarItem, Loading } from './components'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Loading
  },
  store: store,
  vuex: {
    getters: {
      route: (state) => state.route,
      isLoading: (state) => state.isLoading
    }
  },
  computed: {
    componentName () {
      const parts = this.route.path.split('/')
      if (/component/.test(this.route.path) && parts[2]) return parts[2]
    },
    isDemo () {
      return /component|demo/.test(this.route.path)
    },
    isTabbarDemo () {
      return /tabbar/.test(this.route.path)
    }
  }
}
</script>

<style lang="less">
@import 'styles/index.less';
@import './styles/weui/base/reset';

html, body {
  height: 100%;
}
body {
  background-color: #fbf9fe;
}
.demo-icon-22 {
  font-family: 'vux-demo';
  font-size: 22px;
  color: #888;
}
.weui_tabbar.vux-demo-tabbar {
  backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);
}
.vux-demo-tabbar .weui_bar_item_on .demo-icon-22 {
  color: #F70968;
}
.vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
  color: #35495e;
}
.vux-demo-tabbar .weui_tabbar_item.weui_bar_item_on .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #F70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui_tabbar_icon + .weui_tabbar_label {
  margin-top: 0!important;
}
</style>

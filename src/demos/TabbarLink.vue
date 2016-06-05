<template>
  <div>
    <tabbar>
      <!--use v-link-->
      <tabbar-item v-link="{path:'/component/cell'}">
        <img slot="icon" src="../assets/demo/icon_nav_button.png">
        <span slot="label">Wechat</span>
      </tabbar-item>
      <!--use http link-->
      <tabbar-item show-dot link="https://vux.li">
        <img slot="icon" src="../assets/demo/icon_nav_msg.png">
        <span slot="label">Message</span>
      </tabbar-item>
      <!--use vue-router link-->
      <tabbar-item selected link="/component/cell">
        <img slot="icon" src="../assets/demo/icon_nav_article.png">
        <span slot="label">Explore</span>
      </tabbar-item>
      <!--use vue-router object link-->
      <tabbar-item :link="{path:'/component/cell'}">
        <img slot="icon" src="../assets/demo/icon_nav_cell.png">
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from '../components'

export default {
  components: {
    Tabbar,
    TabbarItem
  }
}
</script>

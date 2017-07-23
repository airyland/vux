<template>
  <div>
    <group>
      <cell is-link title="Tabbar" link="/component/tabbar"></cell>
    </group>
    <tabbar @on-index-change="onIndexChange">
      <tabbar-item>
        <img slot="icon" src="../assets/demo/icon_nav_button.png">
        <img slot="icon-active" src="../assets/demo/icon_nav_msg.png">
        <span slot="label">one</span>
      </tabbar-item>
      <tabbar-item>
        <img slot="icon" src="../assets/demo/icon_nav_article.png">
        <img slot="icon-active" src="../assets/demo/icon_nav_cell.png">
        <span slot="label">two</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  methods: {
    onIndexChange (newIndex, oldIndex) {
      console.log(newIndex, oldIndex)
    }
  }
}
</script>

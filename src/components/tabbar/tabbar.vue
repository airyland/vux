<template>
  <div class="weui_tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  ready () {
    const tabList = this.$el.querySelectorAll('.weui_tabbar_item')
    this.tabNumber = tabList.length
    let n = 0
    for (let i of tabList) {
      i.setAttribute('data-index', n)
      n++
    }
  },
  events: {
    'on-item-click': function (index) {
      this.$broadcast('on-item-click', index)
      return true
    }
  }
}
</script>
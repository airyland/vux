<template>
  <div class="vux-flexbox" :class="{'flex-col': orient == 'vertical', 'flex-row': orient == 'horizontal'}">
    <slot></slot>
  </div>
</template>

<script>
import support from './support'

export default {
  created () {
    this.supported = support.flex
  },
  ready () {
    if (!this.supported) {
      var list = this.$el.querySelectorAll('.vux-flexbox-item')
      this.$el.classList.remove('vux-flexbox')
      this.$el.classList.add('vux-flexbox-unsupport')
      var number = list.length
      var width = (100 / number) + '%'
      for (var i = 0; i < number; i++) {
        list[i].style.width = width
        list[i].style['box-sizing'] = 'border-box'
        list[i].style['margin-left'] = 0
        list[i].style['float'] = 'left'
      }
    }
  },
  props: {
    marginLeft: {
      type: Number,
      default: 8
    },
    orient: {
      type: String,
      default: 'horizontal'
    }
  }
}
</script>

<style>
.vux-flexbox{
  width: 100%;
  text-align: left;
  display: -webkit-box;
  display: -moz-box;
  display: -o-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
}

.vux-flexbox .vux-flexbox-item{
  -moz-box-flex: 1;
  -webkit-box-flex: 1;
  -o-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 20px;
}

.vux-flexbox-item > .vux-flexbox {
  width: 100%;
  height: 100%;
}

.vux-flexbox .vux-flexbox-item:first-child{
  margin-left: 0!important;
}

.flex-col {
  box-orient: vertical;
  flex-direction: column;
}

.flex-col > .vux-flexbox-item {
  width: 100%;
}

.flex-row {
  box-direction: row;
  box-orient: horizontal;
  flex-direction: row;
}

.flex-row > .vux-flexbox-item {
  height: 100%;
}
</style>
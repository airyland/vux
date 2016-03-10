<template>
  <div class="vux-flexbox">
    <slot></slot>
  </div>
</template>

<script>
  import support from './flexbox/support'
  
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
      }
    }
  }
</script>

<style>
.vux-flexbox{
  width: 100%;
  text-align: left;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  -webkit-box-align: center;
  -webkit-align-items: center;
}

.vux-flexbox .vux-flexbox-item{
  -webkit-box-sizing: border-box;
  -moz-box-flex: 1;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  min-width: 20px;
}

.vux-flexbox .vux-flexbox-item:first-child{
  margin-left: 0!important;
}
</style>
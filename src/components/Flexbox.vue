<template>
  <div class="vux-flexbox">
    <slot></slot>
  </div>
</template>

<script>
  import support from './flexbox/support'
  const supported = support.flex
  export default {
    ready () {
      if (!supported) {
        var list = this.$el.querySelectorAll('.vux-flexbox-item')
        var number = list.length
        var width = (100 / number) + '%'
        for (var i = 0; i < number; i++) {
          list[i].style.width = width
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
  text-align:left;
  display:-webkit-box;
  display:-webkit-flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
}

.vux-flexbox .vux-flexbox-item{
  -webkit-box-sizing:border-box;
  -webkit-box-flex:1;
  -webkit-flex:1;
  min-width:20px;
}

.vux-flexbox .vux-flexbox-item:first-child{
  margin-left:0!important;
}

.vux-flexbox[vuxe-mode~=average] .vux-flexbox-item{
  width:100%;
}
</style>
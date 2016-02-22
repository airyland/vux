<template>
  <div class="vuee-flexbox">
    <slot></slot>
  </div>
</template>

<script>
  import support from './flexbox/support'
  const supported = support.flex
  export default {
    ready () {
      if (!supported) {
        var list = this.$el.querySelectorAll('.vuee-flexbox-item')
        var number = list.length
        var width = (100 / number) + '%'
        for (var i = 0; i < number; i++) {
          list[i].style.width = width
        }
      }
    }
  }
</script>

<style>
.vuee-flexbox{
  text-align:left;
  display:-webkit-box;
  display:-webkit-flex;
  -webkit-box-align:center;
  -webkit-align-items:center;
}

.vuee-flexbox .vuee-flexbox-item{
  -webkit-box-sizing:border-box;
  -webkit-box-flex:1;
  -webkit-flex:1;
  margin-left:8px;
  min-width:20px;
}

.vuee-flexbox .vuee-flexbox-item:first-child{
  margin-left:0;
}

.vuee-flexbox[vueee-mode~=average] .vuee-flexbox-item{
  width:100%;
}
</style>
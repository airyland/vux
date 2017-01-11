<template>
  <div class="weui_dialog_alert fix_ios_fixed" @touchmove="onTouchMove" v-show="props_show">
    <transition name="vux-mask">
      <div class="weui_mask" @click="hideOnBlur && (props_show = false)" v-show="props_show"></div>
    </transition>
    <input style="display:none" v-model="props_show">
    <transition name="vux-dialog">
      <div class="weui_dialog" v-show="props_show" >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    },
    maskTransition: {
      type: String,
      default: 'vux-fade'
    },
    dialogTransition: {
      type: String,
      default: 'vux-dialog'
    },
    hideOnBlur: Boolean,
    scroll: {
      type: Boolean,
      default: true
    }
  },
  created(){
    this.props_show=this.show
    if(this.value) this.props_show=this.value
  },
  watch: {
    value(val){
      this.props_show=val
    },
    props_show(val){
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input',val)
    },
    show (val) {
      this.props_show=val
    }
  },
  data(){
    return {
      props_show:false
    }
  },
  methods:{
    onTouchMove:function(event){
      !this.scroll && event.preventDefault()
    }
  }
}
</script>

<style lang="less">
@import '../../styles/transition.less';
@import '../../styles/weui/widget/weui_tips/weui_mask';
@import '../../styles/weui/widget/weui_tips/weui_dialog';
</style>
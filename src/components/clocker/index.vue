<template>
  <div>
    <span v-if="showTimeString">{{timeString}}</span>
    <div class="vux-clocker-tpl"><slot></slot><div>
  </div>
</template>

<script>
const Clocker = require('./clocker') 
import trim from '../../libs/trim'
export default {
  ready () {
    let _this = this
    _this.slot = this.$el.querySelector('.vux-clocker-tpl')
    _this.slotString = trim(_this.slot.innerHTML, true)

    if(_this.slotString !== '<div>  </div>' && _this.slotString !== '<div></div>'){
      _this.showTimeString = false
    }
    
    const ck = new Clocker(_this.time)
    .on('tick',function (event) {
      _this.update(event)
    })
    .on('finish', function () {
      _this.timeString = '00:00:00'
      _this.$dispatch('finish')
    })
    .start()
  },
  methods: {
    update: function (event) {
      if(this.showTimeString){
        //console.log('show')
        this.timeString = event.strftime(this.format)
      }else{
        //console.log('not show')
        this.slot.innerHTML = event.strftime(this.slotString)
      }
    }
  },
  props: {
    time: {
      type: String,
      required: true
    },
    format: {
      type: String,
      default: '%D 天 %H 小时 %M 分 %S 秒'
    }
  },
  data () {
    return {
      showTimeString: true,
      timeString: '',
      slotString: ''
    }
  }
}
</script>

<style>
  
</style>
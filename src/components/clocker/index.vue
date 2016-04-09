<template>
  <div>
    <span v-if="showTimeString">{{timeString}}</span>
    <div class="vux-clocker-tpl"><slot></slot></div>
  </div>
</template>

<script>
const Clocker = require('./clocker')
export default {
  ready () {
    let _this = this
    _this.slot = this.$el.querySelector('.vux-clocker-tpl')
    _this.slotString = _this.slot.innerHTML
    if (_this.slotString !== '') {
      _this.showTimeString = false
    }
    this.clocker = new Clocker(_this.time)
    .on('tick', function (event) {
      _this.update(event)
      _this.$dispatch('on-tick', event)
    })
    .on('finish', function () {
      _this.timeString = '00:00:00'
      _this.$dispatch('on-finish')
    })
    .start()
  },
  methods: {
    update: function (event) {
      if (this.showTimeString) {
        this.timeString = event.strftime(this.format)
      } else {
        let string = event.strftime(this.slotString)
        if (string !== this.cacheSlotString) {
          this.slot.innerHTML = this.cacheSlotString = string
        }
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
      slotString: '',
      cacheSlotString: ''
    }
  },
  beforeDestroy () {
    this.clocker.remove()
    this.clocker = null
  }
}
</script>

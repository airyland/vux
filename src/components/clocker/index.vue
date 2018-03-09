<template>
  <div style="display:inline-block;">
    <span v-if="showTimeString">{{timeString}}</span>
    <div class="vux-clocker-tpl"><slot></slot></div>
  </div>
</template>

<script>
import Clocker from './clocker'

let format = '%D 天 %H 小时 %M 分 %S 秒'

if (typeof V_LOCALE === 'undefined') {
  if (process.env.NODE_ENV === 'development') {
    console.warn('[VUX warn] 抱歉，clocker 组件需要升级 vux-loader 到最新版本才能正常使用')
  }
} else {
  if (V_LOCALE === 'en') { // eslint-disable-line
    format = '%D d %H h %M m %S s'
  } else if (V_LOCALE === 'zh-CN') { // eslint-disable-line
    format = '%D 天 %H 小时 %M 分 %S 秒'
  }
}

export default {
  name: 'clocker',
  mounted () {
    this.$nextTick(() => {
      this.slot = this.$el.querySelector('.vux-clocker-tpl')
      this.slotString = this.slot.innerHTML
      if (this.slotString !== '') {
        this.showTimeString = false
      }
      this.render()
    })
  },
  methods: {
    render () {
      if (!this.time) return
      this.clocker = new Clocker(this.time)
      .on('tick', event => {
        this.update(event)
        this.$emit('on-tick', event)
      })
      .on('finish', () => {
        this.timeString = '00:00:00'
        this.$emit('on-finish')
      })
      .start()
    },
    update (event) {
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
    time: [String, Number],
    format: {
      type: String,
      default: format
    }
  },
  watch: {
    time () {
      this.clocker && this.clocker.remove()
      this.render()
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
    if (this.clocker) {
      this.clocker.remove()
      this.clocker = null
    }
  }
}
</script>

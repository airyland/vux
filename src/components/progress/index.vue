<template>
  <div :id="'vux-progress-' + uuid" class="vux-progress" v-if="template > 0"></div>
  <div class="weui_progress" v-if="template === 0">
    <div class="weui_progress_bar">
      <div class="weui_progress_inner_bar js_progress" :style="{width: percent + '%'}"></div>
    </div>
    <a href="javascript:;" class="weui_progress_opr">
      <i class="weui_icon_cancel" @click="cancel"></i>
    </a>
  </div>
</template>

<script>
import Progress from './progress'
import Base from '../../libs/base'
export default {
  mixins: [Base],
  props: {
    template: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0,
      twoWay: true
    }
  },
  ready () {
    const _this = this
    if (_this.template > 0) {
      this.progress = new Progress({
        template: _this.template,
        parent: _this.template === 1 ? 'body' : `#vux-progress-${_this.uuid}`,
        start: true
      })
    }
  },
  methods: {
    cancel: function () {
      this.$dispatch('on-cancel')
    }
  },
  data () {
    return {
    }
  },
  destroyed () {
    if (this.template > 0 && this.progress) {
      this.progress.destroy()
      if (this.progress.timer) {
        clearTimeout(this.progress.timer)
      }
      this.progress = null
      document.querySelector(`#vux-progress-${this.uuid}`).innerHTML = ''
    }
    if (this.template === 1) {
      const progress = document.querySelector('#mprogress1')
      progress && progress.parentNode.removeChild(progress)
    }
  }
}
</script>

<style>
@import './style.css';

.ui-mprogress .indeter-bar, .ui-mprogress .query-bar, .ui-mprogress .deter-bar {
  background-color: #09BB07;
}

.ui-mprogress .bar-bg, .ui-mprogress .buffer-bg {
  background-color: #EBEBEB;
}

.vux-progress {
  width: 100%;
  height: 3px;
}
</style>

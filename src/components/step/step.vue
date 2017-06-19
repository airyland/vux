<template>
	<div class="vux-step">
    <slot></slot>
	</div>
</template>

<script>
export default {
  name: 'step',
  props: {
    value: Number,
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    gutter: {
      type: String,
      default: '10px'
    }
  },
  created () {
    this.current = this.value
  },
  mounted () {
    this._mapPropsToChildComponent()
  },
  watch: {
    value (val) {
      this.current = val
    },
    current (val) {
      this._mapPropsToChildComponent()
      this.$emit('input', val)
    }
  },
  data () {
    return {
      current: 0
    }
  },
  methods: {
    _mapPropsToChildComponent () {
      const _this = this
      const len = this.$children.length - 1
      this.$children.forEach((child, index) => {
        child.currentStepNumber = (index + 1).toString()
        child.currentStepLast = index === len

        if (index === _this.current) {
          child.currentStatus = 'process'
        } else if (index < _this.current) {
          child.currentStatus = 'finish'
        } else {
          child.currentStatus = 'wait'
        }
      })
    }
  }
}
</script>

<style lang="less">
.vux-step {
  display: flex;
}
.vux-step-item {
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.vux-step-item-with-tail {
  flex: 1;
}

.vux-step-item-tail {
  height: 1px;
  position: absolute;
  left: 0;
  top: 12px;
  padding: 0 0;
  transition: all 0.4s ease 0s;
}

.vux-step-item-tail-finish {
  background: #09bb07 none repeat scroll 0 0;
}

.vux-step-item-tail-process, .vux-step-item-tail-wait {
  background: #CCC none repeat scroll 0 0;
}

.vux-step-item-icon {
  width: 22px;
  height: 22px;
  display: inline-block;
  text-align: center;
}

.vux-step-item-checked::before {
  font-size: 15px!important;
  line-height: 22px;
  margin: 0!important;
  transform: translateY(-4px);
}

.vux-step-item-title {
  font-size: 0.8rem;
}

.vux-step-item-head {
  position: relative;
  display: inline-block;
  margin-right: -4px;

  .vux-step-item-head-inner {
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 99px;
    text-align: center;
    font-size: 14px;
    transition: all 0.4s ease 0s;
    background: #fff none repeat scroll 0 0;
  }
}

.vux-step-item-head-finish .vux-step-item-head-inner{
  border: 1px solid #09bb07;
  color: #09bb07;
}

.vux-step-item-head-process .vux-step-item-head-inner{
  border: 1px solid #09bb07;
  color: #FFF;
  background: #09bb07 none repeat scroll 0 0;
}

.vux-step-item-head-wait .vux-step-item-head-inner {
  border: 1px solid #888;
  color: #888;
}

.vux-step-item-main {
  display: inline-block;
  position: relative;
  vertical-align: top;
  color: #888;
  padding-left: 5px;
}

.vux-step-item-main-process {
  font-weight: bold;
  color: #666;
}
</style>

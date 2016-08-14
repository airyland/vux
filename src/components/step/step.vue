<template>
	<div class="vux-step">
    <slot></slot>
	</div>
</template>

<script>

export default {
  props: {
    current: Number,
    backgroundColor: {
      type: String,
      default: '#fff'
    },
    gutter: {
      type: String,
      default: '10px'
    }
  },
  ready () {
    this._mapPropsToChildComponent()
  },
  watch: {
    current () {
      this._mapPropsToChildComponent()
    }
  },
  methods: {
    _mapPropsToChildComponent () {
      const _this = this
      const len = this.$children.length - 1
      this.$children.forEach((child, index) => {
        child.stepNumber = (index + 1).toString()
        child.stepLast = index === len

        if (index === _this.current) {
          child.status = 'process'
        } else if (index < _this.current) {
          child.status = 'finish'
        } else {
          child.status = 'wait'
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
  top: 10px;
  padding: 0 0;
  transition: all 0.4s ease 0s;
}

.vux-step-item-tail-finish {
  background: #09bb07 none repeat scroll 0 0;
}

.vux-step-item-tail-process, .vux-step-item-tail-wait {
  background: #CCC none repeat scroll 0 0;
}

.vux-step-item-checked::before {
  font-size: 15px;
  transform: translateY(-10%);
}

.vux-step-item-title {
  font-size: 0.8rem;
}

.vux-step-item-head {
  position: relative;
  display: inline-block;
  margin-right: -4px;

  .vux-step-item-head-inner {
    width: 20px;
    height: 20px;
    border-radius: 99px;
    text-align: center;
    font-size: 0.9rem;
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

<template>
	<div class="vux-timeline">
		<ul>
			<slot></slot>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'timeline',
  props: {
    color: String,
    isShowIcon: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    setChildProps () {
      if (!this.$children) return
      const len = this.$children.length
      this.$children.forEach((child, index) => {
        child.isLast = index === len - 1
        child.isFirst = index === 0
      })
    }
  }
}
</script>

<style lang="less">
@import '../../styles/variable.less';

.vux-timeline {
  padding: 1rem;
}

.vux-timeline > ul > li {
  list-style: none;
}

@vux-timeline: ~"vux-timeline";

.@{vux-timeline} {
  &-item {
    position:relative;
  }

  &-item-content {
    padding:0 0 1.5rem 1.2rem;
  }

  &-item-head, &-item-head-first {
    position:absolute;
    content:'';
    z-index:99;
    border-radius:99px;
  }

  &-item-head {
    width:10px;
    height:10px;
    left:1px;top:4px;
  }

  &-item-head-first {
    width:20px;
    height:20px;
    left:-4px;top:5px;
  }

  &-item-tail {
    position:absolute;
    content:'';
    height:100%;
    width:2px;
    left:5px;
    top:5px;
    background-color: @timeline-item-bg-color;
  }

  &-item-checked {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;

    &.weui-icon-success-no-circle::before {
      font-size: 14px;
      position: absolute;
      left: 3px;
      top: 3px;
      margin: 0!important;
      color: #FFF;
    }
  }
}

.vux-timeline-item-color {
	background-color: @timeline-item-bg-color;
}
</style>

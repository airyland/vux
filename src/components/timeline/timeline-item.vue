<template>
	<li class="vux-timeline-item">
		<div :class="['vux-timeline-item-color', {'vux-timeline-item-head': !isFirst,'vux-timeline-item-head-first': isFirst }]" :style="headStyle">
			<icon v-show="isFirst" type="success_no_circle" class="vux-timeline-item-checked"></icon>
		</div>
		<div class="vux-timeline-item-tail" :style="tailStyle"></div>
		<div class="vux-timeline-item-content">
			<slot></slot>
		</div>
	</li>
</template>

<script>
import Icon from '../icon'

export default {
  data () {
    return {
      isLast: true,
      isFirst: true,
      headStyle: { backgroundColor: this.$parent.color }
    }
  },
  ready () {
    this.$parent.setChildProps()
  },
  beforeDestroy () {
    // this will be null
    const $parent = this.$parent
    this.$nextTick(() => {
      $parent.setChildProps()
    })
  },
  components: {
    Icon
  },
  computed: {
    tailStyle () {
      return this.isLast ? { display: 'none', backgroundColor: this.$parent.color } : { display: 'block', backgroundColor: this.$parent.color }
    }
  }
}
</script>


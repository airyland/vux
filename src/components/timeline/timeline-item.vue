<template>
	<li class="timeline-item">
		<div :class=" {'timeline-item-head': !isFirst,'timeline-item-head-first': isFirst }" :style="headStyle">
			<icon v-show="isFirst" type="success_no_circle" class="timeline-item-checked"></icon>
		</div>
		<div class="timeline-item-tail" :style="tailStyle"></div>
		<div class="timeline-item-content">
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


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

<style lang="less">

	@timeline: ~"timeline";

	.@{timeline} {
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
			left:5px;top:5px;
		}

		&-item-checked {
			width: 100%;
			position: absolute;
			left: 0;
			top: 45%;
			transform: translateY(-50%);

			&::before {
				font-size: 12px;
				width: 20px;
				color: #FFF;
			}
		}
	}

</style>

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

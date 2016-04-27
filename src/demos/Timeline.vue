<template>
	<div class="timeline-demo">
		<timeline>
			<timeline-item>
				<h4 class="recent">【广东】 广州市 已发出</h4>
				<p class="recent">2016-04-17 12:00:00</p>
			</timeline-item>
			<timeline-item>
				<h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
				<p>2016-04-16 10:23:00</p>
			</timeline-item>
			<timeline-item>
				<h4> 商家正在通知快递公司揽件</h4>
				<p>2016-04-15 9:00:00</p>
			</timeline-item>
		</timeline>
	</div>
</template>

<style lang="less">
	.timeline-demo {

		p {
			color: #888;
			font-size: 0.8rem;
		}

		h4 {
			color: #666;
			font-weight: normal;
		}

		.recent {
			color: #008DBC;
		}

	}
</style>

<script>
import { Timeline, TimelineItem } from '../components/timeline'

export default {
  components: {
    Timeline,
    TimelineItem
  }
}
</script>


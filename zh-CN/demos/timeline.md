---
nav: zh-CN
---


### Timeline_COM

<img width="100" src="http://qr.topscan.com/api.php?text=https%3A%2F%2Fvux.li%2Fdemos%2Fv2%2F%23%2Fcomponent%2Ftimeline"/>

#### Demo

 <div style="width:377px;height:667px;display:inline-block;border:1px dashed #ececec;border-radius:5px;overflow:hidden;">
   <iframe src="https://vux.li/demos/v2/#/component/timeline" width="375" height="667" border="0" frameborder="0"></iframe>
 </div>

#### demo 代码

<p class="tip">下面的$t是Demo的i18n使用的翻译函数，一般情况下可以直接使用字符串。另外，下面代码隐藏了i18n标签部分的代码。</p>

``` html
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
		<timeline>
			<timeline-item v-for="i in count">
				<h4 :class="[i === 0 ? 'recent' : '']">Timeline Node {{i + 1}}</h4>
				<p :class="[i === 0 ? 'recent' : '']">index {{i + 1}}</p>
			</timeline-item>
		</timeline>
    <x-button type="primary" @click.native="count = 6"> Set to 6 nodes</x-button>
    <x-button type="primary" @click.native="count = 3"> Set to 3 nodes</x-button>
	</div>
</template>

<script>
import { Timeline, TimelineItem, XButton } from 'vux'

export default {
  components: {
    Timeline,
    TimelineItem,
    XButton
  },
  data () {
    return {
      count: 3
    }
  }
}
</script>

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
		color: rgb(4, 190, 2)
	}
}
</style>

```
#### 文档

#### Github Issue
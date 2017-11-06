<template>
  <div>
    <divider>{{ $t('Simple card with header and content') }}</divider>
	   <card :header="{title: $t('My wallet')}">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-r">
          <span>1130</span>
          <br/>
          {{ $t('Point') }}
        </div>
        <div class="vux-1px-r">
          <span>15</span>
          <br/>
          {{ $t('Coupon') }}
        </div>
        <div class="vux-1px-r">
          <span>0</span>
          <br/>
          {{ $t('Gift card') }}
        </div>
        <div>
          <span>88</span>
          <br/>
          {{ $t('Cash') }}
        </div>
      </div>
    </card>

    <br>
    <divider>{{ $t('With footer') }}</divider>
     <card :header="{title: $t('Product details') }" :footer="{title: $t('More'),link:'/component/panel'}">
      <p slot="content" class="card-padding">{{ $t('Custom content') }}</p>
    </card>

    <br>
    <divider>{{ $t('Use header slot and content slot') }}</divider>
    <card>
      <img slot="header" src="http://placeholder.qiniudn.com/640x300" style="width:100%;display:block;">
      <div slot="content" class="card-padding">
        <p style="color:#999;font-size:12px;">Posted on January 21, 2015</p>
        <p style="font-size:14px;line-height:1.2;">Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit..</p>
      </div>
    </card>
  </div>
</template>

<i18n>
Simple card with header and content:
  zh-CN: 带有标题和内容的简单卡片
My wallet:
  zh-CN: 我的钱包
Point:
  zh-CN: 京豆
Coupon:
  zh-CN: 京东券
Gift card:
  zh-CN: 京东卡/E卡
Cash:
  zh-CN: 七天待还
With footer:
  zh-CN: 带有 footer 的卡片
Product details:
  zh-CN: 商品详情
More:
  zh-CN: 查看更多
Custom content:
  zh-CN: 自定义内容
Use header slot and content slot:
  zh-CN: 使用 header slot 和 content slot
</i18n>

<script>
import { Divider, Card } from 'vux'

export default {
  components: {
    Card,
    Divider
  }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/1px.less';

.card-demo-flex {
  display: flex;
}
.card-demo-content01 {
  padding: 10px 0;
}
.card-padding {
  padding: 15px;
}
.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.card-demo-flex span {
  color: #f74c31;
}
</style>

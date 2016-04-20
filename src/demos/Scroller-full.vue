<template>
  <div>
    <flexbox>
      <flexbox-item :span="3">
        <scroller lock-x>
          <div class="box1">
            <ul class="ui-border-r">
              <li class="ui-border-b"><span>热搜推荐</span></li>
              <li class="ui-border-b"><span>手机数码</span></li>
              <li class="ui-border-b"><span>家用电器</span></li>
              <li class="ui-border-b"><span>女装内衣</span></li>
              <li class="ui-border-b"><span>男装内衣</span></li>
              <li class="ui-border-b"><span>鞋靴箱包</span></li>
              <li class="ui-border-b"><span>电脑办公</span></li>
              <li class="ui-border-b"><span>运动户外</span></li>
              <li class="ui-border-b"><span>个护化妆</span></li>
              <li class="ui-border-b"><span>家具建材</span></li>
              <li class="ui-border-b"><span>家居家纺</span></li>
              <li class="ui-border-b"><span>母婴玩具</span></li>
              <li class="ui-border-b"><span>食品生鲜</span></li>
              <li class="ui-border-b"><span>酒水饮料</span></li>
              <li class="ui-border-b"><span>钟表奢品</span></li>
              <li class="ui-border-b"><span>汽车用品</span></li>
              <li class="ui-border-b"><span>医药保健</span></li>
              <li class="ui-border-b"><span>珠宝饰品</span></li>
              <li class="ui-border-b"><span>图书音像</span></li>
              <li class="ui-border-b"><span>全球购</span></li>
            </ul>
          </div>
        </scroller>
      </flexbox-item>
      <flexbox-item>
        <scroller lock-x>
          <div>
            <div class="shop-item ui-border-b" v-for="i in 100"> 商品描述 {{i}} </div>
          </div>
        </scroller>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Scroller, Flexbox, FlexboxItem } from '../components/'

export default {
  components: {
    Scroller,
    Flexbox,
    FlexboxItem
  }
}
</script>

<style scoped>
.box1 ul {
  width: 75px;
}
.box1 li{
  text-align: center;
  padding: 0 5px;
  font-size: 14px;
  line-height: 40px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
.shop-item {
  padding: 5px;
}
</style>

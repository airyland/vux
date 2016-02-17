<template>
  <div class="slider">
    <div class="swiper" style="height: 180px;">
      <div class="item" v-for="item in list">
        <a :href="item.url">
          <div class="img" :data-x="item.img" :style="{backgroundImage:'url('+item.img+')'}"></div>
          <p class="desc">{{item.title}}</p>
        </a>
      </div>
    </div>
    <div class="indicator">
      <a href="javascript:;" v-for="(index,item) in list">
        <i class="icon_dot" :class="{'active':index===0}"></i>
      </a> 
    </div>
  </div>
</template>

<script>
  import Swiper from './swiper'
  export default {
    ready(){
      const container = this.$el
      // 自执行
      const indicator = document.querySelector('.indicator');
      const dots = indicator.querySelectorAll('.icon_dot');
      const swiper = new Swiper({container: this.$el, direction: 'horizontal'});
      swiper.on('swiped', function (prev, current) {
          // do something
          Array.prototype.forEach.call(dots, function (dot, index) {
              if(index === current){
                  return dot.classList.add('active');
              }
              return dot.classList.remove('active');
          });
      });
    },
    props: {
      list: {
        type: Array,
        required: true
      }
    }
  }


</script>

<style type="text/css">
  .slider{overflow:hidden;position:relative}
  .swiper{height:180px;overflow:hidden;position:relative}
  .swiper .item{float:left;position:relative;}
  .swiper .item a{display:block}
  .swiper .item .img{display:block;width:100%;height:180px;background:center center no-repeat;background-size:cover;}
  .swiper .item .desc{position:absolute;left:0;right:0;bottom:0;height:1.4em;font-size:16px;padding:20px 50px 12px 13px;background-image:-webkit-linear-gradient(top,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);background-image:linear-gradient(to bottom,rgba(0,0,0,0) 0,rgba(0,0,0,.7) 100%);color:#fff;text-shadow:0 1px 0 rgba(0,0,0,.5);width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}
  .indicator{position:absolute;right:15px;bottom:10px}
  .indicator a{float:left;margin-left:6px}
  .icon_dot{display:inline-block;vertical-align:middle;width:6px;height:6px;border-radius:3px;background-color:#d0cdd1}
  .icon_dot.active{background-color:#6a666f}
</style>
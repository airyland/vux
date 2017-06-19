<template>
  <div class="weui-wepay-flow" :class="{'weui-wepay-flow_vertical': orientation === 
  'vertical'}">
    <div class="weui-wepay-flow__bd">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'flow',
  props: {
    orientation: {
      type: String,
      default: 'horizontal'
    }
  }
}
</script>

<style lang="less">
@bubbleCorlor:#ff8a00;
.setBubbleCommon(@height,@backgroundColor,@fontSize,@color,@borderRadius) {
  height: @height;
  line-height: @height;
  background-color: @backgroundColor;
  font-size: @fontSize;
  color: @color;
  white-space: nowrap;
  padding: 0 6px;
  position: relative;
  border-radius: @borderRadius;
  &:after{
    content: '';
    display:inline-block;
    width:0;
    height:0;
    overflow:hidden;
    font-size:0;
    position: absolute;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = top) {
  &:after{
    border-color:@backgroundColor transparent transparent transparent;
    border-style:solid;
    border-width:5px 3px;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: -10px;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = bottom) {
  &:after{
    border-color: transparent transparent @backgroundColor transparent;
    border-style: dashed dashed solid dashed;
    border-width:5px 3px;
    left: 50%;
    transform: translate(-50%, 0);
    top: -10px;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = left) {
  &:after{
    border-color: transparent transparent transparent  @backgroundColor;
    border-style:solid;
    border-width: 3px 5px;
    top: 50%;
    transform: translate(0, -50%);
    right: -10px;
  }
}
.setBubblePrivate(@direction, @backgroundColor) when (@direction = right) {
  &:after{
    border-color: transparent @backgroundColor transparent transparent;
    border-style:solid;
    border-width: 3px 5px;
    top: 50%;
    transform: translate(0, -50%);
    left: -10px;
  }
}
.weui-wepay-flow,
.weui-wepay-flow-auto{
  padding: 40px;
}
.weui-wepay-flow__bd{
  display: flex;
  justify-content:space-between;
  align-items:center;
}
.weui-wepay-flow__li{
  width: 14px;
  height: 14px;
  position: relative;
  z-index: 1;
 .weui-wepay-flow__state{
    position: absolute;
    left: 0;
    top: 0;
    width: 14px;
    height: 14px;
    font-size: 10px;
    line-height: 14px;
    text-align: center;
    color: #FFF;
    border-radius: 7px;
    box-sizing: border-box;
  }
}
.weui-wepay-flow__state{
  background-color: #E2E2E2;
  .weui-wepay-flow__li_done &{
    background-color: #09bb07;
  }
}
[class^="weui-wepay-flow__title-"],[class*=" weui-wepay-flow__title-"]{
  position: absolute;
  color: #999999;
  font-size: 14px;
  font-weight: normal;
  white-space: nowrap;
  text-align: center;
}
.weui-wepay-flow__title-top{
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  .weui-wepay-flow__li_done &{
    color: #333;
  }
}
.weui-wepay-flow__title-bottom{
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  .weui-wepay-flow__li_done &{
    color: #333;
  }
}
.weui-wepay-flow__title-left{
  right: 30px;
  top: 50%;
  transform: translate(0, -50%);
  .weui-wepay-flow__li_done &{
    color: #333;
  }
  text-align: right;
}
.weui-wepay-flow__title-right{
  left: 30px;
  top: 50%;
  transform: translate(0, -50%);
  text-align: left;
  .weui-wepay-flow__li_done &{
    color: #333;
  }
}
[class^="weui-wepay-flow__intro-"],[class*=" weui-wepay-flow__intro-"]{
  .setBubbleCommon(20px,@bubbleCorlor,10px,#FFF,4px);
}
.weui-wepay-flow__intro-top{
  bottom: 25px;
  left: 50%;
  transform: translate(-50%, 0);
  .setBubblePrivate(top,@bubbleCorlor);
  position: absolute;
}
.weui-wepay-flow__intro-bottom{
  top: 25px;
  left: 50%;
  transform: translate(-50%, 0);
  .setBubblePrivate(bottom,@bubbleCorlor);
  position: absolute;
}
.weui-wepay-flow__intro-right{
  left: 36px;
  top: 50%;
  transform: translate(0, -50%);
  .setBubblePrivate(right,@bubbleCorlor);
  position: absolute;
}
.weui-wepay-flow__intro-left{
  right: 36px;
  top: 50%;
  transform: translate(0, -50%);
  .setBubblePrivate(left,@bubbleCorlor);
  position: absolute;
}

[class^="weui-wepay-flow__info-"]{
  .setBubbleCommon(14px,#09bb07,10px,#FFF,2px);
  position: absolute;
  .weui-wepay-flow__line_ing &{
    display: block;
  }
}
.weui-wepay-flow__info-top{
  display: none;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 11px;
  .weui-wepay-flow__line_ing &{
    display: block;
  }
  .setBubblePrivate(top,#09bb07);
}
.weui-wepay-flow__info-bottom{
  display: none;
  left: 50%;
  transform: translate(-50%, 0);
  top: 11px;
  .weui-wepay-flow__line_ing &{
    display: block;
  }
  .setBubblePrivate(bottom,#09bb07);
}
.weui-wepay-flow__info-left{
  display: none;
  top: 50%;
  transform: translate(0, -50%);
  right: 12px;
  .weui-wepay-flow__line_ing &{
    display: block;
  }
  .setBubblePrivate(left,#09bb07);
}
.weui-wepay-flow__info-right{
  display: none;
  top: 50%;
  transform: translate(0, -50%);
  left: 12px;
  .weui-wepay-flow__line_ing &{
    display: block;
  }
  .setBubblePrivate(right,#09bb07);
}
.weui-wepay-flow__line{
  flex:1;
  background-color: #E2E2E2;
  height: 3px;
  position: relative;
}
.weui-wepay-flow__title{
  color: #999999;
  font-size: 14px;
  font-weight: normal;
}
.weui-wepay-flow__info{
  color: #999999;
  font-size: 12px;
}
.weui-wepay-flow__process{
  display: none;
  background-color: #09bb07;
  height: 3px;
  position: relative;
  .weui-wepay-flow__line_ing &{
    display: block;
    width: 50%;
  }
  .weui-wepay-flow__line_done &{
    display: block;
  }
}
.weui-wepay-flow_custom{
  .weui-wepay-flow__bd{
    justify-content:flex-start;
  }
  .weui-wepay-flow__line{
    flex:none;
    width: 100px;
  }
}
.weui-wepay-flow_vertical{
  .weui-wepay-flow__bd{
    flex-direction:column;
    height: 100%;
    box-sizing: border-box;
  }
  .weui-wepay-flow__line{
    height: auto;
    width: 3px;
  }
  .weui-wepay-flow__line_ing{
    .weui-wepay-flow__process{
      height: 50%;
    } 
  }
  .weui-wepay-flow__process{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px; 
  }
  .weui-wepay-flow__line_done{
    .weui-wepay-flow__process{
      height: 100%;
    }
  }
}

.weui-wepay-flow_vertical-custom{
  .weui-wepay-flow__bd{
    flex-direction:column;
    height: 100%;
    box-sizing: border-box;
  }
  .weui-wepay-flow__line{
    width: 3px;
    flex:none;
  }
  .weui-wepay-flow__line_ing{
    .weui-wepay-flow__process{
      height: 50%;
    } 
  }
  .weui-wepay-flow__process{
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 3px; 
  }
  .weui-wepay-flow__line_done{
    .weui-wepay-flow__process{
      height: 100%;
    }
  }
}
.weui-wepay-flow-auto{
  position: relative;
}
.weui-wepay-flow-auto__bd{
  position: relative;
}
.weui-wepay-flow-auto__state{
  position: absolute;
  left: 0;
  top: 4px;
  width: 14px;
  height: 14px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  color: #FFF;
  border-radius: 7px;
  background-color: #E2E2E2;
  z-index: 2;
}
.weui-wepay-flow-auto__state_on{
    background-color: #09bb07;
}
.weui-wepay-flow-auto__line{
  position: absolute;
  z-index: 1;
  width: 2px;
  background-color: #dddddd;
  top: 10px;
  bottom: -4px;
  left: 6px;
  z-index: 1;
}
.weui-wepay-flow-auto__line_on{
  background-color: #09bb07;
}
.weui-wepay-flow-auto__li{
  position: relative;
  padding-bottom: 20px;
  padding-left: 30px; 
}
.weui-wepay-flow-auto__title{
  color: #999999;
  font-size: 14px;
  font-weight: normal;
}
.weui-wepay-flow-auto__info{
  color: #999999;
  font-size: 12px;
}
</style>
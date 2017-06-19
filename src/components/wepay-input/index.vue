<template>
  <div>
    <div class="weui-wepay-pay">
      <div class="weui-wepay-pay__bd">
        <div class="weui-wepay-pay__inner">
            <h1 class="weui-wepay-pay__title" v-html="title"></h1>
            <div class="weui-wepay-pay__inputs"> <strong class="weui-wepay-pay__strong" v-html="label || '￥'"></strong>
                <input type="number" class="weui-wepay-pay__input" :placeholder="placeholder" v-model="currentValue" number></div>
            <div class="weui-wepay-pay__intro">
              <slot name="description"><div v-html="description"></div></slot>
            </div>
        </div>
      </div>
      <div class="weui-wepay-pay__ft">
        <p class="weui-wepay-pay__info" v-html="info"></p>
        <div class="weui-wepay-pay__btn">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'wepay-input',
  props: ['title', 'description', 'placeholder', 'info', 'label', 'value'],
  created () {
    this.currentValue = this.value
  },
  data () {
    return {
      currentValue: ''
    }
  },
  watch: {
    value (newVal) {
      this.currentValue = newVal
    },
    currentValue (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>

<style lang="less">
.weui-wepay-pay-wrap{
  background-color: #fbf9fe;
}
.weui-msg{
  position: relative;
  z-index: 1;
}
.weui-wepay-pay {
  position: relative;
  z-index: 1;
  padding: 15px;
}
.weui-wepay-pay__inner {
  background-color: #FFFFFF;
  padding: 16px;
  position: relative;
  z-index: 0;
}
.weui-wepay-pay__inner:after {
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #DDDDDD;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
}
.weui-wepay-pay__title {
  font-size: 12px;
  color: #333333;
  font-weight: normal;
}
.weui-wepay-pay__inputs {
  margin-top: 12px;
  padding-bottom: 18px;
  position: relative;
  z-index: 2;
  color: #333333;
}
.weui-wepay-pay__inputs:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #DDDDDD;
  color: #DDDDDD;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.weui-wepay-pay__strong {
  position: absolute;
  color: #000000;
  font-size: 28px;
  line-height: 1;
  left: -6px;
  top: -3px;
  font-weight: normal;
}
.weui-wepay-pay__input {
  padding-left: 28px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  outline: 0;
  height: 40px;
  line-height: 40px;
  font-size: 40px;
}
.weui-wepay-pay__input::-webkit-textfield-decoration-container {
  background-color: transparent;
}
.weui-wepay-pay__input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.weui-wepay-pay__input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.weui-wepay-pay__input::-webkit-input-placeholder {
  color: #EEEEEE;
}
.weui-wepay-pay__intro {
  font-size: 12px;
  color: #9e9e9e;
  margin-top: 14px;
}
.weui-wepay-pay__info {
  font-size: 12px;
  color: #9e9e9e;
  margin-top: 16px;
  text-align: center;
}
.weui-wepay-pay__btn {
  margin-top: 12px;
}
.weui-wepay-logo-default{
  font-size: 16px;
}
</style>
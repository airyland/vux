<template>
  <div class="vux-tab">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      lineWidth: {
        type: Number,
        required: false,
        default: 3
      },
      activeColor: {
        type: String,
        required: false,
        default: '#04be02'
      },
      defaultColor: {
        type: String,
        required: false,
        default: '#666'
      }
    }
  }
</script>


<style>
  .vux-tab {
     display: -webkit-box;
     display: -webkit-flex;
     background-color: #fff;
     height: 44px;
 }
 .vux-tab button {
     padding: 0;
     border: 0;
     outline: 0;
     background: 0 0;
     -webkit-appearance: none;
 }
 .vux-tab .vux-tab-item {
     display: block;
     -webkit-box-flex: 1;
     -webkit-flex: 1;
     width: 100%;
     height: 100%;
     -webkit-box-sizing: border-box;
     background: -webkit-gradient(linear, left top, left bottom, from(#e5e5e5), to(#e5e5e5)) bottom left no-repeat;
     background: -webkit-linear-gradient(270deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
     background: linear-gradient(180deg, #e5e5e5, #e5e5e5, rgba(229, 229, 229, 0)) bottom left no-repeat;
     -webkit-background-size: 100% 1px;
     font-size: 14px;
     text-align: center;
     line-height: 44px;
     color: #666;
 }
 .vux-tab .vux-tab-item.vux-tab-selected {
     background: 0 0;
     color: #04be02;
     border-bottom: 3px solid #04be02;
 }
</style>
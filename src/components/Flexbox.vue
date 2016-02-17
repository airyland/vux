<template>
  <div class="am-flexbox">
    <slot></slot>
  </div>
</template>

<style>
  .am-flexbox{
    text-align:left;
    display:-webkit-box;
    display:-webkit-flex;
    -webkit-box-align:center;
    -webkit-align-items:center
  }

  .am-flexbox .am-flexbox-item{
    -webkit-box-sizing:border-box;
    -webkit-box-flex:1;
    -webkit-flex:1;
    margin-left:8px;
    min-width:20px
  }

  .am-flexbox .am-flexbox-item:first-child{
    margin-left:0
  }

  .am-flexbox[am-mode~=average] .am-flexbox-item{
    width:100%
  }
</style>
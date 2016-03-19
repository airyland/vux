<template>
  <div class="vux-flexbox-item" :style="{marginLeft: $parent.supported ? $parent.marginLeft + 'px' : 0}">
    <slot></slot>
  </div>
</template>
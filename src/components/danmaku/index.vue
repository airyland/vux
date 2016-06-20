<template>
  <div class="dmk-bullet" :style="item.position" :class="{'dmk-flying': item.flying}">
    <img class="dmk-bullet-avatar" v-if="item.avatar" :src="item.avatar">
    {{item.nickname + ': ' + item.word}}</div>
</template>

<script lang="babel">
  export default {
    props: {
      item: {
        type: Object
      }
    }
  }
</script>

<style>
  .dmk-bullet {
    position: fixed;
    right: 0;
    top: 0;
    color: #fff;
    background: rgba(100,100,100,0.5);
    line-height: 32px;
    height: 32px;
    padding: 0 .8em;
    font-size: .9em;
    will-change: transform;
    border-radius: 3rem;
    transform: translateX(150%);
    transition: cubic-bezier(0.0, 0.0, 1.0, 1.0) transform 12s;
  }
  .dmk-bullet-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    vertical-align: bottom;
    margin-right:0.25em;
  }
  .dmk-flying {
    transform: translateX(-500px);
    transform: translateX(-100vw);
  }
</style>

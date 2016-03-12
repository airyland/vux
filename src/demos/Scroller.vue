<template>
  <div>
    <divider>A Horizontal Scroller</divider>
    <scroller>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>
  </div>
</template>

<script>
import Scroller from '../components/scroller/'
import Divider from '../components/divider/'

export default {
  components: {
    Scroller,
    Divider
  }
}
</script>

<style scoped>
.box1 {
  height: 100px;
  position: relative;
  width: 1490px;
}
.box1-item {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display:inline-block;
  margin-left: 15px;
  float: left;
  text-align: center;
  line-height: 100px;
}
.box1-item:first-child {
  margin-left: 0;
}
</style>
<template>
  <div>
    <divider>A Horizontal Scroller without Scrollbar</divider>
    <scroller lock-y :scrollbar-x=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider>A Horizontal Scroller with Scrollbar</divider>
    <scroller lock-y scrollbar-x>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider>A Horizontal Scroller without bounce effect</divider>
    <scroller lock-y scrollbar-x :bounce=false>
      <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
      </div>
    </scroller>

    <divider>A Vertical Scroller</divider>
    <scroller lock-x height="200px">
      <div class="box2">
        <p v-for="i in 80">placeholder {{i}}</p>
      </div>
    </scroller>

    <divider>A Vertical Scroller with scrollbar y</divider>
    <scroller lock-x scrollbar-y height="200px">
      <div class="box2">
        <p v-for="i in 80">placeholder {{i}}</p>
      </div>
    </scroller>

  </div>
</template>

<script>
import { Scroller, Divider, Spinner } from '../components/'

export default {
  components: {
    Scroller,
    Divider,
    Spinner
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
.box2-wrap {
  height: 300px;
  overflow: hidden;
}
</style>

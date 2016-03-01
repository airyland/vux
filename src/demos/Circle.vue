<template>
  <div class="vux-circle-demo">
    <br>
    <div style='width:100px;height:100px;'>
      <circle :percent=30 :stroke-width=6 stroke-color=#3FC7FA></circle>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <circle :percent=100 :stroke-width=6 stroke-color=#3FC7FA></circle>
    </div>
    <br>
    <div style='width:100px;height:100px;'>
      <circle :percent='percent2' :stroke-width=6 :trail-width=6 :stroke-color='strokeColor2' trail-color="#ececec"></circle>
    </div>
    <span @click='update2'>update</span>
  </div>
</template>

<script>
import Circle from '../components/Circle/'
export default {
  components: {
    Circle
  },
  data () {
    return {
      percent2: 30,
      strokeColor2: '#3FC7FA'
    }
  },
  methods: {
    update2: function () {
      const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A']
      this.percent2 = parseInt(Math.random() * 100, 10)
      this.strokeColor2 = colorMap[parseInt(Math.random() * 3, 10)]
    }
  }
}
</script>

<style>
.vux-circle-demo {
  text-align: center;
}
.vux-circle-demo > div {
  margin: 0 auto;
}
</style>
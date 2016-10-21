<template>
  <div>
    <fullpage
    class="fullpage-demo"
    drag
    :start="0"
    :duration="100"
    @on-change="onChange"
    @on-before-change="onBeforeChange"
    @on-after-change="onAfterChange">
      <div><div>1</div></div>
      <div><div>2</div></div>
      <div><div>3</div></div>
      <div><div>4</div></div>
    </fullpage>
  </div>
</template>

<script>
import Fullpage from './'

export default {
  components: {
    Fullpage
  },
  methods: {
    onChange (data) {
      console.log('chage', data)
    },
    onBeforeChange (data) {
      console.log('before change', data)
    },
    onAfterChange (data) {
      console.log('after change', data)
    }
  }
}
</script>

<style scoped>
.fullpage-demo {
  background-color:yellow;
  font-size: 72px;
  line-height: 320px;
  text-align: center;
}
</style>
<template>
  <div>
    <group>
      <switch title="Default popup" :value.sync="show"></switch>
      <switch title="Full popup" :value.sync="show1"></switch>
      <switch title="with a Scroller" :value.sync="show2"></switch>
    </group>
    <popup :show.sync="show">
      <div class="popup0">
        <group>
          <switch title="Another Switcher" :value.sync="show"></switch>
        </group>
      </div>
    </popup>

    <popup :show.sync="show1" height="100%">
      <div class="popup1">
        <group>
          <switch title="Another Switcher" :value.sync="show1"></switch>
        </group>
      </div>
    </popup>

    <popup :show.sync="show2" height="200px" @on-first-show="resetScroller">
      <scroller height="100px" lock-x style="border:1px solid red;" v-ref:scroller>
        <div>
          <p v-for="i of 10">{{i}}</p>
        </div>
      </scroller>
    </popup>

  </div>
</template>

<script>
import { Popup, Group, Switch, Scroller } from '../components/'

export default {
  components: {
    Popup,
    Group,
    Switch,
    Scroller
  },
  data () {
    return {
      show: false,
      show1: false,
      show2: false
    }
  },
  methods: {
    resetScroller () {
      this.$refs.scroller.reset()
    }
  }
}
</script>

<style>
.popup0 {
  padding-bottom:15px;
  height:200px;
}
.popup1 {
  width:100%;
  height:100%;
}
</style>

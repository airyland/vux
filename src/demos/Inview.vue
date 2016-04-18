<template>
  <div>
    <div v-inview="{id:'box1'}">box1</div>
    <p v-for="i in 80">placeholder</p>
    <div v-inview="{id:'box2'}">box1</div>
  </div>
</template>

<script>
import Inview from '../directives/inview'

export default {
  directives: {
    Inview
  },
  data () {
    return {
      div2: 'not inview'
    }
  },
  events: {
    'on-view-enter': function (id) {
      console.log(id, 'in view')
    },
    'on-view-leave': function (id) {
      console.log(id, 'not in view')
    }
  }
}
</script>
<template>
  <div>
    <img class="previewer-demo-img" v-for="(index, item) in list" :src="item.src" width="100" @click="$refs.previewer.show(index)">
    <previewer :list="list" v-ref:previewer :options="options"></previewer>
  </div>
</template>

<script>
import { Previewer } from '../components'

export default {
  components: {
    Previewer
  },
  data () {
    return {
      list: [{
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
      },
      {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
      }],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  }
}
</script>
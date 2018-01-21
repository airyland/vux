<template>
  <div class="vux-1px-b">
    <flexbox :gutter="0" v-for="(list, index) in components" :key="index">
      <flexbox-item :span="1/3" v-for="component in list" :key="component.name" class="cbox vux-1px-t vux-tap-active" @click.native="go(component.name.toLowerCase())">
        <div class="vux-1px-r cbox-inner">
          <span class="demo-icon" v-html="component.icon" :style="{color: component.color}"></span>
          <br>
          <span class="cname">{{component.name}}</span>
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, VuxComponentListData as components } from 'vux'
import { mapState } from 'vuex'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  methods: {
    go (name) {
      this.$router.push(`/component/${name}`)
    },
    split (array) {
      let chunks = []
      let count = Math.ceil(array.length / 3)
      while (count > 0) {
        chunks.push(array.slice((count - 1) * 3, count * 3))
        count--
      }
      return chunks.reverse()
    }
  },
  data () {
    return {
      components: this.split(components)
    }
  },
  computed: {
    ...mapState({
      demoTop: state => state.vux.demoScrollTop
    })
  }
}
</script>

<style lang="less" scoped>
.cbox {
  text-align: center;
}
.cbox-inner {
  padding: 15px 0;
  width: 100%;
  height: 100%;
}
.cname {
  text-transform: capitalize;
}
</style>

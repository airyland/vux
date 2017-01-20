<template>
  <div>
    <keep-alive>
      <flexbox wrap="wrap" :gutter="0" class="vux-1px-b">
        <flexbox-item :span="1/3" v-for="component in components" class="cbox vux-1px-t" @click.native="go(component.name.toLowerCase())">
          <div class="vux-1px-r cbox-inner">
            <span class="demo-icon" v-html="component.icon" :style="{color: component.color}"></span>
            <br>
            <span class="cname">{{component.name}}</span>
          </div>
        </flexbox-item>
      </flexbox>
    </keep-alive>
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
    }
  },
  data () {
    return {
      components: components
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
@import '~vux/src/styles/1px.less';

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

<template>
  <div>
    <flexbox wrap="wrap" :gutter="0" class="vux-1px-b">
      <flexbox-item :span="1/3" v-for="component in components" class="cbox vux-1px-t" @click.native="go(component.name.toLowerCase())">
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

@font-face {
  font-family: 'vux-demo';  /* project id 70323 */
  src: url('//at.alicdn.com/t/font_333ae73qzu4k7qfr.eot');
  src: url('//at.alicdn.com/t/font_333ae73qzu4k7qfr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_333ae73qzu4k7qfr.woff') format('woff'),
  url('//at.alicdn.com/t/font_333ae73qzu4k7qfr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_333ae73qzu4k7qfr.svg#iconfont') format('svg');
}

.demo-icon {
  font-family: 'vux-demo';
  font-size:20px;
  color: #04BE02;
}

.demo-icon:before {
  content: attr(icon);
}
</style>
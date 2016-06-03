<template>
  <div>
    <group title="Thx" title-color="#04be02">
      <cell title="Router" link="https://github.com/vuejs/vue-router">
        <span class="demo-icon" slot="icon">&#xe636;</span>
        <span slot="value"><img src="http://cn.vuejs.org/images/logo.png" width="20" style="vertical-align: middle;padding-right: 5px;">Powered by Vue-router</span>
      </cell>
      <cell title="Style" link="https://github.com/weui/weui">
        <span class="demo-icon" slot="icon">&#xe638;</span>
        <span slot="value"><span class="demo-icon">&#xe600</span>Based on Weui</span>
      </cell>
      <cell title="Dev && Build" link="https://github.com/webpack/webpack">
        <span class="demo-icon" slot="icon" style="color: #000;">&#xe639;</span>
        <span slot="value"><img src="https://webpack.github.io/assets/favicon.png" width="20" style="vertical-align: middle;padding-right: 5px;">Webpack</span>
      </cell>
      <cell title="Demo Icon" link="http://iconfont.cn/">
        <span class="demo-icon" slot="icon">&#xe619;</span>
        <span slot="value"><img src="http://gtms04.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico" width="20" style="vertical-align: middle;padding-right: 5px;">Iconfont</span>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from '../components'

export default {
  components: {
    Group,
    Cell
  }
}
</script>

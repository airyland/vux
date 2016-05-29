<template>
  <div>
    <group>
      <switch :value.sync="show" title="Toggle"></switch>
    </group>
    <dialog :show.sync="show" class="dialog-demo">
      <p class="dialog-title">I'm a Dialog.</p>
      <div class="img-box">
        <img src="../assets/demo/dialog/01.jpg" style="max-width:100%">
      </div>
      <span class="vux-close" @click="show=false"></span>
    </dialog>
  </div>
</template>

<script>
import { Dialog, XButton, Group, Switch } from '../components'

export default {
  components: {
    Dialog,
    XButton,
    Group,
    Switch
  },
  ready () {
    setTimeout(() => {
      this.show = true
    }, 10)
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="less" scoped>
.dialog-demo {
  .weui_dialog{
    border-radius: 8px;
    padding-bottom: 8px;
  }
  .dialog-title {
    line-height: 30px;
    color: #666;
  }
  .img-box {
    height: 350px;
    overflow: hidden;
  }
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
}
</style>

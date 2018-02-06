export default {
  install (Vue) {
    const bus = new Vue({})
    if (!Vue.$vux) {
      Vue.$vux = {
        bus
      }
    } else {
      Vue.$vux.bus = bus
    }

    Vue.mixin({
      created: function () {
        if (this.$vux) {
          this.$vux.bus = bus
        } else {
          this.$vux = {
            bus
          }
        }
      }
    })
  }
}

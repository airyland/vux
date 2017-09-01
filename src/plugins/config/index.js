export default {
  install (Vue, config = {}) {
    if (!Vue.vux) {
      Vue.vux = {
        config
      }
    } else {
      Vue.vux.config = config
    }

    Vue.mixin({
      created: function () {
        if (this.$vux) {
          this.$vux.config = config
        } else {
          this.$vux = {
            config
          }
        }
      }
    })
  }
}

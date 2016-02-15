export default {
  props: {
    prisine: true,
    touched: false
  },
  created: function () {
    this.prisine = true
    this.touched = false
  },
  computed: {
    dirty: function () {
      return !this.prisine
    },
    untouched: function () {
      return !this.touched
    }
  },
  watch: {
    value: function (newVal) {
      if (this.prisine === true) {
        this.prisine = false
      }
    }
  }
}

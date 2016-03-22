export default {
  props: {
    required: {
      type: Boolean,
      default: true
    }
  },
  created: function () {
    this.uuid = Math.random().toString(36).substring(3, 8)
    this.handleChangeEvent = false
  },
  computed: {
    dirty: function () {
      return !this.prisine
    },
    invalid: function () {
      return !this.valid
    }
  },
  methods: {
    setTouched: function () {
      this.touched = true
    }
  },
  watch: {
    value: function (newVal) {
      if (this.prisine === true) {
        this.prisine = false
      }
      if (!this.handleChangeEvent) {
        this.$dispatch('change', newVal)
      }
    }
  },
  data: function () {
    return {
      errors: {},
      prisine: true,
      touched: false,
      valid: true
    }
  }
}


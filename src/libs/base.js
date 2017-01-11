import uuidMixin from './mixin_uuid'

export default {
  mixins: [uuidMixin],
  props: {
    required: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.handleChangeEvent = false
  },
  computed: {
    dirty () {
      return !this.prisine
    },
    invalid () {
      return !this.valid
    }
  },
  methods: {
    setTouched () {
      this.touched = true
    }
  },
  watch: {
    value (newVal) {
      if (this.prisine === true) {
        this.prisine = false
      }
      if (!this.handleChangeEvent) {
        this.$emit('on-change', newVal)
        this.$emit('input', newVal)
      }
    }
  },
  data () {
    return {
      errors: {},
      prisine: true,
      touched: false
    }
  }
}


<script>
import { camelAttrs } from './util'

export default {
  props: {
    x: Boolean,
    y: Boolean,
    field: String
  },
  render () {},
  created () {
    this.emitSetting()
  },
  methods: {
    emitSetting () {
      ['x', 'y'].forEach(item => {
        if (this[item]) {
          this.$parent.setScale({
            [item]: {
              ...camelAttrs(this.$attrs)
            }
          })
          if (this.field) {
            this.$parent.setField(item, this.field)
          }
        }
      })
    }
  }
}
</script>

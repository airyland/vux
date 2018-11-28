<script>
import { camelAttrs } from './util'

export default {
  props: {
    x: Boolean,
    y: Boolean,
    field: String,
    disabled: Boolean,
    // only for x axis
    autoAlign: Boolean,
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    let _options = {
      ...this.$props,
      ...this.options,
      ...camelAttrs(this.$attrs)
    }
    this.$parent.setAxis(_options)
  },
  render () {}
}
</script>
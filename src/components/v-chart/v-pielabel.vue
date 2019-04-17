<script>
import { camelAttrs } from './util'

export default {
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  created () {
    this.$parent.addPielabel({
      options: {
        ...camelAttrs(this.options),
        ...camelAttrs(this.$attrs)
      }
    })
  },
  render () {}
}
</script>

<script>
import { camelAttrs } from './util'

const types = ['line', 'text', 'tag', 'rect', 'html', 'arc']

export default {
  props: {
    type: {
      type: String,
      validate: function (val) {
        return types.filter(type => type === val).length === 1
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    // only add boolean props, others will get from $attrs
    top: Boolean,
    withPoint: {
      type: Boolean,
      default: true
    }
  },
  created () {
    this.$parent.addGuide({
      type: this.type,
      options: {
        top: this.top,
        withPoint: this.withPoint,
        ...camelAttrs(this.options),
        ...camelAttrs(this.$attrs)
      }
    })
  },
  render () {}
}
</script>
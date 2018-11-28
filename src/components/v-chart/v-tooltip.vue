<script>
import { camelAttrs } from './util'

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    showCrosshairs: {
      type: Boolean,
      default: true
    },
    showItemMarker: {
      type: Boolean,
      default: true
    },
    showXValue: {
      type: Boolean,
      default: false
    },
    showValueInLegend: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  render () {},
  created () {
    const options = {
      disabled: this.disabled,
      showCrosshairs: this.showCrosshairs,
      showItemMarker: this.showItemMarker,
      showValueInLegend: this.showValueInLegend,
      ...camelAttrs(this.options),
      ...camelAttrs(this.$attrs)
    }
    if (this.showXValue) {
      options.onShow = function (ev) {
        const { items } = ev
        items[0].name = items[0].title
      }
    }
    this.$parent.setTooltip(options)
  }
}
</script>

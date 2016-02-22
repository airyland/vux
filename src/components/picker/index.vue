<template>
  <div>
    <flexbox>
      <flexbox-item v-for="(index, one) in data" style="margin-left:0;">
        <div class="vux-picker-{{index}}"></div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Scroller from './scroller'
import Flexbox from '../Flexbox'
import FlexboxItem from '../Flexbox-item'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    value: {
      type: Array,
      required: false,
      twoWay: true
    },
    item_class: {
      type: String,
      default: 'scroller-item'
    }
  },
  methods: {
    getValue: function () {
      var data = []
      for (var i = 0; i < this.data.length; i++) {
        data.push(this.scroller[i].value)
      }
      return data
    },
    emitChange: function () {
      this.$emit('change', this.getValue())
    }
  },
  data () {
    return {
      scroller: [],
      count: 0
    }
  },
  created () {
    this.count = this.data.length
  },
  ready () {
    var _this = this
    for (var i = 0; i < this.data.length; i++) {
      var uuid = Math.random().toString(36).substring(3, 8)
      this.$el.querySelector('.vux-picker-' + i).setAttribute('id', 'vux-picker-' + uuid)

      ;
      (function (i) {
        _this.scroller[i] = new Scroller('#' + 'vux-picker-' + uuid, {
          data: _this.data[i],
          defaultValue: _this.value[i],
          itemClass: _this.item_class,
          onSelect: function (value) {
            _this.value[i] = value
            _this.$dispatch('change', _this.getValue())
          }
        })
      })(i)
    }
    //  this.$dispatch('change', this.value || this.data[0].value)
  },
  watch: {
    value: function (val) {
      for (var i = 0; i < val.length; i++) {
        if (this.scroller[i].value !== val[i]) {
          this.scroller[i].select(val[i])
        }
      }
    }
  },
  beforeDestroy: function () {
    for (var i = 0; i < this.count; i++) {
      this.scroller[i].destroy()
    }
  }
}
</script>

<style>
@import './scroller.css'
</style>
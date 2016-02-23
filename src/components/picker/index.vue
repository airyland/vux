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
import Manager from './chain'
export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  created () {
    if (this.chainData) {
      const length = this.chainDataColumns
      this.store = new Manager(this.chainData, length)
      this.data = this.store.getColumns()
    }
  },
  ready () {
    var _this = this
    if (!this.data) {
      return
    }

    this.count = this.data.length
    // set first item as value

    if (this.value.length < this.count) {
      for (let i = 0; i < this.count; i++) {
        this.value.$set(i, this.data[i][0].value)
      }
    }

    this.uuids = []
    for (var i = 0; i < this.data.length; i++) {
      var uuid = Math.random().toString(36).substring(3, 8)
      this.uuids.push(uuid)
      this.$el.querySelector('.vux-picker-' + i).setAttribute('id', 'vux-picker-' + uuid)

      ;
      (function (i) {
        _this.scroller[i] = new Scroller('#' + 'vux-picker-' + uuid, {
          data: _this.data[i],
          defaultValue: _this.value[i] || _this.data[i][0].value,
          itemClass: _this.item_class,
          onSelect: function (value) {
            _this.value.$set(i, value)
            _this.$dispatch('change', _this.getValue())
            if (_this.chainData) {
              _this.render(i + 1)
            }
          }
        })
      })(i)
    }
  },
  props: {
    data: {
      type: Array
    },
    chainData: {
      type: Array
    },
    chainDataColumns: {
      type: Number
    },
    value: {
      type: Array,
      required: false,
      twoWay: true
    },
    itemClass: {
      type: String,
      default: 'scroller-item'
    }
  },
  methods: {
    render: function (i) {
      if (i > this.count - 1) {
        return
      }
      const _this = this
      _this.scroller[i].destroy()
      _this.$el.querySelector('#' + 'vux-picker-' + _this.uuids[i]).innerHTML = ''
      let list = _this.store.getChildren(_this.getValue()[i - 1])
      _this.scroller[i] = new Scroller('#' + 'vux-picker-' + _this.uuids[i], {
        data: list,
        itemClass: _this.item_class,
        onSelect: function (value) {
          _this.value.$set(i, value)
          _this.$dispatch('change', _this.getValue())
          _this.render(i + 1)
        }
      })
      _this.value.$set(i, list[0].value)
      _this.render(i + 1)
    },
    getValue: function () {
      var data = []
      for (var i = 0; i < this.data.length; i++) {
        data.push(this.scroller[i].value)
      }
      return data
    }
  },
  data () {
    return {
      scroller: [],
      count: 0
    }
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
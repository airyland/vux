<template>
  <div class="vux-picker">
    <flexbox :gutter="0">
      <flexbox-item v-for="(index, one) in data" style="margin-left:0;">
        <div class="vux-picker-item" :id="'vux-picker-' + uuid + '-' + index"></div>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script>
import Scroller from './scroller'
import Flexbox from '../flexbox'
import FlexboxItem from '../flexbox-item'
import Manager from './chain'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  created () {
    if (this.columns !== 0) {
      const length = this.columns
      this.store = new Manager(this.data, length)
      this.data = this.store.getColumns(this.value)
    }
  },
  ready () {
    this.render(this.data, this.value)
  },
  props: {
    data: {
      type: Array
    },
    columns: {
      type: Number,
      default: 0
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
    getId: function (i) {
      return `#vux-picker-${this.uuid}-${i}`
    },
    render: function (data, value) {
      this.count = this.data.length
      const _this = this
      if (!data) {
        return
      }

      let count = this.data.length
      // set first item as value
      if (value.length < count) {
        for (let i = 0; i < count; i++) {
          _this.value.$set(i, data[i][0].value || data[i][0])
        }
      }

      for (let i = 0; i < data.length; i++) {
        _this.scroller[i] && _this.scroller[i].destroy()
        _this.scroller[i] = new Scroller(_this.getId(i), {
          data: data[i],
          defaultValue: value[i] || data[i][0].value,
          itemClass: _this.item_class,
          onSelect: function (value) {
            _this.value.$set(i, value)
            _this.$dispatch('on-change', _this.getValue())
            if (_this.columns !== 0) {
              _this.renderChain(i + 1)
            }
          }
        })
        if (_this.value) {
          _this.scroller[i].select(value[i])
        }
      }
    },
    renderChain: function (i) {
      if (this.columns === 0) {
        return
      }

      // do not render for last scroller
      if (i > this.count - 1) {
        return
      }

      const _this = this
      let ID = this.getId(i)
      // destroy old one
      this.scroller[i].destroy()
      let list = this.store.getChildren(_this.getValue()[i - 1])
      this.scroller[i] = new Scroller(ID, {
        data: list,
        itemClass: _this.item_class,
        onSelect: function (value) {
          _this.value.$set(i, value)
          _this.$dispatch('on-change', _this.getValue())
          _this.renderChain(i + 1)
        }
      })
      this.value.$set(i, list[0].value)
      this.renderChain(i + 1)
    },
    getValue: function () {
      let data = []
      for (var i = 0; i < this.data.length; i++) {
        data.push(this.scroller[i].value)
      }
      return data
    }
  },
  data () {
    return {
      scroller: [],
      count: 0,
      uuid: Math.random().toString(36).substring(3, 8)
    }
  },
  watch: {
    value: function (val, oldVal) {
      // render all the scroller for chain datas
      if (this.columns !== 0) {
        if (val !== oldVal) {
          this.data = this.store.getColumns(val)
          this.$nextTick(function () {
            this.render(this.data, val)
          })
        }
      } else {
        for (let i = 0; i < val.length; i++) {
          if (this.scroller[i].value !== val[i]) {
            this.scroller[i].select(val[i])
          }
        }
      }
    }
  },
  beforeDestroy: function () {
    for (let i = 0; i < this.count; i++) {
      this.scroller[i].destroy()
      this.scroller[i] = null
    }
  }
}
</script>

<style>
@import './scroller.css';

.scroller-item {
  line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

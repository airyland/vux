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
import { Flexbox, FlexboxItem } from '../flexbox'
import Manager from './chain'

export default {
  components: {
    Flexbox,
    FlexboxItem
  },
  created () {
    if (this.columns !== 0) {
      const length = this.columns
      this.store = new Manager(this.data, length, this.fixedColumns)
      this.data = this.store.getColumns(this.value)
    }
  },
  ready () {
    this.$nextTick(() => {
      this.render(this.data, this.value)
    })
  },
  props: {
    data: {
      type: Array
    },
    columns: {
      type: Number,
      default: 0
    },
    fixedColumns: {
      type: Number,
      default: 0
    },
    value: {
      type: Array,
      twoWay: true
    },
    itemClass: {
      type: String,
      default: 'scroller-item'
    }
  },
  methods: {
    getId (i) {
      return `#vux-picker-${this.uuid}-${i}`
    },
    render (data, value) {
      this.count = this.data.length
      const _this = this
      if (!data || !data.length) {
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
        /**
        * Still don't know why this happens
        */
        if (!document.querySelector(_this.getId(i))) {
          return
        }

        _this.scroller[i] && _this.scroller[i].destroy()
        _this.scroller[i] = new Scroller(_this.getId(i), {
          data: data[i],
          defaultValue: value[i] || data[i][0].value,
          itemClass: _this.item_class,
          onSelect (value) {
            _this.value.$set(i, value)
            if (!this.columns || (this.columns && _this.getValue().length === _this.store.count)) {
              _this.$emit('on-change', _this.getValue())
            }
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
    renderChain (i) {
      if (!this.columns) {
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
        onSelect (value) {
          _this.value.$set(i, value)
          _this.$emit('on-change', _this.getValue())
          _this.renderChain(i + 1)
        }
      })
      this.value.$set(i, list[0].value)
      this.renderChain(i + 1)
    },
    getValue () {
      let data = []
      for (let i = 0; i < this.data.length; i++) {
        if (this.scroller[i]) {
          data.push(this.scroller[i].value)
        } else {
          return []
        }
      }
      return data
    },
    emitValueChange (val) {
      if (!this.columns || (this.columns && val.length === this.store.count)) {
        this.$emit('on-change', val)
      }
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
    value (val, oldVal) {
      // render all the scroller for chain datas
      if (this.columns !== 0) {
        if (val.length > 0) {
          if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
            this.data = this.store.getColumns(val)
            this.$nextTick(function () {
              this.render(this.data, val)
            })
          }
        }
      } else {
        for (let i = 0; i < val.length; i++) {
          if (this.scroller[i] && this.scroller[i].value !== val[i]) {
            this.scroller[i].select(val[i])
          }
        }
      }
    },
    data (newData) {
      if (Object.prototype.toString.call(newData[0]) === '[object Array]') {
        this.$nextTick(() => {
          this.render(newData, this.value)
          // emit on-change after rerender
          this.$nextTick(() => {
            this.emitValueChange(this.getValue())

            if (JSON.stringify(this.getValue()) !== JSON.stringify(this.value)) {
              if (!this.columns || (this.columns && this.getValue().length === this.store.count)) {
                this.value = this.getValue()
              }
            }
          })
        })
      } else {
        if (this.columns !== 0) {
          if (!newData.length) {
            return
          }
          const length = this.columns
          this.store = new Manager(newData, length, this.fixedColumns)
          this.data = this.store.getColumns(this.value)
        }
      }
    }
  },
  beforeDestroy () {
    for (let i = 0; i < this.count; i++) {
      this.scroller[i].destroy()
      this.scroller[i] = null
    }
  }
}
</script>

<style>
@import './scroller.css';
</style>


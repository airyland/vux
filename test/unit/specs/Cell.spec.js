import Vue from 'vue'
import Cell from '@/components/cell/index.vue'

describe('Cell.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Cell)
    const vm = new Constructor().$mount()
    expect(vm.$el.tagName)
      .to.equal('DIV')
  })
})

import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('XNumber', () => {
  it('basic', () => {
    const wrapper = mount(Comp)
    expect(wrapper.name()).to.equal('x-number')
  })

  it('clamps manually entered values to a zero maximum', (done) => {
    const wrapper = mount(Comp, { propsData: { max: 0, fillable: true } })
    const input = wrapper.find('input')
    input.element.value = '1'
    input.trigger('input')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentValue).to.equal(0)
      wrapper.destroy()
      done()
    })
  })
})

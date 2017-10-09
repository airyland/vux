import Comp from './index.vue'
import Mask from './fixtures/Mask'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('XInput', () => {
  it('basic', () => {
    const wrapper = mount(Comp)
    expect(wrapper.name()).to.equal('x-input')
  })

  it('mask', () => {
    const wrapper = mount(Mask)
    const input = wrapper.find('input')
    expect(input.vnode.elm.value).to.equal('138 8888 8888')
  })
})

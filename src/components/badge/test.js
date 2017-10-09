import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Badge', () => {
  it('render single character', () => {
    const wrapper = mount(Comp)
    wrapper.setProps({
      text: 'x'
    })
    expect(wrapper.hasClass('vux-badge-single')).to.equal(true)
  })

  it('render multiple character', () => {
    const wrapper = mount(Comp)
    wrapper.setProps({
      text: 'xx'
    })
    expect(wrapper.hasClass('vux-badge-single')).to.equal(false)
  })
})

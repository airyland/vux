import Comp from './marquee.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Marquee', () => {
  it('basic', () => {
    const wrapper = mount(Comp)
    expect(wrapper.name()).to.equal('marquee')
  })
})

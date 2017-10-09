import Comp from './button-tab.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('ButtonTab', () => {
  it('basic', () => {
    const wrapper = mount(Comp)
    expect(wrapper.name()).to.equal('button-tab')
  })
})

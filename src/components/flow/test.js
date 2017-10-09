import Comp from './flow.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Flow', () => {
  it('basic', () => {
    const wrapper = mount(Comp)
    expect(wrapper.name()).to.equal('flow')
  })
})

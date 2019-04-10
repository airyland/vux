import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('XSwitch', () => {
  it('basic', () => {
    const wrapper = mount(Comp, {
      propsData: {
        title: 'XSwitch'
      }
    })
    expect(wrapper.name()).to.equal('x-switch')
  })
})

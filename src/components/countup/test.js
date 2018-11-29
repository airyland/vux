import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Countup', () => {
  it('basic', () => {
    const wrapper = mount(Comp, {
      propsData: {
        endVal: 1000
      }
    })
    expect(wrapper.name()).to.equal('countup')
  })
})

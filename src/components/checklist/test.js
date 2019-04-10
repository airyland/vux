import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Checklist', () => {
  it('basic', () => {
    const wrapper = mount(Comp, {
      propsData: {
        options: []
      }
    })
    expect(wrapper.name()).to.equal('checklist')
  })
})

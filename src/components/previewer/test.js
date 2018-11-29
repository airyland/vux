import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Previewer', () => {
  it('basic', () => {
    const wrapper = mount(Comp, {
      propsData: {
        list: []
      }
    })
    expect(wrapper.name()).to.equal('previewer')
  })
})

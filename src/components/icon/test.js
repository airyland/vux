import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Icon', () => {
  it('basic', () => {
    const wrapper = mount(Comp, {
      propsData: {
        type: 'success'
      }
    })
    expect(wrapper.name()).to.equal('icon')
  })
})

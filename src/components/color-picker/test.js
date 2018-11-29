import Comp from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('ColorPicker', () => {
  it('basic', () => {
    const wrapper = mount(Comp, {
      propsData: {
        colors: '#fff'
      }
    })
    expect(wrapper.name()).to.equal('color-picker')
  })
})

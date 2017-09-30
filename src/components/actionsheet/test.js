import Actionsheet from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Actionsheet', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Actionsheet)
    expect(wrapper.contains('div')).to.equal(true)
  })
})

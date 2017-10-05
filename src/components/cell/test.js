import CellWrapper from './test/wrapper'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Cell.vue', () => {
  it('should render correct value', () => {
    const wrapper = mount(CellWrapper)
    wrapper.setProps({
      value: 'hello'
    })
    expect(wrapper.contains('div')).to.equal(true)
  })
})

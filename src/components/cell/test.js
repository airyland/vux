import Cell from './index.vue'

import { mount } from 'vue-test-utils'
import { expect } from 'chai'

describe('Cell.vue', () => {
  it('should render correct contents', () => {
    const wrapper = mount(Cell)
    expect(wrapper.contains('div')).to.equal(true)
  })
})

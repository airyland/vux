/* global describe, it, expect */

import Vue from 'vue'
import XInput from 'src/components/x-input/'

describe('Input.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><x-input></x-input></div>',
      components: { XInput }
    }).$mount()
    expect(/weui_input/.test(vm.$el.innerHTML)).toBe(true)
  })
})

// also see example testing a component with mocks at
// https://github.com/vuejs/vue-loader-example/blob/master/test/unit/a.spec.js#L24-L49

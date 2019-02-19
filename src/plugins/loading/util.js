import LoadingComponent from '../../components/loading'
import { mergeOptions } from '../../libs/plugin_helper'

export function createVM (Vue) {
  if (typeof document === 'undefined') {
    console.error('[VUX] Loading plugin cannot be used in ssr.')
    return
  }
  const Comp = Vue.extend(LoadingComponent)
  const $vm = new Comp({
    el: document.createElement('div')
  })
  document.body.appendChild($vm.$el)
  return $vm
}

export function show ($vm, options) {
  if (typeof options === 'object') {
    mergeOptions($vm, options)
  } else if (typeof options === 'string') {
    $vm.content = options
  }
  $vm.show = true
}

export function hide ($vm) {
  $vm.show = false
  $vm.$nextTick(() => {
    this.watcher && this.watcher()
    this.watcher = null
  })
}

export default {
  show,
  hide
}

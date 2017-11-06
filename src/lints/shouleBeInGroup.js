export default function (vm, name) {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === 'development') {
    const parentName = vm.$parent ? vm.$parent.$options.name : ''
    const parentNode = vm.$el.parentNode
    if (parentName !== 'group' && !/weui-cells/.test(parentNode.className)) {
      console.error(`[VUX] ${vm.$options.name} 组件应该作为 Group 子元素使用`, vm.$el)
    }
  }
}

import type { App } from 'vue'

// Components
export { default as Button } from './button/src/index.vue'
export { default as Icon } from './icon/src/index.vue'
export { default as Loading } from './loading/src/index.vue'

// Utilities
export { pxCheck } from './utils/pxUtil'
export * from './utils/date'
export * from './utils/raf'

// Theme
export { default as themeChalk } from './theme-chalk/weui.less'

// Library install
import Button from './button/src/index.vue'
import Icon from './icon/src/index.vue'
import Loading from './loading/src/index.vue'

const packages = [Button, Icon, Loading]

export function install(app: App) {
  packages.forEach((item: any) => {
    if (item.install) {
      item.install(app)
    } else {
      app.component(item.name, item)
    }
  })
}

export const version = '3.0.0'

export default {
  install,
  version
}

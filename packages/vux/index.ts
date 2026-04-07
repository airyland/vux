import type { App } from 'vue'
import Button from '../button/src/index.vue'
import Icon from '../icon/src/index.vue'
import Loading from '../loading/src/index.vue'

export { Button, Icon, Loading }

const packages = [Button, Icon, Loading]

function install(app: App) {
  packages.forEach((item: any) => {
    if (item.install) {
      item.install(app)
    } else {
      app.component(item.name, item)
    }
  })
}

export default {
  install
}

export const version = '3.0.0'

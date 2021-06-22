
import { SFCWithInstall } from '../utils/types'
import { App } from 'vue'
import Icon from './src/index.vue'

Icon.install = (app: App): void => {
  app.component(Icon.name, Icon)
}

const _Icon: SFCWithInstall<typeof Icon> = Icon

export default _Icon

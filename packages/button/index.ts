import { SFCWithInstall } from '../utils/types'
import { App } from 'vue'
import Button from './src/index.vue'

Button.install = (app: App): void => {
  app.component(Button.name, Button)
}

const _Button: SFCWithInstall<typeof Button> = Button

export default _Button

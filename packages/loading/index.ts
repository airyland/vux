
import { SFCWithInstall } from '../utils/types'
import { App } from 'vue'
import Loading from './src/index.vue'

Loading.install = (app: App): void => {
  app.component(Loading.name, Loading)
}

const _Loading: SFCWithInstall<typeof Loading> = Loading

export default _Loading

import LoadingComponent from '../../components/loading'
import { mergeOptions } from '../../libs/plugin_helper'

let $vm
let watcher

const plugin = {
  install (vue, options) {
    const Loading = vue.extend(LoadingComponent)

    if (!$vm) {
      $vm = new Loading({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const loading = {
      show (options = {}) {
        // destroy watcher
        watcher && watcher()
        if (typeof options === 'string') {
          $vm.text = options
        } else if (typeof options === 'object') {
          mergeOptions($vm, options)
        }
        if (typeof options === 'object' && options.onShow || options.onHide) {
          watcher = $vm.$watch('show', (val) => {
            val && options.onShow && options.onShow($vm)
            val === false && options.onHide && options.onHide($vm)
          })
        }
        $vm.show = true
      },
      hide () {
        $vm.show = false
      }
    }

    // all Vux's plugins are included in this.$vux
    if (!vue.$vux) {
      vue.$vux = {
        loading
      }
    } else {
      vue.$vux.loading = loading
    }

    vue.mixin({
      created: function () {
        this.$vux = vue.$vux
      }
    })
  }
}

export default plugin
export const install = plugin.install


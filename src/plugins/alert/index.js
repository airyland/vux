import AlertComponent from '../../components/alert'
let $vm

const plugin = {
  install (Vue) {
    if (!$vm) {
      const Alert = Vue.extend(AlertComponent)
      $vm = new Alert({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }

    const closeHandler = function () {
      $vm.showValue === true && ($vm.showValue = false)
    }

    const alert = {
      show (options) {
        if (typeof options === 'object') {
          for (let i in options) {
            if (i !== 'content') {
              $vm[i] = options[i]
            } else {
              $vm.$el.querySelector('.weui-dialog__bd').innerHTML = options['content']
            }
          }
        } else if (typeof options === 'string') {
          $vm.$el.querySelector('.weui-dialog__bd').innerHTML = options
        }
        $vm.$el.querySelector('.weui-dialog__ft').addEventListener('click', closeHandler, false)
        $vm.showValue = true
        options.onShow && options.onShow($vm)
      },
      hide () {
        $vm.showValue = false
      }
    }

    if (!Vue.$vux) {
      Vue.$vux = {
        alert
      }
    } else {
      Vue.$vux.alert = alert
    }

    Vue.mixin({
      created: function () {
        this.$vux = Vue.$vux
      }
    })
  }
}

export default plugin
export const install = plugin.install


import ConfirmComponent from '../../components/confirm'

let $vm
let hasWatch = false

const plugin = {
  install (vue, options) {
    const Confirm = vue.extend(ConfirmComponent)

    if (!$vm) {
      $vm = new Confirm({
        el: document.createElement('div'),
        propsData: {
          title: ''
        }
      })
      document.body.appendChild($vm.$el)
    }

    const confirm = {
      show (options) {
        if (typeof options === 'object') {
          for (let i in options) {
            $vm[i] = options[i]
          }
        }
        if (typeof options === 'object' && (options.onShow || options.onHide)) {
          options.onShow && options.onShow()
        }
        if (!hasWatch) {
          $vm.$watch('showValue', (val) => {
            if (!val && options && options.onHide) {
              options.onHide()
            }
          })
          $vm.$on('on-cancel', () => {
            options && options.onCancel && options.onCancel()
            $vm.showValue = false
          })
          $vm.$on('on-confirm', () => {
            options && options.onConfirm && options.onConfirm()
            $vm.showValue = false
          })
          hasWatch = true
          $vm.$el.querySelector('.weui-dialog__ft').addEventListener('click', function () {
            $vm.showValue = false
          }, false)
        }
        $vm.showValue = true
      },
      hide () {
        $vm.showValue = false
      }
    }

    // all Vux's plugins are included in this.$vux
    if (!vue.$vux) {
      vue.$vux = {
        confirm
      }
    } else {
      vue.$vux.confirm = confirm
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


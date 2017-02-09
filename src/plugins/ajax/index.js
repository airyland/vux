import axios from 'axios'

module.exports = {
  install (Vue) {
    Vue.prototype.$http = axios
  }
}

module.exports.$http = axios

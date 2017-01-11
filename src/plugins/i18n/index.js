import vuexI18n from 'vuex-i18n'
import objectAssign  from 'object-assign'

function transform (object, name) {
  let rs = {
    'en': {},
    'zh-CN': {}
  }
  for (let i in object) {
    rs['en'][i] = object[i]['en'] || i
    rs['zh-CN'][i] = object[i]['zh-CN'] || i
  }
  return rs
}

export default {
  install (Vue, options) {
    options.store.registerModule('i18n', vuexI18n.store)
    const componentsLocales = require('json!yaml!../../../../../src/locales/components_locales.yml')
    const vuxLocales = require('json!yaml!vux/src/locales/all.yml')
    const globalLocales = require('json!yaml!../../../../../src/locales/global_locales.yml')
    const finalLocales = transform(objectAssign(vuxLocales, componentsLocales, globalLocales))
    Vue.use(vuexI18n.plugin, options.store)
    for (let i in finalLocales) {
      Vue.i18n.add(i, finalLocales[i])
    }
    Vue.i18n.set(options.locale || 'en')
  }
}

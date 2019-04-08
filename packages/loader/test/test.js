process.env.VUE_LOADER_TEST = true

var path = require('path')
var webpack = require('webpack')
var MemoryFS = require('memory-fs')
var jsdom = require('jsdom')
var expect = require('chai').expect
var rimraf = require('rimraf')
var genId = require('vue-loader/lib/gen-id')
var SourceMapConsumer = require('source-map').SourceMapConsumer
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var compiler = require('vue-loader/lib/template-compiler')
var normalizeNewline = require('normalize-newline')

var vuxLoader = require('../src/index.js')
var i18nParser = require('../libs/parse-i18n-function').parse
const i18nParserForScript = require('../libs/replace-i18n-for-script').replace
const getI18nBlock = require('../libs/get-i18n-block').get
const getI18nBlockWithLocale = require('../libs/get-i18n-block').getWithLocale

function getOptionsPlugin(config) {
  const match = config.plugins.filter(one => {
    return one.constructor.name === 'LoaderOptionsPlugin'
  })
  return match[0]
}

// var loaderPath = 'expose-loader?vueModule!' + path.resolve(__dirname, '../node_modules/vue-loader/index.js')
var loaderPath = 'expose-loader?vueModule!' + path.resolve(__dirname, '../src/index.js') + '!vue-loader'
var mfs = new MemoryFS()
var globalConfig = {
  output: {
    path: '/',
    filename: 'test.build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: loaderPath
      }
    ]
  }
}

function bundle(options, vuxOptions, cb) {
  var vueOptions = options.vue
  delete options.vue
  var config = Object.assign(globalConfig, options)

  // assign vue Options
  if (vueOptions) {
    config.plugins = (config.plugins || []).concat(new webpack.LoaderOptionsPlugin({
      vue: vueOptions
    }))
  }
  let basicVux = {
    options: {
      loaderString: loaderPath,
      rewriteLoaderString: false,
      isWebpack2: true,
      isTest: true
    }
  }

  if (vuxOptions.options) {
    for (let i in vuxOptions.options) {
      basicVux.options[i] = vuxOptions.options[i]
    }
  }

  if (vuxOptions.plugins) {
    basicVux.plugins = vuxOptions.plugins
  }

  config = vuxLoader.merge(config, basicVux)

  var webpackCompiler = webpack(config)

  webpackCompiler.outputFileSystem = mfs
  webpackCompiler.run(function (err, stats) {
    expect(err).to.be.null
    if (stats.compilation.errors.length) {
      stats.compilation.errors.forEach(function (err) {
        console.error(err.message)
      })
    }
    expect(stats.compilation.errors).to.be.empty
    cb(mfs.readFileSync('/test.build.js').toString())
  })
}

function test(options, vuxOptions, assert) {
  bundle(options, vuxOptions, function (code) {
    jsdom.env({
      html: '<!DOCTYPE html><html><head></head><body></body></html>',
      src: [code],
      done: function (err, window) {
        if (err) {
          console.log(err[0].data.error.stack)
          expect(err).to.be.null
        }
        assert(window, interopDefault(window.vueModule), window.vueModule)
      }
    })
  })
}

function mockRender(options, data) {
  return options.render.call(Object.assign({
    _v(val) {
      return val
    },
    _self: {},
    $createElement(tag, data, children) {
      if (Array.isArray(data)) {
        children = data
        data = null
      }
      return {
        tag: tag,
        data: data,
        children: children
      }
    },
    _m(index) {
      return options.staticRenderFns[index].call(this)
    },
    _s(str) {
      return String(str)
    }
  }, data))
}

function interopDefault(module) {
  return module ? module.__esModule ? module.default : module : module
}

var parse = require('../src/libs/import-parser')

const str = parse(`<script>
import {
        Group
    } from 'vux';

`, function (opts) {
  // console.log(opts)
})

var themeParse = require('../src/libs/get-less-variables')

var commomMapper = function (opts) {
  components = opts.components.map(function (one) {
    return one.newName
  })
  return `import { ${components.join(', ')} } from 'vux'`
}

var vuxMapper = function (opts) {
  let str = ''
  opts.components.forEach(function (one) {
    if (one.originalName === 'AlertPlugin') {
      str += `import ${one.newName} from 'vux/src/plugins/Alert'\n`
    } else if (one.originalName === 'ToastPlugin') {
      str += `import ${one.newName} from 'vux/src/plugins/Toast'\n`
    }
  })
  return str
}

describe('vux-loader', function () {

  describe('get i18n block', function () {

    it('basic', function () {
      const rs = getI18nBlock(`sfdsf<i18n>
a:
  en: en_a
  zh-CN: zh-CN_a
</i18n>sdfdsf`)
      expect(rs.a.en).to.equal('en_a')
    })

     it('return empty object for wrong format', function () {
      const rs = getI18nBlock(`sfdsf<i18n>
a:
en: en_a
  zh-CN: zh-CN_a
</i18n>sdfdsf`)
      expect(JSON.stringify(rs)).to.equal('{}')
    })


  it('with locale', function () {
      const rs = getI18nBlockWithLocale({code: `sfdsf<i18n>
a:
  en: en_a
  zh-CN: zh-CN_a
</i18n>sdfdsf`,
locale: 'en'})
      expect(rs.a).to.equal('en_a')
    })

  })

  describe('parse i18n for js', function () {
    const rs = i18nParserForScript(`this.$t('a')`, {})
    expect(rs).to.equal(`'a'`)
  })

  describe('parse i18n', function () {

    const map = {
      a: 'A',
      b: 'B',
      c: 'C',
      d: 'D'
    }

    const source1 = `<div :a="$t('a')">
<p :c="d" e="f" g="hh">
<span :options="['a', 'b', 'c', 'd']"></span>
<span :obj="{a:'aa',b:'bb', c:$t('ee')}"></span>
<span v-html="$t('sdfsdf')"></span>
<span v-html="$t('sdfsdf') + $t('sfowewf') + $t('92fdf')"></span>
{{ $t('dd') }}
</p>
</div>`

    const cases = [{
      raw: `<div :a="$t('a')"></div>`,
      rs: `<div :a="'A'"></div>`
}, {
      raw: `<div :a="$t('x')"></div>`,
      rs: `<div :a="'x'"></div>`
}, {
      raw: `<div :a='$t("a")'></div>`,
      rs: `<div :a="'A'"></div>`
}, {
      raw: `<div v-html="$t('a')"></div>`,
      rs: `<div v-html="'A'"></div>`
}, {
      raw: `<div :a="$t('a') + $t('b')"></div>`,
      rs: `<div :a="'A' + 'B'"></div>`
}, {
      raw: `<div :a="$t('a') + 'B'"></div>`,
      rs: `<div :a="'A' + 'B'"></div>`
}, {
      raw: `<div :a="$t('a') * 'B'"></div>`,
      rs: `<div :a="'A' * 'B'"></div>`
}, {
      raw: `<div :a="{c: $t('a')}"></div>`,
      rs: `<div :a="{ c: 'A' }"></div>`
}, {
      raw: `<div :a="{c: $t('a') + 'B'}"></div>`,
      rs: `<div :a="{ c: 'A' + 'B' }"></div>`
}, {
      raw: `<div :a="{c: $t('a') + 'B', b: 'C' + $t('b')}"></div>`,
      rs: `<div :a="{
c: 'A' + 'B',
b: 'C' + 'B' }"></div>`
}, {
      raw: `<div :a="[$t('a')]"></div>`,
      rs: `<div :a="['A']"></div>`
}, {
      raw: `<div :a="[$t('a'),$t('b')]"></div>`,
      rs: `<div :a="[
'A',
'B' ]"></div>`
}, {
      raw: `xx {{ $t('a') }}`,
      rs: `xx A`
}, {
      raw: `xx {{ $t('a') }} {{$t('b')}}`,
      rs: `xx A B`
}, {
      raw: `xx {{ $t('a') }} {{ $t('dfsf' + 'dsfdsf') }}`,
      rs: `xx A {{ $t('dfsf' + 'dsfdsf') }}`
}, {
      raw: `xx {{ $tt('a') }}`,
      rs: `xx {{ $tt('a') }}`
}]

    cases.forEach((one, index) => {
      it(`test ${index + 1}`, function () {
        const rs = i18nParser(one.raw, map)
        expect(rs === one.rs).to.equal(true)
      })

    })

  })

  describe('parse virtual component', function () {
    const parse = require('../src/libs/parse-virtual-component')
    it('basic', function () {
      const source = `<x-icon type="arrow-up-b" size="10" v-if="0 == 0"></x-icon>`
      const processed = parse(source, 'x-icon', function (query, a) {
        return '<svg ' + query.stringList + '></svg>'
      })
      expect(processed).to.equal('<svg type="arrow-up-b" size="10" v-if="0 == 0"></svg>')
    })

    it('basic', function () {
      const source = `<x-icon type="arrow-up-b" size="10" v-if="0 == 0"/>`
      const processed = parse(source, 'x-icon', function (query, a) {
        return '<svg ' + query.stringList + '></svg>'
      })
      expect(processed).to.equal('<svg type="arrow-up-b" size="10" v-if="0 == 0"></svg>')
    })

    it('basic', function () {
      const source = `<x-icon
      type="arrow-up-b" size="10"
      v-if="0 == 0"/>`
      const processed = parse(source, 'x-icon', function (query, a) {
        return '<svg ' + query.stringList + '></svg>'
      })
      expect(processed).to.equal('<svg type="arrow-up-b" size="10" v-if="0 == 0"></svg>')
    })

    it('basic', function () {
      const source = `<x-icon type="ios-ionic-outline" size="30"/>
      <x-icon type="ios-ionic-outline" size="30"></x-icon>`
      const processed = parse(source, 'x-icon', function (query, a) {
        return '<svg ' + query.stringList + '></svg>'
      })
      expect(processed).to.equal(`<svg type="ios-ionic-outline" size="30"></svg>
      <svg type="ios-ionic-outline" size="30"></svg>`)
    })
  })

  describe('parse virtual component with break line', function () {
    const parse = require('../src/libs/parse-virtual-component')
    it('basic', function () {
      const source = `<x-icon a="b"
      type="arrow-up-b"
      size="10"
      v-if="0 == 0"></x-icon>`
      const processed = parse(source, 'x-icon', function (query, a) {
        return '<svg ' + query.stringList + '></svg>'
      })
      expect(processed).to.equal('<svg a="b" type="arrow-up-b" size="10" v-if="0 == 0"></svg>')
    })
  })

  describe('parse virtual component', function () {
    const parse = require('../src/libs/parse-virtual-component')
    it('basic', function () {
      const source = `<x-icon a="b" c="d" class="e f" slot="icon"></x-icon>`
      const processed = parse(source, 'x-icon', function (query, a) {
        return '<svg ' + query.stringList + '></svg>'
      })
      expect(processed).to.equal('<svg a="b" c="d" class="e f" slot="icon"></svg>')
    })
  })

  describe('parse virtual component with click event', function () {
    const parse = require('../src/libs/parse-virtual-component')
    it('basic', function () {
      const source = `<x-icon a="b" c="d" class="e f" slot="icon" @click.native="handler"></x-icon>`
      const processed = parse(source, 'x-icon', function (query, a) {
        return '<svg ' + query.stringList + '></svg>'
      })
      expect(processed).to.equal('<svg a="b" c="d" class="e f" slot="icon" @click="handler"></svg>')
    })
  })

  describe('lib:get theme variables', function () {
    it('basic', function () {
      const rs = themeParse(path.resolve(__dirname, './vux-fixtures/less-theme-001.less'))
      expect(rs.a).to.equal('b')
    })

    it('ignore comments', function () {
      const rs = themeParse(path.resolve(__dirname, './vux-fixtures/less-theme-002.less'))
      expect(rs.a).to.equal('b')
      expect(rs.c).to.equal('d')
      expect(rs.d).to.equal('e')
      expect(rs.f).to.equal('g')
    })

    it('import files', function () {
      const rs = themeParse(path.resolve(__dirname, './vux-fixtures/less-theme-import.less'))
      expect(rs.x).to.equal('x')
      expect(rs.y).to.equal('z')
    })
  })

  describe('lib:import-parser', function () {

    let tests = [{
      title: 'basic',
      string: `import {A,B} from 'vux'`,
      rs: ['A', 'B']
    }, {
      title: 'basic',
      string: `import {A,B,} from 'vux'`,
      rs: ['A', 'B']
    }, {
      title: 'without space',
      string: `import{A,B} from 'vux'`,
      rs: ['A', 'B']
    }, {
      title: 'without space 2',
      string: `import {A,B}from 'vux'`,
      rs: ['A', 'B']
    }, {
      title: 'without space 3',
      string: `import{A,B}from 'vux'`,
      rs: ['A', 'B']
    }, {
      title: 'do not parse comments',
      string: `// import {A,B} from 'vux'
import { C, D} from 'vux'`,
      rs: `\nimport { C, D } from 'vux'`
    }, {
      title: 'use as',
      string: `import {A,B as C} from 'vux'`,
      rs: ['A', 'C']
    }, {
      title: 'double quote',
      string: `import {A,B} from "vux"`,
      rs: ['A', 'B']
    }, {
      title: 'multi line and single quote',
      string: `import { A,
B } from 'vux'`,
      rs: ['A', 'B']
    }, {
      title: 'multi line and double quote',
      string: `import { A,
B } from "vux"`,
      rs: ['A', 'B']
    }, {
      title: 'no match',
      string: `import {A,B} from 'vvv'`,
      rs: `import {A,B} from 'vvv'`
    }, {
      title: 'more codes',
      string: `import C from 'XY'
import { D } from 'ZW'
import {A,B} from 'vvv'
import { C }  from 'vux'`,
      rs: `import C from 'XY'
import { D } from 'ZW'
import {A,B} from 'vvv'
import { C } from 'vux'`
    }, {
      title: 'vux test2',
      string: `import {Group,Cell} from 'vux'
import value2name from 'vux/src/filters/value2name'`,
      rs: `import { Group, Cell } from 'vux'
import value2name from 'vux/src/filters/value2name'`
}, {
      title: 'vux test3',
      string: `import {Group,
Cell} from 'vux'
import value2name from 'vux/src/filters/value2name'`,
      rs: `import { Group, Cell } from 'vux'
import value2name from 'vux/src/filters/value2name'`
}, {
      title: 'vux test4',
      string: `import { M1, M2 } from 'vux'
import { mapMutations, mapState } from 'vuex'
import { Group, Cell } from 'vux'
import { Group1, Cell1 } from 'vux'
import value2name from 'vux/src/filters/value2name'`,
      rs: `import { M1, M2 } from 'vux'
import { mapMutations, mapState } from 'vuex'
import { Group, Cell } from 'vux'
import { Group1, Cell1 } from 'vux'
import value2name from 'vux/src/filters/value2name'`
}, {
      title: 'vux test5',
      string: `import {
XX,
YY} from 'vux'`,
      rs: `import { XX, YY } from 'vux'`
}, {
      title: 'vux test6',
      string: `/**/
import {Divider } from 'vux'`,
      rs: `/**/
import { Divider } from 'vux'`
}]

    tests.forEach(function (one) {
      it(one.title, function () {
        const rs = parse(one.string, commomMapper)
        if (typeof one.rs === 'string') {
          expect(rs).to.equal(one.rs)
        } else {
          expect(rs).to.equal(`import { ${one.rs.join(', ')} } from 'vux'`)
        }
      })
    })

    it('vux test', function () {
      const rs = parse(`import {AlertPlugin, ToastPlugin} from 'vux'`, vuxMapper)
      expect(rs).to.equal(`import AlertPlugin from 'vux/src/plugins/Alert'
import ToastPlugin from 'vux/src/plugins/Toast'
`)
    })

    it('vux test7', function () {
      const rs = parse(`import {AlertPlugin, ToastPlugin} from 'vux'
// import { AlertPlugin } from 'vux'`, vuxMapper)
      expect(rs).to.equal(`import AlertPlugin from 'vux/src/plugins/Alert'
import ToastPlugin from 'vux/src/plugins/Toast'

`)
    })

    it('issue #1579 (1)', function () {
      const rs = parse(`import {
  AlertPlugin,
    ToastPlugin
} from 'vux';`, vuxMapper)
      expect(rs).to.equal(`import AlertPlugin from 'vux/src/plugins/Alert'
import ToastPlugin from 'vux/src/plugins/Toast'
`)
    })

    it('issue #1579 (2)', function () {
      const rs = parse(`import {AlertPlugin,
    ToastPlugin
} from 'vux'`, vuxMapper)
      expect(rs).to.equal(`import AlertPlugin from 'vux/src/plugins/Alert'
import ToastPlugin from 'vux/src/plugins/Toast'
`)
    })

  })

  describe('plugin:less-theme', function () {

    it('basic', function (done) {
      test({
        entry: './test/vux-fixtures/less-theme-basic.vue'
      }, {
        plugins: [{
          name: 'less-theme',
          path: './test/vux-fixtures/less-theme-basic.less'
          }]
      }, function (window, module, rawModule) {
        var vnode = mockRender(module, {
          msg: 'hi'
        })
        expect(vnode.tag).to.equal('p')

        var styles = window.document.querySelectorAll('style')
        expect(styles[0].textContent).to.contain('\n.p {\n  color: red;\n}\n')

        done()
      })
    })

  })

  describe('plugin:style-parser', function () {

    it('basic', function (done) {
      test({
        entry: './test/vux-fixtures/style-parser-basic.vue'
      }, {
        plugins: [{
          name: 'less-theme',
          path: './test/vux-fixtures/less-theme-basic.less'
          }, {
          name: 'style-parser',
          fn: function (source) {
            return source.replace('@theme-p-color', 'yellow')
          }
          }]
      }, function (window, module, rawModule) {
        var vnode = mockRender(module, {
          msg: 'hi'
        })
        expect(vnode.tag).to.equal('p')

        var styles = window.document.querySelectorAll('style')
        expect(styles[0].textContent).to.contain('\n.p {\n  color: yellow;\n}\n')

        done()
      })
    })

  })

  describe('plugin:template-feature-switch', function () {

    it('basic', function (done) {
      test({
        entry: './test/vux-fixtures/template-feature-switch-basic.vue'
      }, {
        plugins: [{
          name: 'template-feature-switch',
          features: {
            FEATURE1: true,
            FEATURE2: false
          }
        }]
      }, function (window, module, rawModule) {
        var vnode = mockRender(module, {
          msg: 'hi'
        })

        expect(vnode.tag).to.equal('div')
        expect(vnode.children[0].indexOf('ON FEATURE1') > -1).to.equal(true)
        expect(vnode.children[0].indexOf('OFF FEATURE2') > -1).to.equal(true)
        done()
      })
    })

  })

  describe('one instance', function () {
    it('should throw', function () {
      const webpackConfig = {
        plugins: []
      }
      const merge = function () {
        return vuxLoader.merge(webpackConfig, {
          options: {
            env: 'env1'
          },
          plugins: [{
            name: 'test1'
          }, {
            name: 'test1'
          }]
        })
      }
      expect(merge).to.throw(/only one instance is allowed/)
    })
  })

  describe('merge multi times', function () {
    it('should merge options', function () {
      const webpackConfig = {
        plugins: []
      }
      const config1 = vuxLoader.merge(webpackConfig, {
        options: {
          env: 'env1'
        }
      })

      expect(getOptionsPlugin(config1).options.vux.options.env).to.equal('env1')

      const config2 = vuxLoader.merge(config1, {
        options: {
          env: 'env2'
        }
      })

      expect(getOptionsPlugin(config2).options.vux.options.env).to.equal('env2')
    })

    it('should merge plugins with the same name', function () {
      const webpackConfig = {}
      const config1 = vuxLoader.merge(webpackConfig, {
        plugins: [{
          name: 'test1',
          arg: 1
        }]
      })

      expect(getOptionsPlugin(config1).options.vux.plugins.length).to.equal(1)
      expect(getOptionsPlugin(config1).options.vux.plugins[0].arg).to.equal(1)

      const config2 = vuxLoader.merge(config1, {
        plugins: [{
          name: 'test1',
          arg: 2
        }]
      })

      expect(getOptionsPlugin(config1).options.vux.plugins.length).to.equal(1)
      expect(getOptionsPlugin(config1).options.vux.plugins[0].arg).to.equal(2)

    })

    it('should delete plugin when env is change', function () {
      const webpackConfig = {}
      const config1 = vuxLoader.merge(webpackConfig, {
        options: {
          env: 'env1'
        },
        plugins: [{
          name: 'test1',
          arg: 1,
          envs: ['env1']
        }]
      })

      expect(config1.plugins[0].options.vux.plugins.length).to.equal(1)

      const config2 = vuxLoader.merge(config1, {
        options: {
          env: 'env2'
        }
      })

      expect(getOptionsPlugin(config1).options.vux.plugins.length).to.equal(0)

    })

    it('should merge plugins', function () {
      const webpackConfig = {}
      const config1 = vuxLoader.merge(webpackConfig, {
        options: {
          env: 'env1'
        },
        plugins: [{
          name: 'test1',
          arg: 1,
          envs: ['env1']
        }]
      })

      expect(getOptionsPlugin(config1).options.vux.allPlugins.length).to.equal(1)
      expect(getOptionsPlugin(config1).options.vux.plugins.length).to.equal(1)

      const config2 = vuxLoader.merge(config1, {
        plugins: [{
          name: 'test2'
        }]
      })

      expect(getOptionsPlugin(config2).options.vux.allPlugins.length).to.equal(2)
      expect(getOptionsPlugin(config2).options.vux.plugins.length).to.equal(2)

      const config3 = vuxLoader.merge(config2, {
        plugins: [{
          name: 'test3',
          envs: ['env3']
        }]
      })

      expect(getOptionsPlugin(config3).options.vux.allPlugins.length).to.equal(3)
      expect(getOptionsPlugin(config3).options.vux.plugins.length).to.equal(2)

    })
  })

  describe('plugin:script-parser', function () {

    it('fn function should work', function (done) {
      test({
        entry: './test/vux-fixtures/script-parser-fn.vue'
      }, {
        plugins: [{
          name: 'script-parser',
          fn: function (source) {
            return source.replace('AAAA', 'BBBB')
          }
          }]
      }, function (window, module, rawModule) {
        var vnode = mockRender(module, {
          msg: 'hi'
        })
        expect(vnode.tag).to.equal('p')
        expect(module.data().msg).to.equal('BBBB')
        done()
      })
    })

    it('fn function should not work with env', function (done) {
      test({
        entry: './test/vux-fixtures/script-parser-fn.vue'
      }, {
        options: {
          env: 'test'
        },
        plugins: [{
          name: 'script-parser',
          envs: ['production'],
          fn: function (source) {
            return source.replace('AAAA', 'BBBB')
          }
        }]
      }, function (window, module, rawModule) {
        var vnode = mockRender(module, {
          msg: 'hi'
        })
        expect(vnode.tag).to.equal('p')
        expect(module.data().msg).to.equal('AAAA')
        done()
      })
    })
  })

  describe('plugin:template-parser', function () {

    it('fn function should work', function (done) {
      test({
        entry: './test/vux-fixtures/template-parser-fn.vue'
      }, {
        plugins: [{
          name: 'template-parser',
          fn: function (source) {
            return source.replace('我们没有底线', '我是有底线的')
          }
          }]
      }, function (window, module, rawModule) {
        var vnode = mockRender(module, {
          msg: 'hi'
        })
        expect(vnode.tag).to.equal('p')
        expect(vnode.children[0]).to.equal('我是有底线的')
        done()
      })
    })

    it('replaceList param should work', function (done) {
      test({
        entry: './test/vux-fixtures/template-parser-fn.vue'
      }, {
        plugins: [{
          name: 'template-parser',
          replaceList: [{
            test: /我们没有/,
            replaceString: ''
            }, {
            test: /底线/,
            replaceString: '底线是什么'
            }]
          }]
      }, function (window, module, rawModule) {
        var vnode = mockRender(module, {
          msg: 'hi'
        })
        expect(vnode.tag).to.equal('p')
        expect(vnode.children[0]).to.equal('底线是什么')
        done()
      })
    })

  })
})

/**

describe.skip('vue-loader', function () {
  it('basic', function (done) {
    test({
      entry: './test/fixtures/basic.vue'
    }, function (window, module, rawModule) {
      var vnode = mockRender(module, {
          msg: 'hi'
        })
        // <h2 class="red">{{msg}}</h2>
      expect(vnode.tag).to.equal('h2')
      expect(vnode.data.staticClass).to.equal('red')
      expect(vnode.children[0]).to.equal('hi')

      expect(module.data().msg).to.contain('Hello from Component A!')
      var style = window.document.querySelector('style').textContent
      style = normalizeNewline(style)
      expect(style).to.contain('comp-a h2 {\n  color: #f00;\n}')
      done()
    })
  })

  it('expose filename', function (done) {
    test({
      entry: './test/fixtures/basic.vue'
    }, function (window, module, rawModule) {
      expect(module.__file).to.equal(path.resolve(__dirname, './fixtures/basic.vue'))
      done()
    })
  })

  it('pre-processors', function (done) {
    test({
      entry: './test/fixtures/pre.vue'
    }, function (window, module) {
      var vnode = mockRender(module)
        // div
        //   h1 This is the app
        //   comp-a
        //   comp-b
      expect(vnode.children[0].tag).to.equal('h1')
      expect(vnode.children[1].tag).to.equal('comp-a')
      expect(vnode.children[2].tag).to.equal('comp-b')

      expect(module.data().msg).to.contain('Hello from coffee!')
      var style = window.document.querySelector('style').textContent
      expect(style).to.contain('body {\n  font: 100% Helvetica, sans-serif;\n  color: #999;\n}')
      done()
    })
  })

  it('scoped style', function (done) {
    test({
      entry: './test/fixtures/scoped-css.vue'
    }, function (window, module) {
      var id = 'data-v-' + genId(require.resolve('./fixtures/scoped-css.vue'))
      expect(module._scopeId).to.equal(id)

      var vnode = mockRender(module, {
          ok: true
        })
        // <div>
        //   <div><h1>hi</h1></div>
        //   <p class="abc def">hi</p>
        //   <template v-if="ok"><p class="test">yo</p></template>
        //   <svg><template><p></p></template></svg>
        // </div>
      expect(vnode.children[0].tag).to.equal('div')
      expect(vnode.children[1]).to.equal(' ')
      expect(vnode.children[2].tag).to.equal('p')
      expect(vnode.children[2].data.staticClass).to.equal('abc def')
      expect(vnode.children[4][0].tag).to.equal('p')
      expect(vnode.children[4][0].data.staticClass).to.equal('test')

      var style = window.document.querySelector('style').textContent
      style = normalizeNewline(style)
      expect(style).to.contain('.test[' + id + '] {\n  color: yellow;\n}')
      expect(style).to.contain('.test[' + id + ']:after {\n  content: \'bye!\';\n}')
      expect(style).to.contain('h1[' + id + '] {\n  color: green;\n}')
      done()
    })
  })

  it('style import', function (done) {
    test({
      entry: './test/fixtures/style-import.vue'
    }, function (window) {
      var styles = window.document.querySelectorAll('style')
      expect(styles[0].textContent).to.contain('h1 { color: red;\n}')
        // import with scoped
      var id = 'data-v-' + genId(require.resolve('./fixtures/style-import.vue'))
      expect(styles[1].textContent).to.contain('h1[' + id + '] { color: green;\n}')
      done()
    })
  })

  it('template import', function (done) {
    test({
      entry: './test/fixtures/template-import.vue'
    }, function (window, module) {
      var vnode = mockRender(module)
        // '<div><h1>hello</h1></div>'
      expect(vnode.children[0].tag).to.equal('h1')
      expect(vnode.children[0].children[0]).to.equal('hello')
      done()
    })
  })

  it('script import', function (done) {
    test({
      entry: './test/fixtures/script-import.vue'
    }, function (window, module) {
      expect(module.data().msg).to.contain('Hello from Component A!')
      done()
    })
  })

  it('source map', function (done) {
    var config = Object.assign({}, globalConfig, {
      entry: './test/fixtures/basic.vue',
      devtool: '#source-map'
    })
    bundle(config, function (code) {
      var map = mfs.readFileSync('/test.build.js.map').toString()
      var smc = new SourceMapConsumer(JSON.parse(map))
      var line
      var col
      var targetRE = /^\s+msg: 'Hello from Component A!'/
      code.split(/\r?\n/g).some(function (l, i) {
        if (targetRE.test(l)) {
          line = i + 1
          col = 0
          return true
        }
      })
      var pos = smc.originalPositionFor({
        line: line,
        column: col
      })
      expect(pos.source.indexOf('basic.vue') > -1)
      expect(pos.line).to.equal(9)
      done()
    })
  })

  it('media-query', function (done) {
    test({
      entry: './test/fixtures/media-query.vue'
    }, function (window) {
      var style = window.document.querySelector('style').textContent
      style = normalizeNewline(style)
      var id = 'data-v-' + genId(require.resolve('./fixtures/media-query.vue'))
      expect(style).to.contain('@media print {\n.foo[' + id + '] {\n    color: #000;\n}\n}')
      done()
    })
  })

  it.skip('extract CSS', function (done) {
    bundle(Object.assign({}, globalConfig, {
      entry: './test/fixtures/extract-css.vue',
      vue: {
        loaders: {
          css: ExtractTextPlugin.extract('css-loader'),
          stylus: ExtractTextPlugin.extract('css-loader?sourceMap!stylus-loader')
        }
      },
      plugins: [
        new ExtractTextPlugin('test.output.css')
      ]
    }), function () {
      var css = mfs.readFileSync('/test.output.css').toString()
      css = normalizeNewline(css)
      expect(css).to.contain('h1 {\n  color: #f00;\n}\n\nh2 {\n  color: green;\n}')
      done()
    })
  })

  it.skip('dependency injection', function (done) {
    test({
      entry: './test/fixtures/inject.js'
    }, function (window) {
      // console.log(window.injector.toString())
      var module = interopDefault(window.injector({
        './service': {
          msg: 'Hello from mocked service!'
        }
      }))
      var vnode = mockRender(module, module.data())
        // <div class="msg">{{ msg }}</div>
      expect(vnode.tag).to.equal('div')
      expect(vnode.data.staticClass).to.equal('msg')
      expect(vnode.children[0]).to.equal('Hello from mocked service!')
      done()
    })
  })

  it('translates relative URLs and respects resolve alias', function (done) {
    test({
      entry: './test/fixtures/resolve.vue',
      resolve: {
        alias: {
          fixtures: path.resolve(__dirname, 'fixtures')
        }
      },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: loaderPath
          },
          {
            test: /\.png$/,
            loader: 'file-loader?name=[name].[hash:6].[ext]'
          }
        ]
      }
    }, function (window, module) {
      var vnode = mockRender(module)
        // <div>
        //   <img src="logo.c9e00e.png">
        //   <img src="logo.c9e00e.png">
        // </div>
      expect(vnode.children[0].tag).to.equal('img')
      expect(vnode.children[0].data.attrs.src).to.equal('logo.c9e00e.png')
      expect(vnode.children[2].tag).to.equal('img')
      expect(vnode.children[2].data.attrs.src).to.equal('logo.c9e00e.png')

      var style = window.document.querySelector('style').textContent
      expect(style).to.contain('html { background-image: url(logo.c9e00e.png);\n}')
      expect(style).to.contain('body { background-image: url(logo.c9e00e.png);\n}')
      done()
    })
  })

  it('postcss options', function (done) {
    test({
      entry: './test/fixtures/postcss.vue',
      vue: {
        postcss: {
          options: {
            parser: require('sugarss')
          }
        }
      }
    }, function (window) {
      var style = window.document.querySelector('style').textContent
      style = normalizeNewline(style)
      expect(style).to.contain('h1 {\n  color: red;\n  font-size: 14px\n}')
      done()
    })
  })

  it('transpile ES2015 features in template', function (done) {
    test({
      entry: './test/fixtures/es2015.vue'
    }, function (window, module) {
      var vnode = mockRender(module, {
          a: 'hello',
          b: true
        })
        // <div :class="{[a]:true}"></div>
      expect(vnode.tag).to.equal('div')
      expect(vnode.data.class['test-hello']).to.equal(true)
      expect(vnode.data.class['b']).to.equal(true)
      done()
    })
  })

  it('allows to export extended constructor', function (done) {
    test({
      entry: './test/fixtures/extend.vue'
    }, function (window, Module) {
      // extend.vue should export Vue constructor
      var vnode = mockRender(Module.options, {
        msg: 'success'
      })
      expect(vnode.tag).to.equal('div')
      expect(vnode.children[0]).to.equal('success')
      expect(new Module().msg === 'success')
      done()
    })
  })

  it('support es compatible modules', function (done) {
    test({
      entry: './test/fixtures/basic.vue',
      vue: {
        esModule: true
      }
    }, function (window, module, rawModule) {
      expect(rawModule.__esModule).to.equal(true)
      var vnode = mockRender(rawModule.default, {
        msg: 'hi'
      })
      expect(vnode.tag).to.equal('h2')
      expect(vnode.data.staticClass).to.equal('red')
      expect(vnode.children[0]).to.equal('hi')

      expect(rawModule.default.data().msg).to.contain('Hello from Component A!')
      done()
    })
  })

  it('css-modules', function (done) {
    function testWithIdent(localIdentName, regexToMatch, cb) {
      test({
        entry: './test/fixtures/css-modules.vue',
        vue: {
          cssModules: localIdentName && {
            localIdentName: localIdentName
          }
        }
      }, function (window) {
        var module = window.vueModule

        // get local class name
        var className = module.computed.style().red
        expect(className).to.match(regexToMatch)

        // class name in style
        var style = [].slice.call(window.document.querySelectorAll('style')).map(function (style) {
          return style.textContent
        }).join('\n')
        style = normalizeNewline(style)
        expect(style).to.contain('.' + className + ' {\n  color: red;\n}')

        // animation name
        var match = style.match(/@keyframes\s+(\S+)\s+{/)
        expect(match).to.have.length(2)
        var animationName = match[1]
        expect(animationName).to.not.equal('fade')
        expect(style).to.contain('animation: ' + animationName + ' 1s;')

        // default module + pre-processor + scoped
        var anotherClassName = module.computed.$style().red
        expect(anotherClassName).to.match(regexToMatch).and.not.equal(className)
        var id = 'data-v-' + genId(require.resolve('./fixtures/css-modules.vue'))
        expect(style).to.contain('.' + anotherClassName + '[' + id + ']')

        cb()
      })
    }
    // default localIdentName
    testWithIdent(undefined, /^\w{23}/, function () {
      // specified localIdentName
      var ident = '[path][name]---[local]---[hash:base64:5]'
      var regex = /^test-fixtures-css-modules---red---\w{5}/
      testWithIdent(ident, regex, done)
    })
  })

  it('css-modules in SSR', function (done) {
    bundle({
      entry: './test/fixtures/css-modules.vue',
      target: 'node',
      output: Object.assign({}, globalConfig.output, {
        libraryTarget: 'commonjs2'
      })
    }, function (code) {
      // http://stackoverflow.com/questions/17581830/load-node-js-module-from-string-in-memory
      function requireFromString(src, filename) {
        var Module = module.constructor;
        var m = new Module();
        m._compile(src, filename);
        return m.exports;
      }

      var output = requireFromString(code, './test.build.js')
      expect(output.computed.style().red).to.exist

      done()
    })
  })
})
**/

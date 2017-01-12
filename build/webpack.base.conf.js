var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var fs = require('fs')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

const webpackConfig = module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}


const vuxLoader = require('vux-loader')

const demoPath = path.resolve(__dirname, '../src/demo_list.json')

module.exports = vuxLoader.merge(webpackConfig, {
  options: {
    vuxDev: true,
    vuxSetBabel: false,
    vuxWriteFile: true,
    env: 'dev'
  },
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'js-parser',
      test: /main\.js/,
      fn: function (source) {
        this.addDependency(demoPath)
        let list = fs.readFileSync(demoPath, 'utf-8')
        list = JSON.parse(list)
        let str = []
        list.forEach(one => {
          str.push(`{
  path: '/component/${toDash(one)}',
  component: function (resolve) {
    require(['./demos/${one}.vue'], resolve)
  }
}`)
        })

        // 404 page
        str.push(`{
  path: '*',
  component: function (resolve) {
    require(['./demos/NotFoundComponent.vue'], resolve)
  }
}`)

        str = `[${str.join(',\n')}]`
        source = source.replace('const routes = []', 'const routes = ' + str)
        return source
      }
    },
    {
      name: 'duplicate-style',
      envs: ['production']
    },
    {
      name: 'i18n',
      staticReplace: false,
      extractToFiles: 'src/locales/components.yml',
      localeList: ['en', 'zh-CN']
    },
    {
      name: 'build-done-callback',
      fn: function () {
        console.log('done')
      }
    },
    {
      name: 'less-theme',
      path: 'src/theme.less'
    }
  ]
})

function toDash(str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase();
  }).replace('-', '')
}
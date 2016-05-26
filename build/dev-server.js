'use strict'
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var http = require('http')
var app = express()
var compiler = webpack(config)
var WechatAPI = require('co-wechat-api')
var api = new WechatAPI('wxdc2c6767b1a95939', 'ef2738a43bf19bf0647335d6511d4746')
var co = require('co')

app.get('/api/wx/ticket', function(req, res){
  co(function *(){
    var jsConfig = yield api.getJsConfig({
      debug: false,
      jsApiList: [],
      url: req.query.url || req.body.url
    });
    res.json({
      code: 0,
      data: jsConfig
    })
  }).catch(function(err){
    res.json({
      code: 1000,
      error_message: err + ''
    })
  })
  
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.use('/static', express.static('./src/assets'))

app.listen(8080, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8080/')
  // manully trigger bundle building to save time
  http.get('http://localhost:8080/index.html')
})

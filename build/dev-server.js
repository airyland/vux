/**
* npm run dev -- --host 0.0.0.0 --port 8085
*/

var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var http = require('http')
var app = express()
var compiler = webpack(config)

var argv = require('yargs').argv
var host = argv.host || '127.0.0.1'
var port = argv.port || 8080

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

/**
* for doc rendering
*/
if (config.plugins[0].definitions.DEV === 'true') {
  var appDev = express()
  appDev.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })
  appDev.post('/api/doc', function (req, res, next) {
    return res.send('hello')
  })
  appDev.listen(8899, '127.0.0.1', function (err) {
    err && console.log(err)
  })
}

app.listen(port, host, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log(`Listening at http://${host}:${port}/`)
  // manully trigger bundle building to save time
  http.get(`http://127.0.0.1:${port}/index.html`)
})

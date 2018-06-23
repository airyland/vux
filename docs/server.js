const options = require('./ream.config.js')
const ream = require('ream')
const app = ream(options)
const http = require('http')

app.prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      const handle = app.getRequestHandler()
      handle(req, res)
    })
    server.listen(3000)
  })

app.on('ready', () => {
  console.log('Ready!')
})

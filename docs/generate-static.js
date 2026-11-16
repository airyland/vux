const ream = require('ream')
const { generate, ...config } = require('./ream.config')

ream({ ...config, dev: false }).generate(generate).then(
  directory => {
    // The legacy renderer can leave timers open after all pages are written.
    process.stdout.write('Generated static documentation in ' + directory + '\n', () => process.exit(0))
  },
  error => {
    process.stderr.write(String(error.stack || error) + '\n', () => process.exit(1))
  }
)

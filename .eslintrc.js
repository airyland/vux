module.exports = {
  'root': true,
  extends: 'standard',
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  'rules': {
    'arrow-parens': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
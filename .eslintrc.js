var production = process.env.NODE_ENV === 'test'

module.exports = {
  'root': true,

  'env': {
    'browser': true,
    'node': true
  },

  'ecmaFeatures': {
    'arrowFunctions': true,
    'destructuring': true,
    'classes': true,
    'defaultParams': true,
    'blockBindings': true,
    'modules': true,
    'objectLiteralComputedProperties': true,
    'objectLiteralShorthandMethods': true,
    'objectLiteralShorthandProperties': true,
    'restParams': true,
    'spread': true,
    'forOf': true,
    'generators': true,
    'templateStrings': true,
    'superInFunctions': true,
    'experimentalObjectRestSpread': true
  },

  'rules': {

  }
}

// http://caniuse.com/flexbox

var html = document.documentElement

var prefixes = [
  '-webkit-',
  '-moz-',
  '-ms-',
  '-o-',
  ''
]

var supported = {}

// tests
test('flex-basis: 1px;', 'flexbox')
test('box-direction: reverse;', 'flexboxlegacy')
test('flex-align: end;', 'flexboxtweener')
test('flex-wrap: wrap;', 'flexwrap')

// aliases
supported.flex = supported.flexbox
supported.legacy = supported.flexboxlegacy
supported.tweener = supported.flexboxtweener
supported.wrap = supported.flexwrap

export default supported

function test (prop, name) {
  var el = document.createElement('div')
  el.style.cssText = prefix(prop)
  supported[name] = !!el.style.length
  html.className += ' ' + (supported[name] ? '' : 'no-') + name
}

function prefix (str) {
  var out = ''
  for (var i = 0; i < prefixes.length; i++) {
    out += prefixes[i] + str
  }
  return out
}

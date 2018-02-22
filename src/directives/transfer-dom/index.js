// Thanks to: https://github.com/calebroseland/vue-dom-portal

const objectAssign = require('object-assign')
/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget (node) {
  if (node === void 0) {
    return document.body
  }

  if (typeof node === 'string' && node.indexOf('?') === 0) {
    return document.body
  } else if (typeof node === 'string' && node.indexOf('?') > 0) {
    node = node.split('?')[0]
  }

  if (node === 'body' || node === true) {
    return document.body
  }

  return node instanceof window.Node ? node : document.querySelector(node)
}

function getShouldUpdate (node) {
  // do not updated by default
  if (!node) {
    return false
  }
  if (typeof node === 'string' && node.indexOf('?') > 0) {
    try {
      const config = JSON.parse(node.split('?')[1])
      return config.autoUpdate || false
    } catch (e) {
      return false
    }
  }
  return false
}

const directive = {
  inserted (el, { value }, vnode) {
    el.className = el.className ? el.className + ' v-transfer-dom' : 'v-transfer-dom'
    const parentNode = el.parentNode
    var home = document.createComment('')
    var hasMovedOut = false

    if (value !== false) {
      parentNode.replaceChild(home, el) // moving out, el is no longer in the document
      getTarget(value).appendChild(el) // moving into new place
      hasMovedOut = true
    }
    if (!el.__transferDomData) {
      el.__transferDomData = {
        parentNode: parentNode,
        home: home,
        target: getTarget(value),
        hasMovedOut: hasMovedOut
      }
    }
  },
  componentUpdated (el, { value }) {
    const shouldUpdate = getShouldUpdate(value)
    if (!shouldUpdate) {
      return
    }
    // need to make sure children are done updating (vs. `update`)
    var ref$1 = el.__transferDomData
    // homes.get(el)
    var parentNode = ref$1.parentNode
    var home = ref$1.home
    var hasMovedOut = ref$1.hasMovedOut // recall where home is

    if (!hasMovedOut && value) {
      // remove from document and leave placeholder
      parentNode.replaceChild(home, el)
      // append to target
      getTarget(value).appendChild(el)
      el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: true, target: getTarget(value) })
    } else if (hasMovedOut && value === false) {
      // previously moved, coming back home
      parentNode.replaceChild(el, home)
      el.__transferDomData = objectAssign({}, el.__transferDomData, { hasMovedOut: false, target: getTarget(value) })
    } else if (value) {
      // already moved, going somewhere else
      getTarget(value).appendChild(el)
    }
  },
  unbind: function unbind (el, binding) {
    el.className = el.className.replace('v-transfer-dom', '')
    if (el.__transferDomData && el.__transferDomData.hasMovedOut === true) {
      el.__transferDomData.parentNode && el.__transferDomData.parentNode.appendChild(el)
    }
    el.__transferDomData = null
  }
}

export default directive

const parse5 = require('parse5')
const acorn = require('acorn')
const escodegen = require('escodegen')

function generateHTML(rs) {
  try {
    let processed = escodegen.generate(rs, {
      format: {
        semicolons: false,
        quotes: 'single',
        compact: false,
        indent: {
          style: '',
          base: 0,
          adjustMultilineComment: false
        }
      }
    })
    processed = processed.replace(/;$/, '')
      .replace(/;\s/g, ' ')
      .replace('let VALUE = ', '')
      .replace(/;,/g, ',')
      .replace(/;]/g, ']')
    return processed
  } catch (e) {
  }
}

function parseExpression(list, key, map) {
  list.forEach((one, index) => {
    let value = one[key] || one
    if (value.type === 'BinaryExpression') {

      for (let i in value) {
        if (i === 'left' || i === 'right') {
          let expression = value[i]
          if (expression.type === 'CallExpression' && expression.callee && expression.callee.name === '$t' && expression.arguments.length === 1) {
            value[i] = buildStringExpression(map[expression.arguments[0].value] || expression.arguments[0].value)
          }
        }
      }

    } else if (value.type === 'CallExpression') {
      const rs = buildStringExpression(map[value.arguments[0].value] || value.arguments[0].value)
      if (key) {
        list[index][key] = rs
      } else {
        list[index] = rs
      }
    }
  })
}

function doParseExpression(code, map) {
  if (typeof code === 'string' && !/\$t/.test(code)) {
    return
  }
  let rs = code
  if (typeof code === 'string') {
    rs = acorn.parse(code, {
      sourceType: 'module'
    })
  }

  for (let i = 0; i < rs.body.length; i++) {
    const one = rs.body[i]

    if (one.type === 'ExpressionStatement' && one.expression.type === 'ArrayExpression') {
      const elements = one.expression.elements
      parseExpression(elements, '', map)
    } else if (one.type === 'ExpressionStatement' && one.expression && one.expression.callee && one.expression.callee.name === '$t' && one.expression.arguments.length === 1 && one.expression.arguments[0].type !== 'BinaryExpression') {
      one.expression = buildStringExpression(map[one.expression.arguments[0].value] || one.expression.arguments[0].value)
    } else if (one.type === 'ExpressionStatement') { // 表达式模式
      parseCallExpression(one.expression, map)
    } else if (one.type === 'VariableDeclaration') { // 对象类型
      var properties = one.declarations[0].init.properties
      parseExpression(properties, 'value', map)
    } else {
    }
  }
  return rs
}

function parseAttrs(nodes, map) {
  nodes.forEach(one => {
    if (one.nodeName === '#text' && /{{/.test(one.value) && /}}/.test(one.value)) {
      one.value = one.value.replace(/{{(.*?)}}/g, function (a, b) {
        if (b.indexOf('$t(') === -1) {
          return a
        }

        let rs = acorn.parse(b, {
          sourceType: 'module'
        })

        if (rs.body.length === 1 && rs.body[0].expression && rs.body[0].type === 'ExpressionStatement' && rs.body[0].expression.type === 'CallExpression' && rs.body[0].expression.arguments[0].type === 'Literal') {
          rs = doParseExpression(rs, map)
          if (!rs) {
            return a
          } else {
            let html = generateHTML(rs)
            if (html) {
              html = html.replace(/^'(.*?)'$/, '$1')
              return html
            }
          }
        } else {
          return a
        }

      })
    }
    if (one.attrs) {
      for (let i in one.attrs) {
        let attr = one.attrs[i]

        if (/\$t/.test(attr.value)) {
          if (/^:/.test(attr.name) && /^{/.test(attr.value)) {
            attr.value = 'let VALUE = ' + attr.value
          }

          let rs = doParseExpression(attr.value, map)
          let processed = generateHTML(rs)
          if (processed) {
            attr.value = processed
          } else {
            // stay unchanged
          }
        }

      }
    }
    if (one.childNodes && one.childNodes.length) {
      parseAttrs(one.childNodes, map)
    }
  })

}

function parse(code, map) {
  const documentFragment = parse5.parseFragment(code)
  parseAttrs(documentFragment.childNodes, map)
  const html = parse5.serialize(documentFragment)
  return html
}

exports.parse = parse

function parseCallExpression (expression, map) {
  for (let i in expression) {
    if (i === 'left' || i === 'right') {
      let currentExpression = expression[i]
      if (currentExpression.type === 'CallExpression' && currentExpression.callee && currentExpression.callee.name === '$t' && currentExpression.arguments.length === 1) {
        expression[i] = buildStringExpression(map[currentExpression.arguments[0].value] || currentExpression.arguments[0].value)
      } else {
        if (currentExpression.type === 'BinaryExpression') {
          parseCallExpression(currentExpression, map)
        }
      }
    }
  }
}

function buildStringExpression(value) {
  return {
    "type": "ExpressionStatement",
    "expression": {
      "type": "Literal",
      "value": value,
      "raw": "'" + value + "'"
    }
  }
}
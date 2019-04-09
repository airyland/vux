var babylon = require('babylon')
const acorn = require('acorn')
const escodegen = require('escodegen')
// const plugin = require('babel-plugin-import')
// console.log(babylon)
const code = `import{ Group as Groups,
  Cell } from 'vux'; import { X } from 'x'
import a from './a'
import x from 'vux/src/components/cell'
 var b = '1'`

const rs = babylon.parse(code, {
  sourceType: 'module'
})
// console.log(rs)
const format = function (obj) {
  return JSON.stringify(obj, null, 2)
}
const tree = acorn.parse(code, {
  sourceType: 'module'
})
console.log(format(tree.body))

const append = acorn.parse(`import{ a, xb,
c,de} from 'xxx'`, {
  sourceType: 'module'
})
// 重新生成
tree.body.unshift(append)
const code2 = escodegen.generate(tree, {
  format: {
    semicolons: false,
    indent: {
      style: '  ',
      base: 0,
      adjustMultilineComment: false
    }
  }
})
console.log(code2)
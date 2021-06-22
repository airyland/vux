import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
const { PACKAGE_DEPENDENCIES } = require('./common')

export default [
  {
    input: path.resolve(__dirname, '../packages/vux/index.ts'),
    output: {
      format: 'es',
      file: 'es/index.esm.js',
    },
    plugins: [
      terser(),
      nodeResolve(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          },
          include: [
            'packages/**/*',
            'shims-vue.d.ts',
          ],
          exclude: [
            'node_modules'
          ],
        },
        abortOnError: false
      })
    ],
    external(id) {
      return /^vue/.test(id)
        || PACKAGE_DEPENDENCIES.some(k => new RegExp('^' + k).test(id))
    }
  },
  {
    input: path.resolve(__dirname, '../packages/vux/index.ts'),
    output: {
      format: 'cjs',
      file: 'lib/index.min.js',
      exports: 'named',
    },
    plugins: [
      terser(),
      nodeResolve(),
      vue({
        target: 'browser',
        css: false,
        exposeFilename: false, 
      }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false
          }
        },
        abortOnError: false,
      })
    ],
    external(id) {
      return /^vue/.test(id)
        || PACKAGE_DEPENDENCIES.some(k => new RegExp('^' + k).test(id))
    },
  }
]

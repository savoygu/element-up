const nodeExternals = require('webpack-node-externals')
const { resolve } = require('./utils')
let externals = {}

externals = [Object.assign({
  vue: 'vue',
  'element-ui': 'element-ui'
}, externals), nodeExternals({
  whitelist: ['element-ui']
})]

exports.externals = externals

exports.alias = {
  main: resolve('../src'),
  packages: resolve('../packages'),
  examples: resolve('../examples'),
  'element-up': resolve('../')
}

exports.element = {
  root: 'ELEMENT',
  commonjs: 'element-ui',
  commonjs2: 'element-ui',
  amd: 'element-ui'
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.jsexclude = /node_modules\/(?!(element-ui)\/).*|utils\/popper\.js|utils\/data\.js/

const path = require('path')
const fs = require('fs')
const nodeExternals = require('webpack-node-externals')
const { resolve } = require('./utils')
const Components = require('../components.json')

var mixinsList = fs.readdirSync(resolve('../src/mixins'))
let externals = {}

Object.keys(Components).forEach(function (key) {
  externals[`element-up/packages/${key}`] = `element-up/lib/${key}`
})

mixinsList.forEach(function (file) {
  file = path.basename(file, '.js')
  externals[`element-up/src/mixins/${file}`] = `element-up/lib/mixins/${file}`
})

externals = [Object.assign({
  vue: 'vue'
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

exports.jsexclude = /node_modules\/(?!(element-ui)\/).*|node_modules\/element-ui\/src\/utils\/popper\.js|node_modules\/element-ui\/src\/utils\/date\.js/

const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = require('./config')
const { resolve } = require('./utils')

module.exports = {
  mode: 'production',
  entry: {
    app: [resolve('../src/index.js')]
  },
  output: {
    path: resolve('../lib'),
    filename: 'element-up.common.js',
    libraryExport: 'default',
    library: 'ELEMENTUP',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: {
    children: false
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: resolve('..'),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin()
  ]
}

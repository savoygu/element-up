const path = require('path')
const resolve = (...dirs) => path.join(__dirname, ...dirs)

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  chainWebpack: config => {
    // 增加 alias
    config.resolve.alias
      .set('main', resolve('src'))
      .set('packages', resolve('packages'))
      .set('examples', resolve('examples'))
      .set('element-up', resolve('./'))

    config.module.rule('js')
      .include.add(/examples/).end()
      .include.add(/packages/).end()
      .exclude.clear().add(/node_modules\/(?!(element-ui)\/).*/).end()

    // config.module.rule('js')
    //   .exclude.clear().add(/node_modules\/(?!(element-ui)\/).*/)
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "./node_modules/sass-bem/_bem.scss";`,
        includePaths: ['node_modules']
      }
    }
  }
}

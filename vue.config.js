const path = require('path')
const resolve = (...dirs) => path.join(__dirname, ...dirs)

module.exports = {
  chainWebpack: config => {
    // 增加 alias
    config.resolve.alias
      .set('packages', resolve('packages'))
      .set('examples', resolve('examples'))
      .set('element-up', resolve('./'))

    // config.module.rule('js')
    //   .exclude.clear().add(/node_modules\/(?!(element-ui)\/).*/)
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "./node_modules/sass-bem/_bem.scss";`
      }
    }
  }
}

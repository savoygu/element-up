import Rate from './src/main'

Rate.install = function (Vue) {
  Vue.component(Rate.name, Rate)
}

export default Rate

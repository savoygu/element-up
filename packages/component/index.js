import Component from './src/main'

Component.install = function (Vue) {
  Vue.component(Component.name, Component)
}

export default Component

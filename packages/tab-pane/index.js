import TabPane from './src/main'

TabPane.install = function (Vue) {
  Vue.component(TabPane.name, TabPane)
}

export default TabPane

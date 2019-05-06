import Preview from './src/main'

Preview.install = function (Vue) {
  Vue.component(Preview.name, Preview)
}

export default Preview

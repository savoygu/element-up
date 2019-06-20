import Upload from './src/main'

Upload.install = function (Vue) {
  Vue.component(Upload.name, Upload)
}

export default Upload

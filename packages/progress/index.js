import UpProgress from './src/main'

UpProgress.install = function (Vue) {
  Vue.component(UpProgress.name, UpProgress)
}

export default UpProgress

import Progress from './src/main'

Progress.install = function (Vue) {
  Vue.component(Progress.name, Progress)
}

export default Progress

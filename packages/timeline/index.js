import UpTimeline from './src/main'

UpTimeline.install = function (Vue) {
  Vue.component(UpTimeline.name, UpTimeline)
}

export default UpTimeline

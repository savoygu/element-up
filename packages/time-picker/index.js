import TimePicker from './src/main'

TimePicker.install = function (Vue) {
  Vue.component(TimePicker.name, TimePicker)
}

export default TimePicker

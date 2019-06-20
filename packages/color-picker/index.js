import ColorPicker from './src/main'

ColorPicker.install = function (Vue) {
  Vue.component(ColorPicker.name, ColorPicker)
}

export default ColorPicker

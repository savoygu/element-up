import Autocomplete from './src/main'

Autocomplete.install = function (Vue) {
  Vue.component(Autocomplete.name, Autocomplete)
}

export default Autocomplete

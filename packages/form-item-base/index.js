import FormItemBase from '../form/src/base'

FormItemBase.install = function (Vue) {
  Vue.component(FormItemBase.name, FormItemBase)
}

export default FormItemBase

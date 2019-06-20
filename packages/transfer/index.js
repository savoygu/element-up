import Transfer from './src/main'

Transfer.install = function (Vue) {
  Vue.component(Transfer.name, Transfer)
}

export default Transfer

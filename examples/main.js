import Vue from 'vue'
import App from './App.vue'
import ElementUp from '@/index.js'
import './plugins/element'

import 'packages/theme-chalk/src/index.scss'

Vue.use(ElementUp)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

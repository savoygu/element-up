import Vue from 'vue'
import VueRouter from 'vue-router'
import hljs from 'highlight.js'
import ElementUp from 'main/index.js'
import App from './App.vue'
import routes from './route.config'
import MainHeader from './components/header'
import MainFooter from './components/footer'
import SideNav from './components/side-nav'
import FooterNav from './components/footer-nav'
import DemoBlock from './components/demo-block'
import title from './i18n/title'

import 'packages/theme-chalk/src/index.scss'
import './demo-styles/index.scss'
import './assets/styles/common.scss'
import './assets/styles/fonts/style.css'

Vue.use(VueRouter)
Vue.use(ElementUp)
Vue.component('main-header', MainHeader)
Vue.component('main-footer', MainFooter)
Vue.component('side-nav', SideNav)
Vue.component('footer-nav', FooterNav)
Vue.component('demo-block', DemoBlock)
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})

router.afterEach(route => {
  setTimeout(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  }, 0)
  const data = title[route.meta.lang]
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val]
      return
    }
  }
  document.title = 'Element'
  if (process.env.NODE_ENV === 'production') {
    ga('send', 'event', 'PageView', route.name)
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

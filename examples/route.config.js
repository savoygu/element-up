import navConfig from './nav.config'
import langs from './i18n/route'

const LOAD_MAP = {
  'zh-CN': name => {
    return r => require.ensure([], () =>
      r(require(`./pages/zh-CN/${name}.vue`)),
    'zh-CN')
  }
}

const load = function (lang, path) {
  return LOAD_MAP[lang](path)
}

const LOAD_DOCS_MAP = {
  'zh-CN': path => {
    // return import(/* webpackChunkName: "zh-CN" */ `./docs/zh-CN${path}.md`)
    return r => require.ensure([], () =>
      r(require(`./docs/zh-CN${path}.md`)),
    'zh-CN')
  }
}

const loadDocs = function (lang, path) {
  return LOAD_DOCS_MAP[lang](path)
}

const registerRoute = (navConfig) => {
  let route = []
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang]
    route.push({
      path: `/${lang}/component`,
      redirect: `/${lang}/component/installation`,
      component: load(lang, 'component'),
      children: []
    })
    navs.forEach(nav => {
      if (nav.href) return
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index)
          })
        })
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index)
        })
      } else {
        addRoute(nav, lang, index)
      }
    })
  })
  function addRoute (page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path)
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component
    }

    route[index].children.push(child)
  }

  return route
}

let route = registerRoute(navConfig)

const generateMiscRoutes = function (lang) {
  let indexRoute = {
    path: `/${lang}`, // 首页
    meta: { lang },
    name: 'home' + lang,
    // redirect: `/${lang}/component`
    component: load(lang, 'index')
  }

  return [indexRoute]
}

langs.forEach(lang => {
  route = route.concat(generateMiscRoutes(lang.lang))
})

let userLanguage = localStorage.getItem('ELEMENT_UP_LANGUAGE') || window.navigator.language || 'zh-CN'
let defaultPath = '/zh-CN'
if (userLanguage.indexOf('zh-') !== -1) {
  defaultPath = '/zh-CN'
}

route = route.concat([{
  path: '/',
  redirect: defaultPath
}, {
  path: '*',
  redirect: defaultPath
}])

export default route

/* Automatically generated by './build/bin/build-entry.js' */

import Breadcrumb from '../packages/breadcrumb/index.js'
import Dropdown from '../packages/dropdown/index.js'
import FormItemSelect from '../packages/form-item-select/index.js'
import Preview from '../packages/preview/index.js'
import Submenu from '../packages/submenu/index.js'
import Carousel from '../packages/carousel/index.js'
import FormItemBase from '../packages/form-item-base/index.js'
import Menu from '../packages/menu/index.js'
import Progress from '../packages/progress/index.js'
import Table from '../packages/table/index.js'
import Checkbox from '../packages/checkbox/index.js'
import FormItemCheckbox from '../packages/form-item-checkbox/index.js'
import Message from '../packages/message/index.js'
import Radio from '../packages/radio/index.js'
import Timeline from '../packages/timeline/index.js'
import Collapse from '../packages/collapse/index.js'
import FormItemInput from '../packages/form-item-input/index.js'
import Page from '../packages/page/index.js'
import Select from '../packages/select/index.js'
import Dialog from '../packages/dialog/index.js'
import FormItemRadio from '../packages/form-item-radio/index.js'
import Popover from '../packages/popover/index.js'
import Steps from '../packages/steps/index.js'
import Button from '../packages/button/index.js'
import Component from '../packages/component/index.js'
import Link from '../packages/link/index.js'
import Alert from '../packages/alert/index.js'
import Tooltip from '../packages/tooltip/index.js'
import RegionPicker from '../packages/region-picker/index.js'
import locale from 'element-up/src/locale'

const components = [
  Breadcrumb,
  Dropdown,
  FormItemSelect,
  Preview,
  Submenu,
  Carousel,
  FormItemBase,
  Menu,
  Progress,
  Table,
  Checkbox,
  FormItemCheckbox,
  Radio,
  Timeline,
  Collapse,
  FormItemInput,
  Select,
  Dialog,
  FormItemRadio,
  Popover,
  Steps,
  Button,
  Component,
  Link,
  Alert,
  Tooltip,
  RegionPicker
]

const install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }

  Vue.prototype.$msg = Message
  Vue.prototype.$page = Page
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.6.3',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  Breadcrumb,
  Dropdown,
  FormItemSelect,
  Preview,
  Submenu,
  Carousel,
  FormItemBase,
  Menu,
  Progress,
  Table,
  Checkbox,
  FormItemCheckbox,
  Message,
  Radio,
  Timeline,
  Collapse,
  FormItemInput,
  Page,
  Select,
  Dialog,
  FormItemRadio,
  Popover,
  Steps,
  Button,
  Component,
  Link,
  Alert,
  Tooltip,
  RegionPicker
}

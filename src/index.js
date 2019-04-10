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
  Steps
]

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$msg = Message
  Vue.prototype.$page = Page
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: '0.2.0',
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
  Steps
}

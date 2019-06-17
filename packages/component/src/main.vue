<!-- <template>
  <component
    class="up-component"
    :is="component"
    :class="classes"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="$listners"
  ></component>
</template> -->

<script>
// Basic
import Row from 'element-ui/packages/row'
import Col from 'element-ui/packages/col'
import Container from 'element-ui/packages/container'
import Header from 'element-ui/packages/header'
import Main from 'element-ui/packages/main'
import Aside from 'element-ui/packages/aside'
import Footer from 'element-ui/packages/footer'
import Icon from 'element-ui/packages/icon'
import Link from 'element-ui/packages/link'

// Form
import Radio from 'element-ui/packages/radio'
import Checkbox from 'element-ui/packages/checkbox'
import Input from 'element-ui/packages/input'
import InputNumber from 'element-ui/packages/input-number'
import Cascader from 'element-ui/packages/cascader'
import Switch from 'element-ui/packages/switch'
import Slider from 'element-ui/packages/slider'
import DatePicker from 'element-ui/packages/date-picker'
import Upload from 'element-ui/packages/upload'
import Rate from 'element-ui/packages/rate'
import ColorPicker from 'element-ui/packages/color-picker'
import Transfer from 'element-ui/packages/transfer'

// Data
import Tag from 'element-ui/packages/tag'
import Tree from 'element-ui/packages/tree'
import Pagination from 'element-ui/packages/pagination'
import Badge from 'element-ui/packages/badge'

// Notice
import Alert from 'element-ui/packages/alert'

// Other
import Card from 'element-ui/packages/card'
import Divider from 'element-ui/packages/divider'
import Calendar from 'element-ui/packages/calendar'
import Image from 'element-ui/packages/image'
import Backtop from 'element-ui/packages/backtop'
import Scrollbar from 'element-ui/packages/scrollbar'
import createVModel from 'element-up/src/mixins/createVModel'
import rewroteContainer from './container'

const kebabCase = function (str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

export default {
  name: 'UpComponent',

  mixins: [createVModel('currentValue')],

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Container.name]: rewroteContainer(Container),
    [Header.name]: Header,
    [Main.name]: Main,
    [Aside.name]: Aside,
    [Footer.name]: Footer,
    [Icon.name]: Icon,
    [Link.name]: Link,

    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Cascader.name]: Cascader,
    [Switch.name]: Switch,
    [Slider.name]: Slider,
    [DatePicker.name]: DatePicker,
    [Upload.name]: Upload,
    [Rate.name]: Rate,
    [ColorPicker.name]: ColorPicker,
    [Transfer.name]: Transfer,

    [Alert.name]: Alert,

    [Tag.name]: Tag,
    [Tree.name]: Tree,
    [Pagination.name]: Pagination,
    [Badge.name]: Badge,

    [Card.name]: Card,
    [Divider.name]: Divider,
    [Calendar.name]: Calendar,
    [Image.name]: Image,
    [Backtop.name]: Backtop,
    [Scrollbar.name]: Scrollbar
    // 'el-radio': () => import('element-ui/packages/radio'),
    // 'el-checkbox': () => import('element-ui/packages/checkbox'),
    // 'el-alert': () => import('element-ui/packages/alert'),
    // 'el-link': () => import('element-ui/packages/link'),
    // 'el-input': () => import('element-ui/packages/input'),
    // 'el-input-number': () => import('element-ui/packages/input-number'),
    // 'el-cascader': () => import('element-ui/packages/cascader'),
    // 'el-switch': () => import('element-ui/packages/switch'),
    // 'el-date-picker': () => import('element-ui/packages/date-picker'),
    // 'el-upload': () => import('element-ui/packages/upload'),
    // 'el-rate': () => import('element-ui/packages/rate'),
    // 'el-color-picker': () => import('element-ui/packages/color-picker'),
    // 'el-transfer': () => import('element-ui/packages/transfer'),
    // 'el-tag': () => import('element-ui/packages/tag'),
    // 'el-tree': () => import('element-ui/packages/tree'),
    // 'el-pagination': () => import('element-ui/packages/pagination'),
    // 'el-badge': () => import('element-ui/packages/badge'),
    // 'el-scrollbar': () => import('element-ui/packages/scrollbar'),
    // 'el-row': () => import('element-ui/packages/row'),
    // 'el-col': () => import('element-ui/packages/col'),
    // 'el-icon': () => import('element-ui/packages/icon')
  },

  props: {
    component: {},
    c: {}
  },

  computed: {
    comp () {
      return this.component || this.c
    },
    classes () {
      return typeof this.comp === 'string' ? kebabCase(this.comp).replace(/^el/, 'up') : ''
    }
  },

  methods: {
    sync (value) {
      this.currentValue = value
    }
  },

  render (h) {
    const { $attrs, $listeners, $slots } = this

    return (
      <this.comp vModel={this.currentValue} {...{
        class: [this.classes],
        attrs: $attrs,
        on: { ...$listeners, input: this.sync, change: this.sync }
      }}>
        {
          Object.keys($slots).map(key => (
            key === 'default' ? $slots.default
              : $slots[key] && (
                <template slot={key}>
                  {$slots[key]}
                </template>
              )
          ))
        }
      </this.comp>
    )
  }
}
</script>

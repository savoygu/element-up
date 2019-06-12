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
import Radio from 'element-ui/packages/radio'
import Checkbox from 'element-ui/packages/checkbox'
import Alert from 'element-ui/packages/alert'
import Link from 'element-ui/packages/link'
import Input from 'element-ui/packages/input'
import InputNumber from 'element-ui/packages/input-number'
import Cascader from 'element-ui/packages/cascader'
import Switch from 'element-ui/packages/switch'
import DatePicker from 'element-ui/packages/date-picker'
import Upload from 'element-ui/packages/upload'
import Rate from 'element-ui/packages/rate'
import ColorPicker from 'element-ui/packages/color-picker'
import Transfer from 'element-ui/packages/transfer'
import Tag from 'element-ui/packages/tag'
import Tree from 'element-ui/packages/tree'
import Pagination from 'element-ui/packages/pagination'
import Badge from 'element-ui/packages/badge'
import Scrollbar from 'element-ui/packages/scrollbar'
import Row from 'element-ui/packages/row'
import Col from 'element-ui/packages/col'
import Icon from 'element-ui/packages/icon'
import createVModel from 'element-up/src/mixins/createVModel'

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
    [Radio.name]: Radio,
    [Checkbox.name]: Checkbox,
    [Alert.name]: Alert,
    [Link.name]: Link,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber,
    [Cascader.name]: Cascader,
    [Switch.name]: Switch,
    [DatePicker.name]: DatePicker,
    [Upload.name]: Upload,
    [Rate.name]: Rate,
    [ColorPicker.name]: ColorPicker,
    [Transfer.name]: Transfer,
    [Tag.name]: Tag,
    [Tree.name]: Tree,
    [Pagination.name]: Pagination,
    [Badge.name]: Badge,
    [Scrollbar.name]: Scrollbar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon
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
    component: {
      required: true
    }
  },

  computed: {
    classes () {
      return typeof this.component === 'string' ? kebabCase(this.component).replace(/^el/, 'up') : ''
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
      <this.component vModel={this.currentValue} {...{
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
      </this.component>
    )
  }
}
</script>

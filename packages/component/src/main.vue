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
    'el-radio': () => import('element-ui/packages/radio'),
    'el-checkbox': () => import('element-ui/packages/checkbox'),
    'el-alert': () => import('element-ui/packages/alert'),
    'el-link': () => import('element-ui/packages/link'),
    'el-input': () => import('element-ui/packages/input'),
    'el-input-number': () => import('element-ui/packages/input-number'),
    'el-cascader': () => import('element-ui/packages/cascader'),
    'el-switch': () => import('element-ui/packages/switch'),
    'el-date-picker': () => import('element-ui/packages/date-picker'),
    'el-upload': () => import('element-ui/packages/upload'),
    'el-rate': () => import('element-ui/packages/rate'),
    'el-color-picker': () => import('element-ui/packages/color-picker'),
    'el-transfer': () => import('element-ui/packages/transfer'),
    'el-tag': () => import('element-ui/packages/tag'),
    'el-tree': () => import('element-ui/packages/tree'),
    'el-pagination': () => import('element-ui/packages/pagination'),
    'el-badge': () => import('element-ui/packages/badge'),
    'el-scrollbar': () => import('element-ui/packages/scrollbar'),
    'el-row': () => import('element-ui/packages/row'),
    'el-col': () => import('element-ui/packages/col'),
    'el-icon': () => import('element-ui/packages/icon')
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

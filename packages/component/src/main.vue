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
    'el-cascader': () => import('element-ui/packages/cascader')
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

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
import Link from 'element-ui/packages/link'
import Input from 'element-ui/packages/input'
import InputNumber from 'element-ui/packages/input-number'
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
    [Link.name]: Link,
    [Input.name]: Input,
    [InputNumber.name]: InputNumber
  },

  props: {
    component: {
      type: String,
      required: true
    }
  },

  computed: {
    classes () {
      return kebabCase(this.component).replace(/^el/, 'up')
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

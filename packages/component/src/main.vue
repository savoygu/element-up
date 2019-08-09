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
import Container from 'element-ui/packages/container'
import Header from 'element-ui/packages/header'
import Main from 'element-ui/packages/main'
import Aside from 'element-ui/packages/aside'
import Footer from 'element-ui/packages/footer'

// Other
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
    [Container.name]: rewroteContainer(Container),
    [Header.name]: Header,
    [Main.name]: Main,
    [Aside.name]: Aside,
    [Footer.name]: Footer
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
    const { $attrs, $listeners, $slots, comp } = this

    return (
      <comp vModel={this.currentValue} {...{
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
      </comp>
    )
  }
}
</script>

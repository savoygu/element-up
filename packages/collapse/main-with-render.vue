<script>
import { Collapse, CollapseItem } from 'element-ui'

export default {
  name: 'UpCollapse',

  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem
  },

  props: {
    value: {
      type: [Array, String, Number]
    },
    data: {
      type: Array,
      default: () => []
    },
    accordion: Boolean
  },

  methods: {
    renderCollapseItem (h, item, index) {
      const self = this

      return h('el-collapse-item', {
        attrs: {
          ...this.$attrs,
          ...item
        },
        scopedSlots: {
          title: function (...props) {
            return self.$scopedSlots.title && self.$scopedSlots.title({
              ...item, index
            })
          },
          default: function () {
            return self.$scopedSlots.default && self.$scopedSlots.default({
              ...item, index
            })
          }
        }
      }, [
        h('template', { slot: 'title' }, [this.$slots.title])
      ])
    }
  },

  render (h) {
    const self = this
    return h('el-collapse', {
      domProps: {
        value: this.value
      },
      attrs: this.$attrs,
      on: {
        ...this.$listeners,
        change: function (value) {
          self.$emit('up:collapse:change', value)
          self.$emit('change', value)
        },
        input: function (value) {
          self.$emit('input', value)
        }
      }
    }, this.data.map(function (item, index) {
      return self.renderCollapseItem(h, item, index)
    }))
  }
}
</script>

<style lang="scss">
</style>

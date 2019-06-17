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
      return h('el-collapse-item', {
        attrs: {
          ...this.$attrs,
          ...item
        },
        scopedSlots: {
          title: () => (this.$scopedSlots.title && this.$scopedSlots.title({ ...item, $index: index })),
          default: () => (this.$scopedSlots.default && this.$scopedSlots.default({ ...item, $index: index }))
        }
      }, [
        h('template', { slot: 'title' }, [this.$slots.title])
      ])
    }
  },

  render (h) {
    return h('el-collapse', {
      domProps: {
        value: this.value
      },
      attrs: this.$attrs,
      on: {
        ...this.$listeners,
        change: value => {
          this.$emit('up:collapse:change', value)
          this.$emit('change', value)
        },
        input: value => this.$emit('input', value)
      }
    }, this.data.map((item, index) => this.renderCollapseItem(h, item, index)))
  }
}
</script>

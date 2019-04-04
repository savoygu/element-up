<script>
import { Select, OptionGroup, Option } from 'element-ui'
import createVModel from 'element-up/src/mixins/createVModel'

export default {
  name: 'UpSelect',

  mixins: [createVModel('currentValue')],

  components: {
    [Select.name]: Select,
    [OptionGroup.name]: OptionGroup,
    [Option.name]: Option
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    keyValue: {
      type: Array,
      default: () => ['name', 'value']
    },
    disabled: Boolean,
    group: Boolean
  },

  methods: {
    renderOption (data) {
      const { $attrs, $listeners, $scopedSlots, $props } = this
      const { keyValue } = $props

      return (
        data.length &&
        data.map((item, index) => (
          <el-option
            {...{ attrs: { ...$attrs, ...item }, on: $listeners }}
            key={item[keyValue[1]]}
            label={item[keyValue[0]]}
            value={item[keyValue[1]]}
          >
            {$scopedSlots.template && $scopedSlots.template({ item, index })}
          </el-option>
        ))
      )
    },

    renderOptionGroup (data) {
      const { $attrs, $listeners } = this

      return (
        data.length &&
        data.map(groupItem => (
          <el-option-group
            {...{ attrs: { ...$attrs, ...groupItem }, on: $listeners }}
            key={groupItem.label}
            label={groupItem.label}
          >
            {groupItem.options.length && this.renderOption(groupItem.options)}
          </el-option-group>
        ))
      )
    }
  },

  render () {
    const { $attrs, $listeners, $slots, $props } = this
    const { disabled, group, data } = $props
    const { prefix, empty } = $slots

    return (
      <el-select
        class="up-select"
        vModel={this.currentValue}
        {...{ attrs: $attrs, on: $listeners }}
        disabled={disabled}
      >
        {prefix && (
          <template slot="prefix">
            <slot name="prefix" />
          </template>
        )}
        {empty && (
          <template slot="empty">
            <slot name="empty" />
          </template>
        )}
        <slot>
          {group ? this.renderOptionGroup(data) : this.renderOption(data)}
        </slot>
      </el-select>
    )
  }
}
</script>

<template>
  <el-select
    class="up-select"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      change: value => $emit('up:select:change', value)
    }"
    :disabled="disabled"
  >
    <template slot="prefix" v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <template slot="empty" v-if="$slots.empty">
      <slot name="empty"></slot>
    </template>
    <slot>
      <template v-if="group">
        <el-option-group
          v-bind="{
            ...$attrs,
            ...groupItem
          }"
          v-on="$listeners"
          v-for="groupItem in data"
          :key="groupItem.label"
          :label="groupItem.label"
        >
          <el-option
            v-bind="{
              ...$attrs,
              ...item
            }"
            v-on="$listeners"
            v-for="(item, index) in groupItem.options"
            :key="item[keyValue[1]]"
            :label="item[keyValue[0]]"
            :value="item[keyValue[1]]"
          >
            <slot name="template" v-bind="{ item, index }"></slot>
          </el-option>
        </el-option-group>
      </template>
      <el-option
        v-else
        v-bind="{
          ...$attrs,
          ...item
        }"
        v-on="$listeners"
        v-for="(item, index) in data"
        :key="item[keyValue[1]]"
        :label="item[keyValue[0]]"
        :value="item[keyValue[1]]"
      >
        <slot name="template" v-bind="{ item, index }"></slot>
      </el-option>
    </slot>
  </el-select>
</template>

<script>
// import { Select, OptionGroup, Option } from 'element-ui'
import Select from 'element-ui/packages/select'
import Option from 'element-ui/packages/option'
import OptionGroup from 'element-ui/packages/option-group'
import createVModel from 'element-up/src/mixins/createVModel'

export default {
  name: 'UpSelect',

  mixins: [
    createVModel('currentValue')
  ],

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
  }
}
</script>

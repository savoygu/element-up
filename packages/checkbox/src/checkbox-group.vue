<template>
  <el-checkbox-group
    class="up-checkbox"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      change: (value) => $emit('up:checkbox-group:change', value)
    }"
    :size="size"
    :disabled="disabled"
  >
    <slot>
      <component
        :is="component"
        v-bind="{
          ...$attrs,
          ...item
        }"
        v-on="{
          ...$listeners,
          change: (value) => $emit('up:checkbox:change', value, item, index, data)
        }"
        v-for="(item, index) in data"
        :key="index"
        :label="item[keyValue[1]]"
      >
        <slot name="up:item" v-bind="{ item, $index: index }">{{item[keyValue[0]]}}</slot>
      </component>
    </slot>
  </el-checkbox-group>
</template>

<script>
import Checkbox from 'element-ui/packages/checkbox'
import CheckboxButton from 'element-ui/packages/checkbox-button'
import CheckboxGroup from 'element-ui/packages/checkbox-group'
import createVModel from 'element-up/src/mixins/createVModel'

export default {
  name: 'UpCheckboxGroup',

  mixins: [
    createVModel('currentValue')
  ],

  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [CheckboxButton.name]: CheckboxButton,
    [Checkbox.name]: Checkbox
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
    size: String,
    disabled: Boolean,
    component: {
      type: String,
      default: 'el-checkbox'
    }
  }
}
</script>

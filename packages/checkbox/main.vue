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
    <component
      :is="component"
      v-bind="{
        ...$attrs,
        ...item
      }"
      v-on="{
        ...$listeners,
        change: (value) => $emit('up:checkbox:change', value, item)
      }"
      v-for="(item, index) in data"
      :key="index"
      :label="item[keyValue[1]]"
    >{{item[keyValue[0]]}}</component>
  </el-checkbox-group>
</template>

<script>
import { Checkbox, CheckboxButton, CheckboxGroup } from 'element-ui'
import createVModel from '@/mixins/createVModel'

export default {
  name: 'UpCheckbox',

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

<style lang="scss">
</style>

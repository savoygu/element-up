<template>
  <el-radio-group
    class="up-radio"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      change: (value) => $emit('up:radio-group:change', value)
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
        change: (value) => $emit('up:radio:change', value, item, index, data)
      }"
        v-for="(item, index) in data"
        :key="index"
        :label="item[keyValue[1]]"
      >
        <slot name="up:item" v-bind="{ item, $index: index }">{{item[keyValue[0]]}}</slot>
      </component>
    </slot>
  </el-radio-group>
</template>

<script>
import Radio from 'element-ui/packages/radio'
import RadioButton from 'element-ui/packages/radio-button'
import RadioGroup from 'element-ui/packages/radio-group'
import createVModel from 'element-up/src/mixins/createVModel'

export default {
  name: 'UpRadioGroup',

  mixins: [
    createVModel('currentValue')
  ],

  components: {
    [RadioGroup.name]: RadioGroup,
    [RadioButton.name]: RadioButton,
    [Radio.name]: Radio
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
      default: 'el-radio'
    }
  }
}
</script>

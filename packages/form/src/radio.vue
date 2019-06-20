<template>
  <el-form-item class="el-form-item-input" ref="elFormItem" v-bind="$attrs" v-on="$listeners">
    <template slot="label" v-if="$slots.label">
      <slot name="label">{{$attrs.label}}</slot>
    </template>
    <up-radio-group
      v-model="currentValue"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        change: (value) => $emit('up:form:radio', value)
      }"
      :key-value="keyValue"
      :data="data"
    ></up-radio-group>
    <template slot="error" slot-scope="props" v-if="$scopedSlots.error">
      <slot name="error" v-bind="props"></slot>
    </template>
  </el-form-item>
</template>

<script>
import UpRadioGroup from 'element-up/packages/radio-group'
import createVModel from 'element-up/src/mixins/createVModel'
import FormItemBase from './FormItemBase'

export default {
  name: 'UpFormItemRadio',

  components: {
    UpRadioGroup
  },

  mixins: [createVModel('currentValue'), FormItemBase],

  props: {
    data: {
      type: Array,
      default: () => []
    },
    keyValue: {
      type: Array,
      default: () => ['name', 'value']
    }
  }
}
</script>

<template>
  <el-form-item class="up-form-item-select" ref="elFormItem" v-bind="$attrs" v-on="$listeners">
    <template slot="label" v-if="$slots.label">
      <slot name="label">{{$attrs.label}}</slot>
    </template>
    <slot>
      <up-select v-model="currentValue" :data="data" v-bind="$attrs" v-on="$listeners">
        <template slot="prefix" v-if="$slots['up:select:prefix']">
          <slot name="up:select:prefix"></slot>
        </template>
        <template slot="empty" v-if="$slots['up:select:empty']">
          <slot name="up:select:empty"></slot>
        </template>
        <template slot="template" slot-scope="props" v-if="$scopedSlots['up:select:template']">
          <slot name="up:select:template" v-bind="props"></slot>
        </template>
        <slot name="up:select"></slot>
      </up-select>
    </slot>
    <template slot="error" slot-scope="props" v-if="$scopedSlots.error">
      <slot name="error" v-bind="props"></slot>
    </template>
  </el-form-item>
</template>

<script>
import { Input } from 'element-ui'
import UpSelect from '../../select'
import createVModel from '@/mixins/createVModel'
import FormItemBase from './FormItemBase'

export default {
  name: 'UpFormItemSelect',

  components: {
    [Input.name]: Input,
    UpSelect
  },

  mixins: [createVModel('currentValue'), FormItemBase],

  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss">
</style>

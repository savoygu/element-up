<template>
  <el-form-item
    class="up-form-item-checkbox"
    :class="{ 'is-inline': inline }"
    ref="elFormItem"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="label" v-if="$slots.label">
      <slot name="label">{{$attrs.label}}</slot>
    </template>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      v-bind="$attrs"
      @change="handleCheckAllChange"
    ></el-checkbox>
    <up-checkbox
      v-model="currentValue"
      :data="data"
      :key-value="keyValue"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        change: (value) => $emit('up:form:checkbox', value)
      }"
      @up:checkbox-group:change="handleUpCheckboxGroupChange"
    ></up-checkbox>
    <template slot="error" slot-scope="props" v-if="$scopedSlots.error">
      <slot name="error" v-bind="props"></slot>
    </template>
  </el-form-item>
</template>

<script>
import { Checkbox } from 'element-ui'
import UpCheckbox from '../checkbox/main'
import createVModel from '@/mixins/createVModel'
import FormItemBase from './FormItemBase'

export default {
  name: 'UpFormItemCheckbox',

  components: {
    [Checkbox.name]: Checkbox,
    UpCheckbox
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
    },
    inline: {
      type: Boolean,
      default: true
    }
  },

  data () {
    const { checkAll, isIndeterminate } = this.getCheckAllStatus(this.value)

    return {
      checkAll,
      isIndeterminate
    }
  },

  watch: {
    value (val) {
      this.currentValue = val
      this.handleUpCheckboxGroupChange(val)
    }
  },

  methods: {
    getCheckAllStatus (value = []) {
      const checkedCount = value.length
      const checkAll = checkedCount === this.data.length
      const isIndeterminate = checkedCount > 0 && checkedCount < this.data.length

      return {
        checkAll,
        isIndeterminate
      }
    },
    handleCheckAllChange (val) {
      this.currentValue = val ? this.data.map(v => v[this.keyValue[1]]) : []
      this.isIndeterminate = false
    },
    handleUpCheckboxGroupChange (value) {
      const { checkAll, isIndeterminate } = this.getCheckAllStatus(value)
      this.checkAll = checkAll
      this.isIndeterminate = isIndeterminate
    }
  }
}
</script>

<style lang="scss">
@include b(up-form-item-checkbox) {
  @include is(inline) {
    .el-form-item__content {
      display: flex;
    }
  }
}
</style>

<template>
  <el-form-item
    class="up-form-item-checkbox"
    :class="{ 'is-inline': inline, 'is-separate': separate, 'is-with-all': !withAll }"
    ref="elFormItem"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="label" v-if="$slots.label">
      <slot name="label">{{$attrs.label}}</slot>
    </template>
    <component
      v-if="withAll"
      class="up-form-item-checkbox__all"
      :is="component"
      :indeterminate="isIndeterminate"
      :class="{
        'is-checkbox-button': isCheckboxButton,
        'is-checkbox': isCheckbox,
      }"
      v-model="checkAll"
      v-bind="$attrs"
      @change="handleCheckAllChange"
    >{{ checkAllLabel }}</component>
    <up-checkbox-group
      v-model="currentValue"
      :class="{
        'is-checkbox-button': isCheckboxButton
      }"
      :component="component"
      :data="data"
      :key-value="keyValue"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        change: (value) => $emit('up:form:checkbox', value)
      }"
      @up:checkbox-group:change="handleUpCheckboxGroupChange"
    ></up-checkbox-group>
    <template slot="error" slot-scope="props" v-if="$scopedSlots.error">
      <slot name="error" v-bind="props"></slot>
    </template>
  </el-form-item>
</template>

<script>
import Checkbox from 'element-ui/packages/checkbox'
import CheckboxButton from 'element-ui/packages/checkbox-button'
import UpCheckboxGroup from 'element-up/packages/checkbox-group'
import createVModel from 'element-up/src/mixins/createVModel'
import FormItemBase from './FormItemBase'

export default {
  name: 'UpFormItemCheckbox',

  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxButton.name]: CheckboxButton,
    UpCheckboxGroup
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
    },
    separate: Boolean,
    withAll: Boolean,
    checkAllLabel: {
      type: String,
      default: '全部'
    },
    component: {
      type: String,
      default: 'el-checkbox'
    }
  },

  data () {
    const { checkAll, isIndeterminate } = this.getCheckAllStatus(this.value)

    return {
      checkAll,
      isIndeterminate
    }
  },

  computed: {
    isCheckboxButton () {
      return this.component === 'el-checkbox-button'
    },
    isCheckbox () {
      return this.component === 'el-checkbox'
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
      const checkAll = this.data.length > 0 && checkedCount === this.data.length
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

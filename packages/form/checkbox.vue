<template>
  <el-form-item
    class="up-form-item-checkbox"
    :class="{ 'is-inline': inline, 'is-separate': separate }"
    ref="elFormItem"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template slot="label" v-if="$slots.label">
      <slot name="label">{{$attrs.label}}</slot>
    </template>
    <component
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
    <up-checkbox
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
    ></up-checkbox>
    <template slot="error" slot-scope="props" v-if="$scopedSlots.error">
      <slot name="error" v-bind="props"></slot>
    </template>
  </el-form-item>
</template>

<script>
import { Checkbox, CheckboxButton } from 'element-ui'
import UpCheckbox from '../checkbox/main'
import createVModel from '@/mixins/createVModel'
import FormItemBase from './FormItemBase'

export default {
  name: 'UpFormItemCheckbox',

  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxButton.name]: CheckboxButton,
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
    },
    checkAllLabel: {
      type: String,
      default: '全部'
    },
    component: {
      type: String,
      default: 'el-checkbox'
    },
    separate: Boolean
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
  @include e(all) {
    margin-top: -1px;
  }

  @include is(inline) {
    .el-form-item__content {
      display: flex;
    }
  }

  .el-checkbox-group {
    @include is(checkbox-button) {
      .el-checkbox-button {
        &:first-child {
          .el-checkbox-button__inner {
            border-left-width: 0;
            border-radius: 0;
          }

          @include is(checked) {
            box-shadow: -1px 0 0 0 #8cc5ff !important;
          }
        }
      }
    }
  }

  @include is(separate) {
    .el-checkbox-button {
      @include is(checkbox-button) {
        margin-right: 16px;

        .el-checkbox-button__inner {
          border-radius: 4px;
        }
      }
    }

    .el-checkbox {
      @include is(checkbox) {
        margin-right: 50px;
      }
    }

    .el-checkbox-group {
      @include is(checkbox-button) {
        .el-checkbox-button {
          &:first-child {
            .el-checkbox-button__inner {
              border-left-width: 1px;
              border-radius: 4px 0 0 4px;
            }

            @include is(checked) {
              box-shadow: none !important;
            }
          }
        }
      }
    }
  }
}
</style>

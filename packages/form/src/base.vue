<template>
  <el-form-item class="up-form-item-input" ref="elFormItem" v-bind="$attrs" v-on="$listeners">
    <slot v-if="$slots.label" name="label" slot="label">{{$attrs.label}}</slot>
    <slot></slot>
    <slot v-if="$scopedSlots.error" name="error" slot="error" slot-scope="props" v-bind="props"></slot>
  </el-form-item>
</template>

<script>
import FormItemBase from './FormItemBase'

export default {
  name: 'UpFormItemBase',

  mixins: [FormItemBase]
}
</script>

<style lang="scss">
</style>

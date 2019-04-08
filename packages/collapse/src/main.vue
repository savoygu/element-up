<template>
  <el-collapse
    class="up-collapse"
    v-model="currentValue"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      change: value => $emit('up:collapse:change', value)
    }"
    :accordion="accordion"
  >
    <el-collapse-item v-bind="{ ...$attrs, ...item }" v-for="(item, index) in data" :key="index">
      <template v-if="$slots.title || $scopedSlots.title" slot="title">
        <slot v-if="$slots.title" name="title"></slot>
        <slot v-else name="title" v-bind="{ item, index }"></slot>
      </template>
      <slot v-bind="{ item, index }"></slot>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
// import { Collapse, CollapseItem } from 'element-ui'
import Collapse from 'element-ui/packages/collapse'
import CollapseItem from 'element-ui/packages/collapse-item'
import createVModel from 'element-up/src/mixins/createVModel'

export default {
  name: 'UpCollapse™',

  mixins: [
    createVModel('currentValue')
  ],

  components: {
    [CollapseItem.name]: CollapseItem,
    [Collapse.name]: Collapse
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    accordion: Boolean
  }
}
</script>

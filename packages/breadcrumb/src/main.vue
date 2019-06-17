<template>
  <el-breadcrumb v-bind="$attrs">
    <el-breadcrumb-item
      v-bind="{
        ...$attrs,
        ...(typeof item === 'string' ? {} : item)
      }"
      v-for="(item, index) in data"
      :key="index"
    >
      <slot v-bind="{ item, $index: index }">{{ typeof item === 'string' ? item: item[valueKey] }}</slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import Breadcrumb from 'element-ui/packages/breadcrumb'
import BreadcrumbItem from 'element-ui/packages/breadcrumb-item'

export default {
  name: 'UpBreadcrumb',

  components: {
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'name'
    }
  }
}
</script>

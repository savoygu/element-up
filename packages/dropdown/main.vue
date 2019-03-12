<template>
  <el-dropdown v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template slot="dropdown">
      <slot name="dropdown">
        <el-dropdown-menu>
          <el-dropdown-item
            v-bind="{ ...$attrs, ...item }"
            v-on="$listeners"
            v-for="(item, index) in data"
            :key="index"
          >
            <template v-if="$scopedSlots['up:item']">
              <slot name="up:item" v-bind="{ ...item, index }"></slot>
            </template>
            <template v-else>{{ item[valueKey] }}</template>
          </el-dropdown-item>
        </el-dropdown-menu>
      </slot>
    </template>
  </el-dropdown>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

export default {
  name: 'UpDropdown',

  components: {
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
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

<style lang="scss">
</style>

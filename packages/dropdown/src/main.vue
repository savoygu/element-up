<template>
  <el-dropdown v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template slot="dropdown">
      <slot name="dropdown">
        <el-dropdown-menu>
          <el-dropdown-item
            v-bind="{ ...$attrs, ...(typeof item === 'string' ? {} : item) }"
            v-on="$listeners"
            v-for="(item, index) in data"
            :key="index"
          >
            <template v-if="$scopedSlots['up:item']">
              <slot name="up:item" v-bind="{ item, $index: index }"></slot>
            </template>
            <template v-else>{{ typeof item === 'string' ? item : item[valueKey] }}</template>
          </el-dropdown-item>
        </el-dropdown-menu>
      </slot>
    </template>
  </el-dropdown>
</template>

<script>
import Dropdown from 'element-ui/packages/dropdown'
import DropdownMenu from 'element-ui/packages/dropdown-menu'
import DropdownItem from 'element-ui/packages/dropdown-item'

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

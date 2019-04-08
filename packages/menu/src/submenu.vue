<template>
  <div class="up-submenu">
    <template v-for="(item, index) in data">
      <el-submenu
        v-if="(item.children && item.children.length > 0 || item.groups && item.groups.length > 0)"
        :key="index"
        v-bind="{ ...$attrs, ...item }"
      >
        <template slot="title">
          <i v-if="item.icon" :class="[iconClass, item.icon]"></i>
          <span slot="title">{{ item.title }}</span>
        </template>
        <up-submenu v-if="item.children" :data="item.children"></up-submenu>
        <el-menu-item-group v-else v-for="(groupItem, groupIndex) in item.groups" :key="groupIndex">
          <template slot="title">
            <i v-if="groupItem.icon" :class="[iconClass, groupItem.icon]"></i>
            <span>{{ groupItem.title }}</span>
          </template>
          <up-submenu :data="groupItem.children"></up-submenu>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item v-else :key="index" v-bind="{ route: { path: item.path }, ...item }">
        <i v-if="item.icon" :class="[iconClass, item.icon]"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
// import { Submenu, MenuItem, MenuItemGroup } from 'element-ui'
import Submenu from 'element-ui/packages/submenu'
import MenuItem from 'element-ui/packages/menu-item'
import MenuItemGroup from 'element-ui/packages/menu-item-group'

export default {
  name: 'UpSubmenu',

  components: {
    [Submenu.name]: Submenu,
    [MenuItemGroup.name]: MenuItemGroup,
    [MenuItem.name]: MenuItem
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    iconClass: {
      type: String,
      default: 'iconfont'
    }
  }
}
</script>

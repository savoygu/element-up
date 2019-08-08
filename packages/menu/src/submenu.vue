<template>
  <div class="up-submenu">
    <template v-for="(item, index) in data">
      <el-submenu
        v-if="(item.children && item.children.length > 0 || item.groups && item.groups.length > 0)"
        :key="index"
        :index="item.index"
        v-bind="{ ...$attrs, ...item }"
      >
        <slot name="title" slot="title" v-bind="{ item, $index: index }">
          <i v-if="item.icon" :class="[item.icon, iconClass]"></i>
          <span>{{ item.title }}</span>
        </slot>
        <up-submenu v-if="item.prev" :data="item.prev"></up-submenu>
        <up-submenu v-if="item.children" :data="item.children"></up-submenu>
        <el-menu-item-group v-else v-for="(groupItem, groupIndex) in item.groups" :key="groupIndex">
          <template slot="title">
            <i v-if="groupItem.icon" :class="[groupItem.icon, iconClass]"></i>
            <span>{{ groupItem.title }}</span>
          </template>
          <up-submenu :data="groupItem.children"></up-submenu>
        </el-menu-item-group>
        <up-submenu v-if="item.next" :data="item.next"></up-submenu>
      </el-submenu>
      <el-menu-item v-else :key="index" v-bind="{ route: { path: item.path }, ...item }">
        <slot name="title" slot="title" v-bind="{ item, $index: index }">
          <i v-if="item.icon" :class="[item.icon, iconClass]"></i>
          <span>{{ item.title }}</span>
        </slot>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
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

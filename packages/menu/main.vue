<template>
  <el-menu ref="elMenu" class="up-menu" v-bind="$attrs" v-on="$listeners">
    <component :is="component" :data="data" v-bind="$attrs" v-on="$listeners"></component>
  </el-menu>
</template>

<script>
import { Menu } from 'element-ui'
import UpSubmenu from './submenu'

export default {
  name: 'UpMenu',

  components: {
    [Menu.name]: Menu,
    UpSubmenu
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    component: {
      type: String,
      default: 'up-submenu'
    }
  },

  methods: {
    open (index) {
      this.$refs.elMenu.open(index)
    },
    close (index) {
      this.$refs.elMenu.close(index)
    }
  }
}
</script>

<style lang="scss">
</style>

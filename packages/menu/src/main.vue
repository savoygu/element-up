<template>
  <el-menu ref="elMenu" class="up-menu" v-bind="$attrs" v-on="$listeners">
    <slot>
      <component :is="component" :data="data" v-bind="$attrs" v-on="$listeners"></component>
    </slot>
  </el-menu>
</template>

<script>
import Menu from 'element-ui/packages/menu'
import UpSubmenu from './submenu.vue'

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

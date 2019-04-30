<template>
  <component :is="component" :class="classes" v-bind="attrs" v-on="listeners">
    <slot>
      <up-button
        v-for="(item, index) in data"
        :key="index"
        v-bind="{ ...$attrs, ...(item.attrs || item) }"
        v-on="{ ...$listeners, ...(item.listeners || {}) }"
      >
        <slot name="item" v-bind="{ item, index }"></slot>
      </up-button>
    </slot>
  </component>
</template>

<script>
import ButtonGroup from 'element-ui/packages/button-group'
import Button from 'element-ui/packages/button'

export default {
  name: 'UpButton',

  components: {
    [Button.name]: Button,
    [ButtonGroup.name]: ButtonGroup
  },

  props: {
    component: {
      type: String,
      default: 'el-button'
    },
    data: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    classes () {
      return this.component === 'el-button' ? 'up-button' : 'up-button-group'
    },
    attrs () {
      return this.component === 'el-button' ? this.$attrs : {}
    },
    listeners () {
      return this.component === 'el-button' ? this.$listeners : {}
    }
  }
}
</script>

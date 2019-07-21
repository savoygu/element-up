<template>
  <component :is="component" :class="classes" v-bind="attrs" v-on="listeners" :type="type" :native-type="nativeType">
    <slot>
      <up-button
        v-for="(item, index) in data"
        :key="index"
        v-bind="{ ...$attrs, ...item, ...item.attrs }"
        v-on="{ ...wrappedListeners($listeners, item, index, data), ...(wrappedListeners(item.listeners, item, index, data) || {}) }"
      >
        <slot name="up:item" v-bind="{ item, $index: index }"></slot>
      </up-button>
    </slot>
  </component>
</template>

<script>
import ButtonGroup from 'element-ui/packages/button-group'
import Button from 'element-ui/packages/button'
import wrappedListeners from 'element-up/src/mixins/wrappedListeners'

export default {
  name: 'UpButton',

  mixins: [
    wrappedListeners
  ],

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
    },
    type: {
      type: String,
      default: 'default'
    },
    nativeType: {
      type: String,
      default: 'button'
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

<template>
  <el-popover v-model="visible" class="up-popover" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template v-if="hasFooter">
      <slot name="footer">
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="onCancel">{{ cancelButtonText }}</el-button>
          <el-button type="primary" size="mini" @click="onOk">{{ confirmButtonText }}</el-button>
        </div>
      </slot>
    </template>
    <template v-if="$slots.reference">
      <slot name="reference" slot="reference"></slot>
    </template>
  </el-popover>
</template>

<script>
// import { Popover, Button } from 'element-ui'
import Popover from 'element-ui/packages/popover'
import Button from 'element-ui/packages/button'
import createVModel from 'element-up/src/mixins/createVModel'

export default {
  name: 'UpPopover',

  mixins: [
    createVModel('visible')
  ],

  components: {
    [Popover.name]: Popover,
    [Button.name]: Button
  },

  props: {
    hasFooter: Boolean,
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    }
  },

  methods: {
    onCancel () {
      this.visible = false
      this.$emit('up:cancel')
    },
    onOk () {
      this.$emit('up:confirm')
    }
  }
}
</script>

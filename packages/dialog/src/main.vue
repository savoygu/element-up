<template>
  <el-dialog class="up-dialog" :visible.sync="visible" v-bind="$attrs" v-on="$listeners">
    <slot slot="title" name="title"></slot>
    <slot></slot>
    <slot slot="footer" name="footer">
      <template v-if="hasFooter">
        <el-button @click="onCancel">{{ cancelButtonText}}</el-button>
        <el-button type="primary" @click="onOk">{{ confirmButtonText }}</el-button>
      </template>
    </slot>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'
import createVModel from '@/mixins/createVModel'

export default {
  name: 'UpDialog',

  mixins: [
    createVModel('visible')
  ],

  components: {
    [Dialog.name]: Dialog
  },

  props: {
    hasFooter: {
      type: Boolean,
      default: true
    },
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
    },
    onOk () {
      this.$emit('up:confirm')
    }
  }
}
</script>

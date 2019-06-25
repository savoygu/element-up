<template>
  <el-dialog class="up-dialog" :visible.sync="visible" v-bind="$attrs" v-on="$listeners">
    <slot slot="title" name="title"></slot>
    <slot></slot>
    <slot slot="footer" name="footer">
      <template v-if="hasFooter">
        <up-button @click="onCancel">{{ cancelButtonText}}</up-button>
        <up-button type="primary" @click="onOk">{{ confirmButtonText }}</up-button>
      </template>
    </slot>
  </el-dialog>
</template>

<script>
import Dialog from 'element-ui/packages/dialog'
import createVModel from 'element-up/src/mixins/createVModel'

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

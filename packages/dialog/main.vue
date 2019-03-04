<template>
  <el-dialog class="up-dialog" :visible.sync="dialogVisible" v-bind="$attrs" v-on="$listeners">
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

export default {
  name: 'UpDialog',

  components: {
    [Dialog.name]: Dialog
  },

  props: {
    value: {},
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

  data () {
    return {
      dialogVisible: this.value
    }
  },

  watch: {
    value (val) {
      this.dialogVisible = val
    },
    dialogVisible (val) {
      this.$emit('input', val)
      this.$emit('change', val)
    }
  },

  methods: {
    onCancel () {
      this.dialogVisible = false
    },
    onOk () {
      this.$emit('up:confirm')
    }
  }
}
</script>

<style lang="scss">
@include b(up-dialog) {
  //body
}
</style>

<template>
  <div>
    <up-dialog title="外层 Dialog" v-model="outVisible" @up:confirm="handleClose">
      <up-dialog title="内层 Dialog" width="30%" v-model="innerVisible" append-to-body></up-dialog>
      <div slot="footer">
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </up-dialog>
    <el-button @click="outVisible = !outVisible">{{ outVisible ? '隐藏' : '展示' }}</el-button>
  </div>
</template>

<script>
import UpDialog from 'packages/dialog/main'

export default {
  name: 'Dialog',

  components: {
    UpDialog
  },

  data () {
    return {
      outVisible: false,
      innerVisible: false
    }
  },

  methods: {
    handleClose () {

    }
  }
}
</script>

<style lang="scss">
</style>

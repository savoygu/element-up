<template>
  <div>
    <up-popover v-model="visible" has-footer @up:confirm="confirm">确定要删除该按钮吗？
      <el-button slot="reference">按钮</el-button>
    </up-popover>
  </div>
</template>

<script>
import UpPopover from 'packages/popover/main'

export default {
  name: 'Popover',

  components: {
    UpPopover
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {
    confirm () {
      console.log('删除成功！')
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
</style>

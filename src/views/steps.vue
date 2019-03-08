<template>
  <div>
    <up-steps
      v-model="value"
      :data="data"
      finish-status="success"
      align-center
      direction="vertical"
      simple
    >
      <template slot="title" slot-scope="props">{{props.index}}</template>
    </up-steps>
    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>

<script>
import UpSteps from 'packages/steps/main'

export default {
  name: 'Step',

  components: {
    UpSteps
  },

  data () {
    return {
      value: 0,
      data: [
        { title: '步骤1', description: '这是一段很长很长很长的描述性文字', icon: 'el-icon-edit' },
        { title: '步骤2', description: '这是一段很长很长很长的描述性文字', icon: 'el-icon-upload' },
        { title: '步骤3', description: '"这段就没那么长了', icon: 'el-icon-picture' }
      ]
    }
  },

  methods: {
    next () {
      if (this.value++ > 2) this.value = 0
    }
  }
}
</script>

<style lang="scss">
</style>

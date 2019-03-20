<template>
  <div>
    <up-progress type="line" striped :reverse="reverse" :percentage="percentage"></up-progress>
    <el-button @click="percentage+=10">增加</el-button>
    <el-button @click="percentage-=10">减少</el-button>
    <el-button @click="reverse =! reverse">反转</el-button>
  </div>
</template>

<script>
import UpProgress from 'packages/progress/main'

export default {
  name: 'Progress',

  components: {
    UpProgress
  },

  data () {
    return {
      percentage: 10,
      reverse: false
    }
  }
}
</script>

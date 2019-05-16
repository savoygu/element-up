<template>
  <div>
    <up-alert type="success">
      <span slot="title">成功提示的文案</span>
    </up-alert>

    <up-component component="el-alert" type="success">
      <span slot="title">成功提示的文案</span>
    </up-component>

    <up-component component="el-link" type="success">成功链接</up-component>

    <up-component component="el-input"></up-component>
    <up-component component="el-input-number"></up-component>
  </div>
</template>

<script>
import UpComponent from 'packages/component'
import UpAlert from 'packages/alert'

export default {
  name: 'Breadcrumb',

  components: {
    UpComponent,
    UpAlert
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped>
</style>

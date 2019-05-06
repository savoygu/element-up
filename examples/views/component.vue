<template>
  <div>
    {{value}}
    <el-input v-model="value">
      <i slot="prefix" class="el-input__icon el-icon-date"></i>
      <i slot="suffix" class="el-input__icon el-icon-date"></i>
    </el-input>
    <up-component component="el-input" v-model="value" type="success">
      <!-- 主要链接 -->
      <template slot="prepend">Http://</template>
      <i slot="prefix" class="el-input__icon el-icon-date"></i>
      <i slot="suffix" class="el-input__icon el-icon-date"></i>
      <template slot="append">.com</template>
    </up-component>
    <up-link type="primary">主要链接</up-link>
  </div>
</template>

<script>
import Input from 'element-ui/packages/input'
import UpComponent from 'packages/component'
import UpLink from 'packages/link'

export default {
  name: 'Component',
  components: {
    UpComponent,
    UpLink,
    [Input.name]: Input
  },
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <up-breadcrumb :data="data"></up-breadcrumb>
  </div>
</template>

<script>
import UpBreadcrumb from 'packages/breadcrumb'

export default {
  name: 'Breadcrumb',

  components: {
    UpBreadcrumb
  },

  data () {
    return {
      data: [
        { name: '首页', to: { path: '/' } },
        { name: '活动管理', to: { path: '/' } },
        { name: '活动列表', to: { path: '/' } },
        { name: '活动详情' }
      ]
    }
  }
}
</script>

<style scoped>
</style>

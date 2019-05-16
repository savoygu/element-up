<template>
  <div>
    <up-alert type="success">
      <span slot="title">成功提示的文案</span>
    </up-alert>
  </div>
</template>

<script>
import UpAlert from 'packages/alert'

export default {
  name: 'Breadcrumb',

  components: {
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

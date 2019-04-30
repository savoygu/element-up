<template>
  <div>
    <up-button component="el-button-group" :data="data">
      <template slot="item" slot-scope="{ item, index }">
        哇哦 {{index}} <i v-if="item.rightIcon" :class="['el-icon--right', item.rightIcon]"></i>
      </template>
    </up-button>
  </div>
</template>

<script>
import UpButton from 'packages/button'

export default {
  name: 'Button',

  components: {
    UpButton
  },

  data () {
    return {
      data: [
        { type: 'primary', icon: 'el-icon-edit' },
        { type: 'warning', rightIcon: 'el-icon-delete' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

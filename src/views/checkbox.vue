<template>
  <div>
    {{fruit}}
    <up-checkbox
      border
      v-model="fruit"
      :data="data"
      :max="2"
      :key-value="['key', 'value']"
      @change="handleUpCheckboxChnage"
      @up:checkbox-group:change="handleCheckboxGroupChange"
      @up:checkbox:change="handleCheckboxChnage"
    ></up-checkbox>
  </div>
</template>

<script>
import UpCheckbox from 'packages/checkbox/main'

export default {
  name: 'Checkbox',

  components: {
    UpCheckbox
  },

  data () {
    return {
      fruit: [],
      data: [
        { key: '🍌', value: 1, size: 'medium' },
        { key: '🍎', value: 2, size: 'small' },
        { key: '🍊', value: 3, size: 'mini' }
      ]
    }
  },

  methods: {
    handleCheckboxGroupChange (value) {
      console.log('handleCheckboxGroupChange changed: ', value)
    },
    handleCheckboxChnage (value) {
      console.log('handleCheckboxChnage changed: ', value)
    },
    handleUpCheckboxChnage (value) {
      console.log('handleUpCheckboxChnage changed: ', value)
    }
  }
}
</script>

<style lang="scss">
</style>

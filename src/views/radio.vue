<template>
  <div>
    {{fruit}}
    <up-radio
      border
      v-model="fruit"
      :data="data"
      :key-value="['key', 'value']"
      @change="handleUpRadioChange"
      @up:radio-group:change="handleRadioGroupChange"
      @up:radio:change="handleRadioChange"
    ></up-radio>
  </div>
</template>

<script>
import UpRadio from 'packages/radio/main'

export default {
  name: 'Radio',

  components: {
    UpRadio
  },

  data () {
    return {
      fruit: 1,
      data: [
        { key: '🍌', value: 1, size: 'medium' },
        { key: '🍎', value: 2, size: 'small' },
        { key: '🍊', value: 3, size: 'mini' }
      ]
    }
  },

  methods: {
    handleRadioGroupChange (value) {
      console.log('handleRadioGroupChange changed: ', value)
    },
    handleRadioChange (value) {
      console.log('handleRadioChange changed: ', value)
    },
    handleUpRadioChange (value) {
      console.log('handleUpRadioChange changed: ', value)
    }
  }
}
</script>

<style lang="scss">
</style>

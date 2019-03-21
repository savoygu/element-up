<template>
  <div>
    <FormItemInput></FormItemInput>
  </div>
</template>

<script>
import FormItemInput from '@/views/form/input'

export default {
  name: 'app',

  components: {
    FormItemInput
  },

  created () {
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  color: white;
  margin-top: 60px;
  background-color: darkcyan;
}
</style>

<template>
  <div>
    <UpComponent>你好啊</UpComponent>
  </div>
</template>

<script>
import UpComponent from 'examples/views/component'

export default {
  name: 'app',

  components: {
    UpComponent
  },

  created () {
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  color: white;
  margin-top: 60px;
  background-color: darkcyan;
}
</style>

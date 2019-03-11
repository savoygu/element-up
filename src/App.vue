<template>
  <div id="app">
    <img src="./assets/logo.png">
    <popover></popover>
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Popover from '@/views/popover'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',

  components: {
    HelloWorld,
    Popover
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  /* color: #2c3e50; */
  color: white;
  margin-top: 60px;
  background-color: darkcyan;
}
</style>

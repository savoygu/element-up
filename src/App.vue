<template>
  <div id="app">
    <img src="./assets/logo.png">
    <timeline></timeline>
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
import Timeline from '@/views/timeline'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',

  components: {
    HelloWorld,
    Timeline
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

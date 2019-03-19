<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Menu></Menu>
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
import Msg from 'packages/message/main'
import Menu from '@/views/menu'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',

  components: {
    HelloWorld,
    Menu
  },

  created () {
    console.log(Msg.error.msgbox({

    }))
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

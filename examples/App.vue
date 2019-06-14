<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header></main-header>
    <div class="main-cnt element-up-cnt">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
export default {
  name: 'app',

  computed: {
    lang () {
      return this.$route.path.split('/')[1] || 'zh-CN'
    },

    isComponent () {
      return /^component-/.test(this.$route.name || '')
    }
  }
}
</script>

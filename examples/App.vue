<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <!-- <region-picker></region-picker> -->
    <main-header></main-header>
    <div class="main-cnt element-up-cnt">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
// import RegionPicker from './views/region-picker'

export default {
  name: 'app',

  components: {
    // RegionPicker
  },

  computed: {
    lang () {
      return this.$route.path.split('/')[1] || 'zh-CN'
    },

    isComponent () {
      return /^component-/.test(this.$route.name || '')
    }
  },

  created () {
  }
}
</script>

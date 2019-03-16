<template>
  <div style="width: 200px;">
    <up-menu ref="upMenu" :data="data"></up-menu>
    <el-button @click="switchMenu">点击</el-button>
  </div>
</template>

<script>
import UpMenu from 'packages/menu/main'

export default {
  name: 'Menu',

  components: {
    UpMenu
  },

  data () {
    return {
      data: [
        {
          title: '导航一',
          icon: 'el-icon-location',
          index: '1',
          path: '/',
          disabled: false,
          children: [
            {
              title: '选项1',
              index: '1-1',
              path: '/',
              disabled: false,
              children: [
                {
                  title: '选项3',
                  path: '/',
                  disabled: false
                },
                {
                  title: '选项4',
                  path: '/',
                  disabled: false
                }
              ]
            },
            {
              title: '选项2',
              index: '1-2',
              path: '/',
              disabled: false,
              children: [
                {
                  title: '选项5',
                  path: '/',
                  disabled: false
                },
                {
                  title: '选项6',
                  path: '/',
                  disabled: false
                }
              ]
            }
          ]
        },
        {
          title: '导航二',
          icon: 'el-icon-menu',
          index: '2',
          path: '/',
          disabled: false,
          groups: [
            {
              title: '分组一',
              icon: 'el-icon-location',
              children: [
                { title: '选项1', path: '/', disabled: false },
                { title: '选项2', path: '/', disabled: false }
              ]
            },
            {
              title: '分组二',
              icon: 'el-icon-document',
              children: [
                { title: '选项3', path: '/', disabled: false },
                { title: '选项4', path: '/', disabled: false }
              ]
            }
          ]
        },
        {
          title: '导航三',
          icon: 'el-icon-document',
          index: '3',
          path: '/',
          disabled: false
        },
        {
          title: '导航四',
          icon: 'el-icon-setting',
          index: '4',
          path: '/',
          disabled: false
        }
      ]
    }
  },

  methods: {
    switchMenu () {
      this.$refs.upMenu.open('1')
    }
  }
}
</script>

<style scoped>
</style>

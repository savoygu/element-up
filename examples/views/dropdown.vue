<template>
  <div>
    <up-dropdown
      :data="data"
      type="primary"
      split-button
      placement="right"
      @click="handleClick"
      @visible-change="handleVisibleChange"
      @command="handleCommand"
    >
      默认尺寸
      <template slot="up:item" slot-scope="{ item }">{{ item }}</template>
    </up-dropdown>
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from 'element-ui'
import UpDropdown from 'packages/dropdown'
export default {
  name: 'Dropdown',

  components: {
    UpDropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem
  },

  data () {
    return {
      data: [
        '黄金糕',
        '狮子头',
        '螺蛳粉',
        '双皮奶',
        '蚵仔煎'
        // { name: '黄金糕', command: 'a', disabled: false, divided: false },
        // { name: '狮子头', command: 'b', disabled: false, divided: false },
        // { name: '螺蛳粉', command: 'c', disabled: false, divided: false },
        // { name: '双皮奶', command: 'd', disabled: true, divided: false },
        // { name: '蚵仔煎', command: 'e', disabled: false, divided: true }
      ]
    }
  },

  methods: {
    handleClick () {
      console.log('lala')
    },
    handleVisibleChange (...args) {
      console.log(args)
    },
    handleCommand (...args) {
      console.log(args)
    }
  }
}
</script>

<style scoped>
</style>

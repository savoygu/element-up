<template>
  <div
    class="element-up-sidenav side-nav"
    :class="{ 'is-fade': isFade }"
    :style="navStyle"
    @mouseenter="isFade = false"
  >
    <ul class="element-up-sidenav__list">
      <li class="element-up-sidenav__item nav-item" v-for="(item, key) in data" :key="key">
        <a v-if="!item.path && !item.href" @click="expandMenu">{{ item.name }}</a>
        <a v-if="item.href" :href="item.href" target="_blank">{{ item.name }}</a>
        <router-link
          v-if="item.path"
          active-class="active"
          :to="base + item.path"
          exact
          v-text="item.title || item.name"
        ></router-link>
        <ul class="pure-menu-list element-up-sidenav__sub-list" v-if="item.children">
          <li class="element-up-sidenav__item nav-item" v-for="(subItem, key) in item.children" :key="key">
            <router-link active-class="active" :to="base + subItem.path" exact v-text="subItem.title || subItem.name"></router-link>
          </li>
        </ul>
        <template v-if="item.groups">
          <div class="element-up-sidenav__group" v-for="(group, key) in item.groups" :key="key">
            <div class="element-up-sidenav__group-title" @click="expandMenu">{{ group.groupName }}</div>
            <ul class="pure-menu-list element-up-sidenav__sub-list">
              <li
                class="element-up-sidenav__item nav-item"
                v-for="(subItem, key) in group.list"
                v-show="!subItem.disabled"
                :key="key"
              >
                <router-link active-class="active" :to="base + subItem.path" exact v-text="subItem.title"></router-link>
              </li>
            </ul>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import bus from '../bus'

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    base: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isSmallScreen: false,
      isFade: false
    }
  },
  computed: {
    navStyle () {
      const style = {}
      if (this.isSmallScreen) {
        style.paddingBottom = '60px'
      }
      style.opacity = this.isFade ? '0.5' : '1'
      return this.style
    },
    lang () {
      return this.$route.meta.lang
    }
  },
  methods: {
    handleResize () {
      this.isSmallScreen = document.documentElement.clientWidth < 768
      this.handlePathChange()
    },
    handlePathChange () {
      if (!this.isSmallScreen) {
        this.expandAllMenu()
        return
      }
      this.$nextTick(() => {
        this.hideAllMenu()
        let activeAnchor = this.$el.querySelector('a.active')
        let ul = activeAnchor.parentNode
        while (ul.tagName !== 'UL') {
          ul = ul.parentNode
        }
        ul.style.height = 'auto'
      })
    },
    hideAllMenu () {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = '0'
      })
    },
    expandAllMenu () {
      [].forEach.call(this.$el.querySelectorAll('.pure-menu-list'), ul => {
        ul.style.height = 'auto'
      })
    },
    expandMenu (event) {
      if (!this.isSmallScreen) return
      let target = event.currentTarget
      if (!target.nextElementSibling || target.nextElementSibling.tagName !== 'UL') return
      this.hideAllMenu()
      event.currentTarget.nextElementSibling.style.height = 'auto'
    }
  },
  created () {
    bus.$on('fadeNav', () => {
      this.isFade = true
    })
  },
  mounted () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss">
@include b(element-up-sidenav) {
  width: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  transition: opacity 0.3s;

  @include is(fade) {
    transition: opacity 3s;
  }

  li {
    list-style: none;
  }

  ul {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  > ul > .nav-item > a {
    margin-top: 15px;
  }

  > ul > .nav-item:nth-child(-n + 4) > a {
    margin-top: 0;
  }

  @include e(item) {
    a {
      font-size: 16px;
      color: #333;
      line-height: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      text-decoration: none;
      display: block;
      position: relative;
      transition: 0.15s ease-out;
      font-weight: bold;

      &.active {
        color: #409eff;
      }
    }

    .nav-item {
      a {
        display: block;
        height: 40px;
        color: #444;
        line-height: 40px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: normal;

        &:hover,
        &.active {
          color: #409eff;
        }
      }
    }
  }

  @include e(group-title) {
    font-size: 12px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
  }
}
</style>

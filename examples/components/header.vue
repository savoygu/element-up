<template>
  <div class="headerWrapper element-up-header__outer">
    <header class="element-up-header">
      <div class="container element-up-header__inner">
        <h1>ELEMENT UP</h1>
        <ul class="element-up-header__nav">
          <li class="element-up-header__nav-item">
            <router-link active-class="active" :to="`/${lang}/component`">组件</router-link>
          </li>
          <li class="element-up-header__nav-item">
            <div class="element-up-header__nav-gap"></div>
          </li>
          <li class="element-up-header__nav-item element-up-header__nav-versions">
            <div class="element-up-header__nav-dropdown">
              <span>{{ version }}</span>
            </div>
          </li>
          <li class="element-up-header__nav-item element-up-header__nav-lang">
            <div class="element-up-header__nav-dropdown">
              <span>{{ langs[lang] }}</span>
            </div>
          </li>
          <li class="element-up-header__nav-item">
            <div class="element-up-header__nav-gap"></div>
          </li>
          <li class="element-up-header__nav-item element-up-header__nav-github">
            <a href="https://github.com/savoygu/element-up" target="_blank">Github</a>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
import Element from 'main/index.js'

const { version } = Element

export default {
  data () {
    return {
      version,
      langs: {
        'zh-CN': '中文',
        'en-US': 'English',
        'es': 'Español',
        'fr-FR': 'Français'
      }
    }
  },
  computed: {
    lang () {
      return this.$route.path.split('/')[1] || 'zh-CN'
    }
  }
}
</script>

<style lang="scss">
@include b(element-up-header) {
  height: 80px;
  background-color: #fff;
  color: #fff;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 80px;
  z-index: 100;
  position: relative;

  @include e(outer) {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1500;
  }

  @include e(inner) {
    height: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdfe6;
  }

  h1 {
    margin: 0;
    float: left;
    font-size: 32px;
    font-weight: 400;
    color: #409eff;
  }

  @include e(nav) {
    float: right;
    height: 100%;
    line-height: 80px;
    background: transparent;
    padding: 0;
    margin: 0;
  }

  @include e(nav-item) {
    margin: 0;
    float: left;
    list-style: none;
    position: relative;
    cursor: pointer;

    a {
      text-decoration: none;
      color: #1989fa;
      opacity: 0.5;
      display: block;
      padding: 0 22px;

      &:hover {
        opacity: 1;
      }
    }
  }

  @include e(nav-gap) {
    position: relative;
    width: 1px;
    height: 80px;
    padding: 0 20px;

    &::before {
      content: '';
      position: absolute;
      top: calc(50% - 8px);
      width: 1px;
      height: 16px;
      background: #ebebeb;
    }
  }

  @include e(nav-dropdown) {
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
    margin-bottom: 6px;
    padding-left: 18px;
    width: 100%;
  }

  @include e(('nav-versions', 'nav-lang')) {
    span {
      display: block;
      width: 100%;
      font-size: 16px;
      color: #888;
      line-height: 40px;
      transition: 0.2s;
      padding-bottom: 6px;
      user-select: none;
    }
  }

  @include e(nav-lang) {
    margin-left: 34px;
  }
}
</style>

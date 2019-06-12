<style lang="scss">
@include b(element-up-component) {
  @include e(scroll) {
    height: calc(100% - 80px);
    margin-top: 80px;

    > .el-scrollbar__wrap {
      overflow-x: auto;
    }
  }

  @include e(page) {
    box-sizing: border-box;
    height: 100%;

    &.page-container {
      padding: 0;
    }
  }

  @include e(nav) {
    width: 240px;
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 80px;
    transition: padding-top .3s;

    > .el-scrollbar__wrap {
      height: 100%;
      overflow-x: auto;
    }

    &.is-extended {
      padding-top: 0;
    }
  }

  .side-nav {
    height: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 0;

    & > ul {
      padding-bottom: 50px;
    }
  }

  @include e(content) {
    padding-left: 270px;
    padding-bottom: 100px;
    box-sizing: border-box;
  }

  .content {
    padding-top: 50px;

    > {
      h3 {
        margin: 55px 0 20px;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        margin-bottom: 45px;
        line-height: 1.5em;

        strong {
          font-weight: normal;
        }

        td, th {
          border-bottom: 1px solid #dcdfe6;
          padding: 15px;
          max-width: 250px;
        }

        th {
          text-align: left;
          white-space: nowrap;
          color: #909399;
          font-weight: normal;
        }

        td {
          color: #606266;
        }

        th:first-child, td:first-child {
          padding-left: 10px;
        }
      }

      ul:not(.timeline) {
        margin: 10px 0;
        padding: 0 0 0 20px;
        font-size: 14px;
        color: #5e6d82;
        line-height: 2em;
      }
    }
  }
}
</style>

<template>
  <up-component component="el-scrollbar" class="element-up-component element-up-component__scroll">
    <div class="page-container element-up-component__page">
      <up-component component="el-scrollbar" class="element-up-component__nav">
        <side-nav :data="navsData[lang]" :base="`/${lang}/component`"></side-nav>
      </up-component>
      <div class="element-up-component__content">
        <router-view class="content"></router-view>
        <footer-nav></footer-nav>
      </div>
    </div>
  </up-component>
</template>

<script>
import navsData from '../../nav.config.json'

export default {
  data () {
    return {
      lang: this.$route.meta.lang,
      navsData
    }
  }
}
</script>

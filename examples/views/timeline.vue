<template>
  <div>
    <up-timeline :data="data">
      <template slot="dot">
        <span style="display: inline-block; width: 10px; height: 10px; background-color: red;"></span>
      </template>
    </up-timeline>
  </div>
</template>

<script>
import { Card } from 'element-ui'
import UpTimeline from 'packages/timeline'

export default {
  name: 'Timeline',

  components: {
    UpTimeline,
    [Card.name]: Card
  },

  data () {
    return {
      data: [{
        content: '支持使用图标',
        time: '2018-04-12 20:46',
        timestamp: '2018-04-12',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-more'
      }, {
        content: '支持自定义颜色',
        time: '2018-04-12 20:46',
        timestamp: '2018-04-03',
        color: '#0bbd87'
      }, {
        content: '支持自定义尺寸',
        time: '2018-04-12 20:46',
        timestamp: '2018-04-03',
        size: 'large'
      }, {
        content: '默认样式的节点',
        time: '2018-04-12 20:46',
        timestamp: '2018-04-03'
      }]
    }
  }
}
</script>

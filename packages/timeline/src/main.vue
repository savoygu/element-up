<template>
  <el-timeline class="up-timeline" :reverse="reverse">
    <el-timeline-item v-bind="{ ...$attrs, ...item }" v-for="(item, index) in data" :key="index">
      <slot v-bind="item">{{item.content}}</slot>
      <template slot="dot" v-if="$slots.dot">
        <slot name="dot"></slot>
      </template>
    </el-timeline-item>
  </el-timeline>
</template>

<script>
import { Timeline, TimelineItem } from 'element-ui'

export default {
  name: 'UpTimeline',

  components: {
    [Timeline.name]: Timeline,
    [TimelineItem.name]: TimelineItem
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    reverse: Boolean
  }
}
</script>

<template>
  <div>
    {{value}}
    <up-collapse-with-render v-model="value" :data="data">
      <template slot="title" slot-scope="{ title1 }">
        <div v-if="title1">{{title1}}</div>
        <div v-else>你好，世界！</div>
      </template>
      <div>HELLO WORLD</div>
    </up-collapse-with-render>

    <up-collapse v-model="value" :data="data">
      <template slot="title" slot-scope="{ title }">
        <div>{{title}}</div>
      </template>
      <template slot-scope="{index}">
        <div>{{index}}</div>
      </template>
    </up-collapse>
  </div>
</template>

<script>
import UpCollapseWithRender from 'packages/collapse/src/main-with-render'
import UpCollapse from 'packages/collapse'

export default {
  name: 'Collapse',

  components: {
    UpCollapseWithRender,
    UpCollapse
  },

  data () {
    return {
      value: '1',
      data: [
        { title1: '一致性 Consistency', name: '1', description: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；' },
        { title1: '反馈 Feedback', name: '2', description: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；' },
        { title1: '效率 Efficiency', name: '3', description: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；' },
        { title1: '可控 Controllability', name: '4', description: '与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；' }
      ]
    }
  }
}
</script>

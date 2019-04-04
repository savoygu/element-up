<template>
  <el-steps v-bind="$attrs" :active="active">
    <el-step v-bind="{ ...$attrs, ...item }" v-for="(item, index) in data" :key="index">
      <template v-for="slot in slots">
        <template v-if="$slots[slot] || $scopedSlots[slot]" :slot="slot">
          <slot v-if="$slots[slot]" :name="slot"></slot>
          <slot v-else :name="slot" v-bind="{ item, index }"></slot>
        </template>
      </template>
    </el-step>
  </el-steps>
</template>

<script>
import { Steps, Step } from 'element-ui'
import createVModel from 'element-up/src/mixins/createVModel'

export default {
  name: 'UpSteps',

  mixins: [
    createVModel('active')
  ],

  components: {
    [Steps.name]: Steps,
    [Step.name]: Step
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      slots: ['icon', 'title', 'description']
    }
  }
}
</script>

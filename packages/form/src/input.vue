<template>
  <el-form-item class="up-form-item-input" ref="elFormItem" v-bind="$attrs" v-on="$listeners">
    <template slot="label" v-if="$slots.label">
      <slot name="label">{{$attrs.label}}</slot>
    </template>
    <slot>
      <el-input ref="elInput" v-model="currentValue" v-bind="$attrs" v-on="$listeners">
        <template v-for="slot in inputSlots">
          <template :slot="slot" v-if="$slots[`up:input:${slot}`]">
            <slot :name="`up:input:${slot}`"></slot>
          </template>
        </template>
      </el-input>
    </slot>
    <template slot="error" slot-scope="props" v-if="$scopedSlots.error">
      <slot name="error" v-bind="props"></slot>
    </template>
  </el-form-item>
</template>

<script>
import { Input } from 'element-ui'
import createVModel from '@/mixins/createVModel'
import FormItemBase from './FormItemBase'

export default {
  name: 'UpFormItemInput',

  components: {
    [Input.name]: Input
  },

  mixins: [createVModel('currentValue'), FormItemBase],

  data () {
    return {
      inputSlots: ['prefix', 'suffix', 'prepend', 'append']
    }
  },

  methods: {
    focus () {
      this.$refs.elInput.focus()
    },
    blur () {
      this.$refs.elInput.blur()
    },
    select () {
      this.$refs.elInput.select()
    }
  }
}
</script>

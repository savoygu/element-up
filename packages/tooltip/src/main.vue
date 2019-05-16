<template>
  <el-tooltip v-bind="$attrs" v-on="$listeners">
    <slot></slot>
    <template v-if="$slots.content" slot="content">
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>

<script>
import Tooltip from 'element-ui/packages/tooltip'
import Component from 'element-up/packages/component'

export default {
  // functional: true,

  name: 'UpTooltip',

  components: {
    [Tooltip.name]: Tooltip,
    [Component.name]: Component
  }

  // render (h) {
  //   const { $attrs, $slots, $listeners } = this
  //   console.log($attrs, $slots)

  //   return (
  //     <up-component class="up-alert" component={Tooltip} {...{ attrs: $attrs, on: $listeners }}>
  //       {$slots.default}
  //       {
  //         $slots.content && (
  //           <template slot="content">
  //             {$slots.content}
  //           </template>
  //         )
  //       }
  //     </up-component>
  //   )
  // }
}
</script>

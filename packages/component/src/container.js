export default function RewroteContainer (Container) {
  return {
    ...Container,
    computed: { // 重写 isVertical
      isVertical () {
        if (this.direction === 'vertical') {
          return true
        } else if (this.direction === 'horizontal') {
          return false
        }
        return this.$slots && this.$slots.default
          ? this.$slots.default.some(vnode => {
            if (vnode.componentOptions) {
              const { tag, propsData } = vnode.componentOptions
              const name = propsData.component || propsData.c
              return tag === 'el-header' || tag === 'el-footer' || (tag === 'up-component' && (name === 'el-header' || name === 'el-footer'))
            }
            return false
          })
          : false
      }
    }
  }
}

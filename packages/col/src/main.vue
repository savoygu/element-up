<script>
import Col from 'element-ui/packages/col'

export default {
  ...Col,

  name: 'UpCol',

  props: {
    ...Col.props,
    order: Number,
    className: String
  },

  render (h) {
    let classList = []
    let style = {}

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }

    ;['span', 'offset', 'pull', 'push', 'order'].forEach(prop => {
      if (this[prop]) {
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        )
      }
    })

    let addProps = []
      ;['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`)

        addProps.length && addProps.forEach(prop => {
          classList.push(`el-col-${size}-${prop}-0`)
        })
      } else if (typeof this[size] === 'object') {
        let props = this[size]
        let keys = Object.keys(props)
        keys.forEach(prop => {
          if (
            ['offset', 'pull', 'push', 'order'].indexOf(prop) > -1 &&
              addProps.indexOf(prop) === -1
          ) {
            addProps.push(prop)
          }
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          )
        })
        addProps = addProps.filter(prop => {
          if (keys.indexOf(prop) === -1) {
            classList.push(`el-col-${size}-${prop}-0`)
          }
          return keys.indexOf(prop) > -1
        })
      }
    })

    return h(this.tag, {
      class: ['up-col', 'el-col', classList, this.className],
      style
    }, this.$slots.default)
  }
}
</script>

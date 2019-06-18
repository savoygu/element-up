<script>
import Row from 'element-ui/packages/row'

export default {
  ...Row,

  name: 'UpRow',

  props: {
    ...Row.props,
    direction: {
      type: String,
      default: 'row'
    },
    wrap: {
      type: String,
      default: 'nowrap'
    },
    content: {
      type: String,
      default: 'start'
    },
    className: String
  },

  render (h) {
    return (
      <this.tag class={
        [
          'up-row',
          'el-row',
          this.content !== 'start' ? `is-content-${this.content}` : '',
          this.direction !== 'row' ? `is-direction-${this.direction}` : '',
          this.wrap !== 'nowrap' ? `is-wrap-${this.wrap}` : '',
          this.justify !== 'start' ? `is-justify-${this.justify}` : '',
          this.align !== 'top' ? `is-align-${this.align}` : '',
          { 'el-row--flex': this.type === 'flex' },
          this.className
        ]
      } style={this.style}>
        {this.$slots.default}
      </this.tag>
    )
  }
}
</script>

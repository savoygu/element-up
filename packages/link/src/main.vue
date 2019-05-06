<script>
import Link from 'element-ui/packages/link'
import Component from 'element-up/packages/component'

export default {
  functional: true,

  name: 'UpLink',

  components: {
    [Link.name]: Link,
    [Component.name]: Component
  },

  render (h, { data, listeners, slots }) {
    return (
      <up-component component="el-link" {...{ attrs: data.attrs, on: listeners }}>
        {slots().default}
      </up-component>
    )
  }
}
</script>

<script>
import Alert from 'element-ui/packages/alert'
import Component from 'element-up/packages/component'

export default {
  functional: true,

  name: 'UpAlert',

  components: {
    [Alert.name]: Alert,
    [Component.name]: Component
  },

  render (h, { data, listeners, slots }) {
    return (
      <up-component class="up-alert" component={Alert} {...{ attrs: data.attrs, on: listeners }}>
        {slots().default}
        {
          slots().title && (
            <template slot="title">
              {slots().title}
            </template>
          )
        }
      </up-component>
    )
  }
}
</script>

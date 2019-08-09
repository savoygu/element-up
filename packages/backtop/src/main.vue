<script>
import Icon from 'element-ui/packages/icon'
import Backtop from 'element-ui/packages/backtop'

export default {
  ...Backtop,
  components: {
    ...Backtop.components,
    [Icon.name]: Icon
  },
  name: 'UpBacktop'
}
</script>

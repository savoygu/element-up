<script>
import Progress from 'element-ui/packages/progress'
import { addClass, removeClass } from 'element-ui/src/utils/dom'

export default {
  name: 'UpProgress',

  extends: Progress,

  props: {
    reverse: Boolean,
    striped: Boolean
  },

  computed: {
    trackPath () {
      const radius = parseInt(
        50 - parseFloat(this.relativeStrokeWidth) / 2,
        10
      )
      const reverse = this.reverse ? 0 : 1
      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 ${reverse} 0 ${radius *
        2} a ${radius} ${radius} 0 1 ${reverse} 0 -${radius * 2}`
    }
  },

  watch: {
    striped (value) {
      if (this.type !== 'line') return

      const inner = this.$el.querySelector('.el-progress-bar__inner')
      if (value) {
        addClass(inner, 'up-progress-bar__striped')
      } else {
        removeClass(inner, 'up-progress-bar__striped')
      }
    }
  },

  mounted () {
    if (this.type === 'line' && this.striped) {
      const inner = this.$el.querySelector('.el-progress-bar__inner')
      addClass(inner, 'up-progress-bar__striped')
    }
  }
}
</script>

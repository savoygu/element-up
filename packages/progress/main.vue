<script>
import { Progress } from 'element-ui'
import { addClass } from 'element-ui/lib/utils/dom'

export default {
  name: 'UpProgress',

  extends: Progress,

  props: {
    reverse: Boolean,
    striped: Boolean
  },

  computed: {
    trackPath () {
      const radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10)
      const reverse = this.reverse ? 0 : 1
      return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 ${reverse} 0 ${radius * 2} a ${radius} ${radius} 0 1 ${reverse} 0 -${radius * 2}`
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

<style lang="scss">
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }

  to {
    background-position: 0 0;
  }
}

@include b(up-progress-bar) {
  @include e(striped) {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: progress-bar-stripes 2s linear infinite;
  }
}
</style>

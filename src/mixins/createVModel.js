export default function createVModel (propName) {
  return {
    props: {
      value: {}
    },
    data () {
      return {
        [propName]: this.value
      }
    },
    watch: {
      value (val) {
        this[propName] = val
      },
      [propName] (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
}

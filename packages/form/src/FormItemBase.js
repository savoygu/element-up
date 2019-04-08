import FormItem from 'element-ui/packages/form-item'

export default {
  components: {
    [FormItem.name]: FormItem
  },

  methods: {
    resetField () {
      this.$refs.elFormItem.resetField()
    },

    clearValidate () {
      this.$refs.elFormItem.clearValidate()
    }
  }
}

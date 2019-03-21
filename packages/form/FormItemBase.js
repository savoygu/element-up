import { FormItem } from 'element-ui'

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

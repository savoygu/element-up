<template>
  <div>
    <el-form
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
      style="width: 800px;margin: 0 auto;"
      label-width="100px"
      label-position="left"
    >
      <up-form-item-input label="活动名称" prop="name" v-model="ruleForm.name" ref="name"></up-form-item-input>
      <up-form-item-select label="活动区域" prop="name" v-model="ruleForm.region" :data="regions"></up-form-item-select>
      <up-form-item-checkbox label="喜欢的城市" prop="cities" v-model="ruleForm.cities" :data="cities"></up-form-item-checkbox>
      <el-button @click="submitForm('ruleForm')">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { Input, Form, FormItem, Select, Option, Checkbox, CheckboxGroup } from 'element-ui'
import UpFormItemInput from 'packages/form/input'
import UpFormItemSelect from 'packages/form/select'
import UpFormItemCheckbox from 'packages/form/checkbox'

export default {
  name: 'Form',

  components: {
    [Input.name]: Input,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    UpFormItemInput,
    UpFormItemSelect,
    UpFormItemCheckbox
  },

  data () {
    return {
      checkList: [],
      ruleForm: {
        name: '',
        region: '',
        cities: []
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [],
        cities: []
      },
      regions: [
        { name: '区域一', value: 'shanghai' },
        { name: '区域二', value: 'beijing' }
      ],
      cities: [
        { name: '美食/餐厅线上活动', value: '美食/餐厅线上活动' },
        { name: '地推活动', value: '地推活动' },
        { name: '线下主题活动', value: '线下主题活动' },
        { name: '单纯品牌曝光', value: '单纯品牌曝光' }
      ]
    }
  },

  created () {
    setTimeout(_ => {
      this.ruleForm.cities = ['美食/餐厅线上活动', '单纯品牌曝光']
    }, 3000)
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => { })
    },
    handleGroupChange (val) {
      console.log('handleGroupChange: ', val)
    },
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">
.el-select .el-input {
  width: 130px;
}
</style>

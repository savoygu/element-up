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
      <up-form-item-select label="活动区域" prop="region" v-model="ruleForm.region" :data="regions"></up-form-item-select>
      <up-form-item-checkbox label="喜欢的城市" prop="cities" v-model="ruleForm.cities" :data="cities"></up-form-item-checkbox>
      <up-form-item-radio
        label="水果😯"
        prop="wish"
        v-model="ruleForm.wish"
        :key-value="['key', 'value']"
        :data="wishes"
        @change="handleUpFormItemRadioChange"
      ></up-form-item-radio>
      <el-button @click="submitForm('ruleForm')">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { Input, Form, FormItem, Select, Option, Checkbox, CheckboxGroup } from 'element-ui'
import UpFormItemInput from 'packages/form/input'
import UpFormItemSelect from 'packages/form/select'
import UpFormItemCheckbox from 'packages/form/checkbox'
import UpFormItemRadio from 'packages/form/radio'

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
    UpFormItemCheckbox,
    UpFormItemRadio
  },

  data () {
    return {
      checkList: [],
      ruleForm: {
        name: '',
        region: '',
        cities: [],
        wish: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        cities: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        wish: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
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
      ],
      wishes: [
        { key: '🍌', value: 1, size: 'medium' },
        { key: '🍎', value: 2, size: 'small' },
        { key: '🍊', value: 3, size: 'mini' }
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
    },
    handleUpFormItemRadioChange (value) {
      console.log('handleUpFormItemRadioChange: ', value)
    }
  }
}
</script>

<style lang="scss">
.el-select .el-input {
  width: 130px;
}
</style>

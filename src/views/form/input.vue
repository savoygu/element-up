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
      <up-form-item-select label="活动名称" prop="name" v-model="ruleForm.name" :data="data">
        <!-- <span
          slot="up:select:template"
          slot-scope="{ item, index }"
        >{{ item.name }} = {{item.value}}</span>-->
        <template slot="up:select">
          <el-option
            v-for="item in data"
            :key="item.value"
            :label="`${item.name}???`"
            :value="item.value"
          ></el-option>
        </template>
      </up-form-item-select>
      <!--
      <up-form-item-input label="活动名称" prop="name" v-model="ruleForm.name" ref="name">
        <span slot="label">活动名称</span>
        <span slot="up:input:prefix">你好？？？</span>
        <span slot="up:input:suffix">!</span>
        <up-select slot="up:input:prepend" v-model="value" :data="data"></up-select>
        <span slot="up:input:append">!</span>
      </up-form-item-input>
      -->
      <el-button @click="submitForm('ruleForm')">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { Input, Form, FormItem, Select, Option } from 'element-ui'
import UpFormItemSelect from 'packages/form/select'
// import UpSelect from 'packages/select/main'

export default {
  name: 'FormItemInput',

  components: {
    [Input.name]: Input,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    UpFormItemSelect
    // UpSelect
  },

  data () {
    return {
      data: [
        { name: 'aa', value: 'aa' },
        { name: 'bb', value: 'bb' }
      ],
      value: '',
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => { })
    }
  }
}
</script>

<style lang="scss">
.el-select .el-input {
  width: 130px;
}
</style>

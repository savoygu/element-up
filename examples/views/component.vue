<template>
  <div>
    {{value}}
    <el-input v-model="value">
      <i slot="prefix" class="el-input__icon el-icon-date"></i>
      <i slot="suffix" class="el-input__icon el-icon-date"></i>
    </el-input>
    <up-component component="el-input" v-model="value" type="success">
      <!-- 主要链接 -->
      <template slot="prepend">Http://</template>
      <i slot="prefix" class="el-input__icon el-icon-date"></i>
      <i slot="suffix" class="el-input__icon el-icon-date"></i>
      <template slot="append">.com</template>
    </up-component>
    <up-link type="primary">主要链接</up-link>

    <up-component component="el-alert" type="success">
      <span slot="title">成功提示的文案</span>
    </up-component>

    <up-component component="el-link" type="success">成功链接</up-component>

    <up-component component="el-input"></up-component>
    <up-component component="el-input-number"></up-component>
    {{ radio }}
    <up-component component="el-radio" v-model="radio" label="1">备选项1</up-component>
    <up-component component="el-radio" v-model="radio" label="2">备选项2</up-component>

    <up-component component="el-cascader" :options="options" v-model="selectedOptions" @change="handleChange"></up-component>

    <up-component component="el-switch" v-model="on" active-color="#13ce66" inactive-color="#ff4949"></up-component>

    <up-component component="el-date-picker" v-model="date" type="datetime" placeholder="选择日期"></up-component>

    <up-component
      component="el-upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </up-component>

    <up-component component="el-rate" v-model="rate" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></up-component>

    <up-component component="el-color-picker" v-model="color"></up-component>
    <up-component component="el-transfer" v-model="transfer" :data="data"></up-component>
    <up-component component="el-tag" type="success">标签二</up-component>
    <up-component
      component="el-tree"
      :data="treeData"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[2, 3]"
      :default-checked-keys="[5]"
      :props="defaultProps"
    ></up-component>
    <up-component component="el-pagination" :page-size="20" :pager-count="11" layout="prev, pager, next" :total="1000"></up-component>
    <up-component component="el-badge" :value="12">
      <el-button size="small">评论</el-button>
    </up-component>

    <up-tooltip effect="light" content="Top" placement="right">
      <el-button>上边</el-button>
    </up-tooltip>
  </div>
</template>

<script>
import Input from 'element-ui/packages/input'
import UpComponent from 'packages/component'
import UpLink from 'packages/link'
import UpTooltip from 'packages/tooltip'

export default {
  name: 'AWSComponent',
  components: {
    UpComponent,
    UpLink,
    UpTooltip,
    [Input.name]: Input
  },
  data () {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      value: '',
      radio: '',
      on: true,
      date: '',
      rate: null,
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      color: '',
      data: generateData(),
      transfer: [1, 4],
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedOptions: [],
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  methods: {
    handleChange (...args) {
      console.log(args)
    },
    handlePictureCardPreview () { },
    handleRemove () { }
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <up-table
      style="width: 800px; margin: 0 auto;"
      layout="prev, pager, next"
      expand
      selection
      :page="page"
      :default-sort="{prop: 'id', order: 'descending'}"
      :slot-columns="['sex', 'github']"
      :sortable-columns="['id', 'name']"
      :width-columns="{ github: 200 }"
      @up:selection-change="handleSelectionChnage"
      @up:size-change="handlePageChange"
      @up:page-change="handlePageChange"
    >
      <!-- <template slot="github" slot-scope="{row, column}">
        SLOT:
        <a :href="row[column.property]" target="_blank">{{row[column.property]}}</a>
      </template>
      <template slot="sex" slot-scope="{row, column}">SLOT: {{row[column.property]}}</template>-->
      <!-- <template slot="up:expand">
        <el-table-column type="expand">

        </el-table-column>
      </template>-->
      <!-- <template slot="up:index">
        <el-table-column type="index" :index="1"></el-table-column>
      </template>-->
      <template slot-scope="props" slot="expand">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.$index }} - {{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </up-table>
  </div>
</template>

<script>
import { Table, TableColumn, Form, FormItem } from 'element-ui'
import UpTable from 'packages/table'

const data = Array.from({ length: 100 }).map(() => [{
  id: '12987122',
  name: '好滋好味鸡蛋仔',
  category: '江浙小吃、小吃零食',
  desc: '荷兰优质淡奶，奶香浓而不腻',
  address: '上海市普陀区真北路',
  shop: '王小虎夫妻店',
  shopId: '10333'
}, {
  id: '12987123',
  name: '好滋好味鸡蛋仔',
  category: '江浙小吃、小吃零食',
  desc: '荷兰优质淡奶，奶香浓而不腻',
  address: '上海市普陀区真北路',
  shop: '王小虎夫妻店',
  shopId: '10333'
}, {
  id: '12987125',
  name: '好滋好味鸡蛋仔',
  category: '江浙小吃、小吃零食',
  desc: '荷兰优质淡奶，奶香浓而不腻',
  address: '上海市普陀区真北路',
  shop: '王小虎夫妻店',
  shopId: '10333'
}, {
  id: '12987126',
  name: '好滋好味鸡蛋仔',
  category: '江浙小吃、小吃零食',
  desc: '荷兰优质淡奶，奶香浓而不腻',
  address: '上海市普陀区真北路',
  shop: '王小虎夫妻店',
  shopId: '10333'
}][Math.floor(Math.random() * 4)])

const pageData = {
  header: {
    name: '姓名',
    age: '年龄',
    sex: '性别',
    github: 'Github Profile'
  },
  // data: [
  //   { name: 'Rose', age: 20, sex: '女', github: 'https://github.com/rose' },
  //   { name: 'Jack', age: 30, sex: '男', github: 'https://github.com/jack' }
  // ],
  data: data.slice(0, 10),
  total: 100
}

export default {
  name: 'Table',

  components: {
    UpTable,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Form.name]: Form,
    [FormItem.name]: FormItem
  },

  data () {
    return {
      data: pageData
    }
  },

  methods: {
    handleSelectionChnage () {

    },
    handlePageChange () {

    }
  }
}
</script>

<style lang="scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0 !important;
  margin-bottom: 0;
  width: 50%;
}
</style>

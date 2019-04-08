<template>
  <div class="up-table">
    <el-table
      class="up-table__eltable"
      v-bind="$attrs"
      v-on="$listeners"
      v-loading="page.loading"
      :data="page.data"
      @selection-change="customizedSelectionChange"
    >
      <!-- 支持多级表头 -->
      <slot>
        <!-- 支持多选 -->
        <slot name="up:selection">
          <el-table-column v-if="selection" type="selection"></el-table-column>
        </slot>
        <!-- 支持展开行 -->
        <slot name="up:expand">
          <el-table-column type="expand" v-if="expand">
            <slot name="expand" slot-scope="props" v-bind="{...props}"></slot>
          </el-table-column>
        </slot>
        <!-- 支持自定义索引 -->
        <slot name="up:index"></slot>
        <el-table-column
          v-for="(value, key) in page.header"
          v-bind="$attrs"
          v-on="$listeners"
          :key="key"
          :label="value"
          :prop="key"
          :fixed="fixedColumns[key]"
          :min-width="minWidthColumns[key]"
          :sortable="sortableColumns.indexOf(key) > -1"
          :width="widthColumns[key]"
        >
          <template slot-scope="props">
            <slot v-if="slotColumns.indexOf(key) > -1" :name="key" v-bind="props">{{props.row[key]}}</slot>
            <template v-else>{{props.row[key]}}</template>
          </template>
        </el-table-column>
        <slot name="up:operate"></slot>
      </slot>
    </el-table>
    <el-pagination
      class="up-table__elpagination"
      v-if="pagination && page.data.length > 0"
      v-bind="$attrs"
      v-on="$listeners"
      :current-page.sync="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"
      :layout="layout"
      @size-change="customizedSizeChange"
      @current-change="customizedPageChange"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from 'vue'
// import { Table, TableColumn, Pagination, Loading } from 'element-ui'
import Table from 'element-ui/packages/table'
import TableColumn from 'element-ui/packages/table-column'
import Pagination from 'element-ui/packages/pagination'
import Loading from 'element-ui/packages/loading'

Vue.use(Loading.directive)

export default {
  name: 'UpTable',

  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination
  },

  props: {
    page: {
      type: Object,
      default: () => ({
        header: {},
        data: [],
        currentPage: 1,
        pageSize: 10,
        total: 0,
        loading: true
      })
    },
    expand: Boolean,
    selection: Boolean,
    layout: {
      type: String,
      default: 'total,sizes,prev,pager,next,jumper'
    },
    pagination: {
      type: Boolean,
      default: true
    },
    fixedColumns: {
      type: Object,
      default: () => ({})
    },
    minWidthColumns: {
      type: Object,
      default: () => ({})
    },
    widthColumns: {
      type: Object,
      default: () => ({})
    },
    slotColumns: {
      type: Array,
      default: () => []
    },
    sortableColumns: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    customizedSelectionChange (selection) {
      this.$emit('selection-change', selection)
      this.$emit('up:selection-change', {
        selection,
        selectAll: selection.length === this.page.data.length
      })
    },
    customizedSizeChange (pageSize) {
      this.$emit('size-change', pageSize)
      this.$emit('up:size-change', {
        currentPage: this.page.currentPage,
        pageSize
      })
    },
    customizedPageChange (currentPage) {
      this.$emit('page-change', currentPage)
      this.$emit('up:page-change', {
        currentPage,
        pageSize: this.page.pageSize
      })
    }
  }
}
</script>

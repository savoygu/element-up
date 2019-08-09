<template>
  <div class="up-table">
    <el-table
      ref="elTable"
      class="up-table__eltable"
      v-bind="$attrs"
      v-on="$listeners"
      v-loading="page.loading"
      :data="$attrs.data || page.data"
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
        <template v-for="(value, key) in page.header">
          <el-table-column
            v-if="slotColumns.indexOf(key) === -1"
            v-bind="{ ...$attrs, ...(options[key] || {}) }"
            v-on="$listeners"
            :key="key"
            :label="value"
            :prop="key"
            :fixed="fixedColumns[key]"
            :min-width="minWidthColumns[key]"
            :sortable="sortColumns.indexOf(key) > -1"
            :width="widthColumns[key]"
          >
            <template slot-scope="props">
              <slot v-if="slotContents.indexOf(key) > -1" :name="`${key}:content`" v-bind="props">{{props.row[key]}}</slot>
              <template v-else>{{props.row[key]}}</template>
            </template>
          </el-table-column>
          <slot v-else :name="key" v-bind="{ value, key }"></slot>
        </template>
        <slot name="up:operate"></slot>
      </slot>
    </el-table>
    <el-pagination
      class="up-table__elpagination"
      v-if="pagination && ($attrs.data && $attrs.data.length > 0 || page.data.length) > 0"
      v-bind="$attrs"
      v-on="$listeners"
      :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize"
      :total="page.total"
      :layout="layout"
      @size-change="customizedSizeChange"
      @current-change="customizedCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import Vue from 'vue'
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
        loading: false
      })
    },
    expand: Boolean,
    selection: Boolean,
    layout: {
      type: String,
      default: 'total,sizes,prev,pager,next,jumper'
    },
    pagination: Boolean,
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
    slotContents: {
      type: Array,
      default: () => []
    },
    sortColumns: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    customizedSelectionChange (selection) {
      this.$emit('selection-change', selection)
      this.$emit('up:selection-change', {
        selection,
        selectAll: this.$attrs.data
          ? selection.length === this.$attrs.data.length
          : selection.length === this.page.data.length
      })
    },
    customizedSizeChange (pageSize) {
      this.$emit('size-change', pageSize)
      this.$emit('up:size-change', {
        currentPage: this.page.currentPage,
        pageSize
      })
    },
    customizedCurrentChange (currentPage) {
      this.$emit('current-change', currentPage)
      this.$emit('up:current-change', {
        currentPage,
        pageSize: this.page.pageSize
      })
    },
    clearSelection () {
      this.$refs.elTable.clearSelection()
    },
    toggleRowSelection (row) {
      this.$refs.elTable.toggleRowSelection(row)
    },
    toggleAllSelection () {
      this.$refs.elTable.toggleAllSelection()
    },
    toggleRowExpansion (row, expanded) {
      this.$refs.elTable.toggleRowExpansion(row, expanded)
    },
    setCurrentRow (row) {
      this.$refs.elTable.setCurrentRow(row)
    },
    clearSort (row) {
      this.$refs.elTable.clearSort()
    },
    clearFilter (columnKey) {
      this.$refs.elTable.clearFilter(columnKey)
    },
    doLayout () {
      this.$refs.elTable.doLayout()
    },
    sort (prop, order) {
      this.$refs.elTable.sort(prop, order)
    }
  }
}
</script>

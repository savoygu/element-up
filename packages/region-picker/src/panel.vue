<template>
  <div class="up-region-panel">
    <div class="up-region-panel__inner">
      <div class="up-region-panel__header">省份{{subParent}} {{isSubParentSelected}}</div>
      <div class="up-region-panel__body">
        <!-- :indeterminate="isIndeterminate" -->
        <el-checkbox class="up-region-panel__all" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group class="up-region-panel__parts" v-model="currentValue" @change="handleCheckedItemsChange">
          <div class="up-region-panel__part" v-for="(item, index) in data" :key="item.value">
            <!-- :indeterminate="isSubIndeterminate[item.value]" -->
            <el-checkbox :label="item">
              <div
                class="up-region-panel__part-content"
                :class="{ 'is-active': index === currentIndex }"
                @click="(e) => handleContentClick(item, index, e)"
              >
                {{item.label}} - {{item.value}}
                <i
                  class="el-icon-arrow-right"
                  v-show="item.children && item.children.length > 0"
                ></i>
              </div>
            </el-checkbox>
          </div>
        </el-checkbox-group>
        <!-- <up-checkbox class="up-region-panel__part" v-model="currentValue" :data="data" :key-value="['label', 'value']"></up-checkbox> -->
      </div>
      <div class="up-region-panel__footer"></div>
    </div>
    <up-region-panel
      v-if="subData && subData.length"
      :parent="subParent"
      :isParentSelected="isSubParentSelected"
      :selectedValue="subSelectedValue"
      :data="subData"
      v-model="selectedData"
      @change="handleSubChange"
    ></up-region-panel>
  </div>
</template>

<script>
import Checkbox from 'element-ui/packages/checkbox'
import CheckboxGroup from 'element-ui/packages/checkbox-group'
// import UpCheckbox from 'element-up/packages/checkbox'

export default {
  name: 'UpRegionPanel',

  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup
    // UpCheckbox
  },

  props: {
    value: {},
    data: {
      type: Array,
      default: () => []
    },
    parent: {
      type: String,
      default: null
    },
    isParentSelected: Boolean,
    selectedValue: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      checkAll: false,
      currentValue: [],
      currentIndex: -1,
      // isIndeterminate: false,
      subData: [],
      subParent: null,
      subCheckAll: false,
      isSubIndeterminate: {},
      subSelectedValue: [],
      selectedData: this.value
    }
  },

  computed: {
    isSubParentSelected () {
      return this.currentValue.filter(item => item.value === this.subParent).length > 0
    }
  },

  watch: {
    isParentSelected (newVal, oldVal) {
      if (newVal) { // 父组件被选中
        this.currentValue = this.data
      } else {
        this.currentValue = []
      }
    },
    currentValue (newVal, oldVal) {
      // let checkedCount = newVal.length
      this.checkAll = newVal.length === this.data.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.length
    },
    value (newVal, oldVal) {
      this.selectedData = newVal
    },
    selectedData: {
      handler (newVal, oldVal) {
        // this.currentValue = this.data.filter(item => newVal[this.subParent].indexOf(item.value) > -1)
        this.$emit('input', newVal)
      },
      deep: true
    },
    subParent (newVal, oldVal) {
      if (newVal) {
        this.subSelectedValue = this.selectedData[newVal]
      }
    }
    // selectedValue () {
    //   this.currentValue = this.data.filter(item => this.selectedValue.indexOf(item.value) > -1)
    //   this.checkAll = this.currentValue.length === this.data.length
    //   this.isIndeterminate = this.currentValue.length > 0 && this.currentValue.length < this.data.length
    // }
  },

  // created () {
  //   if (this.subParent) {
  //     this.subSelectedValue = this.selectedData[this.subParent]
  //     this.currentValue = this.data.filter(item => this.selectedValue.indexOf(item.value) > -1)
  //   }
  // },

  methods: {
    findByValue (methodName, data, value) {
      return data[methodName](item => item.value === value)
    },
    handleSubChange ({ checkAll, isIndeterminate, data }) {
      this.$set(this.isSubIndeterminate, this.subParent, isIndeterminate)

      const idx = this.findByValue('findIndex', this.currentValue, this.subParent)
      if (checkAll && idx === -1) { // 全选并且不存在
        this.currentValue.push(this.findByValue('find', this.data, this.subParent))
      } else if (!data.length) { // 全不选并且无数据
        this.currentValue.splice(idx, 1)
      }

      // this.isIndeterminate = isIndeterminate
    },
    handleContentClick (item, index, e) {
      console.log(item, index, e)
      if (item.children && item.children.length > 0) {
        this.subData = item.children
        this.currentIndex = index
        this.subParent = item.value

        if (!this.selectedData[item.value]) {
          this.$set(this.selectedData, item.value, [])
        }

        e.stopPropagation()
        e.preventDefault()
      } else {
        this.subData = []
        // this.currentIndex = index
        this.currentIndex = -1
        this.subParent = null

        if (this.parent && this.selectedData[this.parent]) {
          const idx = this.selectedData[this.parent].indexOf(item.value)
          if (idx === -1) {
            this.selectedData[this.parent].push(item.value)
          } else {
            this.selectedData[this.parent].splice(idx, 1)
          }
        } else {
          this.$set(this.selectedData, item.value, [item.value])
        }
      }
    },
    handleItemClick (item, index, e) {
      console.log('handleItemClick: ', item, index, e)
    },
    handleCheckAllChange (val) {
      this.currentValue = val ? this.data : []
      // this.isIndeterminate = false

      this.$emit('change', {
        checkAll: val,
        // isIndeterminate: false,
        data: this.currentValue
      })
    },
    handleCheckedItemsChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.data.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.data.length

      this.$emit('change', {
        checkAll: this.checkAll,
        // isIndeterminate: this.isIndeterminate,
        data: value
      })
    }
  }
}
</script>

<style lang="scss">
@include b(up-region-panel) {
  display: flex;

  @include e(inner) {
    width: 300px;
    height: 380px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    overflow: auto;

    & + .up-region-panel {
      margin-left: -1px;
    }
  }

  @include e(header) {
    height: 50px;
    padding-left: 20px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }

  @include e(body) {
    padding: 0 24px 0 14px;
  }

  @include e(all) {
    &.el-checkbox {
      display: flex;
      align-items: center;
      height: 50px;
    }
  }

  @include e(parts) {
  }

  @include e(part) {
    & > label.el-checkbox {
      display: flex;
      align-items: center;
      height: 50px;
    }

    span.el-checkbox__label {
      width: 100%;
      height: 100%;
    }

    i {
      float: right;
    }
  }

  @include e(part-content) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    @include is(active) {
      color: #409eff;
    }
  }
}
</style>

<template>
  <div class="up-region-picker-panel">
    <div class="up-region-picker-panel__inner">
      <div class="up-region-picker__header up-region-picker-panel__header">省份</div>
      <div class="up-region-picker-panel__body">
        <el-checkbox
          class="up-region-picker-panel__all"
          v-model="checkAllProvince"
          @change="(value) => handleCheckAllChange('province', value)"
        >全选</el-checkbox>
        <el-checkbox-group
          class="up-region-picker-panel__parts"
          v-model="selectedProvinces"
          @change="(value) => handleCheckedItemsChange('province', value)"
        >
          <div
            class="up-region-picker-panel__part"
            :class="{ 'is-active': currentProvince && currentProvince.value === item.value }"
            v-for="(item, index) in data"
            :key="item.value"
          >
            <el-checkbox :label="item.value" @change="(value) => handleItemClick('province', item, index, value)">
              <div
                class="up-region-picker-panel__content"
                @click="(e) => handleContentClick('province', item, index, e)"
              >
                <span>{{item.label}}</span>
                <i class="el-icon-arrow-right" v-show="item.children && item.children.length > 0"></i>
              </div>
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <div class="up-region-picker-panel__footer"></div>
    </div>
    <div class="up-region-picker-panel" v-if="currentProvince">
      <div class="up-region-picker-panel__inner">
        <div class="up-region-picker__header up-region-picker-panel__header">城市</div>
        <div class="up-region-picker-panel__body">
          <el-checkbox
            class="up-region-picker-panel__all"
            :key="currentProvince.value"
            v-model="checkAllCity"
            @change="(value) => handleCheckAllChange('city', value)"
          >全选</el-checkbox>
          <el-checkbox-group
            class="up-region-picker-panel__parts"
            v-model="selectedCities"
            @change="(value) => handleCheckedItemsChange('city', value)"
          >
            <div
              class="up-region-picker-panel__part"
              v-for="(item, index) in currentProvince.children"
              :key="item.value"
              :class="{ 'is-active': false }"
            >
              <el-checkbox :label="item.value" @change="(value) => handleItemClick('city', item, index, value)">
                <div class="up-region-picker-panel__content" @click="(e) => handleContentClick('city', item, index, e)">
                  <span>{{item.label}}</span>
                  <i class="el-icon-arrow-right" v-show="item.children && item.children.length > 0"></i>
                </div>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
        <div class="up-region-picker-panel__footer"></div>
      </div>
    </div>
    <!-- <up-region-picker-panel
      v-if="subData && subData.length"
      :parent="subParent"
      :isParentSelected="isSubParentSelected"
      :data="subData"
      v-model="selectedData"
      @change="handleSubChange"
    ></up-region-picker-panel>-->
  </div>
</template>

<script>
import Checkbox from 'element-ui/packages/checkbox'
import CheckboxGroup from 'element-ui/packages/checkbox-group'
// import UpCheckbox from 'element-up/packages/checkbox'

export default {
  name: 'UpRegionPickerPanel',

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
    province: String
  },

  data () {
    return {
      checkAllProvince: false,
      selectedProvinces: [],
      currentProvince: null,
      checkAllCity: false,
      selectedCities: [],
      selectedData: []
    }
  },

  watch: {
    value: {
      handler (newVal) {
        this.selectedData = newVal
        this.selectedProvinces = this.getField(newVal.filter(item => item.isAll), 'value')
        this.checkAllProvince = this.selectedProvinces.length === this.data.length
        if (this.currentProvince) {
          const selectedCurrentProvinceData = this.findByValue('find', this.selectedData, this.currentProvince.value)
          const currentProvinceData = this.findByValue('find', this.data, this.currentProvince.value)
          this.selectedCities = selectedCurrentProvinceData ? this.getField(selectedCurrentProvinceData.children, 'value') : []
          this.checkAllCity = this.selectedCities.length === currentProvinceData.children.length
        }
      },
      immediate: true
    },
    province (newVal) {
      if (newVal) {
        const selectedCurrentProvinceData = this.findByValue('find', this.selectedData, newVal)
        const currentProvinceData = this.findByValue('find', this.data, newVal)
        if (currentProvinceData.children && currentProvinceData.children.length) {
          this.currentProvince = currentProvinceData
          this.selectedCities = selectedCurrentProvinceData ? this.getField(selectedCurrentProvinceData.children, 'value') : []
          this.checkAllCity = this.selectedCities.length === currentProvinceData.children.length
        } else {
          this.currentProvince = null
        }
      }
    },
    selectedData (newVal) {
      this.$emit('input', newVal)
      this.$emit('change', newVal)
    }
  },

  methods: {
    findByValue (methodName, data, value) {
      return data[methodName](item => item.value === value)
    },
    getField (data, field = 'value') {
      return data.map(item => item[field])
    },
    updateCitiesByProvince (value) {

    },
    handleCheckAllChange (type, value) {
      // console.log('handleCheckAllChange', type, value)

      if (type === 'province') {
        this.selectedProvinces = value ? this.getField(this.data, 'value') : []

        if (value) { // 选择了所有省份
          this.selectedData = this.data.map(item => ({
            ...item,
            isAll: true
          }))

          if (this.currentProvince && !this.checkAllCity) {
            this.selectedCities = this.getField(this.currentProvince.children, 'value')
            this.checkAllCity = true
          }
        } else { // 清空所有省份
          this.selectedData.splice(0)
          this.checkAllCity = false
          this.selectedCities.splice(0)
        }
      } else if (type === 'city') {
        if (value) {
          this.selectedCities = this.getField(this.currentProvince.children, 'value')
          this.selectedProvinces.push(this.currentProvince.value)

          const idx = this.findByValue('findIndex', this.selectedData, this.currentProvince.value)
          if (idx > -1) {
            this.selectedData.splice(idx, 1, { ...this.currentProvince, isAll: true })
          } else {
            this.selectedData.push({ ...this.currentProvince, isAll: true })
          }
        } else {
          this.selectedCities.splice(0)
          this.selectedProvinces.splice(this.selectedProvinces.indexOf(this.currentProvince.value), 1)

          const idx = this.findByValue('findIndex', this.selectedData, this.currentProvince.value)
          if (idx > -1) {
            this.selectedData.splice(idx, 1)
          }
        }

        this.checkAllProvince = this.selectedProvinces.length === this.data.length
      }
    },
    handleCheckedItemsChange (type, value) {
      // console.log('handleCheckedItemsChange: ', type, value)

      let checkedCount = value.length
      if (type === 'province') {
        this.checkAllProvince = checkedCount === this.data.length
      } else if (type === 'city') {
        this.checkAllCity = checkedCount === this.currentProvince.children.length
        if (!this.checkAllCity) {
          const provinceIdx = this.selectedProvinces.indexOf(this.currentProvince.value)
          if (provinceIdx > -1) {
            this.selectedProvinces.splice(provinceIdx, 1)
          }

          const dataIdx = this.findByValue('findIndex', this.selectedData, this.currentProvince.value)
          if (dataIdx > -1) {
            if (!value.length) { // 如果选中的省份下没有城市了，则移除省份
              this.selectedData.splice(dataIdx, 1)
            } else { // 过滤出选中的城市
              this.selectedData.splice(dataIdx, 1, {
                ...this.currentProvince,
                children: this.currentProvince.children.filter(child => value.indexOf(child.value) > -1),
                isAll: false
              })
            }
          } else {
            this.selectedData.push({
              ...this.currentProvince,
              children: this.currentProvince.children.filter(child => value.indexOf(child.value) > -1),
              isAll: false
            })
          }
        } else {
          this.selectedProvinces.push(this.currentProvince.value)
          const idx = this.findByValue('findIndex', this.selectedData, this.currentProvince.value)
          if (idx > -1) {
            this.selectedData.splice(idx, 1, { ...this.currentProvince, isAll: true })
          } else {
            this.selectedData.push({ ...this.currentProvince, isAll: true })
          }
        }

        this.checkAllProvince = this.selectedProvinces.length === this.data.length
      }
    },
    handleItemClick (type, item, index, value) {
      // console.log('handleItemClick: ', type, item, index, value)

      if (type === 'province') {
        if (item.children && item.children.length) {
          this.currentProvince = item

          if (value) {
            this.selectedCities = this.getField(item.children, 'value')
            this.checkAllCity = true
          } else {
            this.selectedCities.splice(0)
            this.checkAllCity = false
          }
        }

        if (value) {
          const idx = this.findByValue('findIndex', this.selectedData, item.value)
          if (idx > -1) {
            this.selectedData.splice(idx, 1, { ...item, isAll: true })
          } else {
            this.selectedData.push({ ...item, isAll: true })
          }
        } else {
          this.selectedData.splice(this.findByValue('findIndex', this.selectedData, item.value), 1)
        }
      }
    },
    handleContentClick (type, item, index, event) {
      // console.log('handleContentClick: ', type, item, index, event)

      if (item.children && item.children.length > 0) {
        this.currentProvince = item

        if (this.selectedProvinces.indexOf(item.value) > -1) { // 如果选中了
          this.selectedCities = this.getField(item.children, 'value')
          this.checkAllCity = true
        } else {
          const province = this.findByValue('find', this.selectedData, item.value)
          this.selectedCities = province ? this.getField(province.children, 'value') : []
          this.checkAllCity = false
        }

        event.stopPropagation()
        event.preventDefault()
      } else if (type === 'province') {
        this.currentProvince = null
      }
    }
  }
}
</script>

<style lang="scss">
// @include b(up-region-picker-panel) {
//   display: flex;

//   > .up-region-picker-panel {
//     flex: 1;
//   }

//   @include e(inner) {
//     flex: 1;
//     width: 100%;
//     min-width: 248px;
//     height: 284px;
//     border: 1px solid #eee;
//     box-sizing: border-box;
//     overflow: auto;

//     & + .up-region-picker-panel {
//       margin-left: -1px;
//     }
//   }

//   @include e(body) {
//     // padding: 0 24px 0 14px;
//   }

//   @include e(all) {
//     padding: 0 24px 0 14px;

//     &.el-checkbox {
//       display: flex;
//       align-items: center;
//       height: 36px;
//     }
//   }

//   @include e(parts) {
//   }

//   @include e(part) {
//     padding: 0 24px 0 14px;

//     &:hover {
//       background-color: #eee;
//     }

//     @include is(active) {
//       background-color: #eee;

//       @include e(part-content) {
//         color: #409eff;
//       }
//     }

//     & > label.el-checkbox {
//       display: flex;
//       align-items: center;
//       height: 36px;
//     }

//     span.el-checkbox__label {
//       width: 100%;
//       height: 100%;
//     }

//     i {
//       float: right;
//     }
//   }

//   @include e(part-content) {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     height: 100%;
//     font-weight: normal;

//     span {
//       width: 150px;
//       white-space: nowrap;
//       text-overflow: ellipsis;
//       overflow: hidden;
//     }
//   }
// }
</style>

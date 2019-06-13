<template>
  <div class="up-region-picker">
    <up-region-picker-panel
      class="up-region-picker__panel"
      :data="datasource"
      :province="province"
      v-model="selectedData"
    ></up-region-picker-panel>
    <up-region-picker-selected class="up-region-picker__selected" v-model="selectedData" @selected="handleSelected"></up-region-picker-selected>
  </div>
</template>

<script>
import RegionPickerPanel from './panel'
import RegionPickerSelected from './selected'

export default {
  name: 'UpRegionPicker',

  components: {
    [RegionPickerPanel.name]: RegionPickerPanel,
    [RegionPickerSelected.name]: RegionPickerSelected
  },

  props: {
    datasource: {
      type: Array,
      default: () => []
    },
    value: {},
    restore: Function,
    format: Function,
    formatedValue: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      province: '',
      selectedData: this.value
    }
  },

  watch: {
    value (newVal) {
      this.selectedData = newVal
    },
    datasource (newVal) {
      this.selectedData = this.restoreData(this.formatedValue)
    },
    formatedValue: {
      handler (newVal) {
        this.selectedData = this.restoreData(newVal)
        console.log(this.selectedData)
      },
      immediate: true
    },
    selectedData: {
      handler (newVal) {
        this.$emit('input', newVal)
        console.log(JSON.stringify(this.formatData(newVal), null, 2))
        this.$emit('change', {
          value: newVal,
          formatedValue: this.formatData(newVal)
        })
      },
      deep: true
    }
  },

  methods: {
    handleSelected (item) {
      this.province = item.province
    },
    restoreData (value) {
      if (!this.datasource.length || !Object.keys(value).length) return []

      return typeof this.restore === 'function' ? this.restore(this.datasource, value) : Object.keys(value).map(key => {
        const province = this.datasource.find(item => item.value === key)

        if (!province) return {}
        if (!province.children || !province.children.length || province.children.length === value[key].length) {
          return {
            ...province,
            isAll: true
          }
        }
        return {
          ...province,
          children: province.children.filter(item => value[key].indexOf(item.value) > -1),
          isAll: false
        }
      })
    },
    formatData (value) {
      return typeof this.format === 'function' ? this.format(value) : value.reduce((acc, item) => {
        acc[item.value] = (item.children && item.children.length) ? item.children.map(v => v.value) : [item.value]
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
// @include b(up-region-picker) {
//   display: flex;

//   @include e(header) {
//     height: 36px;
//     padding: 0 10px;
//     line-height: 36px;
//     font-size: 14px;
//     color: #606266;
//     border-bottom: 1px solid #eee;
//   }

//   @include e(panel) {
//     // flex: 0 1 496px;
//     width: 496px;
//   }

//   @include e(selected) {
//     margin-left: 72px;
//   }
// }
//
</style>

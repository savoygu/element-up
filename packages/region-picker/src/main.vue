<template>
  <div class="up-region-picker">
    <up-region-picker-panel class="up-region-picker__panel" :data="data" :province="province" v-model="selectedData"></up-region-picker-panel>
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
    value: {}
  },

  data () {
    return {
      data: this.datasource,
      province: '',
      selectedData: this.value
    }
  },

  watch: {
    value (newVal) {
      this.selectedData = newVal
    },
    selectedData: {
      handler (newVal) {
        this.$emit('input', newVal)
        this.$emit('change', newVal)
      },
      deep: true
    }
  },

  methods: {
    handleSelected (item) {
      this.province = item.province
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

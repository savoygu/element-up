<template>
  <div class="up-region-picker-selected">
    <div class="up-region-picker-selected__inner">
      <div class="up-region-picker__header up-region-picker-selected__header">
        <span>已选</span>
        <span class="is-active" @click="clearData">清空全部</span>
      </div>
      <div class="up-region-picker-selected__body">
        <div class="up-region-picker-selected__list" v-if="selectedData.length">
          <div
            class="up-region-picker-selected__item"
            v-for="item in selectedData"
            :key="item.value"
            :class="{ 'is-active': item.value === currentValue }"
            @click="selectedItem(item)"
            @dblclick="removeItem(item)"
          >
            <span v-if="item.parent">{{item.parentLabel}} - {{ item.label }}</span>
            <span v-else>{{ item.label }}</span>
            <i class="el-icon-close" @click.stop.prevent="removeItem(item)"></i>
          </div>
        </div>
        <div class="up-region-picker-selected__empty" v-else>
          <slot name="empty">无数据</slot>
        </div>
      </div>
      <div class="up-region-picker-selected__footer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpRegionPickerSelected',

  props: {
    value: {}
  },

  data () {
    return {
      selectedData: this.formatData(this.value),
      currentValue: ''
    }
  },

  watch: {
    value (newVal) {
      this.selectedData = this.formatData(newVal)
    }
  },

  methods: {
    formatData (data) {
      return data.reduce((acc, val) => (
        acc.concat(
          val.isAll
            ? { label: val.label, value: val.value }
            : val.children.map(item => ({ ...item, parent: val.value, parentLabel: val.label }))
        )
      ), [])
    },
    clearData () {
      this.currentValue = ''
      this.$emit('input', [])
    },
    removeItem ({ value, parent }) {
      if (this.currentValue === value) this.currentValue = ''

      const removedValue = parent
        ? this.value.map(
          item => {
            if (item.value === parent) {
              item.children = item.children.filter(child => child.value !== value)
            }
            return item
          }
        ).filter(item => item.isAll || item.children.length)
        : this.value.filter(item => item.value !== value)

      const hasItemParent = parent ? removedValue.find(item => item.value === parent) : false
      if (removedValue.length && !hasItemParent) {
        const { value, parent } = removedValue[0]
        this.$emit('selected', parent ? { type: 'city', province: parent, city: value } : { type: 'province', province: value })
      }

      this.$emit('input', removedValue)
    },
    selectedItem ({ value, parent }) {
      this.currentValue = this.currentValue === value ? '' : value
      this.$emit('selected', parent ? { type: 'city', province: parent, city: value } : { type: 'province', province: value })
    }
  }
}
</script>

<style lang="scss">
// @include b(up-region-picker-selected) {
//   @include e(header) {
//     display: flex;
//     justify-content: space-between;
//     // background-color: ;

//     span {
//       @include is(active) {
//         color: #409eff;
//         cursor: pointer;
//       }
//     }
//   }

//   @include e(inner) {
//     width: 208px;
//     height: 284px;
//     border: 1px solid #eee;
//     box-sizing: border-box;
//     overflow: auto;
//   }

//   @include e(list) {
//     padding: 8px 10px;
//   }

//   @include e(item) {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-bottom: 8px;
//     padding: 8px;
//     font-size: 14px;
//     color: #606266;
//     background-color: #eee;
//     cursor: pointer;

//     &:last-child {
//       margin-bottom: 0;
//     }
//   }

//   @include e(empty) {
//     font-size: 14px;
//     line-height: 36px;
//     text-align: center;
//     color: #606266;
//   }
// }
</style>

<template>
  <div class="up-region-picker">
    {{selectedData}}
    <up-region-panel :data="data" v-model="selectedData"></up-region-panel>
  </div>
</template>

<script>
// import RegionPicker from 'element-ui/packages/region-picker'
import RegionPanel from './panel'

import provinces from './provinces'
import cities from './cities'

const handleMap = (map, label = 'label', value = 'value') => Object.keys(map).map(v => ({ [label]: map[v], [value]: v }))
const regionData = handleMap(provinces)
  .map(province => ({
    ...province,
    children: handleMap(cities[province.label])
  }))
  .map(item => item.children.length > 1 ? item : { ...item, children: [] })

console.log(regionData)

export default {
  name: 'UpRegionPicker',

  components: {
    [RegionPanel.name]: RegionPanel
  },

  props: {
    datasource: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      data: regionData,
      selectedData: {}
    }
  }
}
</script>

<style scoped lang="scss">
@include b(up-region-picker) {
  //body
}
</style>

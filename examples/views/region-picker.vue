
<template>
  <div>
    <p>selectedData: {{selectedData}}</p>
    <up-region-picker :datasource="datasource" v-model="selectedData" :formated-value="formatedValue"></up-region-picker>
  </div>
</template>

<script>
import UpRegionPicker from 'packages/region-picker'

import provinces from '../data/provinces'
import cities from '../data/cities'

const handleMap = (map, label = 'label', value = 'value') => Object.keys(map).map(v => ({ [label]: map[v], [value]: v }))
const regionData = handleMap(provinces)
  .map(province => ({
    ...province,
    children: handleMap(cities[province.label])
  }))
  .map(item => item.children.length > 1 ? item : { ...item, children: [] })

export default {
  name: 'RegionPicker',
  components: {
    UpRegionPicker
  },
  data () {
    return {
      datasource: regionData,
      selectedData: [],
      // selectedData: [{ 'label': '河北省', 'value': '254', 'children': [{ 'label': '石家庄市', 'value': '255' }, { 'label': '唐山市', 'value': '279' }, { 'label': '秦皇岛市', 'value': '294' }, { 'label': '邯郸市', 'value': '302' }, { 'label': '邢台市', 'value': '322' }, { 'label': '保定市', 'value': '340' }, { 'label': '张家口市', 'value': '366' }, { 'label': '承德市', 'value': '382' }, { 'label': '沧州市', 'value': '394' }, { 'label': '廊坊市', 'value': '410' }, { 'label': '衡水市', 'value': '421' }, { 'label': '河北省省直辖县级行政区划', 'value': '3457' }], 'isAll': true }, { 'label': '天津市', 'value': '234', 'children': [], 'isAll': true }, { 'label': '山西省', 'value': '433', 'children': [{ 'label': '大同市', 'value': '445' }, { 'label': '阳泉市', 'value': '457' }], 'isAll': false }],
      formatedValue: {
        '214': ['214'],
        '254': [
          '279',
          '294',
          '302'
        ],
        '559': [
          '560',
          '570',
          '580',
          '584',
          '597',
          '606',
          '615',
          '629',
          '637',
          '649',
          '656',
          '669'
        ]
      }
    }
  }
}
</script>

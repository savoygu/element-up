<template>
  <div>
    {{valueWithJsx}}
    <up-select-with-jsx
      multiple
      clearable
      v-model="valueWithJsx"
      :data="dataWithJsx"
      @change="handleChange"
      @up:select:change="handleUpSelectChange"
    >
      <!-- <template slot-scope="props" slot="template">
        <span style="float: left">{{ props.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ props.value }}</span>
      </template>-->
    </up-select-with-jsx>
    {{value}}
    <up-select
      multiple
      clearable
      :data="dataWithJsx"
      v-model="value"
      @change="handleChange"
      @up:select:change="handleUpSelectChange"
    >
      <!-- <template slot-scope="props" slot="template">
        <span style="float: left">{{ props.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ props.value }}</span>
      </template>-->
    </up-select>
  </div>
</template>

<script>
import UpSelect from 'packages/select'
import UpSelectWithJsx from 'packages/select/src/main-with-jsx'

export default {
  name: 'Select',

  components: {
    UpSelect,
    UpSelectWithJsx
  },

  data () {
    return {
      valueWithJsx: '',
      dataWithJsx: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: [],
      data: [{
        label: '热门城市',
        options: [{
          value: 'Shanghai',
          label: '上海'
        }, {
          value: 'Beijing',
          label: '北京'
        }]
      }, {
        label: '城市名',
        options: [{
          value: 'Chengdu',
          label: '成都'
        }, {
          value: 'Shenzhen',
          label: '深圳'
        }, {
          value: 'Guangzhou',
          label: '广州'
        }, {
          value: 'Dalian',
          label: '大连'
        }]
      }]
    }
  },
  methods: {
    handleChange (value) {
      console.log('handleChange: ', value)
    },
    handleUpSelectChange (value) {
      console.log('handleUpSelectChange: ', value)
    }
  }
}
</script>

<style lang="scss">
</style>

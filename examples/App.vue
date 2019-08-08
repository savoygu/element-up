<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header></main-header>
    <!-- <div style="width: 800px; margin: 500px auto 0;">
      <up-date-ranges
        v-model="dates"
        :default-value="defaultValue"
        :disabled-date="disabledDate"
        value-format="yyyy-MM-dd"
        @pick="handlePick"
      ></up-date-ranges>
    </div>-->
    <div class="main-cnt element-up-cnt">
      <router-view></router-view>
    </div>
    <main-footer></main-footer>
  </div>
</template>

<script>
export default {
  name: 'app',

  computed: {
    lang () {
      return this.$route.path.split('/')[1] || 'zh-CN'
    },

    isComponent () {
      return /^component-/.test(this.$route.name || '')
    }
  },

  data () {
    return {
      visible: true,
      dates: [
        ['2019-07-05', '2019-07-20'],
        ['2019-07-24', '2019-07-28'],
        ['2019-07-31', '2019-08-12']
      ],
      defaultValue: [
        ['2019-07-05', '2019-07-20'],
        ['2019-07-24', '2019-07-28'],
        ['2019-07-31', '2019-08-12']
      ]
      // dates: []
    }
  },

  methods: {
    disabledDate (date) {
      // return date < new Date()
    },
    handlePick (value) {
      // console.log(value)
    }
  }
}
</script>

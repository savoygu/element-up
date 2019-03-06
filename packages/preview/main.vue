<template>
  <div class="up-preview">
    <up-dialog
      class="up-preview__dialog"
      v-model="visible"
      v-bind="$attrs"
      v-on="{
        ...$listeners,
        change: (value) => $emit('up:dialog:change', value)
      }"
      :has-footer="hasFooter"
    >
      <up-carousel
        class="up-preview__carousel"
        ref="upCarousel"
        v-bind="$attrs"
        v-on="{
        ...$listeners,
        change: handleCarouselChange
      }"
      >
        <slot slot-scope="props" v-bind="props"></slot>
      </up-carousel>
    </up-dialog>
  </div>
</template>

<script>
import UpCarousel from '../carousel/main'
import UpDialog from '../dialog/main'
import createVModel from '@/mixins/createVModel'

export default {
  name: 'UpPreview',

  mixins: [
    createVModel('visible')
  ],

  components: {
    UpCarousel,
    UpDialog
  },

  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    hasFooter: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      currentIndex: this.activeIndex
    }
  },

  watch: {
    activeIndex (val, oldVal) {
      if (val === this.currentIndex) return false
      this.$refs.upCarousel && this.$refs.upCarousel.setActiveItem(val)
    },
    visible (val) {
      this.$attrs.autoplay = val
    }
  },

  methods: {
    handleCarouselChange (value) {
      this.currentIndex = value
      this.$emit('update:activeIndex', value)
      this.$emit('up:carousel:change', value)
    }
  }
}
</script>

<style lang="scss">
@include b(up-preview) {
  @include e(dialog) {
    //body
  }
  @include e(carousel) {
    //body
  }
}
</style>

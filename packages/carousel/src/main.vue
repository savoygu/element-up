<template>
  <el-new-carousel ref="elCarousel" class="up-carousel" v-bind="$attrs" v-on="$listeners">
    <slot>
      <up-carousel-item v-for="(item, index) in data" v-bind="$attrs" v-on="$listeners" :key="index">
        <slot name="up:item" v-bind="{ item, $index: index }"></slot>
      </up-carousel-item>
    </slot>
  </el-new-carousel>
</template>

<script>
import Carousel from 'element-ui/packages/carousel'
import CarouselItem from 'element-up/packages/carousel-item'

const NewCarousel = {
  ...Carousel,
  methods: {
    ...Carousel.methods,
    updateItems () {
      this.items = this.$children.filter(child => child.$options.name === 'UpCarouselItem')
    }
  },
  name: 'ElNewCarousel'
}

export default {
  name: 'UpCarousel',

  components: {
    [NewCarousel.name]: NewCarousel,
    [CarouselItem.name]: CarouselItem
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    setActiveItem (value) {
      this.$refs.elCarousel.setActiveItem(value)
    },
    prev () {
      this.$refs.elCarousel.prev()
    },
    next () {
      this.$refs.elCarousel.next()
    }
  }
}
</script>

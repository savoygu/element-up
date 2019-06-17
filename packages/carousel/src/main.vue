<template>
  <el-carousel ref="elCarousel" class="up-carousel" v-bind="$attrs" v-on="$listeners">
    <el-carousel-item v-for="(item, index) in data" v-bind="$attrs" v-on="$listeners" :key="index">
      <slot v-bind="{ item, $index: index }"></slot>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import Carousel from 'element-ui/packages/carousel'
import CarouselItem from 'element-ui/packages/carousel-item'

export default {
  name: 'UpCarousel',

  components: {
    [Carousel.name]: Carousel,
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

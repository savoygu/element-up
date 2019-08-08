<template>
  <div>
    <up-carousel :data="data" v-slot="{ item }">
      <div>
        <h2>{{item.title}}</h2>
        <img :src="item.imgUrl" alt>
      </div>
    </up-carousel>
  </div>
</template>

<script>
import UpCarousel from 'packages/carousel'

export default {
  name: 'Carousel',

  components: {
    UpCarousel
  },

  data () {
    return {
      data: [
        {
          imgUrl: 'http://y3.ifengimg.com/a/2015_42/9c08aa042900225.jpg',
          title: '美女DOTA2解说AMS'
        },
        {
          imgUrl: 'https://p.ssl.qhimg.com/t0168f83dbe63b6ea28.jpg?size=554x681',
          title: '四千年第一美女鞠婧祎'
        },
        {
          imgUrl: 'http://images.china.cn/attachement/jpg/site1000/20140924/002564bb43f1158ca2fc2d.jpg',
          title: '美女学生会副主席走红'
        }
      ]
    }
  }
}
</script>

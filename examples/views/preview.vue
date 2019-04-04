<template>
  <div>
    <ul class="beauty">
      <li v-for="(item, index) in data" :key="item.title" @click="handlePreview(item, index)">
        <img :src="item.imgUrl" alt>
        <h2>{{item.title}}</h2>
      </li>
    </ul>

    <up-preview
      v-model="visible"
      :data="data"
      indicator-position="outside"
      :active-index.sync="currentBeauty"
      width="90%"
    >
      <template slot-scope="{ item }">
        <div class="preview">
          <h3>{{item.title}}</h3>
          <img :src="item.imgUrl" alt>
        </div>
      </template>
    </up-preview>
  </div>
</template>

<script>
import UpPreview from 'packages/preview'

export default {
  name: 'Preview',

  components: {
    UpPreview
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
      ],
      visible: false,
      currentBeauty: 0
    }
  },

  methods: {
    handlePreview (item, index) {
      this.currentBeauty = index
      this.visible = true
    }
  }
}
</script>

<style lang="scss">
.beauty {
  li {
    display: flex;
    width: 600px;
    height: 200px;
  }

  img {
    flex: 0 0 200px;
    width: 200px;
    height: auto;
  }
}
.preview {
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  img {
    width: 200px;
    height: auto;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

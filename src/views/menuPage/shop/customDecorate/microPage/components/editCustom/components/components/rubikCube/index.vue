<template>
  <div>
    <div>
      <div class="flex_between">
        <div>
          <img :src="imgUrl" alt />
        </div>
        <div>
          <img :src="imgUrl" alt />
        </div>
      </div>
      <div class="flex_between">
        <div>
          <img :src="imgUrl" alt />
        </div>
        <div>
          <img :src="imgUrl" alt />
        </div>
        <div>
          <img :src="imgUrl" alt />
        </div>
      </div>
      <div class="flex_between">
        <div>
          <img :src="imgUrl" alt />
        </div>
        <div>
          <div>
            <img :src="imgUrl" alt />
          </div>
          <div>
            <img :src="imgUrl" alt />
          </div>
        </div>
      </div>
      <div>
        <div>
          <img :src="imgUrl3" alt />
        </div>
        <div class="flex_between">
          <div>
            <img :src="imgUrl" alt />
          </div>
          <div>
            <img :src="imgUrl" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import isEmpty from 'lodash/isEmpty'
export default {
  name: 'MyRubickCube',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      imgUrl: require('@/assets/images/shop/icon_middle_modalbox_picture1_default.png'),
      imgUrl2: require('@/assets/images/shop/icon_middle_modalbox_picture3_default.png'),
      imgUrl3: require('@/assets/images/shop/icon_middle_modalbox_picture4_default.png')
    }
  },
  computed: {
    formData () {
      return this.item.config.formData || {}
    }
  },
  mounted () {},
  methods: {}
}
</script>
<style lang="less" scoped>
.flex_between {
  display: flex;
  justify-content: space-between;
}
img {
  width: 100%;
  height: 100%;
}
</style>

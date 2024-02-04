<template>
  <div :style="{backgroundImage: `url(${src})`}"
       title="点击查看大图"
       class="table-img"
       @click="preview"
       v-if="src"></div>
</template>
<script>
export default {
  name: 'TableImg',
  props: {
    src: String,
    width: String,
    height: String
  },
  methods: {
    preview() {
      this.$info({
        title: '预览(点击图片可查看原图)',
        okText: '关闭',
        closable: true,
        maskClosable: true,
        width: 'fit-content',
        content: <img src={this.src} onClick={() => window.open(this.src)} style="max-width: 400px; max-height: 400px" />
      })
    },
  }
}
</script>
<style lang="less" scoped>
.table-img {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>

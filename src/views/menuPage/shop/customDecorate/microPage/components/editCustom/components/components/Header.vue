<template>
  <div class="header_wrap">
    <h1 class="my-header" >{{formData.title | stringLimit}}</h1>
  </div>
</template>
<script>
export default {
  name: 'MyHeader',
  filters: {
    stringLimit (val) {
      if (val.length > 10) {
        return val.slice(0, 10) + '...'
      } else {
        return val
      }
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    formData () {
      return this.item.config.formData || {}
    },
    style () {
      return {
        ...this.formData
      }
    }
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
.header_wrap {
  background: url('~@images/shop/top.png');
  height: 64px;
  width: 375px;
  position: relative;
  .my-header {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    font-weight: 700;
    color: #191919;
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0;

    // width: 100%;
    // height: 40px;
    // line-height: 40px;
    // text-align: center;
  }
}
</style>

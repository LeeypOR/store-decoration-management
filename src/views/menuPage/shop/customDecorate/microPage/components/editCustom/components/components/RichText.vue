<template>
  <div class="my_rich_text">
    <div :class="['seaction',formData.fullscreen?'fullscreen':'']">
     <div v-if="isAnimation" v-html="formData.remark">
     </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyRichText',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
      return {
          isAnimation: true
      }
  },
  computed: {
    formData () {
      return this.item.config.formData || {}
    },
    bgColorStyle () {
      return { backgroundColor: this.formData.bgColor }
    }
  },
  watch: {
    'formData.rightExplanation': function (n) {
        //  this.isAnimation = false
        //  this.isAnimation = true
      }
  }
}
</script>
<style lang="less" scoped>
.my_rich_text {
  min-height: 20px;
  .seaction{
    overflow-x:scroll;
    padding:10px;
    /deep/.ant-table-row-cell-ellipsis{
       white-space:normal
    }
     /deep/.ant-table-row-cell-ellipsis{
       .ant-table-column-title{
      white-space:normal
    }
     }
  }
  .fullscreen{
      padding:0;
    }
  // div{
  //   width:100%;
  // }
  // img{
  //   width:100%;
  // }
  // p{
  //   width:100%;
  // }
}
</style>

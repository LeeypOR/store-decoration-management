<!-- 微页面装修页面，包括新建和编辑 -->
<template>
  <div class='edit_wrap'>
    <EditCustom></EditCustom>
  </div>
</template>

<script>
import EditCustom from './components/editCustom'
export default {
  name: 'ShopCustomDecorateMicroPageMicroPageDecoration',
  components: {
    EditCustom
  },
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  beforeCreate () {},
  created () {

  },
  beforeMount () {},
  mounted () {

  },
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 方法集合
  methods: {

  }
}
</script>
<style rel='stylesheet/less' lang='less' scoped>
.edit_wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  // overflow: scroll;
}
//@import url();
</style>

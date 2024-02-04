<!--  -->
<template>
  <a-modal
  ref="modal"
  v-bind="$attrs"
  v-on="modalListeners"
  >
    <!-- <a-spin :spinning="this.$store.state.loadding"> -->
      <slot></slot>
    <!-- </a-spin> -->
  </a-modal>
</template>

<script>
import { debounceFunc } from '@/utils'

// 用法和a-modal一样，只是额外增加了确认保存的loading
export default {
  name: 'GModal',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {},
  data () {
    return {

    }
  },
  computed: {
    modalListeners () {
      return Object.assign({}, this.$listeners,
        {
          ok: debounceFunc(_ => {
            console.log('防抖触发')
            this.$emit('ok')
          }, 3 * 100, false)
        }
      )
    }
    // 一些未处理的参数或特殊处理的参数绑定到 a-modal 上
    // _attrs () {
    //   let attrs = { ...this.$attrs }
    //   return attrs
    // }
  },
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
//@import url();
</style>

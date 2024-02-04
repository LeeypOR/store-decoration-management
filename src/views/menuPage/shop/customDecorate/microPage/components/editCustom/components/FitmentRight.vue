<template>
  <div class="fitment_right">
    <h3 class="title">{{currentComponentConfig.title}}</h3>
    <!-- <p class="desc">{{currentComponentConfig.desc}}</p> -->
    <!-- :style="'height:'+seactionHeight+'px;'"  -->
    <component class="form_component" v-if="currentComponentConfig.formName" :is='currentComponentConfig.formName' :formData="currentComponentConfig.formData" @updateFormData="updateFormData" ></component>
  </div>
</template>
<script>
import * as components from './form/index.js'

const nameInComponents = {}
Object.keys(components).forEach(key => {
  console.log(components[key])
  nameInComponents[components[key].name] = components[key]
})
export default {
  name: 'FitmentRight',
  props: {
    currentComponent: {
      type: Object
    },
    seactionHeight: {
      type: Number,
      default: 860
    }
  },
  components: {
    ...nameInComponents
  },
  data () {
    return { domH: 0 }
  },
  computed: {
    currentComponentConfig () {
      const config = this.currentComponent && this.currentComponent.config || {}
      return config
    }
  },
  mounted () {},
  methods: {
    updateFormData (formData) {
      this.$emit('updateFormData', formData)
    },
    getDomH () {
      var dom = document.querySelectorAll('.transition>.component-item')
      var h = 0
      var arr = null
      arr = Array.prototype.slice.call(dom, 0)
      arr.map((item) => {
        h = h + item.offsetHeight
        if (item.className.includes('component_absolute')) {
          h = h - item.offsetHeight
        }
      })
      console.log(h, 'h')
      this.domH = h
    }
  }
}
</script>
<style lang="less" scoped>
.fitment_right {
  height: calc(100% - 20px);
  overflow-y: scroll;
  border-left: 1px solid #fafafa;
  margin-bottom:20px;
  // width: 376px;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    font-weight: 700;
    color: #333333;
    padding-bottom: 14px;
    padding-left: 16px;
    border-bottom: 1px solid #e6e6e6;
  }
  // .desc {
  // }
  .form_component{
    padding-left: 16px;
    height:100%;
  }
  .ant-form-item {
    margin-bottom: 0;
  }
}
</style>

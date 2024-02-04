<!-- 图片radio -->
<template>
  <div class="radio-wrap" @click="handleClick">
    <img :src="checkedImage" class="img" :style="{width, height}" v-show="isChecked">
    <img :src="uncheckedImage" class="img" :style="{width, height}" v-show="!isChecked">
    <!-- <img :src="require(checkedImage)" v-show="isChecked" alt=""> -->
    <!-- <img :src="require(uncheckedImage)" v-show="!isChecked" alt=""> -->
    <!-- <div class="left" :class="isChecked?'box-click':''" ref="box">
      <transition name="fade">
        <div class="circle" v-show="isChecked"></div>
      </transition>
    </div> -->
    <div class="right" :class="{'tighten': tighten}">{{label}}</div>
  </div>
</template>

<script>

export default {
  name: 'ImageRadio',
  components: {},
  directives: {},
  filters: {},
  mixins: [],
  model: {},
  props: {
    tighten: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '20px'
    },
    height: {
      type: String,
      default: '20px'
    },
    checkedImage: {
      type: String,
      default: ''
    },
    uncheckedImage: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
    // record: {
    //   type: Object,
    //   default() {
    //     return {}
    //   }
    // },
  },
  data () {
    return {
      isChecked: false
    }
  },
  computed: {
    // realCheckedImage () {
    //   return require(this.checkedImage)
    // }
  },
  watch: {},
  beforeCreate () {},
  created () {
    // console.log('require(checkedImage)', require(this.checkedImage))
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
    handleClick () {
      this.isChecked = !this.isChecked
      // if (this.isChecked) {
      this.$parent.$emit('radioChange', this.value)
      // }
    },

    checkIsActive (value) {
      if (this.value === value) {
        this.isChecked = true
      } else {
        this.isChecked = false
      }
    }

  }
}
</script>
<style rel='stylesheet/less' lang='less' scoped>
//@import url();
// .fade-enter-active,
// .fade-leave-active {
//   transition: opacity 0.2s;
// }
// .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
//   opacity: 0;
// }
.radio-wrap {
  // height: 24px;
  display: inline-block;
  vertical-align: center;
  margin-bottom: 5px;
  .img{
    cursor: pointer;
    // width: 30px;
    // height: 30px;
  }
  // .left {
  //   height: 24px;
  //   width: 24px;
  //   border-radius: 50%;
  //   background-color: #ffffff;
  //   display: inline-block;
  //   border: 1.2px solid #cccccc;
  //   box-sizing: border-box;
  //   .circle {
  //     margin-left: 9px;
  //     margin-top: 9px;
  //     border-radius: 50%;
  //     width: 6px;
  //     height: 6px;
  //     background-color: #ffffff;
  //   }
  // }
  // .left:hover {
  //   cursor: pointer;
  // }
  .right {
    margin-left: 5px;
    padding-right: 10px;
    display: inline;
    vertical-align: top; // 内联元素默认的vertical-align为baseline。对象的内容与基线对齐。如果我们在right插入文字。则为出现left right不水平对齐的情况
    line-height: 24px;
    color: #66757f; // 在mounted
    font-size: 15px;
  }
  .tighten{
    margin-left: 0px;
    padding-right: 0px;
  }
  .box-click {
    background-color: #1da1f2;
    border: 0.5px solid #cccccc;
  }
}

</style>

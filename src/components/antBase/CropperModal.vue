<template>
  <a-modal
    :visible="visible"
    :title="options.title"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    width="60%"
    @cancel="cancelHandel">
    <div class="cropper-div">
      <div class="cropper-left">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="options.info"
          :full="options.full"
          :original="options.original"
          :centerBox="options.centerBox"
          :high="options.high"
          :infoTrue="options.infoTrue"
          :canScale="options.canScale"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :enlarge="options.enlarge"
          :fixed="options.fixed"
          :fixedBox="options.fixedBox"
          :fixedNumber="options.fixedNumber"
          @realTime="realTime">
        </vue-cropper>
      </div>
      <div class="cropper-right">
        <div :class="options.previewsCircle ? 'avatar-upload-preview' : 'avatar-upload-preview_range'" :style="{width: rightW+'px', height: rightH+'px'}">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </div>
    </div>
    <div class="cropper-tool">
      <a-button icon="zoom-in" @click="changeScale(1)">放大</a-button>
      <a-button icon="zoom-out" @click="changeScale(-1)">缩小</a-button>
      <a-button icon="undo" @click="rotateLeft">左旋转</a-button>
      <a-button icon="redo" @click="rotateRight">右旋转</a-button>
      <a-select
        style="width: 120px"
        v-model="scaleVal"
        :options="scaleList"
        @change="scaleChange" />
    </div>
    <template slot="footer">
      <a-button key="back" @click="cancelHandel">取消</a-button>
      <a-button key="submit" type="primary" :loading="confirmLoading" @click="okHandel">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
import { BASE_URL } from "@/axios/config";
import { VueCropper } from 'vue-cropper'
export default {
  name: 'CropperModal',
  components: {
    VueCropper,
  },
  props: {
    // 图片上传路径
    action: {
      type: String,
      default: `${BASE_URL}/upload`,
    },
    // 图片存储在oss上的上级目录名
    imgType: {
      type: String,
      default: '',
    },
    // 默认裁剪比例
    defaultScaleVal: {
      type: String,
      default: ''
    },
    // 裁剪比例集合
    scaleList: {
      type: Array,
      default() {
        return [
          { label: '3:2', value: '3-2', width: 180, height: 120, scale:[3, 2] },
          { label: '1:1', value: '1-1', width: 180, height: 180, scale:[1, 1] },
          { label: '3:4', value: '3-4', width: 180, height: 240, scale:[3, 4] },
          { label: '4:3', value: '4-3', width: 240, height: 180, scale:[4, 3] },
          { label: '16:9', value: '16-9', width: 160, height: 90, scale:[16, 9] },
          { label: '自定义', value: 'diy' }
        ]
      }
    }
  },
  data() {
    return {
      visible: false,
      img: null,
      confirmLoading: false,
      scaleVal: '1-1',
      options: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        full: true, // 是否输出原图比例的截图
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        high: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        enlarge: 1,// 图片根据截图框输出比例倍数
        fixed: true, // 是否开启截图框宽高固定比例
        fixedBox: false, // 是否固定截图框大小 不允许改变
        fixedNumber: [1,1], // 截图框的宽高比例
        previewsCircle: false, // 预览图是否是原圆形
        title: '图片裁剪',
      },
      // 右侧裁剪后图片宽高
      rightW: 180,
      rightH: 180,
      previews: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    edit(record) {
      const { options } = this
      this.visible = true
      this.options = Object.assign({}, options, record)
      console.log(this.defaultScaleVal)
      if(this.defaultScaleVal){
        this.scaleVal = this.defaultScaleVal
        this.scaleChange(this.scaleVal)
      }
    },
    /**
     * 图片缩放
     */
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    /**
     * 向左旋转
     */
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    /**
     * 向右旋转
     */
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    /**
     * 裁剪框比例
     */
    scaleChange(val) {
      if(this.scaleVal == 'diy') {
        this.options.fixedBox = false
        this.options.fixed = false
      } else {
        let res = this.scaleList.filter(item => item.value == val )[0]
        this.options.fixedBox = false
        this.options.fixed = true
        this.options.fixedNumber = res.scale
        this.options.autoCropWidth = res.width
        this.rightW = res.width
        this.options.autoCropHeight = res.height
        this.rightH = res.height
      }
    },
    /**
     * 取消截图
     */
    cancelHandel() {
      this.confirmLoading = false
      this.visible = false
      this.$emit('cropper-no')
    },
    /**
     * 确认截图
     */
    okHandel() {
      const that = this
      that.confirmLoading = true
      // 获取截图的Blob数据、
      this.$refs.cropper.getCropBlob(async (data) => {
        const file = await new window.File([data], `${(new Date).getTime()}.png` );
        let res = await that.$upload(that.action, file)
        if(res && res.returnCode=='1000'){
          this.confirmLoading = false
          this.visible = false
          that.$emit('cropper-ok', res.dataInfo.url)
          let scaleInfo = {
            scale: that.scaleVal,
            width: that.rightW,
            height: that.rightH
          }
          that.$emit('scaleChange', scaleInfo)
        }
      })
    },
    //移动框的事件
    realTime(data) {
      this.previews = data
      this.rightW = this.previews.w
      this.rightH = this.previews.h
    },
  }
};
</script>

<style lang="less" scoped>
.cropper-div{
  width: 100%;
  height: 400px;
  display: flex;
  .cropper-left{
    width: calc(100% - 400px);
    height: 100%;
  }
  .cropper-right{
    width: 400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.cropper-tool{
  margin-top: 20px;
  width: calc(100% - 400px);
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.avatar-upload-preview_range,
.avatar-upload-preview {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
  &.scale1-1{
    width: 180px;
    height: 180px;
  }
  &.scale3-2{
    width: 180px;
    height: 120px;
  }
  &.scale3-4{
    width: 180px;
    height: 240px;
  }
  &.scale16-9{
    width: 160px;
    height: 90px;
  }
  img {
    background-color: red;
    height: 100%;
  }
}
.avatar-upload-preview_range {
  border-radius: 0;
}
</style>

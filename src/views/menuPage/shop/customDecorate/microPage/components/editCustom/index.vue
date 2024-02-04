<template>
  <div class="fitment">
    <div class="fitment-header" ref="headHeight">
      <a class="back" @click="backList">返回微页面列表</a>
      <div class="btns">
        <a-button class="btn" @click="savepreview">预览</a-button>
        <a-button class="btn" @click="saveConfig(0)">保存</a-button>
        <a-button class="btn" @click="saveConfig(1)" type="primary"
          >发布</a-button
        >
      </div>
    </div>
    <div class="fitment-config">
      <div class="fitment-config-left">
        <fitment-left :moduleListData="moduleListData" />
      </div>
      <div class="fitment-config-middle">
        <fitment-middle
          ref="fitmentMiddle"
          :pageList="pageList"
          :headerConfig="headerConfig"
          :currentComponent="currentComponent"
          :addComplete="addComplete"
          @openComponentConfig="openComponentConfig"
          @deleteComponent="deleteComponent"
          @addComponents="addComponents"
        />
      </div>
      <div class="fitment-config-right">
        <fitment-right
          v-show="showRightModal"
          :currentComponent="currentComponent"
          :seactionHeight="seactionHeight"
          @updateFormData="updateFormData"
        />
      </div>
    </div>
    <a-modal v-model="visiblePreview" :footer="null" title="预览">
      <div>
        <div>
          <div class="fitment_middle_page" style="overflow-y: unset">
            <div class="botder_wrap" style="overflow-x: unset">
              <div
                class="pointer component-item"
                :class="{ current: currentComponent.id === headerConfig.id }"
              >
                <component :is="headerConfig.key" :item="headerConfig" />
              </div>
              <!-- <draggable class="draggable_wrap" :list="pageList"> -->
              <div class="draggable_wrap">
                <transition-group
                  name="moduleView"
                  type="transition"
                  class="transition"
                  tag="div"
                >
                  <div
                    ref="componentsItem"
                    v-for="item in pageList"
                    :style="positionStyle(item)"
                    :key="item.id"
                    :class="[
                      'pointer component-item',
                      currentComponent.id === item.id ? 'current' : '',
                      item.key == 'my-Fiexd-icon' ? 'component_absolute' : '',
                    ]"
                  >
                    <component :is="item.key" :item="item"></component>
                  </div>
                </transition-group>
              </div>
              <!-- </draggable> -->
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import FitmentLeft from './components/FitmentLeft'
import FitmentRight from './components/FitmentRight'
import FitmentMiddle from './components/FitmentMiddle'
import { headerConfig, moduleListData } from './moduleList'
import { makeLongId } from '@/utils'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import draggable from 'vuedraggable'
import * as components from './components/components/index.js'
const nameInComponents = {}
Object.keys(components).forEach((key) => {
  nameInComponents[components[key].name] = components[key]
})
export default {
  name: 'EditCustom',
  components: {
    FitmentLeft,
    FitmentRight,
    FitmentMiddle,
    ...nameInComponents,
    draggable
  },
  watch: {
    pageList: {
      handler (newVal, oldVal) {
        // do something
      },
      deep: true
    }
  },
  data () {
    return {
      addComplete: false,
      showRightModal: false,
      moduleListData: cloneDeep(moduleListData),
      headerConfig: cloneDeep(headerConfig),
      pageList: [], // 配置的所有数据
      currentComponent: headerConfig, // 当前选中的组件
      EditorPage: false,
      editorId: '',
      pageInfoId: '',
      visiblePreview: false,
      seactionHeight: 860
    }
  },
  computed: {
    flatModuleListData () {
      const res = Object.values(this.moduleListData).reduce(
        (total, item) => [...total, ...item],
        []
      )
      return res
    },
    domHeightNum () {
      var h = document.querySelectorAll('.transition>.component-item')
      console.log(h)
    }
  },
  created () {
    this.initDataTest()
  },
  mounted () {
    this.seactionHeight =
      document.documentElement.clientHeight -
        this.$refs.headHeight.clientHeight || 860
  },
  methods: {
    // 预览页面
    savepreview (itme) {
      this.visiblePreview = true
    },
    initDataTest () {
      const decorationId = this.$route.query.decorationId || ''
      if (decorationId) {
        this.editorId = decorationId
        this.$get('goldenhome/decoration/admin_/page/ms/query', {
          id: decorationId
        }).then((res) => {
          if (res && res.returnCode == '1000') {
            this.EditorPage = true
            this.pageInfoId = res.dataInfo.pageInfo.id
            // console.log(pageMsJson);
            var { pageMsJson } = res.dataInfo
            let pageMs = JSON.parse(pageMsJson)
            console.log('pageMs', pageMs)
            this.pageList = cloneDeep(pageMs.pageList)
            this.pageList.forEach((item) => {
              let key = item.key
              let useCount = item.useCount
              // item.componentsType
              this.flatModuleListData.forEach((val) => {
                if (val.key == key && val.useCount < useCount) {
                  val.useCount = useCount
                }
              })
            })
            this.headerConfig = cloneDeep(pageMs.headerConfig)
          }
        })
      }
    },
    deleteImageInfo (index) {
      this.formDataObject.imageList.splice(index, 1)
    },
    backList () {
      this.$router.push({
        name: 'ShopCustomDecorateMicroPageMicroPageList'
      })
    },
    // 提交保存
    saveConfig (saveStatus) {
      console.log('配置-------', {
        headerConfig: this.headerConfig,
        pageList: this.pageList
      })
      let obj = {
        headerConfig: this.headerConfig,
        pageList: this.pageList
      }
      var num = 0
      var domH = document.querySelector('.transition').offsetHeight
      this.pageList.forEach((item, index) => {
        if (item.key == 'my-spell') {
          if (
            !item.config.formData.shopBtnText ||
            item.config.formData.shopBtnText == ''
          ) {
            this.$message.error('购买按钮文字不能为空')
            num++
          }
          if (item.config.formData.btnType == 1) {
            item.config.formData.shopBtnText = '马上抢'
          }
          if (item.config.formData.badgeType != 3) {
            item.config.formData.badgeImgUrl = ''
          }
          if (item.config.formData.showType == 0) {
            item.config.formData.backgroundImgUrl = ''
          }
          if (item.config.formData.showType == 1) {
            item.config.formData.systembgColor = '#ff4444'
            item.config.formData.systemborderColor = '#ff4444'
            item.config.formData.appearanceStyle = 1
          }
        }
        if (item.key == 'my-Fiexd-icon') {
          item.config.formData.domH = domH
          if (
            item.config.formData.listStyle != 2 &&
            item.config.formData.listStyle != 3
          ) {
            item.config.formData.backgroundUrl = ''
            item.backgroundColorType = 1
          } else {
            if (item.config.formData.backgroundColorType != 3) {
              item.config.formData.backgroundUrl = ''
            }
          }
        }
      })
      if (num > 0) return
      const { backgroundColor, backgroundColorType, title } =
        this.headerConfig.config.formData
      //   console.log('JSON',JSON.stringify(this.pageList))
      //   return;
      // // eslint-disable-next-line no-new-object
      // return;
      // eslint-disable-next-line no-new-object
      const param = new Object()
      param.pageInfo = {
        pageName: title,
        pageStatus: saveStatus,
        bgColorType: backgroundColorType,
        bgColorValue: backgroundColor
      }
      var url = 'goldenhome/decoration/admin_/page/ms/add'
      // 编辑页面
      if (this.EditorPage) {
        url = 'goldenhome/decoration/admin_/page/ms/update'
        param.pageInfo.id = this.pageInfoId
        param.id = this.editorId
      }
      // param.pageMsComponents = arrPg
      param.pageMsJson = JSON.stringify(obj)
      // param.pageMsComponents.id = parseInt(this.pageList.id)

      console.log('保存的装修参数为：', param)

      // this.$post(url, param).then((res) => {
      //   if (res && res.returnCode == 1000) {
      //     this.$message.success('保存成功')
      //     this.backList()
      //   }
      // })
    },
    positionStyle (item) {
      if (item.key != 'my-Fiexd-icon') return
      const { floatPosition, correctLeft, top, listStyle, left, imgWidth } =
        item.config.formData
      //   console.log(document.querySelector('component_absolute'), '1234wre')
      // let custom_w = document.querySelector('.current.component_absolute').offsetWidth

      // let newLeft = left / 100 * 375 - custom_w

      // console.log((375 - custom_w) * left / 100, 'custom_w')
      var obj
      var imgh
      switch (listStyle) {
        case '0':
          imgh = 70
          break
        case '1':
          imgh = 60
          break
        case '2':
          imgh = 114
          break
        case '3':
          imgh = 114
          break
        default:
          imgh = imgWidth
          break
      }
      // let topH =
      //   top -
      //     (imgh / document.querySelector('.transition').offsetHeight) * 10 * 10 <
      //   0
      //     ? 0
      //     : top -
      //       (imgh / document.querySelector('.transition').offsetHeight) * 10 * 10
      let topH
      switch (floatPosition) {
        case '0':
          obj = {
            top: top + 'px',
            left: correctLeft + '%'
          }
          break
        case '1':
          obj = {
            top: top + 'px',
            right: correctLeft + '%'
          }
          break
        case '2':
          topH =
            top -
              (imgh /
                this.$refs.fitmentMiddle.$refs.componentItem.$el.offsetHeight) *
                100 <
            0
              ? 0
              : top -
                (imgh /
                  this.$refs.fitmentMiddle.$refs.componentItem.$el
                    .offsetHeight) *
                  100
          topH =
            (topH *
              this.$refs.fitmentMiddle.$refs.componentItem.$el.offsetHeight) /
            100
          obj = {
            top: topH + 'px',
            left: correctLeft + '%'
          }
          break
        default:
          topH =
            top -
              (imgh /
                this.$refs.fitmentMiddle.$refs.componentItem.$el.offsetHeight) *
                100 <
            0
              ? 0
              : top -
                (imgh /
                  this.$refs.fitmentMiddle.$refs.componentItem.$el
                    .offsetHeight) *
                  100
          topH =
            (topH *
              this.$refs.fitmentMiddle.$refs.componentItem.$el.offsetHeight) /
            100
          obj = {
            top: topH + 'px',
            right: correctLeft + '%'
          }
          break
      }
      return obj
    },
    // clickAddComponents (item) {
    //   if (item.useCount >= item.count) {
    //     this.$message.warning('该组件添加数量已达上限！')
    //     return
    //   }
    //   item.useCount++
    //   const component = cloneDeep(item)
    //   component.id = makeId('fitment-')
    //   this.pageList.push(component)
    //   this.currentComponent = component
    // },
    /**
     * 添加组件
     * 由于vue.draggable拖动，会把数据自动的给拖拽过来，所以需要想办法，删除掉带来的数据。
     * oldDraggableIndex是被拖动的元素所在数组下标。
     * newDraggableIndex是拖拽目标所对应的数组下标，可以用来删除默认数据试试。
     *
     * <transition-group> children must be keyed: <div>
     * 这个报错是由于默认拖拽事件，将数据clone过去了，而clone过去的数据没有key导致的。
     * 虽然立即删除了数据，但是依然会报这个错，可以不用管他。
     * 不知是否有方法阻止默认拖拽事件改变数据，同时又不影响拖拽预览的效果。
     */
    addComponents (oldDraggableIndex, newDraggableIndex, componentsType) {
      // 使用componentsType来区分组件类型。
      let item = this.moduleListData[componentsType][oldDraggableIndex]
      // console.log('系统拖拽的数据为：', item)
      // console.log('系统默认拖拽过来的数据为：', this.pageList[newDraggableIndex])
      // const deleteItem =
      this.pageList.splice(newDraggableIndex, 1)
      // console.log('手动删除的数据为', deleteItem)
      // console.log('item.useCount', item.useCount)
      // console.log('item.count', item.count)
      if (item.useCount >= item.count) {
        this.$message.warning('该组件添加数量已达上限！')
        return false
      }
      item.useCount++
      const component = cloneDeep(item)
      // component.id = makeId('fitment-')
      component.id = makeLongId('888')
      // this.pageList.push(component) // 以前点击的时候是push上去的，无法体现拖拽效果。
      this.pageList.splice(newDraggableIndex, 0, component)
      this.currentComponent = component
      this.showRightModal = true
      console.log('addComponents this.showRightModal', this.showRightModal)
      console.log('最终的this.pageList', this.pageList)
      this.$nextTick((_) => {
        this.$refs.fitmentMiddle.addComplete()
      })
    },
    // 打开组件配置
    openComponentConfig (item) {
      this.showRightModal = true
      console.log(
        'openComponentConfig this.showRightModal',
        this.showRightModal
      )
      if (isEmpty(item.config)) {
        this.$message.warning('该组件无可用配置')
        return
      }
      this.currentComponent = {}

      // 必须等到右侧组件清空后更新后赋值新的组件表单，避免因为下一个组件名相同，不更新表单里的数据
      this.$nextTick(() => {
        this.currentComponent = item || {}
      })
    },
    // 删除组件
    deleteComponent (item) {
      // 如果是删除的当前组件，要把组件清空
      if (item.id === this.currentComponent.id) {
        this.currentComponent = {}
      }
      const index = this.pageList.findIndex(
        (component) => item.id === component.id
      )
      if (index > -1) {
        this.pageList.splice(index, 1)
        this.$message.success('删除成功！')
        // 通过两边数组的key，找到相同的就行。
        // const componentItem = this.moduleList.find((component) => component.key === item.key)
        const componentItem = this.flatModuleListData.find(
          (component) => component.key === item.key
        )
        if (componentItem) {
          var aNum = 0
          this.pageList.forEach((item, index) => {
            if (item.key == componentItem.key) {
              aNum++
              item.useCount = aNum
            }
          })
          componentItem.useCount--
        }
      }
      this.showRightModal = false
      console.log('deleteComponent this.showRightModal', this.showRightModal)
    },
    // 保存当前组件的配置
    updateFormData (formData) {
      console.log(formData.type == 'header')
      this.currentComponent.config.formData = formData
      // if (formData.type && formData.type == 'header') {
      //   this.headerConfig.config.formData = formData
      // }
    }
  }
}
</script>
<style lang="less" scoped>
.fitment {
  height: 100%;
  &-header {
    padding: 20px 6% 20px 40px;
    width: 100%;
    height: 76px;
    // text-align: right;
    border-bottom: 4px solid #f0f5f8;
    display: flex;
    justify-content: space-between;
    .back {
      flex: none;
      font-size: 14px;
      color: #333333;
    }
    .btns {
      .btn {
        margin: 0 15px;
      }
    }
  }
  &-config {
    background-color: #f5f5f5;
    // background: rgb(245,245,245);
    display: flex;
    justify-content: space-between;
    // min-height: 700px;
    height: calc(100% - 76px);
    &-left {
      flex: none;
      padding: 5px;
      border-right: 1px solid #ddd;
    }

    &-middle {
      // overflow-y: visible;
      // overflow-x: visible;
      padding: 0 30px;
      height: 100%;
      // overflow-x: scroll;
    }
    &-right {
      border-left: 1px solid #ddd;
      background-color: #fff;
      flex: 0 1 auto;
      padding: 14px 16px 0px 0px;
      width: 410px;
    }
  }
  .fitment-config-right {
    height: 100%;
  }
}
// 预览

.fitment_middle_page {
  &::-webkit-scrollbar-track-piece {
    background-color: #fafafa; /*滑道*/
    -webkit-border-radius: 4px; /*滑道圆角宽度*/
  }
  // &::-webkit-scrollbar-thumb{
  //   background-color:yellow; /*滑动条表面*/
  //   border:solid 1px gold; /*滑动条边框*/
  //   border-radius:4px; /*滑动条圆角宽度*/
  // }

  // &::-webkit-scrollbar-thumb:hover{
  //   background-color:green;
  // }

  // &::-webkit-scrollbar-track{
  //   background-color:red; /*滑道全部*/
  // }
}
// .fitment_middle_page::-webkit-scrollbar {
//   width: 0 !important
//   }
// ::-webkit-scrollbar-track {
//   background: red ;  //背景颜色
// }

/deep/.drag_preview_class {
  background-color: rgba(43, 153, 57, 0.4) !important;
  box-shadow: 0 3px 14px 3px rgba(43, 153, 57, 0.6),
    0 10px 10px 1px rgba(43, 153, 57, 0.5);
  width: 100% !important;
  // height: 120px!important;
  p {
    padding: 20px !important;
    width: 100% !important;
    height: 10px !important;
    background-color: #fff !important;
  }
}

.fitment_middle_page {
  // width: 375px;
  width: 477px;
  height: 90%;
  // 最小高度，避免无组件时不好看。
  // height: 650px;
  // overflow-x: scroll;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: red;
  }

  // overflow-y: scroll;
  // overflow: visible;
  // border: 1px solid #ddd;
  // background: #fff;
  // box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.1);
  // border-radius: 10px;
  // padding: 20px;
  .botder_wrap {
    width: 375px;
    height: 645px;
    // height: 100%;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
    // overflow-y: scroll;
    overflow-x: hidden;
    .draggable_wrap {
      position: relative;
      // height: calc(100% - 66px);
      .transition {
        // height: 558px;
        // overflow-x: hidden;
        // overflow-y: scroll;
        // min-height: 558px;
        position: relative;
      }
    }
    .component-item {
      // margin-bottom: 10px;
      position: relative;
      border: 1px dashed transparent;
      &:hover {
        .tag_wrap {
          display: none;
        }
        .delete {
          display: block;
        }
      }
      .delete {
        width: 92px;
        height: 32px;
        display: none;
        position: absolute;
        right: -92px;
        top: 0;
        z-index: 5;
        font-size: 20px;

        background: url("~@images/shop/icon_middle_modalbox_delete_default.png")
          no-repeat;
      }
      .tag_wrap {
        width: 92px;
        height: 32px;
        line-height: 32px;
        background: url("~@images/shop/icon_middle_modalbox_name_default 2.png");
        position: absolute;
        top: 0;
        right: -92px;
        text-align: center;
        font-size: 12px;
        color: #333333;
      }
    }
    .component_absolute {
      position: absolute;
      z-index: 500;
    }
  }
  .current {
    // border: 1px dashed skyblue;
    border:  1px dashed skyblue!important;
  }
}
</style>

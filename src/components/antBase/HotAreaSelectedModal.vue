<!-- 热区选择器组件 -->
<template>
  <a-modal
    :zIndex="999"
    destroyOnClose
    class="hot_modal"
    :width="740"
    :maskClosable="false"
    :visible="show"
    title="热区编辑器"
    @cancel="cancelModal"
  >
    <div class="content_wrap">
      <div
        ref="hotArea"
        style="user-select: none"
        class="hot_area"
        :class="{ active_add: isActiveAdd }"
      >
        <div ref="dragArea">
          <img
            draggable="false"
            class="hot_image"
            style="width: 375px"
            :src="dataSource.imageUrl"
          />
        </div>
      </div>

      <div class="hot_list">
        <div
          class="hot_info_item"
          v-for="(item, i) of dataSource.hotAreaConfigInfoList"
          :key="item.id"
        >
          <div class="index">{{ item.sort }}</div>
          <div class="link" @click="updateHotAreaLink(item, i)">
            <template v-if="item.jumpPageType == 'WXMAID'">
              <a v-if="item.jumpPageUrl">{{ item.jumpPageUrl }}</a>
              <a v-else>请选择跳转链接</a>
            </template>
            <template v-else>
              <a v-if="item.jumpPageName">{{ item.jumpPageName }}</a>
              <a v-else>请选择跳转链接</a>
            </template>
          </div>
          <div class="update" @click="updateHotAreaLink(item, i)">修改</div>
          <div class="delete" @click="deleteHotAreaItem(item, i)">删除</div>
        </div>
      </div>
    </div>

    <template slot="footer">
      <a-button type="primary" @click="addHot"> 添加热区 </a-button>
      <a-button @click="saveHotAreaConfig"> 保存 </a-button>
    </template>

    <PageModal
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
  </a-modal>
</template>

<script>
import { isEmpty, cloneDeep, throttle } from "lodash";
import PageModal from "@components/antBase/PageModal";
import { makeId } from "@/utils";

export default {
  name: "HotAreaSelected",
  components: {
    PageModal,
  },
  directives: {},
  filters: {},
  mixins: [],
  model: {
    prop: "show",
    event: "close",
  },
  props: {
    dataSource: {
      type: Object,
      require: true,
      default() {
        return {
          imageType: "1", // 1、单链接,2、热区
          imageUrl: "", // 显示图片的链接
          imageTitle: "", // 标题
          jumpPageId: "", // 跳转的页面的id，字符串
          jumpPageName: "", // 跳转的页面的名称，字符串
          jumpPageType: "",
          hotAreaConfigInfoList: [
            // 热区选区信息集合。
            // {
            //   id:'323123', // 随机的不重复id，字符串
            //   top: '0px', // 字符串，带单位px
            //   left: '0px', // 字符串，带单位px
            //   width: '0px', // 字符串，带单位px
            //   height: '0px', // 字符串，带单位px
            //   sort: 4,
            //   jumpPageId: '',
            //   jumpPageName: ''
            // }
          ],
        };
      },
    },
    show: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  data() {
    return {
      selectedHotAreaIndex: 0,
      mouseupEvent: {},
      mousemoveEvent: {},
      eventListenerFlag: false,
      // beginDraw: false,
      pointX: 0, // 开始点的X坐标
      pointY: 0, // 开始点的Y坐标，相对于屏幕，用于计算移动距离。
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      dragHeight: 0,
      couldDrag: false,
      addDivArea: {},
      isActiveAdd: false,

      pageModalVisible: false,
      // hotAreaShow: false,
      // 最后输出的数据
      // formDataObject: {}
      pageModelId: "",
      pageIndex: "MSPAGE",
    };
  },
  computed: {},
  watch: {
    show(n, o) {
      if (n) {
        this.$nextTick((_) => {
          this.redrawDiv();
        });
      }
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  // 方法集合
  methods: {
    closeInfoModal(type) {
      console.log(type, "type");
      this.pageModalVisible = false;
    },

    selectedPage({ id, name, type, url }) {
      let target =
        this.dataSource.hotAreaConfigInfoList[this.selectedHotAreaIndex];

      this.$set(target, "jumpPageId", id);
      this.$set(target, "jumpPageName", name);
      this.$set(target, "jumpPageUrl", url);
      this.$set(target, "jumpPageType", type);
      console.log("收到的已选择信息后：", this.dataSource);
      this.pageModalVisible = false;
    },

    redrawDiv() {
      this.dataSource.hotAreaConfigInfoList.forEach((item, i) => {
        this.createArea({
          top: item.top,
          left: item.left,
          width: item.width,
          height: item.height,
          id: item.id,
          sort: item.sort,
        });
      });
    },
    initEventListener() {
      const dragArea = this.$refs.dragArea;
      const maxWidth = dragArea.clientWidth;
      const maxHeight = dragArea.clientHeight;

      dragArea.addEventListener("mousedown", (e) => {
        // console.log('mousedown')
        // console.log('addDivArea', this.addDivArea)
        if (!this.isActiveAdd) {
          e.preventDefault();
          return false;
        }
        this.top = e.offsetY;
        this.left = e.offsetX;
        this.dragHeight = maxHeight

        this.pointX = e.pageX;
        this.pointY = e.pageY;

        this.couldDrag = true;

        console.log("mousedown e", e);
        console.log("this.pointX", this.pointX);
        console.log("this.pointY", this.pointY);
        console.log("this.top", this.top);
        console.log("this.left", this.left);

        // this.beginDraw = true
        // 找出最大序号是多少，然后加一。
        let sort = 0;
        if (this.dataSource.hotAreaConfigInfoList.length) {
          sort = Math.max.apply(
            Math,
            this.dataSource.hotAreaConfigInfoList.map((item) => item.sort)
          );
        }

        this.addDivArea = this.createArea({
          top: this.top + "px",
          left: this.left + "px",
          width: this.width + "px",
          height: this.height + "px",
          id: "",
          sort: sort + 1,
        });
      });

      /*
        因为dragArea是绑定在a-modal中的，而a-modal每次关闭后会强制销毁，导致其中绑定的事件
        也销毁了，所以dragArea中的事件需要重复绑定。
        而document上的事件是全局的，不需要重复绑定。
      */
      if (this.eventListenerFlag) return false;
      this.eventListenerFlag = true;

      const mousemoveEvent = (e) => {
        // console.log('mousemove', e)
        if (!this.isActiveAdd) return false;
        if (!this.couldDrag) return false;

        let finalPointX = e.pageX;
        let finalPointY = e.pageY;

        let styleWidth = 0;
        let styleHeight = 0;
        let styleTop = this.top;
        let styleLeft = this.left;

        this.width = finalPointX - this.pointX;
        if (this.width > 0) {
          styleWidth = this.width;
        } else {
          // width为负数，即在原点左侧时。
          styleWidth = -this.width;
          styleLeft = this.left + this.width;
        }

        this.height = finalPointY - this.pointY;
        if (this.height > 0) {
          styleHeight = this.height;
        } else {
          // height为负数，即在原点上方时
          styleHeight = -this.height;
          styleTop = this.top + this.height;
        }

        // 边界情况限制
        if (styleTop < 0) {
          styleTop = 0;
          styleHeight = this.top;
        }
        if (styleLeft < 0) {
          styleLeft = 0;
          styleWidth = this.left;
        }

        if (styleLeft + styleWidth >= maxWidth) {
          styleWidth = maxWidth - styleLeft;
        }
        if (styleTop + styleHeight >= maxHeight) {
          styleHeight = maxHeight - styleTop;
        }

        this.addDivArea.style.width = styleWidth + "px";
        this.addDivArea.style.height = styleHeight + "px";

        this.addDivArea.style.top = styleTop + "px";
        this.addDivArea.style.left = styleLeft + "px";

        // console.log('width:', this.width, 'height:', this.height)
        // console.log('this.addDivArea.style.left:', this.addDivArea.style.left, 'this.addDivArea.style.top:', this.addDivArea.style.top)
      };
      this.mousemoveEvent = mousemoveEvent;

      document.addEventListener("mousemove", mousemoveEvent);

      const mouseupEvent = (e) => {
        // 一个小坑，也算是个大坑。由于是dom生成的，所以id每次都是新的。
        // 导致v-for的key每次点击后都是新的，无法触发任何事件也无任何报错。
        if (!this.isActiveAdd) return false;
        if (!this.couldDrag) return false;
        // console.log('mouseup')

        const hotAreaList = document.querySelectorAll(".hot_area_item");
        // console.log('zeroPointDivList', hotAreaList)
        // console.log('zeroPointDivList[0].style.width', zeroPointDivList[0].style.width)
        // console.log('zeroPointDivList[0].clientWidth', zeroPointDivList[0].clientWidth)
        const tempList = Array.from(hotAreaList);
        // console.log('tempList', tempList)
        const zeroPointDivList = tempList.filter(
          (item) => !item.clientWidth || !item.clientHeight
        );

        const effectiveDivList = tempList.filter(
          (item) => item.clientWidth && item.clientHeight
        );

        console.log("effectiveDivList", effectiveDivList);
        console.log(
          "this.dataSource.hotAreaConfigInfoList",
          this.dataSource.hotAreaConfigInfoList
        );
        effectiveDivList.forEach((dom) => {
          console.log("dom", dom.getAttribute("hot_area_id"));
        });

        const hadExistDivList = effectiveDivList.filter((dom) =>
          this.dataSource.hotAreaConfigInfoList.find(
            (item) => dom.getAttribute("hot_area_id") == item.id
          )
        );

        const newAddDivList = effectiveDivList.filter(
          (dom) =>
            !this.dataSource.hotAreaConfigInfoList.find(
              (item) => item.id === dom.getAttribute("hot_area_id")
            )
        );
        console.log("hadExistDivList", hadExistDivList);
        console.log("newAddDivList", newAddDivList);

        // 清除宽高为0的区域,优化dom结构，同时避免序号下标异常。
        zeroPointDivList.forEach((e) => e.remove());

        const newAddHotConfigList = newAddDivList.map((item, i) => ({
          dragHeight: this.dragHeight,
          top: item.style.top,
          left: item.style.left,
          width: item.style.width,
          height: item.style.height,
          sort: item.getAttribute("hot_area_sort"),
          id: item.getAttribute("hot_area_id"),
          jumpPageId: "",
          jumpPageName: "",
          jumpPageUrl: ""
        }));

        this.dataSource.hotAreaConfigInfoList.push(...newAddHotConfigList);
        // if (!this.isActiveAdd) return false
        // if (!this.couldDrag) return false
        // top = e.offsetY
        // left = e.offsetX
        // console.log('dragend')
        // console.log('addDivArea.style.width', this.addDivArea.style.width)
        // console.log('addDivArea.style.height', this.addDivArea.style.height)

        this.clearDrag();

        // this.isActiveAdd = false
        // this.couldDrag = false

        // this.top = 0
        // this.left = 0
        // this.width = 0
        // this.height = 0
        // this.couldDrag = false
        // this.addDivArea = {}
      };
      this.mouseupEvent = mouseupEvent;

      document.addEventListener("mouseup", mouseupEvent);
    },
    createArea({ top, left, width, height, id, sort }) {
      const hotArea = this.$refs.hotArea;
      const tempDiv = document.createElement("div");
      tempDiv.style = `position:absolute;background:rgba(1,107,255,0.60);`;
      tempDiv.style.top = top;
      tempDiv.style.left = left;
      tempDiv.style.width = width;
      tempDiv.style.height = height;
      tempDiv.style.textAlign = "center";
      tempDiv.style.overflow = "hidden";
      tempDiv.className = "hot_area_item";
      const hotId = id ? id : makeId("hot_area");
      tempDiv.setAttribute("hot_area_id", hotId);
      tempDiv.setAttribute("hot_area_sort", sort);

      tempDiv.ondblclick = (e) => {
        console.log("双击:", e);
      };
      // const divSort = id ? sort : this.dataSource.hotAreaConfigInfoList.length + 1
      tempDiv.innerHTML = `
        <div style="position:absolute;top:0px;left:0px;color:#fff;background:#016BFF;width:14px;height:14px;line-height:14px;font-size:12px;">
          ${sort}
        </div>
      `;

      // console.log('tempDiv', tempDiv)
      // console.log('hotArea', hotArea)
      // console.log('hotArea.appendChild', hotArea.appendChild)
      hotArea.appendChild(tempDiv);
      return tempDiv;
    },
    mousedown(e) {
      console.log("mousedown", e);
      // e.offsetX
      // e.offsetY
    },
    cancelModal() {
      this.isActiveAdd = false;
      // this.hotAreaShow = false
      this.$emit("close");
      this.clearDrag();
    },
    clearDrag() {
      // this.beginDraw = false

      this.isActiveAdd = false;
      this.couldDrag = false;

      this.pointX = 0;
      this.pointY = 0;

      this.top = 0;
      this.left = 0;
      this.width = 0;
      this.height = 0;
      this.couldDrag = false;
      this.addDivArea = {};
      // this.$emit('close')
    },
    addHot() {
      this.isActiveAdd = true;

      this.initEventListener();
      // dragArea.addEventListener('drop', e => {
      //   top = e.offsetY
      //   left = e.offsetX
      //   console.log('drop')
      //   dragArea.removeEventListener('dragstart ', addDiv)
      // })

      // dragArea.addEventListener('mousedown', e => {
      //   top = e.offsetY
      //   left = e.offsetX
      // })
    },
    saveHotAreaConfig() {
      // this.dataSource
      // this.formDataObject.imageList[this.currentImageIndex] = cloneDeep(this.dataSource)
      // this.formDataObject.imageList.splice(this.currentImageIndex, 1, cloneDeep(this.dataSource))

      // this.$set(this.formDataObject.imageList, this.currentImageIndex, cloneDeep(this.dataSource))
      // this.hotAreaShow = false
      this.$emit("close", false);
    },
    addLinkPage(item) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // 开启产品选择弹窗，以便配置跳转链接
        this.dataSource = item;
        this.pageModalVisible = true;
      }
    },
    addHotArea(item, index) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        this.dataSource = cloneDeep(item);
        this.currentImageIndex = index;
        // this.originImageItem = cloneDeep(item)
        this.hotAreaShow = true;
        this.$emit("close", true);
        this.$nextTick((_) => {
          this.redrawDiv();
        });
      }
    },
    deleteHotAreaItem(item, index) {
      const targetData = this.dataSource.hotAreaConfigInfoList.splice(index, 1);
      const hotAreaList = document.querySelectorAll(".hot_area_item");
      const tempList = Array.from(hotAreaList);
      // 需要想办法将dom中存的对应目标元素和数据中的对应起来，如自定义id等
      const targetDom = tempList.find((e) => {
        return e.getAttribute("hot_area_id") === targetData[0].id;
      });
      if (targetDom) {
        targetDom.remove();
      }
    },
    updateHotAreaLink(item, i) {
      console.log("updateHotAreaLink");
      // console.log(item,'5555555555555');
      this.pageModelId = item.jumpPageId;
      this.pageIndex = item.jumpPageType;
      this.selectedHotAreaId = item.id;
      this.selectedHotAreaIndex = i;
      // this.$set()
      this.pageModalVisible = true;
    },
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
//@import url();

// 非常重要的一步
.hot_area {
  position: relative;
  .hot_image {
    width: 375px;
  }
}

/deep/.hot_area_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@keyframes example {
  from {
    border-style: dashed;
  }
  to {
    // border-color: transparent;
    border-style: dotted;
  }
}
.active_add {
  box-sizing: border-box;
  border-width: 2px;
  border-color: skyblue;
  animation-name: example;
  animation-duration: 0.2s;
  animation-iteration-count: infinite;
}

.content_wrap {
  display: flex;
  .hot_list {
    background-color: #f8f8f8;
    padding: 15px;
    margin-left: 10px;
    flex: auto;
    .hot_info_item {
      // height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      .link {
        width: 150px;
      }
    }
  }
}
</style>

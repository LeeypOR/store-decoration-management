<!-- 图片广告的表单 -->
<template>
  <div class="image_advert_wrap">
    <!-- 模板选择区域 -->
    <div class="choose_wrap">
      <div class="text">
        <span class="label">选择模板</span>
        <span class="result">{{ formDataObject.type | typeNameFilter }}</span>
      </div>
      <div class="radio_group">
        <div
          :class="['inBlBtn', checkedValOne == '1' ? 'checkedBorder' : '']"
          @click="changeTypeRadio('1')"
        >
          <img v-if="checkedValOne == '1'" :src="checkedImage01" alt />
          <img v-else :src="uncheckedImage01" alt />
        </div>
        <div
          :class="['inBlBtn', checkedValOne == '2' ? 'checkedBorder' : '']"
          @click="changeTypeRadio('2')"
        >
          <img v-if="checkedValOne == '2'" :src="checkedImage02" alt />
          <img v-else :src="uncheckedImage02" alt />
        </div>
      </div>
    </div>
    <!-- <div class="line" style="margin-top: 10px">
      <div class="text_wrap">
        <div class="label">图片高度</div>
      </div>
      <a-slider
        class="slider"
        v-model="formDataObject.imgHeight"
        :min="40"
        :max="120"
        style="width: 120px"
      />
      <a-input-number
        v-model="formDataObject.imgHeight"
        :min="40"
        :max="120"
        style="marginleft: 16px"
      />
    </div> -->
    <!-- 广告内容列表配置区域 -->
    <div class="product_wrap">
      <div class="title">添加广告</div>
      <div class="desc">
        最多添加10个广告，鼠标拖拽调整广告顺序，建议宽高比例1:1
      </div>
      <div class="image_wrap">
        <div class="image_list_wrap">
          <draggable class="draggable_wrap" :list="formDataObject.imageList">
            <transition-group
              name="moduleView"
              type="transition"
              class="transition"
              tag="div"
            >
              <div
                class="image_add_wrap"
                v-for="(item, i) of formDataObject.imageList"
                :key="i + 'index'"
              >
                <img
                  class="delete_icon"
                  @click="deleteImageInfo(i)"
                  src="~@images/shop/icon_middle_modalbox_delete_s.png"
                  alt
                />

                <div class="image_info_wrap">
                  <div
                    v-if="item.imageUrl"
                    @click="openUpload('image', item, i)"
                    class="upload_wrap"
                    v-show="checkedValOne == '1'"
                    :style="{
                      background: `url(${item.imageUrl}) no-repeat 50% 50%/cover`,
                    }"
                  >
                    <p class="updateImg">更换图片</p>
                  </div>
                  <div
                    v-else
                    v-show="checkedValOne == '1'"
                    class="upload_wrap uploadBox"
                    @click="openUpload('image', item, i)"
                  >
                    <a-icon type="plus" />
                    <p>上传图片</p>
                  </div>
                  <!-- <ImageUpload
                    class="upload_wrap"
                    v-model="item.imageUrl"
                    uploadText="上传图片"
                    v-show="checkedValOne == '1'"
                  ></ImageUpload> -->
                  <!-- <CropperUpload
                    class="upload_wrap"
                    :options="cropperOptions"
                    :imgSize="10"
                    v-model="item.imageUrl"
                    uploadText="上传图片" /> -->
                  <div class="right">
                    <div class="top line">
                      <div class="label">标题</div>
                      <a-input
                        placeholder="建议6个字以内，可不填"
                        style="width: 100%"
                        v-model="item.imageTitle"
                        :maxLength="6"
                      ></a-input>
                    </div>
                    <div class="bottom line">
                      <div class="label">链接</div>

                      <a @click="addLinkPage(item, i)">{{
                        item | jumpLinkTextFilter
                      }}</a>
                      <!-- <a v-show="item.imageType == '2'" @click="addHotArea(item, i)">
                        {{
                        item | jumpLinkTextFilter
                        }}
                      </a>-->
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="add_btn" @click="addImage">
          <img
            class="icon_add"
            src="~@images/shop/icon_right_attributebar_jiahao.png"
          />
          <span class="text">添加图文导航</span>
        </div>
      </div>
    </div>

    <!-- 样式区域 -->
    <div class="disFlex margT10">
      <span>
        <span class="one">图片样式</span>
        <span class="two">{{
          formDataObject.imgType == 1 ? "固定" : "滑动"
        }}</span>
      </span>
      <span>
        <span
          :class="[
            'icon_btn iconfont icon-icon_right_attributebar_tpysgd_default  lSize',
            formDataObject.imgType == 1 ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('imgType', 1)"
        ></span>
        <span
          :class="[
            'icon_btn mSize iconfont icon-icon_right_attributebar_tpyshd_default1',
            formDataObject.imgType == 2 ? 'icon_btn_check' : '',
          ]"
          @click="changeCheck('imgType', 2)"
        ></span>
      </span>
    </div>
    <div>
      <div class="disFlex margT10">
        <span>
          <span class="one">背景颜色</span>
          <span class="two">{{ formDataObject.backgroundColor }}</span>
        </span>
        <div class="inputColor">
          <span
            class="pointer text-primary"
            @click="resetBackgroundColor('#999999')"
            >重置</span
          >
          <a-input type="color" v-model="formDataObject.backgroundColor" />
        </div>
      </div>
      <div class="disFlex margT10">
        <span>
          <span class="one">文字颜色</span>
          <span class="two">{{ formDataObject.color }}</span>
        </span>
        <div class="inputColor">
          <span class="pointer text-primary" @click="resetColor('#333333')"
            >重置</span
          >
          <a-input type="color" v-model="formDataObject.color" />
        </div>
      </div>
      <!-- <div class="changeColor">
        <span>导航位置</span>
        <a-radio-group :options="[
          {label: '底部', value: '0'},
          {label: '不固定', value: '1'},
        ]"
v-model="formDataObject.isBottom" />
      </div>-->
    </div>

    <video-modal
      :visible="visibleModal"
      @cancel="closeInfoModal"
      :ContentType="ContentType"
      @upload="upload"
      :videoData="videoData"
      :dataIndex="dataIndex"
    ></video-modal>
    <PageModal
      :record="currentRecord"
      @cancel="closeInfoModal"
      @confirm="selectedPage"
      :visible="pageModalVisible"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
    ></PageModal>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ImageRadio from "@components/base/ImageRadio";
import ImageRadioGroup from "@components/base/ImageRadioGroup";
import ImageUpload from "@components/antBase/ImageUpload";
import CropperUpload from "@components/antBase/CropperUpload";
import PageModal from "@components/antBase/PageModal";
import { makeId } from "@/utils";
import videoModal from "@/components/antBase/videoModal";

import { isEmpty, cloneDeep, throttle } from "lodash";
import ImageList from "./ImageList";
export default {
  name: "MyNavBarForm",
  components: {
    draggable,
    [ImageList.name]: ImageList,
    ImageRadio,
    ImageRadioGroup,
    ImageUpload,
    CropperUpload,
    PageModal,
    videoModal,
  },
  filters: {
    jumpLinkTextFilter(item) {
      console.log(item);
      if (item.jumpPageId) {
        return item.jumpPageType == "WXMAID"
          ? item.jumpPageUrl
          : item.jumpPageName;
      } else return "点击选择跳转到的页面";
    },
    typeNameFilter(val) {
      switch (val) {
        case "1":
          return "图片导航";
        case "2":
          return "文字导航";
      }
    },
    styleTypeFilter(val) {
      switch (val) {
        case "1":
          return "常规";
        case "2":
          return "阴影";
        default:
          return `不存在的值${val}`;
      }
    },
    borderTypeFilter(val) {
      switch (val) {
        case "1":
          return "直角";
        case "2":
          return "圆角";
        default:
          return `不存在的值${val}`;
      }
    },
    fillStyleFilter(val) {
      switch (val) {
        case "1":
          return "填充";
        case "2":
          return "周围留白";
        default:
          return `不存在的值${val}`;
      }
    },
    pointerFilter(val) {
      switch (val) {
        case "1":
          return "样式一";
        case "2":
          return "样式二";
        default:
          return `不存在的值${val}`;
      }
    },
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  data() {
    return {
      selectedHotAreaIndex: 0,
      selectedHotAreaId: "",
      pageModalVisible: false,
      currentRecord: {},
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
      couldDrag: false,
      addDivArea: {},

      isActiveAdd: false,
      originImageItem: {},
      currentImageIndex: 0,
      currentImageItem: {},
      hotAreaShow: false,
      timer: null,
      formDataObject: {},
      temlateType: "1",
      checkedImage01: require("@images/shop/icon_middle_modalbox_Navigation_a.png"),
      uncheckedImage01: require("@images/shop/icon_middle_modalbox_Navigation_b.png"),
      checkedImage02: require("@images/shop/icon_left_assemblybar_bttw_default_a.png"),
      uncheckedImage02: require("@images/shop/icon_left_assemblybar_bttw_default.png"),
      checkedImage03: require("@images/shop/tag_03_active.png"),
      uncheckedImage03: require("@images/shop/tag_03_inactive.png"),
      checkedValOne: "1", // 单选按钮
      // form: this.$form.createForm(this, { name: 'componentform', onValuesChange: this.updateFormData })
      pageModelId: "",
      pageIndex: "MSPAGE",
      // 图片裁剪
      cropperOptions: {
        full: true,
        high: true,
        infoTrue: true,
        centerBox: true, // 截图框是否被限制在图片里面
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 180, //默认生成截图框宽度
        autoCropHeight: 180, //默认生成截图框高度
        fixedBox: false, //是否固定截图框大小 不允许改变
        fixed: true,
        previewsCircle: false, //预览图是否是圆形
      },
      visibleModal: false,
      ContentType: "image",
      videoData: {},
      dataIndex: "",
    };
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.computeItemWH();
        this.timer = setTimeout(() => {
          this.$emit("updateFormData", this.formDataObject);
        }, 300);
      },
      deep: true,
    },
  },

  created() {
    this.formDataObject = cloneDeep(this.formData);
  },

  mounted() {
    this.checkedValOne = this.formDataObject.type || "1";
  },
  beforeDestroy() {
    document.removeEventListener("mouseup", this.mouseupEvent);
    document.removeEventListener("mousemove", this.mousemoveEvent);
  },
  methods: {
    // //上传操作结束
    // cropClose() {
    //   console.log('上传操作结束')
    // },
    // //上传图片成功
    // cropSuccess(data) {
    //   this.imgUrl = data
    // },
    // 计算第一张图片高度
    upload(val, index) {
      this.visibleModal = false;
      this.videoData = val;
      if (this.ContentType == "video") {
        // this.$set(this.formDataObject, "videoUrl", val.fileUrl);
        // this.$set(this.formDataObject, "imgUrl", val.video.coverPicture);
      } else {
        // this.formDataObject.imgUrl = url
        const imgList = this.formDataObject.imageList;
        imgList[index * 1].imageUrl = val.fileUrl;
        this.$set(this.formDataObject, "imageList", imgList);
      }
    },
    // 打开上传组件
    openUpload(a, item, index) {
      if (a == "video") {
        // this.checkValue = { videoUrl: item.videoUrl };
      } else {
        this.checkValue = { imgUrl: item.imageUrl };
      }
      this.ContentType = a;
      this.dataIndex = index + "";
      this.visibleModal = true;
    },
    computeItemWH() {
      let _this = this;
      let len = this.formDataObject.imageList.length;
      let itemNum = 5;
      switch (len) {
        case 1:
          itemNum = 1;
          break;
        case 2:
          itemNum = 2;
          break;
        case 3:
          itemNum = 3;
          break;
        case 4:
          itemNum = 4;
          break;
        case 5:
          itemNum = 5;
          break;
        default:
          itemNum = 5;
          break;
      }
      if (this.formDataObject.imageList[0].imageUrl) {
        var img = new Image();
        // 改变图片的src
        img.src = _this.formDataObject.imageList[0].imageUrl;
        img.onload = function () {
          let imgW = img.width;
          let imgH = img.height;
          let firstImgW = 373 * (1 / itemNum) * 0.98;
          let scale = firstImgW / imgW;
          let firstImgH = imgH * scale;
          _this.$set(_this.formDataObject, "boxHeight", firstImgH);
        };
      } else {
        _this.$set(
          _this.formDataObject,
          "boxHeight",
          373 * (1 / itemNum) * 0.98
        );
      }
    },
    changeCheck(a, b) {
      const { formDataObject } = this;
      formDataObject[a] = b;
    },
    // 重置颜色
    resetColor(a) {
      // this.formDataColor.i=a;
      this.formDataObject.color = a;
    },
    resetBackgroundColor(a) {
      this.formDataObject.backgroundColor = a;
    },

    deleteImageInfo(index) {
      this.formDataObject.imageList.splice(index, 1);
    },
    addImage() {
      if (this.formDataObject.imageList.length >= 10) {
        this.$message.warning("最多添加10个导航");
        return false;
      }

      const initialConfig = {
        imageType: this.checkedValOne, //
        imageUrl: "", // 显示图片的链接
        imageTitle: "", // 标题
        jumpPageId: "", // 跳转的页面的id
        jumpPageName: "", // 跳转的页面的名称
        jumpPageUrl: "", // 跳转的页面的地址，字符串
        hotAreaConfigInfoList: [
          // 热区选区信息集合。
        ],
      };
      this.formDataObject.imageList.push(initialConfig);
    },
    redrawDiv() {
      this.currentImageItem.hotAreaConfigInfoList.forEach((item, i) => {
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
    test() {
      console.log("test");
    },
    deleteHotAreaItem(item, index) {
      const targetData = this.currentImageItem.hotAreaConfigInfoList.splice(
        index,
        1
      );
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
      this.selectedHotAreaId = item.id;
      this.selectedHotAreaIndex = i;
      // this.$set()
      this.pageModalVisible = true;
    },

    closeInfoModal(type) {
      console.log(type, "type");
      this.pageModalVisible = false;
      this.visibleModal = false;
    },
    // 单链接和热区用的一个模态框，需要根据imagetype区分一下单链接和热区的数据格式。
    selectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type);
      this.$set(this.currentImageItem, "jumpPageId", id);
      this.$set(this.currentImageItem, "jumpPageName", name);
      this.$set(this.currentImageItem, "jumpPageUrl", url);
      this.$set(this.currentImageItem, "jumpPageType", type);
      this.pageModalVisible = false;
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

        this.pointX = e.pageX;
        this.pointY = e.pageY;

        this.couldDrag = true;
        // this.beginDraw = true
        // 找出最大序号是多少，然后加一。
        let sort = 0;
        if (this.currentImageItem.hotAreaConfigInfoList.length) {
          sort = Math.max.apply(
            Math,
            this.currentImageItem.hotAreaConfigInfoList.map((item) => item.sort)
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
          "this.currentImageItem.hotAreaConfigInfoList",
          this.currentImageItem.hotAreaConfigInfoList
        );
        effectiveDivList.forEach((dom) => {
          console.log("dom", dom.getAttribute("hot_area_id"));
        });

        const hadExistDivList = effectiveDivList.filter((dom) =>
          this.currentImageItem.hotAreaConfigInfoList.find(
            (item) => dom.getAttribute("hot_area_id") == item.id
          )
        );

        const newAddDivList = effectiveDivList.filter(
          (dom) =>
            !this.currentImageItem.hotAreaConfigInfoList.find(
              (item) => item.id === dom.getAttribute("hot_area_id")
            )
        );
        console.log("hadExistDivList", hadExistDivList);
        console.log("newAddDivList", newAddDivList);

        // 清除宽高为0的区域,优化dom结构，同时避免序号下标异常。
        zeroPointDivList.forEach((e) => e.remove());

        const newAddHotConfigList = newAddDivList.map((item, i) => ({
          top: item.style.top,
          left: item.style.left,
          width: item.style.width,
          height: item.style.height,
          sort: item.getAttribute("hot_area_sort"),
          id: item.getAttribute("hot_area_id"),
          jumpPageId: "",
          jumpPageName: "",
          jumpPageUrl: "",
        }));

        this.currentImageItem.hotAreaConfigInfoList.push(
          ...newAddHotConfigList
        );
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
      // const divSort = id ? sort : this.currentImageItem.hotAreaConfigInfoList.length + 1
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
      // this.currentImageItem
      // this.formDataObject.imageList[this.currentImageIndex] = cloneDeep(this.currentImageItem)
      this.formDataObject.imageList.splice(
        this.currentImageIndex,
        1,
        cloneDeep(this.currentImageItem)
      );
      // this.$set(this.formDataObject.imageList, this.currentImageIndex, cloneDeep(this.currentImageItem))
      this.hotAreaShow = false;
    },
    addLinkPage(item) {
      console.log(item);
      if (!item.imageUrl && this.checkedValOne === "1") {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // 开启产品选择弹窗，以便配置跳转链接
        this.currentImageItem = item;
        this.pageModelId = item.jumpPageId;
        this.pageIndex = item.jumpPageType;
        this.pageModalVisible = true;
      }
    },
    addHotArea(item, index) {
      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        this.currentImageItem = cloneDeep(item);
        this.currentImageIndex = index;
        // this.originImageItem = cloneDeep(item)
        this.hotAreaShow = true;
        this.$nextTick((_) => {
          this.redrawDiv();
        });
      }
    },
    // updateComponentData () {
    // 	console.log('修改了数据', this.formDataObject)
    // 	this.$emit('updateFormData', this.formDataObject)
    // },
    changeTypeRadio(val) {
      this.checkedValOne = val;
      this.formDataObject.type = val;
      // this.formDataObject.imageList.forEach((item) => {
      //   // item.imageType = val;
      //   this.$set(item, 'imageType', val)
      // })
      console.log(this.formDataObject.imageList);
      // 只有一行一个模板，才能选择热区。
      // if (val !== '1') {
      //   this.formDataObject.imageList.forEach((item) => {
      //     item.imageType = '1'
      //   })
      // }
    },
    changeRadio(val) {
      console.log("val", val);
    },

    // updateFormData (props, value) {
    //   // let formData = this.form.getFieldsValue() // formData是表单项更改之前的所有表单值，所以需要和刚更改的表单值合并
    //   // Object.assign(formData, value)
    //   // formData = Object.assign({}, this.formData, formData, value)
    //   this.$emit('updateFormData', this.formDataObject)
    // }
  },
};
</script>
<style lang="less" scoped>
@labelColor: #999;
@resultColor: #333;

@media (max-width: 1366px) {
  .image_list_wrap {
    max-height: 175px;
  }
}
@media (min-width: 1367px) {
  .image_list_wrap {
    max-height: 285px;
  }
}
.image_advert_wrap {
  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    .text_wrap {
      display: flex;
      align-items: center;
      .label {
        color: @labelColor;
      }
      .result {
        color: @resultColor;
        margin-left: 16px;
      }
    }
    /deep/ .slider {
      &:hover {
        .ant-slider-track {
          background-color: #016bff;
        }
      }
      .ant-slider-track {
        background-color: #016bff;
      }
    }
  }

  .choose_wrap {
    padding-bottom: 14px;
    border-bottom: solid 1px #e6e6e6;
    .text {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      margin: 20px 0 10px;
      .label {
        color: @labelColor;
        margin-right: 16px;
      }
      .result {
        color: @resultColor;
      }
    }
    // .image_radio_group {
    // }
  }
  .product_wrap {
    .title {
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #333333;
      margin: 8px 0 8px;
    }
    .desc {
      font-size: 12px;
      color: #999999;
    }
    .image_wrap {
      background-color: #fafafa;
      padding: 12px 0;
      padding-right: 12px;
      .image_list_wrap {
        overflow-y: scroll;
        overflow-x: hidden;
        .image_add_wrap {
          position: relative;
          background-color: #fff;
          box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
          border-radius: 2px;
          border-radius: 2px;
          padding: 12px;
          margin: 12px;
          .delete_icon {
            width: 16px;
            height: 16px;
            position: absolute;
            top: -8px;
            right: -8px;
            cursor: pointer;
            display: none;
          }
          &:hover {
            .delete_icon {
              display: block;
            }
          }

          // .image_type_choose {
          // }
          .image_info_wrap {
            margin-top: 13px;
            display: flex;
            // .upload_wrap {
            // }
            /deep/ .upload_wrap {
              .avatar-uploader .ant-upload {
                width: 60px;
                height: 60px;
                margin-right: 0;
                margin-bottom: 0;
                // .image_wrap {
                //   .image {
                //     // height: 60px;
                //     // width: unset;
                //   }
                // }
              }
            }
            .right {
              margin-left: 12px;
              flex: auto;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              // .top {
              //   .label {
              //   }
              // }
              .line {
                display: flex;
                align-items: center;
                margin-top: 0;
                .label {
                  white-space: nowrap;
                  margin-right: 16px;
                }
                a {
                  width: 170px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
          /deep/.image_type_choose {
            width: 100%;
            display: flex;
            .ant-radio-button-wrapper {
              flex: 1 1 50%;
              text-align: center;
            }
            .ant-radio-button-wrapper-checked {
              background: #e0edff;
              border-color: #016bff;
            }
          }
        }
      }
      .add_btn {
        margin-top: 12px;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        position: relative;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        background-color: #fff;
        color: #016bff;
        border: 1px solid #016bff;
        .icon_add {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          width: 30px;
          height: 30px;
        }
        // .text {
        // }
      }
    }
  }
}
.tips_wrap {
  color: #999;
  height: 110px;
}

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
.radio_group {
  cursor: pointer;
  .inBlBtn {
    display: inline-block;
    width: 115px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #ccc;
    img {
      width: 20px;
      height: 20px;
    }
  }
  > .inBlBtn:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  > .inBlBtn:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .checkedBorder {
    border: 1px solid #016bff;
  }
}
.disFlex {
  display: flex;
  justify-content: space-between;
  span {
    span {
      height: 32px;
      line-height: 32px;
      vertical-align: middle;
    }
  }
  .one {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #999999;
  }
  .two {
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
  }
  .icon_btn {
    display: inline-block;
    cursor: pointer;
    width: 40px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #e6e6e6;
    text-align: center;
    font-size: 32px;
    border-radius: 3px;
  }
  .smallSize {
    font-size: 12px;
  }
  .mSize {
    font-size: 14px;
  }
  .lSize {
    font-size: 16px;
  }
  .icon_btn_check {
    background: #e0edff;
    border: 1px solid #016bff;
    color: #016bff;
  }
  .fontBold {
    font-weight: bold;
  }
  .check_radio {
    height: 32px;
    line-height: 32px;
    ._check {
      cursor: pointer;
      width: 16px;
      height: 16px;
      border: 1px solid #c8c8c8;
      border-radius: 2px;
    }
    .icon-Checkbox {
      font-size: 16px;
      color: #016bff;
    }
  }
  .inputColor {
    display: inline-block;
    width: 180px;
    text-align: right;
    height: 32px;
    line-height: 38px;
    /deep/.ant-input {
      display: inline-block;
      width: 120px;
      padding: 0;
      height: 24px;
    }
    .text-primary {
      display: inline-block;
      height: 24px;
      line-height: 24px;
      margin-right: 10px;
    }
  }
}
.margT10 {
  margin-top: 10px;
}
.disFlex {
  display: flex;
  justify-content: space-between;
}
.uploadBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    text-align: center;
    font-size: 12px;
    margin-top: 4px;
  }
}
.upload_wrap {
  width: 60px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  .updateImg {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    position: absolute;
    bottom: 0;
    text-align: center;
    white-space: nowrap;
    font-size: 12px;
  }
}
.upload_wrap:hover {
  border-color: skyblue;
}
</style>

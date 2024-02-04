<!-- 图片广告的表单 -->
<template>
  <div class="image_advert_wrap">
    <!-- 模板选择区域 -->
    <div class="choose_wrap">
      <div class="text">
        <span class="label">选择模板</span>
        <span class="result">
          {{ formDataObject.type | typeNameFilter }}
        </span>
      </div>
      <ImageRadioGroup
        class="image_radio_group"
        @change="changeTypeRadio"
        v-model="formDataObject.type"
      >
        <ImageRadio
          tighten
          value="1"
          width="115px"
          height="32px"
          :checkedImage="checkedImage01"
          :uncheckedImage="uncheckedImage01"
        ></ImageRadio>
        <ImageRadio
          tighten
          value="2"
          width="115px"
          height="32px"
          :checkedImage="checkedImage02"
          :uncheckedImage="uncheckedImage02"
        ></ImageRadio>
        <ImageRadio
          tighten
          value="3"
          width="115px"
          height="32px"
          :checkedImage="checkedImage03"
          :uncheckedImage="uncheckedImage03"
        ></ImageRadio>
      </ImageRadioGroup>

      <div
        class="line"
        style="margin-top: 0"
        v-if="formDataObject.type === '2' || formDataObject.type === '3'"
      >
        <div class="text_wrap">
          <div class="label">轮播图高度</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.carouselHeight"
          :min="200"
          :max="800"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.carouselHeight"
          :min="200"
          :max="800"
          style="marginleft: 16px"
        />
      </div>
    </div>

    <!-- 广告内容列表配置区域 -->
    <div class="product_wrap">
      <div class="title">添加广告</div>
      <div class="desc">
        最多添加10个广告，鼠标拖拽调整广告顺序，建议宽度750像素
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
                  alt=""
                />
                <a-radio-group
                  v-if="formDataObject.type === '1'"
                  class="image_type_choose"
                  v-model="item.imageType"
                >
                  <a-radio-button value="1"> 单链接 </a-radio-button>
                  <a-radio-button value="2"> 热区 </a-radio-button>
                </a-radio-group>
                <div class="image_info_wrap">
                  <div
                    v-if="item.imageUrl"
                    @click="openUpload('image', item, i)"
                    class="upload_wrap"
                    :style="{
                      background: `url(${item.imageUrl}) no-repeat 50% 50%/cover`,
                    }"
                  >
                    <p class="updateImg">更换图片</p>
                  </div>
                  <div
                    v-else
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
                  ></ImageUpload> -->
                  <div class="right">
                    <div class="top line">
                      <div class="label">标题</div>
                      <a-input
                        placeholder="建议10个字以内，可不填"
                        style="width: 100%"
                        v-model="item.title"
                      ></a-input>
                    </div>
                    <div class="bottom line">
                      <div class="label">链接</div>
                      <a
                        v-show="item.imageType == '1'"
                        @click="addLinkPage(item, i)"
                        >{{ item | jumpLinkTextFilter }}</a
                      >
                      <a
                        v-show="item.imageType == '2'"
                        @click="addHotArea(item, i)"
                        >{{ item | jumpLinkTextFilter }}</a
                      >
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
          <span class="text">添加背景图</span>
        </div>
      </div>
    </div>

    <!-- 样式区域 -->
    <div class="style_wrap">
      <div class="line">
        <div class="text_wrap">
          <div class="label">图片样式</div>
          <div class="result">
            {{ formDataObject.styleType | styleTypeFilter }}
          </div>
        </div>
        <ImageRadioGroup
          @change="changeRadio"
          v-model="formDataObject.styleType"
        >
          <ImageRadio
            tighten
            value="1"
            width="50px"
            height="32px"
            :checkedImage="checkedImage04"
            :uncheckedImage="uncheckedImage04"
          ></ImageRadio>
          <ImageRadio
            tighten
            value="2"
            width="50px"
            height="32px"
            :checkedImage="checkedImage05"
            :uncheckedImage="uncheckedImage05"
          ></ImageRadio>
        </ImageRadioGroup>
      </div>
      <div class="line">
        <div class="text_wrap">
          <div class="label">图片倒角</div>
          <div class="result">
            {{ formDataObject.borderType | borderTypeFilter }}
          </div>
        </div>
        <ImageRadioGroup
          @change="changeRadio"
          v-model="formDataObject.borderType"
        >
          <ImageRadio
            tighten
            value="1"
            width="50px"
            height="32px"
            :checkedImage="checkedImage06"
            :uncheckedImage="uncheckedImage06"
          ></ImageRadio>
          <ImageRadio
            tighten
            value="2"
            width="50px"
            height="32px"
            :checkedImage="checkedImage07"
            :uncheckedImage="uncheckedImage07"
          ></ImageRadio>
        </ImageRadioGroup>
      </div>
      <div class="line" v-if="formDataObject.type === '2'">
        <div class="text_wrap">
          <div class="label">填充样式</div>
          <div class="result">
            {{ formDataObject.fillStyle | fillStyleFilter }}
          </div>
        </div>
        <ImageRadioGroup
          @change="changeRadio"
          v-model="formDataObject.fillStyle"
        >
          <ImageRadio
            tighten
            value="1"
            width="50px"
            height="32px"
            :checkedImage="checkedImage08"
            :uncheckedImage="uncheckedImage08"
          ></ImageRadio>
          <ImageRadio
            tighten
            value="2"
            width="50px"
            height="32px"
            :checkedImage="checkedImage09"
            :uncheckedImage="uncheckedImage09"
          ></ImageRadio>
        </ImageRadioGroup>
      </div>
      <div class="line" v-if="formDataObject.type === '2'">
        <div class="text_wrap">
          <div class="label">指示器</div>
          <div class="result">{{ formDataObject.pointer | pointerFilter }}</div>
        </div>
        <ImageRadioGroup @change="changeRadio" v-model="formDataObject.pointer">
          <ImageRadio
            tighten
            value="1"
            width="50px"
            height="32px"
            :checkedImage="checkedImage10"
            :uncheckedImage="uncheckedImage10"
          ></ImageRadio>
          <ImageRadio
            tighten
            value="2"
            width="50px"
            height="32px"
            :checkedImage="checkedImage11"
            :uncheckedImage="uncheckedImage11"
          ></ImageRadio>
        </ImageRadioGroup>
      </div>

      <div class="line">
        <div class="text_wrap">
          <div class="label">页面边距</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.pagePadding"
          :max="30"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.pagePadding"
          :max="30"
          style="marginleft: 16px"
        />
      </div>

      <div
        class="line"
        v-if="formDataObject.type === '1' || formDataObject.type === '3'"
      >
        <div class="text_wrap">
          <div class="label">图片间距</div>
        </div>
        <a-slider
          class="slider"
          v-model="formDataObject.imagePadding"
          :max="30"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.imagePadding"
          :max="30"
          style="marginleft: 16px"
        />
      </div>
    </div>
    <!--
    <a-form class="my-banner" :form="form" :onValuesChange="updateFormData"  :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
      <a-form-item label="高度">
        <a-slider
          v-decorator="['height']"
          :max="400"
          :min="150"
        />
      </a-form-item>
      <a-form-item label="图片倒角">
        <a-radio-group
          :options="[
            {label: '直角', value: '0'},
            {label: '圆角', value: '4px'},
          ]"
          v-decorator="['borderRadius']"
        />
      </a-form-item>
      <a-form-item label="图片列表">
        <my-image-list
          v-decorator="['list']"
        />
      </a-form-item>
    </a-form> -->
    <a-modal
      :zIndex="999"
      destroyOnClose
      class="hot_modal"
      :width="740"
      :maskClosable="false"
      v-model="hotAreaShow"
      title="热区编辑器"
      @cancel="cancelModal"
    >
      <!-- <div class="tips_wrap">
        <div class="add_doing" >
          <p>小提示：</p>
          <p>1、点击【添加热区】按钮，进入热区绘制状态。</p>
          <p>2、在图片区域，按住鼠标左键，开始绘制热区。</p>
          <p>3、松开鼠标左键，绘制完成，退出热区绘制状态。</p>
          <p>4、点击【保存】按钮，以保存热区信息</p>
        </div>
      </div> -->
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
              :src="currentImageItem.imageUrl"
            />
          </div>
        </div>

        <div class="hot_list">
          <div
            class="hot_info_item"
            v-for="(item, i) of currentImageItem.hotAreaConfigInfoList"
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
    </a-modal>

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
import PageModal from "@components/antBase/PageModal";
import { makeId } from "@/utils";
import videoModal from "@/components/antBase/videoModal";
import { isEmpty, cloneDeep, throttle } from "lodash";
export default {
  name: "PictureAdvertisementForm",
  components: {
    draggable,
    ImageRadio,
    ImageRadioGroup,
    ImageUpload,
    PageModal,
    videoModal,
  },
  filters: {
    jumpLinkTextFilter(item) {
      if (item.imageType == "1") {
        console.log("item.jumpPageId", item.jumpPageId, item.jumpPageName);
        if (item.jumpPageId) {
          return item.jumpPageType == "WXMAID"
            ? item.jumpPageUrl
            : item.jumpPageName;
        } else return "点击选择跳转到的页面";
      } else if (item.imageType == "2") {
        if (item.hotAreaConfigInfoList.length) {
          return `已添加${item.hotAreaConfigInfoList.length}个热区`;
        } else return "添加热区";
      }
    },
    typeNameFilter(val) {
      switch (val) {
        case "1":
          return "一行一个";
        case "2":
          return "轮播";
        case "3":
          return "小图滑动";
        default:
          return `不存在的值${val}`;
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
      dragHeight: 0,
      couldDrag: false,
      addDivArea: {},
      isActiveAdd: false,

      // originImageItem: {},
      currentImageIndex: 0,
      currentImageItem: {},
      hotAreaShow: false,
      timer: null,
      formDataObject: {},
      temlateType: "1",
      checkedImage01: require("@images/shop/tag_01_active.png"),
      uncheckedImage01: require("@images/shop/tag_01_inactive.png"),
      checkedImage02: require("@images/shop/tag_02_active.png"),
      uncheckedImage02: require("@images/shop/tag_02_inactive.png"),
      checkedImage03: require("@images/shop/tag_03_active.png"),
      uncheckedImage03: require("@images/shop/tag_03_inactive.png"),

      checkedImage04: require("@images/shop/icon_right_attributebar_wyy_selected.png"),
      uncheckedImage04: require("@images/shop/icon_right_attributebar_wyy_default.png"),
      checkedImage05: require("@images/shop/icon_right_attributebar_yinying_selected.png"),
      uncheckedImage05: require("@images/shop/icon_right_attributebar_yinying_default.png"),
      checkedImage06: require("@images/shop/icon_right_attributebar_zhijiao_selected.png"),
      uncheckedImage06: require("@images/shop/icon_right_attributebar_zhijiao_default.png"),
      checkedImage07: require("@images/shop/icon_right_attributebar_yuanjiao_selected.png"),
      uncheckedImage07: require("@images/shop/icon_right_attributebar_yuanjiao_default.png"),

      checkedImage08: require("@images/shop/icon_right_attributebar_tianchong_selected.png"),
      uncheckedImage08: require("@images/shop/icon_right_attributebar_tianchong_default.png"),
      checkedImage09: require("@images/shop/icon_right_attributebar_zwlb_selected.png"),
      uncheckedImage09: require("@images/shop/icon_right_attributebar_zwlb_default.png"),
      checkedImage10: require("@images/shop/icon_right_attributebar_tzzsq_selected.png"),
      uncheckedImage10: require("@images/shop/icon_right_attributebar_tzzsq_default.png"),
      checkedImage11: require("@images/shop/icon_right_attributebar_szzsq_selected.png"),
      uncheckedImage11: require("@images/shop/icon_right_attributebar_szzsq_default.png"),

      // form: this.$form.createForm(this, { name: 'componentform', onValuesChange: this.updateFormData })
      pageModelId: "",
      pageIndex: "MSPAGE",
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
        this.timer = setTimeout(() => {
          // console.log('修改了拷贝数据', this.formDataObject)
          this.$emit("updateFormData", this.formDataObject);
        }, 300);
        // console.log(this.formDataObject, '25252525252525')
      },
      deep: true,
    },
  },

  created() {
    this.formDataObject = cloneDeep(this.formData);
  },

  mounted() {},
  beforeDestroy() {
    document.removeEventListener("mouseup", this.mouseupEvent);
    document.removeEventListener("mousemove", this.mousemoveEvent);
  },
  methods: {
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
    deleteImageInfo(index) {
      this.formDataObject.imageList.splice(index, 1);
    },
    addImage() {
      console.log(
        "this.formDataObject.imageList",
        this.formDataObject.imageList
      );
      if (this.formDataObject.imageList.length >= 10) {
        this.$message.warning("最多添加10个广告");
        return false;
      }

      const initialConfig = {
        imageType: "1", // 1、单链接,2、热区
        imageUrl: "", // 显示图片的链接
        title: "", // 标题
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
      // console.log(item,'6666666666666666666');
      this.selectedHotAreaId = item.id;
      this.selectedHotAreaIndex = i;
      this.pageModelId = item.jumpPageId;
      this.pageIndex = item.jumpPageType;
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
      console.log(
        "收到的已选择信息为:",
        id,
        name,
        type,
        url,
        this.currentImageItem.imageType
      );
      if (this.currentImageItem.imageType == "1") {
        this.$set(this.currentImageItem, "jumpPageId", id);
        this.$set(this.currentImageItem, "jumpPageName", name);
        this.$set(this.currentImageItem, "jumpPageUrl", url);
        this.$set(this.currentImageItem, "jumpPageType", type);
      } else if (this.currentImageItem.imageType == "2") {
        let target =
          this.currentImageItem.hotAreaConfigInfoList[
            this.selectedHotAreaIndex
          ];
        this.$set(target, "jumpPageId", id);
        this.$set(target, "jumpPageName", name);
        this.$set(target, "jumpPageUrl", url);
        this.$set(target, "jumpPageType", type);
      } else {
        return false;
      }
      console.log("收到的已选择信息后：", this.currentImageItem);
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
        this.dragHeight = maxHeight

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
          dragHeight: this.dragHeight,
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
      console.log(item, "4444444444444444444");

      if (!item.imageUrl) {
        this.$message.warning("请先上传图片！");
        return false;
      } else {
        // 开启产品选择弹窗，以便配置跳转链接
        this.pageModelId = item.jumpPageId;
        this.pageIndex = item.jumpPageType;
        this.currentImageItem = item;
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
      // 只有一行一个模板，才能选择热区。
      if (val !== "1") {
        this.formDataObject.imageList.forEach((item) => {
          item.imageType = "1";
        });
      }
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
            .upload_wrap {
              width: 60px;
              height: 60px;
            }
            /deep/ .upload_wrap {
              .avatar-uploader .ant-upload {
                width: 60px;
                height: 60px;
                margin-right: 0;
                margin-bottom: 0;
                // .image_wrap {
                //   .image {
                //     height: 60px;
                //     width: unset;
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

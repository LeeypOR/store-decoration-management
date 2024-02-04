<template>
  <div class="attr_main">
    <div class="attr_page_title" v-if="Tab == 1">个人信息</div>
    <!-- <a-input placeholder="Basic usage" v-model="atext" @change="onChange" /> -->
    <!-- <ImageUpload :changeUploadText="'更换图片'" v-model="atext"></ImageUpload> -->
    <a-form-model
      ref="ruleForm"
      :model="personalInfo"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      v-if="Tab == 1"
    >
      <a-form-model-item label="背景图">
        <div style="display: flex">
          <div
            class="imgBox"
            @click="uploadImg"
            v-if="personalInfo.backgroundImage == ''"
          >
            <a-icon type="plus" class="addIcon" />
            <p>上传图片</p>
          </div>
          <div class="image_wrap" @click="uploadImg" v-else>
            <img class="image" :src="personalInfo.backgroundImage" />
            <div class="text">更换图片</div>
          </div>
          <p
            style="
              margin-left: 5px;
              font-weight: 400;
              color: #999999;
              font-size: 12px;
            "
          >
            建议尺寸750*344像素
          </p>
        </div>
      </a-form-model-item>
      <a-form-model-item label="个人头像位置">
        <a-radio-group
          v-model="personalInfo.portraitLocation"
          @change="avatarChange"
        >
          <a-radio :value="1"> 居左 </a-radio>
          <a-radio :value="2"> 居中 </a-radio>
          <!-- <a-radio :value="2"> 居右 </a-radio> -->
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="个人昵称颜色">
        <div class="select_bg flex">
          <div class="right flex">
            <a-input
              class="color_select"
              type="color"
              v-model="personalInfo.nicknameColor"
              @change="setBgColor"
            />
            <span class="color_reset" @click="resetColor">重置</span
            ><span class="item_value">{{ personalInfo.nicknameColor }}</span>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="会员等级">
        <a-radio-group
          v-model="personalInfo.isShowMemberLevel"
          @change="showMemberLevelChange"
        >
          <a-radio :value="1"> 展示 </a-radio>
          <a-radio :value="0"> 隐藏 </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <!-- <a-form-model-item
        label="会员栏样式"
        v-if="personalInfo.isShowMemberLevel == 1"
      >
        <a-radio-group
          v-model="personalInfo.memberStyle"
          @change="memberStyleChange"
        >
          <a-radio :value="1"> 样式一 </a-radio>
          <a-radio :value="2"> 样式二 </a-radio>
          <a-radio :value="3"> 样式三 </a-radio>
        </a-radio-group>
      </a-form-model-item> -->
    </a-form-model>
    <div
      class="levelBox"
      v-if="Tab == 1 && personalInfo.isShowMemberLevel == 1"
    >
      <div class="isShowEquity">
        <a-checkbox v-model="personalInfo.isUpgrade">是否显示升级</a-checkbox>
      </div>
      <div class="equityText" v-show="personalInfo.isUpgrade">
        <a-form-model
          ref="LevelForm"
          :model="personalInfo"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          style="margin-top: 15px"
          :rules="rules1"
        >
          <a-form-model-item
            label="自定义文字"
            prop="upgradeMsg"
            ref="upgradeMsg"
          >
            <a-input
              @blur="
                () => {
                  $refs.upgradeMsg.onFieldBlur();
                }
              "
              placeholder="请输入名称"
              :max-length="8"
              v-model="personalInfo.upgradeMsg"
              style="width: 220px; padding-right: 40px"
            />
            <span class="limitWords" v-if="personalInfo.upgradeMsg"
              >{{ personalInfo.upgradeMsg.length || 0 }}/8</span
            >
          </a-form-model-item>
          <!-- <a-form-model-item label="请选择付费会员">
            <span
              class="toAddress"
              v-if="personalInfo.upgradeTargetName"
              @click="chooseLevel(personalInfo)"
              >{{ personalInfo.upgradeTargetName }}</span
            >
            <span class="toAddress" v-else @click="chooseLevel"
              >请选择付费会员</span
            >
          </a-form-model-item> -->
        </a-form-model>
      </div>
    </div>
    <div class="attr_page_title" v-show="Tab == 2">广告位</div>
    <a-form-model
      ref="ruleForm"
      :model="adSpaceList"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      v-show="Tab == 2"
    >
      <a-form-model-item label="选择模板">
        <span class="result">
          {{ adSpaceList.templateType | typeNameFilter }}
        </span>
        <ImageRadioGroup
          class="image_radio_group"
          v-model="adSpaceList.templateType"
          @change="changeTypeRadio"
        >
          <!-- <ImageRadio
            tighten
            value="1"
            width="80px"
            height="26px"
            :checkedImage="checkedImage01"
            :uncheckedImage="uncheckedImage01"
          ></ImageRadio> -->
          <ImageRadio
            tighten
            value="1"
            width="80px"
            height="26px"
            :checkedImage="checkedImage02"
            :uncheckedImage="uncheckedImage02"
          ></ImageRadio>
          <!-- <ImageRadio
            tighten
            value="3"
            width="80px"
            height="26px"
            :checkedImage="checkedImage03"
            :uncheckedImage="uncheckedImage03"
          ></ImageRadio> -->
        </ImageRadioGroup>
      </a-form-model-item>
      <a-form-model-item label="添加图片"
        ><p>最多添加5个广告,可拖动排序</p>
        <div style="margin-top: -15px; color: #999">
          建议图片尺寸710*200像素
        </div>
      </a-form-model-item>
    </a-form-model>
    <a-form-model
      ref="adSpaceList"
      :model="adSpaceList"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      v-show="Tab == 2 && adSpaceList.spaceImages.length > 0"
    >
      <draggable class="draggable_wrap" :list="adSpaceList.spaceImages">
        <div class="ImgList" v-for="(l, i) in adSpaceList.spaceImages" :key="i">
          <div class="uploadpic">
            <a-form-model-item
              :prop="'spaceImages.' + i + '.image'"
              :rules="{
                required: true,
                message: '请上传图片',
                trigger: 'blur',
              }"
            >
              <image-upload
                :changeUploadText="'更换图片'"
                v-model="l.image"
              ></image-upload>
            </a-form-model-item>
          </div>
          <div class="ImgListRight">
            <a-form-model-item label="标题">
              <a-input
                autocomplete="on"
                placeholder="请输入标题名称"
                v-model.trim="l.title"
              />
            </a-form-model-item>
            <a-form-model-item
              label="链接"
              :rules="{
                required: true,
                message: '请选择跳转的页面',
                trigger: 'change',
              }"
            >
              <a-input
                placeholder="请选择跳转的页面"
                v-model="l.jumpTargetName"
                @click="chooseAddress(l, i)"
                :style="
                  l.jumpTargetName == '' && error > 0
                    ? 'border:1px solid red'
                    : ''
                "
              />
              <div class="attention" v-if="l.jumpTargetName == '' && error > 0">
                请选择跳转页面
              </div>
            </a-form-model-item>
          </div>
          <a-icon type="close-circle" class="closeIcon" @click="deleteOne(i)" />
        </div>
      </draggable>
    </a-form-model>
    <div class="attr_page_title" v-if="Tab == 3">必备工具</div>
    <div class="styleBtn" v-if="Tab == 3">
      <span>图标风格</span>
      <a-radio-group
        v-model="styleType.styleType"
        size="default"
      >
        <a-radio-button value="1"> 填色版 </a-radio-button>
        <a-radio-button value="2"> 线框版 </a-radio-button>
      </a-radio-group>
    </div>
    <div class="toolBox" v-if="Tab == 3">
      <div class="paytation">可拖动排序</div>
      <draggable class="draggable_wrap" :list="menuList">
        <div class="tool" v-for="(l, i) in menuList" :key="i">
          <a-checkbox @change="isShowChange" v-model="l.isShow">{{
            l.toolCode | filterMenuName
          }}</a-checkbox>
        </div>
      </draggable>
    </div>
    <upload-modal
      :visible="visible"
      @cancel="closeInfoModal"
      @getImgUrl="getImgUrl"
    ></upload-modal>
    <div class="actions" v-if="adSpaceList.spaceImages">
      <a-button
        v-if="adSpaceList.spaceImages.length < 5 && Tab == 2"
        type="dashed"
        style="width: 100%"
        @click="addNewAD"
      >
        添加广告图片
      </a-button>
      <div class="btns">
        <a-button
          class="btn release"
          type="primary"
          style="width: 100%"
          @click="submitPersonal"
        >
          保存
        </a-button>
      </div>
    </div>
    <PageModal
      @cancel="closeInfoModal1"
      @confirm="getPageInfo1"
      :visible="visible1"
      :defaultTabs="['MSPAGE']"
      :pageIndex="pageIndex"
      :pageModelId="pageModelId"
      :showType="showType"
    ></PageModal>
  </div>
</template>

<script>
import ImageUpload from "./ImageUpload.vue";
import ImageRadio from "@components/base/ImageRadio";
import ImageRadioGroup from "@components/base/ImageRadioGroup";
import uploadModal from "@components/antBase/uploadModal.vue";
import MaterialImage from "@views/menuPage/shop/material/components/MaterialUploadImage.vue";
import PageModal from "@components/antBase/PageModal";
import draggable from "vuedraggable";
import { mapState } from "vuex";
export default {
  data() {
    return {
      atext: "",
      visible: false,
      visible1: false,
      checkedImage01: require("@images/shop/tag_01_active.png"),
      uncheckedImage01: require("@images/shop/tag_01_inactive.png"),
      checkedImage02: require("@images/shop/tag_02_active.png"),
      uncheckedImage02: require("@images/shop/tag_02_inactive.png"),
      checkedImage03: require("@images/shop/tag_03_active.png"),
      uncheckedImage03: require("@images/shop/tag_03_inactive.png"),
      tabBarIndex: 0,
      error: 0,
      rightres: 0,
      pageModelId: "",
      pageIndex: "MSPAGE",
      rules1: {
        upgradeMsg: [
          { required: true, message: "请填写名称", trigger: "blur" },
          {
            min: 1,
            max: 8,
            message: "标题长度在1到8个字符",
            trigger: "blur",
          },
        ],
      },
      showType: "1",
    };
  },
  components: {
    ImageUpload,
    uploadModal,
    draggable,
    ImageRadio,
    ImageRadioGroup,
    PageModal,
    MaterialImage,
  },
  computed: {
    ...mapState({
      personalInfo: (state) => state.setPersonal.personalCenter,
      Tab: (state) => state.setPersonal.tab,
      adSpaceList: (state) => state.setPersonal.adSpaceList,
      menuList: (state) => state.setPersonal.menuList,
      pageInfo: (state) => state.setPersonal.pageInfo,
      styleType: (state) => state.setPersonal.styleType,
    }),
  },
  props: {},
  watch: {},
  created() {
    if (!this.adSpaceList.templateType) {
      this.adSpaceList.templateType = "1";
    }
  },
  filters: {
    typeNameFilter(val) {
      switch (val) {
        case "1":
          return "轮播";
        case "2":
          return "一行一个";
        case "3":
          return "小图滑动";
        default:
          return `不存在的值${val}`;
      }
    },
    filterMenuName: function (val) {
      switch (val) {
        case "ZXFA":
          return "装修方案";
        case "QB":
          return "分销员中心";
        case "SHDZ":
          return "收货地址";
        case "SPSC":
          return "商品收藏";
        case "YHQ":
          return "优惠券";
        case "WDPT":
          return "我的拼团";
        case "CJZP":
          return "抽奖赠品";
        case "FPGL":
          return "发票管理";
        case "DHZQ":
          return "兑换专区";
      }
    },
  },
  mounted() {},
  methods: {
    chooseLevel(personalInfo) {
      this.showType = "2";
      this.pageModalId = personalInfo.upgradeTargetId;
      this.visible1 = true;
    },
    uploadImg() {
      this.visible = true;
    },
    getImgUrl(value) {
      this.personalInfo.backgroundImage = value;
    },
    closeInfoModal() {
      this.visible = false;
    },
    closeInfoModal1() {
      this.visible1 = false;
    },
    getPageInfo1(e) {
      if (this.showType == 1) {
        this.adSpaceList.spaceImages[this.tabBarIndex].jumpTargetType = e.type;
        this.adSpaceList.spaceImages[this.tabBarIndex].jumpTargetValue = e.id;
        this.adSpaceList.spaceImages[this.tabBarIndex].jumpTargetName = e.name;
      } else {
        this.personalInfo.upgradeTargetId = e.id;
        this.personalInfo.upgradeTargetName = e.name;
      }
      this.visible1 = false;
    },
    avatarChange(e) {
      // console.log("radio checked", e.target.value);
      const obj = JSON.parse(JSON.stringify(this.personalInfo));
      obj.portraitLocation = e.target.value;
      this.$store.dispatch("setPersonalCenter", obj);
    },
    resetColor() {
      const obj = JSON.parse(JSON.stringify(this.personalInfo));
      obj.nicknameColor = "#333333";
      this.$store.dispatch("setPersonalCenter", obj);
    },
    setBgColor(e) {
      const obj = JSON.parse(JSON.stringify(this.personalInfo));
      obj.nicknameColor = e.target.value;
      this.$store.dispatch("setBgColor", obj);
    },
    showMemberLevelChange(e) {
      const obj = JSON.parse(JSON.stringify(this.personalInfo));
      obj.isShowMemberLevel = e.target.value;
      this.$store.dispatch("setPersonalCenter", obj);
    },
    // memberStyleChange(e) {
    //   const obj = JSON.parse(JSON.stringify(this.personalInfo));
    //   obj.memberStyle = e.target.value;
    //   this.$store.dispatch("setPersonalCenter", obj);
    // },
    addNewAD() {
      this.adSpaceList.spaceImages.push({
        image: "",
        title: "",
        jumpTargetName: "",
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          console.log("error submit!!");
          this.$message.error("广告位图片缺失");
          this.error++;
          return false;
        }
      });
    },
    deleteOne(i) {
      this.adSpaceList.spaceImages.splice(i, 1);
    },
    async submitPersonal() {
      this.error = 0;
      this.rightres = 0;
      //个人信息
      if (this.personalInfo.isShowMemberLevel != 1) {
        this.personalInfo.isUpgrade = false;
      }
      if (!this.personalInfo.isUpgrade) {
        this.personalInfo.upgradeMsg = "";
        this.personalInfo.upgradeTargetId = "";
        this.personalInfo.upgradeTargetName = "";
      }
      const personalCenter = {
        id: this.personalInfo.id,
        // backgroundImage:
        //   "https://testsd.cicd.vpclub.cn/ghs/20210720/cf736ab6959c4566b41b36529fe9ee77.png",
        backgroundImage: this.personalInfo.backgroundImage,
        backgroudColorValue: "#333333",
        backgroudColorType: 1,
        portraitLocation: this.personalInfo.portraitLocation,
        nicknameColor: this.personalInfo.nicknameColor,
        isShowMemberLevel: this.personalInfo.isShowMemberLevel,
        isUpgrade: this.personalInfo.isUpgrade == true ? 1 : 0,
        upgradeMsg: this.personalInfo.upgradeMsg || "",
        upgradeTargetId: this.personalInfo.upgradeTargetId || "",
        upgradeTargetName: this.personalInfo.upgradeTargetName || "",
        // memberStyle: this.personalInfo.memberStyle,
      };
      // console.log(this.pageInfo);
      // console.log(personalCenter);
      //广告位
      console.log(this.adSpaceList);
      const SpaceImages = [];
      this.adSpaceList.spaceImages.forEach((item) => {
        const obj = {
          image: item.image,
          title: item.title,
          jumpTargetValue: item.jumpTargetValue || "",
          jumpTargetType: item.jumpTargetType || "",
        };
        if (item.id) {
          obj.id = item.id;
        }
        SpaceImages.push(obj);
      });
      const params = {
        templateType: this.adSpaceList.templateType * 1,
        locationType: this.adSpaceList.locationType * 1,
        spaceImages: SpaceImages,
      };
      // console.log(this.adSpaceList, "4848484848484848484848484848");
      if (this.adSpaceList.pageId && this.adSpaceList.id) {
        params.pageId = this.pageInfo.id;
        params.id = this.adSpaceList.id;
      }

      // console.log(params);
      //必备工具
      const menuData = {};
      menuData.pageId = this.pageInfo.id;
      menuData.styleType = this.styleType.styleType * 1;
      this.menuList.forEach((item, i) => {
        item.sort = i + 1;
      });
      // menuData.menuList = menu;
      menuData.menuList = JSON.parse(JSON.stringify(this.menuList));
      menuData.menuList.forEach((item) => {
        if (item.isShow == true) {
          item.isShow = 1;
        } else {
          item.isShow = 0;
        }
      });
      console.log(this.adSpaceList.spaceImages);
      if (this.personalInfo.isUpgrade && this.personalInfo.upgradeMsg == "") {
        this.$message.error("升级按钮文案不能为空");
        return;
      }
      if (this.adSpaceList.spaceImages.length > 0) {
        this.submitForm("adSpaceList");
      }
      this.adSpaceList.spaceImages.forEach((item) => {
        if (item.jumpTargetName == "") {
          this.error++;
          this.$message.error("广告位链接缺失");
        }
      });
      if (!this.error > 0) {
        await this.updatePersonal(this.pageInfo, personalCenter);
        await this.updateAdvertising(params);
        await this.updateMenuInfo(menuData);
        if (this.rightres == 3) {
          this.$message.success("保存成功");
        } else {
          this.$message.error("保存失败");
        }
      }
    },
    //个人中心信息新增、更新
    async updatePersonal(pageInfo, personalCenter) {
      let res = await this.$post(
        "/personal/center/add",
        { pageInfo: pageInfo, personalCenter: personalCenter },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      if (res && res.returnCode == 1000) {
        this.rightres++;
      }
    },
    //广告位新增、更新
    async updateAdvertising(params) {
      let res = await this.$post(
        "/advertising/space/add",
        { ...params },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      if (res && res.returnCode == 1000) {
        this.rightres++;
      }
    },
    //菜单配置新增、更新
    async updateMenuInfo(params) {
      let res = await this.$post(
        "/menu/config/add",
        { ...params },
        { baseURL: `${location.origin}/goldenhome/decoration/admin` }
      );
      if (res && res.returnCode == 1000) {
        this.rightres++;
      }
    },
    changeTypeRadio(val) {
      console.log(val, "5665656556565");
      // const obj = JSON.parse(JSON.stringify(this.adSpaceList));
      // obj.templateType = val;
      // console.log(obj);
      // this.$store.dispatch("setAdSpaceList", obj);
    },
    isShowChange(e) {
      console.log(`checked = ${e.target.checked}`);
      // console.log(this.menuList);
    },
    chooseAddress(l, i) {
      // console.log(l, "8888888888888");
      this.showType = "1";
      this.pageModelId = l.jumpTargetValue;
      this.pageIndex = l.jumpTargetType;
      this.tabBarIndex = i;
      this.visible1 = true;
    },
    iconStyleChange(e) {
      console.log("radio checked", e.target.value);
      // if (e.target.value == "1") {
      //   this.menuList.forEach((item) => {
      //     if (item.toolCode == "WDFA") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/422e81bf247f43fb88de9d9453b54880.png";
      //     } else if (item.toolCode == "GWC") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/41a71b9a55334b4eb55f5e908ff121c3.png";
      //     } else if (item.toolCode == "SHDZ") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/d6d629146b6e424dbdc484577f6bbe54.png";
      //     } else if (item.toolCode == "WDSC") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/d051f9f475a241c488346a44972b13d0.png";
      //     } else if (item.toolCode == "YHQ") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/153c10afc4694dd6a567d58deae06ab3.png";
      //     }
      //   });
      // } else {
      //   this.menuList.forEach((item) => {
      //     if (item.toolCode == "WDFA") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/d2bce14c382c4ce38ddd39c534485299.png";
      //     } else if (item.toolCode == "GWC") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/8075a22f3a524923a87f8813e5b3a9c5.png";
      //     } else if (item.toolCode == "SHDZ") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/c231b76a54c749e8b1fce5ed7ffe98aa.png";
      //     } else if (item.toolCode == "WDSC") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/d07f52049e084225b8ae274e047d0f5d.png";
      //     } else if (item.toolCode == "YHQ") {
      //       item.toolImage =
      //         "https://testsd.cicd.vpclub.cn/ghs/20210722/88727d0d2ad74601a347c30da832bd42.png";
      //     }
      //   });
      // }
    },
  },
};
</script>

<style lang='less' scoped>
.attr_main {
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  .attr_page_title {
    width: 100%;
    height: 40px;
    padding: 0 16px;
    box-shadow: 0 1px 1px 0px #e6e6e6;
    // border-top: 1px solid #e6e6e6;
    line-height: 40px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: #333333;
    margin-bottom: 40px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
/deep/.ant-btn {
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
}
.imgBox,
.image_wrap {
  width: 80px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px dashed #b8b8b8;
  background-color: #fff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  .addIcon {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .text {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    position: absolute;
    bottom: 0;
    text-align: center;
    // left: 50%;
    // transform: translateX(-50%);
    white-space: nowrap;
    line-height: 22px !important;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    line-height: 10px;
  }
}
.imgBox1 {
  height: 80px;
}
/deep/.ant-form {
  width: 100%;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: flex-start !important;
}
.right {
  flex: 1;
  justify-content: flex-end;
  .color_reset {
    color: #016bff;
    margin-left: 16px;
    cursor: pointer;
  }
  .color_select {
    width: 60px;
    height: 30px;
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
  }
}
.item_value {
  margin-left: 10px;
  font-size: 16px;
  color: #333333;
}
/deep/.ant-radio-wrapper {
  margin-right: 0px;
}
/deep/span.ant-radio + * {
  padding-left: 0px;
}
.ImgList {
  width: 92%;
  margin: auto;
  background: #fff;
  display: flex;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  position: relative;
  /deep/.image_upload[data-v-3572edc4] .avatar-uploader .ant-upload {
    width: 80px !important;
    height: 80px !important;
  }
  .closeIcon {
    position: absolute;
    top: -4px;
    right: -4px;
    font-size: 16px;
    display: none;
  }
}
.ImgList:hover .closeIcon {
  display: block;
}
.ImgList + .ImgList {
  margin-top: 10px;
}
/deep/.ImgListRight {
  position: relative;
  margin-left: 20px;
  .ant-form-item {
    margin-bottom: 0;
  }
  .attention {
    position: absolute;
    bottom: -40px;
    font-size: 14px;
    color: #f5222d;
  }
}
.actions {
  width: 100%;
  .btns {
    display: flex;
    justify-content: center;
  }
}
.ant-carousel .slick-slide {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

.ant-carousel .slick-slide h3 {
  color: #fff;
}
.toolBox {
  padding: 10px 0;
  width: 100%;
}
.tool {
  width: 94%;
  margin: auto;
  line-height: 44px;
  background: #fff;
  border-radius: 5px;
  padding-left: 10px;
}
.tool + .tool {
  margin-top: 10px;
}
.paytation {
  font-size: 18px;
  color: #999;
  padding: 0 16px 10px;
}
/deep/::-webkit-scrollbar {
  width: 0px !important;
  height: 10px;
}
/deep/.uploadpic {
  .ant-form-item {
    margin-bottom: 0;
    margin-top: 4px;
  }
}
/deep/.ant-upload.ant-upload-select-picture-card {
  margin-bottom: -8px;
  margin-right: 0;
}
/deep/.ant-form-explain {
  white-space: nowrap;
}
.styleBtn {
  width: 100%;
  padding: 0 18px;
  font-size: 18px;
  color: #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
}
.levelBox {
  width: 100%;
  padding-left: 30px;
  .isShowEquity {
    width: 100%;
  }
}
.limitWords {
  position: absolute;
  right: 5px;
  top: -10px;
  font-size: 10px;
  color: #eee;
}
.toAddress {
  color: #016bff;
  text-decoration: underline;
  cursor: pointer;
}
</style>
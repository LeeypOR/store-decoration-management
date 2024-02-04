<template>
  <div class="my-magic-form">
    <div class="form-box">
      <div>
        <div class="choose-template">
          <span>选择模版</span>
          <span class="name">
            {{ formDataObject.templateType | templateTypeFilter }}
          </span>
        </div>
        <div class="choose-template m-t-10">
          <div
            v-for="(item, index) in templateList"
            :key="index"
            :class="[
              'template-item',
              formDataObject.templateType == index ? 'iconfont-check' : '',
            ]"
            @click="changeTemplateType(index)"
          >
            <i :class="['iconfont', item.icon]"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="form-item" v-if="formDataObject.templateType == 8">
      <div class="label">
        <span class="name">魔方密度</span>
      </div>
      <div class="input">
        <a-select
          style="width: 200px"
          v-model="formDataObject.magicVal"
          :options="magicValList"
          @change="magicValChange"
        />
      </div>
    </div>
    <div class="item-title">魔方布局</div>
    <div class="my-magic-template">
      <div
        v-if="Number(formDataObject.templateType) < 8"
        :class="['magic-item', 'type-' + formDataObject.templateType]"
        :style="{ height: rightHeight + 'px' }"
      >
        <div
          v-for="(item, index) in templateList[
            Number(formDataObject.templateType)
          ].desArr"
          :key="index"
          :class="['item', itemIndex == index ? 'active' : '']"
          :style="{
            width:
              templateList[Number(formDataObject.templateType)].wh[index][0] +
              'px',
            height:
              templateList[Number(formDataObject.templateType)].wh[index][1] +
              'px',
            top:
              templateList[Number(formDataObject.templateType)].position[
                index
              ][0] + 'px',
            left:
              templateList[Number(formDataObject.templateType)].position[
                index
              ][1] + 'px',
          }"
          @click="chooseItem(item, index)"
        >
          <div
            v-if="formDataObject.itemList[index].imgUrl"
            class="bg-img"
            :style="{
              backgroundImage:
                'url(' + formDataObject.itemList[index].imgUrl + ')',
            }"
          ></div>
          <p v-else v-html="item"></p>
        </div>
      </div>
      <div
        v-else
        :class="['magic-diy', 'diy-' + formDataObject.magicVal]"
        @mouseleave="matrixItemMouseout"
      >
        <div class="magic-choose" v-if="matrixData.length">
          <div
            class="magic-row"
            v-for="(wItem, wIndex) in magicNum"
            :key="wIndex"
          >
            <div
              v-for="(hItem, hIndex) in magicNum"
              :class="[
                'magic-col',
                { active: matrixData[wIndex][hIndex] === 1 },
              ]"
              :key="hIndex"
              :data-x="wIndex"
              :data-width="wItem"
              :data-height="hItem"
              :data-y="hIndex"
              @click="matrixChildClick(wIndex, hIndex)"
              @mouseover="matrixChildMouseover(wIndex, hIndex)"
            >
              <i class="iconfont icon-icon_middle_modalbox_tianjia"></i>
            </div>
          </div>
        </div>
        <!-- :style="`width:${ oneCubeBoxWidth * item.width+1*item.width}px;height:${oneCubeBoxWidth*item.height+1*item.height}px;top:${item.y*oneCubeBoxWidth}px;left:${item.x*oneCubeBoxWidth}px;`" -->
        <div
          v-for="(item, index) in matrix"
          :key="index"
          :class="['magic-selected', { active: index === itemIndex }]"
          :style="{
            width: oneCubeViewBoxWidth * item.width + 'px',
            height: oneCubeViewBoxWidth * item.height + 'px',
            top: item.y * oneCubeViewBoxWidth + 'px',
            left: item.x * oneCubeViewBoxWidth + 'px',
          }"
          @click="chooseItem(item, index)"
        >
          <div
            v-if="formDataObject.itemList[index].imgUrl"
            class="bg-img"
            :style="{
              backgroundImage:
                'url(' + formDataObject.itemList[index].imgUrl + ')',
            }"
          ></div>
          <template v-else>
            <p v-if="oneCubeBoxWidth * item.width <= oneCubeBoxWidth * 2">
              {{
                parseInt(oneCubeBoxWidth * item.width) +
                "x" +
                parseInt(oneCubeBoxWidth * item.height)
              }}
            </p>
            <p v-else>
              {{
                parseInt(oneCubeBoxWidth * item.width) +
                "x" +
                parseInt(oneCubeBoxWidth * item.height)
              }}像素<br />或同等比例
            </p>
          </template>
          <div
            class="magic-selected-close"
            @click.stop="handleCloseMatrix(item, index)"
          >
            <img src="~@images/shop/icon_middle_modalbox_delete_s.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div
      class="choose-box m-t-10 m-b-10"
      v-if="formDataObject.itemList.length > 0"
    >
      <div class="choose-box-con">
        <div class="upload">
          <div
            v-if="currentItem.imgUrl"
            @click="openUpload('image', currentItem)"
            class="upload_wrap"
            :style="{
              background: `url(${currentItem.imgUrl}) no-repeat 50% 50%/cover`,
            }"
          >
            <p class="updateImg">更换图片</p>
          </div>
          <div
            v-else
            class="upload_wrap uploadBox"
            @click="openUpload('image', currentItem)"
          >
            <a-icon type="plus" />
            <p>上传图片</p>
          </div>
          <!-- <ImageUpload
            class="upload-component"
            v-model="currentItem.imgUrl"
            uploadText="上传图片"
          ></ImageUpload> -->
          <!-- <CropperUpload
            class="upload-component"
            :defaultScaleVal="'diy'"
            :scaleList="[{ label: '自定义', value: 'diy' }]"
            :imgSize="10"
            v-model="currentItem.imgUrl"
            uploadText="上传图片" /> -->
        </div>
        <div class="choose-info">
          <div>
            <div class="label">链接</div>
            <a @click="addLinkPage(currentItem)">{{
              currentItem | jumpLinkTextFilter
            }}</a>
          </div>
        </div>
      </div>
    </div>
    <div class="form-item" v-if="formDataObject.itemList.length > 0">
      <div class="label">
        <span class="name">是否添加文本</span>
      </div>
      <div class="input">
        <a-radio-group v-model="currentItem.textShow" @change="textShowChange">
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </div>
    </div>
    <template
      v-if="formDataObject.itemList.length > 0 && currentItem.textShow == 1"
    >
      <div class="form-item">
        <div class="label">
          <span class="name">文本内容</span>
        </div>
        <div class="input">
          <a-input v-model="currentItem.textCon" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">文本对齐</span>
          <span class="value">{{
            currentItem.textAlign | textAlignFilter
          }}</span>
        </div>
        <div class="input">
          <div
            :class="[
              'form-radio-btn',
              currentItem.textAlign == 'left' ? 'iconfont-check' : '',
            ]"
            @click="changeCheck(itemIndex, 'textAlign', 'left')"
          >
            <i class="iconfont icon-icon_right_attributebar_wzjz_selected"></i>
          </div>
          <div
            :class="[
              'form-radio-btn',
              currentItem.textAlign == 'center' ? 'iconfont-check' : '',
            ]"
            @click="changeCheck(itemIndex, 'textAlign', 'center')"
          >
            <i class="iconfont icon-icon_right_attributebar_wzjz_default"></i>
          </div>
        </div>
      </div>

      <div class="form-item">
        <div class="label">
          <span class="name">字体大小</span>
          <span class="value">{{ currentItem.textSize + "号" }}</span>
        </div>
        <!-- <div class="input">
          <div
            :class="[
              'form-radio-btn',
              currentItem.textSize == 16 ? 'iconfont-check' : '',
            ]"
            :style="{ fontSize: '16px' }"
            @click="changeCheck(itemIndex, 'textSize', 16)"
          >
            A
          </div>
          <div
            :class="[
              'form-radio-btn',
              currentItem.textSize == 14 ? 'iconfont-check' : '',
            ]"
            :style="{ fontSize: '14px' }"
            @click="changeCheck(itemIndex, 'textSize', 14)"
          >
            A
          </div>
          <div
            :class="[
              'form-radio-btn',
              currentItem.textSize == 12 ? 'iconfont-check' : '',
            ]"
            :style="{ fontSize: '12px' }"
            @click="changeCheck(itemIndex, 'textSize', 12)"
          >
            A
          </div>
        </div> -->
        <div class="input">
          <a-select
            style="width: 88px"
            v-model="currentItem.textSize"
            :options="fontSizeList"
          >
          </a-select>
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">字体粗细</span>
          <span class="value">{{
            currentItem.textThickness | textThicknessFilter
          }}</span>
        </div>
        <div class="input">
          <div
            :class="[
              'form-radio-btn',
              currentItem.textThickness == 'normal' ? 'iconfont-check' : '',
            ]"
            @click="changeCheck(itemIndex, 'textThickness', 'normal')"
          >
            <i class="iconfont icon-icon_right_attributebar_zz_r"></i>
          </div>
          <div
            :class="[
              'form-radio-btn',
              currentItem.textThickness == 'bold' ? 'iconfont-check' : '',
            ]"
            @click="changeCheck(itemIndex, 'textThickness', 'bold')"
          >
            <i class="iconfont icon-icon_right_attributebar_zz_b"></i>
          </div>
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">文字间距</span>
          <span class="value">{{ currentItem.textSpace }}</span>
        </div>
        <div class="input">
          <a-slider
            class="slider"
            v-model="currentItem.textSpace"
            :min="0"
            :max="10"
            style="width: 120px"
          />
          <a-input-number
            v-model="currentItem.textSpace"
            :min="0"
            :max="10"
            style="margin-left: 16px"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">文字颜色</span>
          <span class="value">{{ currentItem.textColor }}</span>
        </div>
        <div class="input color">
          <span
            class="input-btn"
            @click="changeCheck(itemIndex, 'textColor', '#ffffff')"
            >重置</span
          >
          <a-input type="color" v-model="currentItem.textColor" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">背景颜色</span>
          <span class="value">{{ currentItem.textBgColor }}</span>
        </div>
        <div class="input color">
          <span
            class="input-btn"
            @click="changeCheck(itemIndex, 'textBgColor', '#000000')"
            >重置</span
          >
          <a-input type="color" v-model="currentItem.textBgColor" />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">背景透明度</span>
          <span class="value">{{ currentItem.textBgOpacity }}</span>
        </div>
        <div class="input">
          <a-slider
            class="slider"
            v-model="currentItem.textBgOpacity"
            :min="0"
            :max="100"
            style="width: 120px"
          />
          <a-input-number
            v-model="currentItem.textBgOpacity"
            :min="0"
            :max="100"
            style="margin-left: 16px"
          />
        </div>
      </div>

      <div class="form-item">
        <div class="label">
          <span class="name">边框</span>
          <span class="value">{{
            currentItem.boxBorderShow ? "显示" : "不显示"
          }}</span>
        </div>
        <div class="input check_radio">
          <span
            class="_check"
            @click="changeCheck(itemIndex, 'boxBorderShow', true)"
            v-if="!currentItem.boxBorderShow"
          ></span>
          <span
            class="iconfont icon-Checkbox"
            v-else
            @click="changeCheck(itemIndex, 'boxBorderShow', false)"
          ></span>
        </div>
      </div>
      <div class="form-item" v-if="currentItem.boxBorderShow">
        <div class="label">
          <span class="name">边框颜色</span>
          <span class="value">{{ currentItem.boxBorderColor }}</span>
        </div>
        <div class="input color">
          <span
            class="input-btn"
            @click="changeCheck(itemIndex, 'boxBorderColor', '#000000')"
            >重置</span
          >
          <a-input type="color" v-model="currentItem.boxBorderColor" />
        </div>
      </div>

      <div class="form-item">
        <div class="label">
          <span class="name">背景圆角</span>
          <span class="value">{{
            this.dealbox(currentItem.boxBorderRadius)
          }}</span>
        </div>
        <div class="input">
          <a-slider
            class="slider"
            v-model="currentItem.boxBorderRadius"
            :min="0"
            :max="currentItem.boxWidth"
            style="width: 120px"
          />
          <a-input-number
            v-model="currentItem.boxBorderRadius"
            :min="0"
            style="margin-left: 16px"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">背景宽度</span>
          <span class="value">{{ this.dealbox(currentItem.boxWidth) }}</span>
        </div>
        <div class="input">
          <a-slider
            class="slider"
            v-model="currentItem.boxWidth"
            :min="0"
            :max="currentItem.imgWidth - currentItem.boxLeft"
            style="width: 120px"
          />
          <a-input-number
            v-model="currentItem.boxWidth"
            :min="0"
            :max="currentItem.imgWidth"
            style="margin-left: 16px"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">背景高度</span>
          <span class="value">{{ this.dealbox(currentItem.boxHeight) }}</span>
        </div>
        <div class="input">
          <a-slider
            class="slider"
            v-model="currentItem.boxHeight"
            :min="0"
            :max="currentItem.imgHeight - currentItem.boxTop"
            style="width: 120px"
          />
          <a-input-number
            v-model="currentItem.boxHeight"
            :min="0"
            :max="currentItem.imgHeight"
            style="margin-left: 16px"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">上下偏移</span>
          <span class="value">{{ this.dealbox(currentItem.boxTop) }}</span>
        </div>
        <div class="input">
          <a-slider
            class="slider"
            v-model="currentItem.boxTop"
            :min="0"
            :max="currentItem.imgHeight - currentItem.boxHeight"
            style="width: 120px"
          />
          <a-input-number
            v-model="currentItem.boxTop"
            :min="0"
            style="margin-left: 16px"
          />
        </div>
      </div>
      <div class="form-item">
        <div class="label">
          <span class="name">左右偏移</span>
          <span class="value">{{ this.dealbox(currentItem.boxLeft) }}</span>
        </div>
        <div class="input">
          <a-slider
            class="slider"
            v-model="currentItem.boxLeft"
            :min="0"
            :max="currentItem.imgWidth - currentItem.boxWidth"
            style="width: 120px"
          />
          <a-input-number
            v-model="currentItem.boxLeft"
            :min="0"
            style="margin-left: 16px"
          />
        </div>
      </div>
    </template>
    <a-divider />
    <div class="form-item">
      <div class="label">
        <span class="name">图片倒角</span>
        <span class="value">{{
          formDataObject.angleType | angleTypeFilter
        }}</span>
      </div>
      <div class="input">
        <div
          :class="[
            'form-radio-btn',
            formDataObject.angleType == '0' ? 'iconfont-check' : '',
          ]"
          @click="changeCheck(false, 'angleType', '0')"
        >
          <i class="iconfont icon-icon_right_attributebar_zhijiao_default"></i>
        </div>
        <div
          :class="[
            'form-radio-btn',
            formDataObject.angleType == '1' ? 'iconfont-check' : '',
          ]"
          @click="changeCheck(false, 'angleType', '1')"
        >
          <i class="iconfont icon-icon_right_attributebar_yuanjiao_default"></i>
        </div>
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <span class="name">图片间隙</span>
        <span class="value">{{ formDataObject.itemPadding }}</span>
      </div>
      <div class="input">
        <a-slider
          class="slider"
          v-model="formDataObject.itemPadding"
          :min="0"
          :max="30"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.itemPadding"
          :min="0"
          :max="30"
          style="margin-left: 16px"
        />
      </div>
    </div>
    <div class="form-item">
      <div class="label">
        <span class="name">页面间距</span>
        <span class="value">{{ formDataObject.pagePadding }}</span>
      </div>
      <div class="input">
        <a-slider
          class="slider"
          v-model="formDataObject.pagePadding"
          :min="0"
          :max="30"
          style="width: 120px"
        />
        <a-input-number
          v-model="formDataObject.pagePadding"
          :min="0"
          :max="30"
          style="margin-left: 16px"
        />
      </div>
    </div>
    <!-- <a-form class="search-box-form" :form="form" :onValuesChange="updateFormData"  :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="框体样式">
        <a-radio-group
          :options="[
            {label: '固定', value:1},
            {label: '跟随滚动', value: 0},
          ]"
          v-decorator="['position']" />
      </a-form-item>
    </a-form> -->

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
import ImageUpload from "@components/antBase/ImageUpload";
import CropperUpload from "@components/antBase/CropperUpload";
import PageModal from "@components/antBase/PageModal";
import videoModal from "@/components/antBase/videoModal";
import { cloneDeep } from "lodash";
export default {
  name: "MyMagicForm",
  components: {
    ImageUpload,
    CropperUpload,
    PageModal,
    videoModal,
  },
  filters: {
    jumpLinkTextFilter(item) {
      if (item.jumpPageId) {
        return item.jumpPageType == "WXMAID"
          ? item.jumpPageUrl
          : item.jumpPageName;
      } else return "点击选择跳转到的页面";
    },
    templateTypeFilter(n) {
      switch (n) {
        case "0":
          return "一行一个";
        case "1":
          return "一行两个";
        case "2":
          return "一行三个";
        case "3":
          return "一行四个";
        case "4":
          return "一左二右";
        case "5":
          return "一上二下";
        case "6":
          return "一左三右";
        case "7":
          return "二左二右";
        case "8":
          return "自定义";
        default:
          return "";
      }
    },
    magicValFilter(n) {
      switch (n) {
        case "4":
          return "4*4";
        case "5":
          return "5*5";
        case "6":
          return "6*6";
        case "7":
          return "7*7";
        case "8":
          return "8*8";
        case "9":
          return "9*9";
        case "10":
          return "10*10";
        default:
          return "";
      }
    },
    textAlignFilter(n) {
      switch (n) {
        case "left":
          return "左对齐";
        case "center":
          return "居中";
      }
    },
    textSizeFilter(n) {
      switch (n) {
        case 12:
          return "小（12px）";
        case 14:
          return "中（14px）";
        case 16:
          return "大（16px）";
      }
    },
    textThicknessFilter(n) {
      switch (n) {
        case "bold":
          return "加粗体";
        case "normal":
          return "常规体";
      }
    },
    angleTypeFilter(n) {
      switch (n) {
        case "0":
          return "直角";
        case "1":
          return "圆角";
      }
    },
  },
  props: {
    // 传入的原始数据
    formData: {},
  },
  data() {
    return {
      timer: null,
      formDataObject: {},
      templateList: [
        {
          icon: "icon-icon_right_attributebar_mofang_1h1g",
          wh: [[360, 180]],
          position: [[0, 0]],
          desArr: ["宽度750像素"],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_1h2g",
          wh: [
            [180, 180],
            [180, 180],
          ],
          position: [
            [0, 0],
            [0, 180],
          ],
          desArr: ["宽度375像素", "宽度375像素"],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_1h3g",
          wh: [
            [120, 120],
            [120, 120],
            [120, 120],
          ],
          position: [
            [0, 0],
            [0, 120],
            [0, 240],
          ],
          desArr: ["宽度250像素", "宽度250像素", "宽度250像素"],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_1h4g",
          wh: [
            [90, 90],
            [90, 90],
            [90, 90],
            [90, 90],
          ],
          position: [
            [0, 0],
            [0, 90],
            [0, 180],
            [0, 270],
          ],
          desArr: ["宽度188像素", "宽度188像素", "宽度188像素", "宽度188像素"],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_1z2y",
          wh: [
            [180, 360],
            [180, 180],
            [180, 180],
          ],
          position: [
            [0, 0],
            [0, 180],
            [180, 180],
          ],
          margin: [1, 0, 0],
          padding: [
            [0, 0],
            [0, 1],
            [1, 1],
          ],
          cWH: [
            [1, 0],
            [1, 1],
            [1, 1],
          ],
          desArr: [
            "375x750像素<br />或同等比例",
            "375x375像素<br />或同等比例",
            "375x375像素<br />或同等比例",
          ],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_1s2x",
          wh: [
            [360, 180],
            [180, 180],
            [180, 180],
          ],
          position: [
            [0, 0],
            [180, 0],
            [180, 180],
          ],
          margin: [1, 1, 0],
          padding: [
            [0, 0],
            [1, 0],
            [1, 1],
          ],
          cWH: [
            [0, 1],
            [1, 1],
            [1, 1],
          ],
          desArr: [
            "750x375像素<br />或同等比例",
            "375x375像素<br />或同等比例",
            "375x375像素<br />或同等比例",
          ],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_1z3y",
          wh: [
            [180, 360],
            [180, 180],
            [90, 180],
            [90, 180],
          ],
          position: [
            [0, 0],
            [0, 180],
            [180, 180],
            [180, 270],
          ],
          margin: [1, 0, 0, 0],
          padding: [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 1],
          ],
          cWH: [
            [1, 0],
            [1, 1],
            [1, 1],
            [1, 1],
          ],
          desArr: [
            "375x750像素<br />或同等比例",
            "375x375像素<br />或同等比例",
            "188x375像素<br />或同等比例",
            "188x375像素<br />或同等比例",
          ],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_2z2y",
          wh: [
            [180, 180],
            [180, 180],
            [180, 180],
            [180, 180],
          ],
          position: [
            [0, 0],
            [0, 180],
            [180, 0],
            [180, 180],
          ],
          margin: [1, 0, 1, 0],
          padding: [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
          ],
          cWH: [
            [1, 1],
            [1, 1],
            [1, 1],
            [1, 1],
          ],
          desArr: [
            "375x375像素<br />或同等比例",
            "375x375像素<br />或同等比例",
            "375x375像素<br />或同等比例",
            "375x375像素<br />或同等比例",
          ],
        },
        {
          icon: "icon-icon_right_attributebar_mofang_zdy",
          wh: [],
          position: [[0, 0]],
          desArr: [],
        },
      ],
      magicValList: [
        { label: "4*4", value: "4" },
        { label: "5*5", value: "5" },
        { label: "6*6", value: "6" },
        { label: "7*7", value: "7" },
        { label: "8*8", value: "8" },
        { label: "9*9", value: "9" },
        { label: "10*10", value: "10" },
      ],
      rightHeight: 180,
      magicNum: 4,
      itemIndex: 0,
      currentItem: {},
      currentRecord: {},
      currentImageItem: {},
      pageModalVisible: false,
      pageModelId: "",
      pageIndex: "MSPAGE",
      config: {
        pointEnd: {},
        pointStart: {},
        record: false,
      },
      cubeBoxWidth: 375, //魔方矩阵的dom宽度
      oneCubeBoxWidth: 0, //一个魔方盒子的宽度 ， 跟矩阵x轴的数量有关
      cubeViewBoxWidth: 360, //预览dom宽度
      oneCubeViewBoxWidth: 0, //预览dom一个盒子的宽度
      matrix: [],
      matrixData: [],
      // 图片裁剪
      cropperOptions: {
        full: true,
        high: true,
        infoTrue: true,
        centerBox: true, // 截图框是否被限制在图片里面
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 125, //默认生成截图框宽度
        autoCropHeight: 150, //默认生成截图框高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        fixed: true, // 是否开启截图框宽高固定比例
        fixedBox: false, //是否固定截图框大小 不允许改变
        fixedNumber: [5, 6], // 截图框的宽高比例
        previewsCircle: false, //预览图是否是圆形
      },
      visibleModal: false,
      ContentType: "image",
      videoData: {},
      dataIndex: "",
      fontSizeList: [
        { label: "12", value: 12 },
        { label: "14", value: 14 },
        { label: "16", value: 16 },
        { label: "18", value: 18 },
        { label: "20", value: 20 },
        { label: "22", value: 22 },
        { label: "24", value: 24 },
        { label: "26", value: 26 },
        { label: "28", value: 28 },
        { label: "30", value: 30 },
        { label: "32", value: 32 },
      ],
    };
  },
  created() {
    this.formDataObject = cloneDeep(this.formData);
    this.currentItem = this.formDataObject.itemList[0];
    if (this.formDataObject.templateType != 8) {
      if (this.formDataObject.itemList[0].imgUrl) {
        this.rightHeight = this.formDataObject.height;
      } else {
        this.rightHeight =
          this.templateList[Number(this.formDataObject.templateType)].wh[0][1];
      }
    } else {
      this.magicNum = Number(this.formDataObject.magicVal);
      this.rightHeight = 360;
    }
    this.formDataObject.height = (this.rightHeight / 360) * 375;
    this.getOneCubeBoxWidth();
  },
  mounted() {
    if (this.formDataObject.templateType == 8) {
      if (this.matrix && !this.matrix.length) {
        this.getInitArray();
        this.pushDefCube();
      } else {
        //含有、一般为编辑的时候
        this.getInitArray();

        this.matrix.map((res) => {
          //设置矩阵初始值
          this.handleCloseMatrix(res, "", 2);
        });
      }
    }
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
        const imgList = this.formDataObject.itemList;
        imgList[index * 1].imgUrl = val.fileUrl;
        this.$set(this.formDataObject, "imageList", imgList);
      }
    },
    // 打开上传组件
    openUpload(a, item, index) {
      if (a == "video") {
        // this.checkValue = { videoUrl: item.videoUrl };
      } else {
        this.checkValue = { imgUrl: item.imgUrl };
      }
      this.ContentType = a;
      this.dataIndex = this.itemIndex + "";
      this.visibleModal = true;
    },
    changeTemplateType(index) {
      let itemArr = this.formDataObject.itemList;
      let itemListLength = this.formDataObject.itemList.length;
      let itemNum = this.templateList[index].desArr.length;
      if (index != 8) {
        if (itemListLength < itemNum) {
          for (let i = 0; i < itemNum - itemListLength; i++) {
            itemArr.push({
              imgWidth: 375, // 图片宽度
              imgHeight: 200, // 图片高度
              top: 0, // 图片位置
              left: 0, // 图片位置
              imgUrl: "", // 图片地址
              jumpPageId: "", // 跳转的页面的id，字符串
              jumpPageName: "", // 跳转的页面的名称，字符串
              jumpPageUrl: "", // 跳转的页面的地址，字符串
              jumpPageType: "",
              textShow: 0, // 是否有文字描述
              textCon: "", // 文本内容
              textAlign: "left", // 文本对齐
              textSize: 12, // 文本大小
              textThickness: "normal", // 文本粗细 bold:粗 normal:正常
              textSpace: 0, // 文字间距
              textColor: "#ffffff", // 文本颜色
              textBgColor: "#000000", // 文本背景颜色
              textBgOpacity: 50, // 文本背景透明度
              boxHeight: 25, //文字背景高度
              boxWidth: 30, //文字背景宽度
              boxBorderShow: true, // 边框是否显示
              boxBorderColor: "#ffffff", //边框颜色
              boxBorderRadius: 0, //背景圆角
              boxTop: 0, //背景top值
              boxLeft: 0, //背景left值
            });
          }
        }
        this.rightHeight = this.templateList[index].wh[0][1];
        this.computeItemWH();
        this.$set(this.formDataObject, "total", itemNum);
      } else {
        this.magicNum = Number(this.formDataObject.magicVal);
        this.getOneCubeBoxWidth();
        console.log(this.oneCubeBoxWidth);
        this.getInitArray();
        this.pushDefCube();
        this.$set(this.formDataObject, "total", this.matrix.length);
      }
      this.$set(this.formDataObject, "itemList", itemArr);
      this.$set(this.formDataObject, "templateType", index.toString());
      this.itemIndex = 0;
      this.currentItem = this.formDataObject.itemList[0];
    },
    chooseItem(item, index) {
      this.itemIndex = index;
      this.currentItem = this.formDataObject.itemList[index];
    },
    magicValChange(val) {
      switch (val) {
        case "4":
          this.magicNum = 4;
          break;
        case "5":
          this.magicNum = 5;
          break;
        case "6":
          this.magicNum = 6;
          break;
        case "7":
          this.magicNum = 7;
          break;
        case "8":
          this.magicNum = 8;
          break;
        case "9":
          this.magicNum = 9;
          break;
        case "10":
          this.magicNum = 10;
          break;
        default:
          this.magicNum = 4;
          break;
      }
      this.matrix = [];
      this.$set(this.formDataObject, "total", this.matrix.length);
      this.getInitArray();
    },
    addLinkPage(item) {
      if (!item.imgUrl) {
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
    textShowChange(e) {
      this.formDataObject.itemList[this.itemIndex]["textShow"] = e.target.value;
    },
    changeCheck(index, key, val) {
      if (index === false) {
        this.$set(this.formDataObject, key, val);
      } else {
        this.formDataObject.itemList[index][key] = val;
      }
    },
    closeInfoModal(type) {
      console.log(type, "type");
      this.pageModalVisible = false;
      this.visibleModal = false;
    },
    // 单链接和热区用的一个模态框，需要根据imagetype区分一下单链接和热区的数据格式。
    selectedPage({ id, name, type, url }) {
      console.log("收到的已选择信息为:", id, name, type, url);
      this.$set(this.currentImageItem, "jumpPageId", id);
      this.$set(this.currentImageItem, "jumpPageName", name);
      this.$set(this.currentImageItem, "jumpPageUrl", url);
      this.$set(this.currentImageItem, "jumpPageType", type);
      this.pageModalVisible = false;
    },
    // 根据第一张图计算个盒子宽高
    computeItemWH() {
      let templateType = Number(this.formDataObject.templateType);
      let _this = this;
      if (templateType < 4) {
        if (this.itemIndex == 0 && _this.formDataObject.itemList[0].imgUrl) {
          var img = new Image();
          // 改变图片的src
          img.src = _this.formDataObject.itemList[0].imgUrl;
          img.onload = function () {
            let imgW = img.width;
            let imgH = img.height;
            let firstImgW =
              (375 -
                _this.formDataObject.pagePadding * 2 -
                _this.formDataObject.itemPadding *
                  (_this.formDataObject.total - 1)) /
              (templateType + 1);
            let rightImgW = 360 / (templateType + 1);
            let scale = firstImgW / imgW;
            let firstImgH = imgH * scale;
            let rightImgH = imgH * scale;
            _this.templateList[templateType].wh = [];
            for (let i = 0; i < _this.formDataObject.total; i++) {
              _this.templateList[templateType].wh.push([rightImgW, rightImgH]);
              _this.formDataObject.itemList[i].imgWidth = firstImgW;
              _this.formDataObject.itemList[i].imgHeight = firstImgH;
              _this.formDataObject.itemList[i].top =
                (_this.templateList[templateType].position[i][0] / 360) * 375;
              _this.formDataObject.itemList[i].left =
                firstImgW * i +
                _this.formDataObject.pagePadding +
                _this.formDataObject.itemPadding * i;
            }
            _this.rightHeight = rightImgH;
            _this.$set(_this.formDataObject, "height", firstImgH);
          };
        } else {
          let firstImgW =
            (375 -
              _this.formDataObject.pagePadding * 2 -
              _this.formDataObject.itemPadding *
                (_this.formDataObject.total - 1)) /
            (templateType + 1);
          for (let i = 0; i < _this.formDataObject.total; i++) {
            _this.formDataObject.itemList[i].imgWidth = firstImgW;
            _this.formDataObject.itemList[i].imgHeight =
              (_this.templateList[templateType].wh[i][1] / 360) * 375;
            _this.formDataObject.itemList[i].top =
              (_this.templateList[templateType].position[i][0] / 360) * 375;
            _this.formDataObject.itemList[i].left =
              firstImgW * i +
              _this.formDataObject.pagePadding +
              _this.formDataObject.itemPadding * i;
          }
          _this.rightHeight = _this.templateList[templateType].wh[0][1];
          this.$set(
            this.formDataObject,
            "height",
            (_this.templateList[templateType].wh[0][1] / 360) * 375
          );
        }
      } else if (templateType > 3 && templateType < 8) {
        for (let i = 0; i < _this.formDataObject.total; i++) {
          _this.formDataObject.itemList[i].imgHeight =
            (_this.templateList[templateType].wh[i][1] / 360) *
            (375 -
              _this.formDataObject.pagePadding * 2 -
              (_this.templateList[templateType].cWH[i][1] == 1
                ? _this.formDataObject.itemPadding
                : 0));
          _this.formDataObject.itemList[i].top =
            (_this.templateList[templateType].position[i][0] / 360) * 375 +
            (_this.formDataObject.itemPadding / 2) *
              _this.templateList[templateType].padding[i][0] -
            _this.formDataObject.pagePadding *
              _this.templateList[templateType].padding[i][0];
          if (templateType == 6 && (i == 2 || i == 3)) {
            _this.formDataObject.itemList[i].imgWidth =
              (_this.templateList[templateType].wh[i][0] / 360) *
              (375 -
                _this.formDataObject.pagePadding * 2 -
                (_this.templateList[templateType].cWH[i][0] == 1
                  ? _this.formDataObject.itemPadding * 3
                  : 0));
            if (i == 3) {
              _this.formDataObject.itemList[i].left =
                _this.formDataObject.itemList[2].left +
                _this.formDataObject.itemList[2].imgWidth +
                _this.formDataObject.itemPadding;
            } else {
              _this.formDataObject.itemList[i].left =
                (_this.templateList[templateType].position[i][1] / 360) * 375 +
                _this.formDataObject.pagePadding *
                  _this.templateList[templateType].margin[i] +
                (_this.templateList[templateType].padding[i][1] == 1
                  ? _this.formDataObject.itemPadding / 2
                  : 0);
            }
          } else {
            _this.formDataObject.itemList[i].imgWidth =
              (_this.templateList[templateType].wh[i][0] / 360) *
              (375 -
                _this.formDataObject.pagePadding * 2 -
                (_this.templateList[templateType].cWH[i][0] == 1
                  ? _this.formDataObject.itemPadding
                  : 0));
            _this.formDataObject.itemList[i].left =
              (_this.templateList[templateType].position[i][1] / 360) * 375 +
              _this.formDataObject.pagePadding *
                _this.templateList[templateType].margin[i] +
              (_this.templateList[templateType].padding[i][1] == 1
                ? _this.formDataObject.itemPadding / 2
                : 0);
          }
        }
        this.rightHeight = 360;
        this.$set(
          this.formDataObject,
          "height",
          375 - _this.formDataObject.pagePadding * 2
        );
      } else {
        this.rightHeight = 360;
        if (_this.matrix.length == 0) {
          this.$set(this.formDataObject, "height", 375);
        }
      }
    },
    // 自定义魔方各模块宽高、位置计算
    computeDiyItemWH() {
      let _this = this;
      let pI = (_this.formDataObject.pagePadding * 2) / _this.magicNum;
      let iI = _this.formDataObject.itemPadding / 2 / _this.magicNum;
      for (let i = 0; i < _this.matrix.length; i++) {
        let item = _this.matrix[i];
        let imgItem = _this.formDataObject.itemList[i];
        let w = _this.oneCubeBoxWidth * item.width;
        let h = _this.oneCubeBoxWidth * item.height;
        let t = _this.oneCubeBoxWidth * item.y;
        let l = _this.oneCubeBoxWidth * item.x;
        if (item.width == _this.magicNum) {
          imgItem.imgWidth = w - _this.formDataObject.pagePadding * 2;
          imgItem.left = l + _this.formDataObject.pagePadding;
        } else {
          let newOneCubeBoxWidth =
            _this.oneCubeBoxWidth - pI - (_this.magicNum - item.width) * iI;
          imgItem.imgWidth = newOneCubeBoxWidth * item.width;
          imgItem.left =
            newOneCubeBoxWidth * item.x +
            (_this.formDataObject.itemPadding / 2) * item.x +
            _this.formDataObject.pagePadding;
        }
        if (item.height == _this.magicNum) {
          imgItem.imgHeight = h - _this.formDataObject.pagePadding * 2;
          imgItem.top = t;
        } else {
          let newOneCubeBoxWidth =
            _this.oneCubeBoxWidth - pI - (_this.magicNum - item.height) * iI;
          imgItem.imgHeight = newOneCubeBoxWidth * item.height;
          imgItem.top =
            newOneCubeBoxWidth * item.y +
            (_this.formDataObject.itemPadding / 2) * item.y;
        }
      }
      if (_this.matrix.length == 1) {
        let firstMatrix = _this.matrix[0];
        let first = _this.formDataObject.itemList[0];
        if (firstMatrix.height + firstMatrix.y < _this.magicNum) {
          _this.$set(
            _this.formDataObject,
            "height",
            first.imgHeight + first.top
          );
        } else {
          _this.$set(
            _this.formDataObject,
            "height",
            375 - _this.formDataObject.pagePadding * 2
          );
        }
      } else {
        let res = _this.formDataObject.itemList[0],
          maxH = 0;
        for (let i = 0; i < _this.matrix.length; i++) {
          let itemH = _this.matrix[i].y + _this.matrix[i].height;
          if (itemH > maxH) {
            maxH = itemH;
            res = _this.formDataObject.itemList.filter(
              (item) =>
                item.y == _this.matrix[i].y &&
                item.colNum == _this.matrix[i].height
            )[0];
          }
        }

        _this.$set(_this.formDataObject, "height", res.top + res.imgHeight);
      }
    },
    // 构建多维数组
    getInitArray() {
      this.matrixData = new Array(this.magicNum).fill(0).map(() => {
        return new Array(this.magicNum).fill(0);
      });
    },
    // 监听父级鼠标移出
    matrixItemMouseout() {
      // 监听父级鼠标移出 重置初始值
      this.matrixData.map((mi) => {
        if (mi && mi.length) {
          mi.map((item, index) => {
            mi[index] = item === 1 ? 0 : item;
          });
        }
      });
      this.config.record = false;
    },
    // 监听子级鼠标hover
    matrixChildMouseover(x, y) {
      if (!this.config.record) return;
      // console.log('监听子级鼠标hove', x, y)
      this.activeCube("hover", {
        row: x,
        col: y,
      });
      this.config.pointEnd = {
        row: x,
        col: y,
      };
    },
    // 监听子级鼠标点击
    matrixChildClick(x, y) {
      if (this.config.record) {
        if (this.matrixData[x][y] === 0) {
          // 不在已移动选择的数组里,并重置
          this.matrixItemMouseout();
          return;
        }

        this.config.pointEnd = {
          row: x,
          col: y,
        };
        this.config.record = false;
        this.activeCube("choose", {
          row: x,
          col: y,
        });
        this.handleSureClick();
      } else {
        this.config.pointStart = {
          row: x,
          col: y,
        };
        this.config.record = true;
        this.activeCube("choose", {
          row: x,
          col: y,
        });
      }
    },
    // 绘制矩阵
    activeCube(type, t) {
      let matrixData = this.matrixData,
        pointStart = this.config.pointStart,
        r = Math.min(pointStart.row, t.row),
        i = Math.max(pointStart.row, t.row),
        l = Math.min(pointStart.col, t.col),
        c = Math.max(pointStart.col, t.col);
      if (type === "hover") {
        matrixData = this.clearMatrix(matrixData);
      }
      for (let s = r; s <= i; s++) {
        for (let u = l; u <= c; u++) {
          // console.log(matrixData[s][u], '---matrixData[s][u]');
          if (2 === matrixData[s][u]) return;
          matrixData[s][u] =
            "hover" === type
              ? 0 === matrixData[s][u]
                ? 1
                : matrixData[s][u]
              : 1 === matrixData[s][u]
              ? 2
              : 1;
          //console.log('这个是:', matrixData[s][u])
        }
      }
      // console.log('matrixData:', matrixData)
      this.matrixData = matrixData;
    },
    // 最终选取的方格
    handleSureClick() {
      let { pointEnd, pointStart } = this.config;
      /** 重新定位初始坐标*/
      let end = pointEnd;
      let start = pointStart;
      if (pointEnd.row < pointStart.row) {
        if (pointEnd.col > pointStart.col) {
          // 从右边向左下
          start = {
            row: pointEnd.row,
            col: pointStart.col,
          };
          end = {
            row: pointStart.row,
            col: pointEnd.col,
          };
        } else {
          // 从右边向左上
          start = pointEnd;
          end = pointStart;
        }
      } else if (pointEnd.col < pointStart.col) {
        // 从左边向右上
        start = {
          row: pointStart.row,
          col: pointEnd.col,
        };
        end = {
          row: pointEnd.row,
          col: pointStart.col,
        };
      }
      let copyMatrixField = {};
      copyMatrixField.width =
        end.row === 0 ? end.row + 1 : end.row - start.row + 1; //pointEnd.row + 1;
      copyMatrixField.height = end.col - start.col + 1; //pointEnd.col;
      copyMatrixField.x = start.row; //pointStart.row;
      copyMatrixField.y = start.col; //pointStart.col;
      this.getOneCubeBoxWidth();
      this.$set(this.formDataObject, "height", 0);
      this.matrix.push(copyMatrixField);
      let _this = this;
      let itemArr = this.formDataObject.itemList;
      let itemListLength = this.formDataObject.itemList.length;
      if (itemListLength < this.matrix.length) {
        for (let i = 0; i < this.matrix.length - itemListLength; i++) {
          itemArr.push({
            imgWidth: _this.oneCubeBoxWidth * _this.matrix[i].width, // 图片宽度
            imgHeight: _this.oneCubeBoxWidth * _this.matrix[i].height, // 图片高度
            top: _this.oneCubeBoxWidth * _this.matrix[i].y, // 图片位置
            left: _this.oneCubeBoxWidth * _this.matrix[i].x, // 图片位置
            imgUrl: "", // 图片地址
            jumpPageId: "", // 跳转的页面的id，字符串
            jumpPageName: "", // 跳转的页面的名称，字符串
            jumpPageUrl: "", // 跳转的页面的地址，字符串
            jumpPageType: "",
            textShow: 0, // 是否有文字描述
            textCon: "", // 文本内容
            textAlign: "left", // 文本对齐
            textSize: 12, // 文本大小
            textThickness: "normal", // 文本粗细 bold:粗 normal:正常
            textSpace: 0, // 文字间距
            textColor: "#ffffff", // 文本颜色
            textBgColor: "#000000", // 文本背景颜色
            textBgOpacity: 50, // 文本背景透明度
            rowNum: 0, // 宽度数目
            colNum: 0, // 高度数目
            x: 0, // 开始x坐标
            y: 0, // 开始y坐标
            boxHeight: 25, //文字背景高度
            boxWidth: 30, //文字背景宽度
            boxBorderShow: true, // 边框是否显示
            boxBorderColor: "#ffffff", //边框颜色
            boxBorderRadius: 0, //背景圆角
            boxTop: 0, //背景top值
            boxLeft: 0, //背景left值
          });
        }
      }
      this.matrix.forEach((item, index) => {
        item.image = itemArr[index].imgUrl;
        itemArr[index].rowNum = item.width;
        itemArr[index].colNum = item.height;
        itemArr[index].x = item.x;
        itemArr[index].y = item.y;
      });
      this.$set(this.formDataObject, "itemList", itemArr);
      this.$set(this.formDataObject, "total", this.matrix.length);

      console.log("最终的矩阵", this.matrix);
    },
    // 获取一个魔方盒子的宽度
    getOneCubeBoxWidth() {
      this.oneCubeBoxWidth = this.cubeBoxWidth / this.magicNum;
      this.getOneCubeViewWidth();
    },
    // 获取预览的宽度
    getOneCubeViewWidth() {
      this.oneCubeViewBoxWidth = this.cubeViewBoxWidth / this.magicNum;
    },
    // 初始化自定义魔方
    pushDefCube() {
      let _this = this;
      _this.matrix = [];
      this.formDataObject.itemList.forEach((item, index) => {
        let flag = {};
        flag.width = item.rowNum;
        flag.height = item.colNum;
        flag.image = item.imgUrl;
        flag.x = item.x;
        flag.y = item.y;
        if (flag.width && flag.height) {
          _this.matrix.push(flag);
        }
      });
      this.$set(this.formDataObject, "total", this.matrix.length);
    },
    // 初始化
    clearMatrix(e) {
      return e.map(function (e) {
        return e.map(function (e) {
          return 1 === e ? 0 : e;
        });
      });
    },
    // 关闭选择的矩阵
    handleCloseMatrix(item, index, $val = 0) {
      console.log("item:", item, index);
      let { width, height, x, y } = item;
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          this.matrixData[i + x][j + y] = $val;
        }
      }
      /** 如果index含有*/
      if (index !== "") {
        this.matrix.splice(index, 1);
        this.formDataObject.itemList.splice(index, 1);
        this.$set(this.formDataObject, "total", this.matrix.length);
      }
    },
    dealbox(item) {
      if (item == null) {
        return "";
      } else {
        return item + "px";
      }
    },
  },
  beforeDestroy() {
    // if (this.formDataObject.shopListType == "1") {
    //   this.formDataObject.shopList = [];
    // } else {
    //   this.formDataObject.imageList = [];
    // }
  },
  computed: {
    cubeWidth() {
      return this.matrix;
    },
  },
  watch: {
    formDataObject: {
      handler(n, o) {
        if (this.formDataObject.templateType < 8) {
          this.computeItemWH();
        } else {
          this.computeDiyItemWH();
        }
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.$emit("updateFormData", this.formDataObject);
        }, 300);
      },
      deep: true,
    },
    cubeWidth() {
      // 宽度该表
      this.getOneCubeBoxWidth();
    },
    currentItem(m) {
      console.log(m);
    },
  },
};
</script>

<style lang="less" scoped>
@labelColor: #999;
@resultColor: #333;
.my-magic-form {
  .item-title {
    font-size: 14px;
    color: #333;
    margin: 20px 0;
  }
  .choose-template {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .template-item {
      display: inline-block;
      text-align: center;
      width: 69px;
      height: 32px;
      line-height: 32px;
      border: 1px solid #e6e6e6;
      &:hover {
        border-color: #016bff;
      }
    }
    span {
      font-size: 14px;
      color: #999;
      &.name {
        margin-left: 10px;
        color: #333;
      }
    }
  }
  .choose-box {
    width: 100%;
    height: 110px;
    background: #fafafa;
    padding: 12px;
    .choose-box-con {
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 12px;
      display: flex;
      align-items: center;
    }
    .upload {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      .avatar-uploader .ant-upload {
        width: 60px;
        height: 60px;
        margin: 0;
      }
    }
    .choose-info {
      width: calc(100% - 104px);
      a {
        display: inline-block;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .form-item {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .label {
      width: calc(100% - 200px);
      font-size: 14px;
      color: #999999;
      .value {
        margin-left: 10px;
        color: #333;
      }
    }
    .input {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .form-radio-btn {
        text-align: center;
        width: 50px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e6e6e6;
        &:hover {
          border-color: #016bff;
        }
      }
      .input-btn {
        margin: 0 10px;
        font-size: 14px;
        color: #999;
        cursor: pointer;
      }
      &.color .ant-input {
        width: 60px;
        padding: 1px;
        border-radius: 0;
      }
    }
  }
  .my-magic-template {
    .magic-item {
      width: 100%;
      height: 100%;
      position: relative;
      .item {
        position: absolute;
        background: #fff;
        border: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .bg-img {
          width: 100%;
          height: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        p {
          text-align: center;
          color: #999;
        }
        &:hover {
          border-color: #016bff;
        }
        &.active {
          background: #f7f8ff;
          border-color: #016bff;
        }
      }
    }
    .magic-diy {
      width: 362px;
      height: 362px;
      position: relative;
      border: 1px solid #e6e6e6;
      .magic-choose {
        width: 100%;
        height: 100%;
        display: flex;
        .magic-row {
          width: calc(100% / 4);
          height: 100%;
          display: flex;
          flex-direction: column;
          .magic-col {
            width: 100%;
            height: calc(100% / 4);
            border: 1px solid #e6e6e6;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #e6e6e6;
            &.active {
              background: #f7f8ff;
              border-color: transparent;
              .iconfont {
                display: none;
              }
            }
            // &:hover{
            //   border-color: #016BFF;
            //   color: #016BFF;
            //   .iconfont{
            //     color: #016BFF;
            //   }
            // }
          }
        }
      }
      .magic-selected {
        position: absolute;
        border: 1px solid #e6e6e6;
        background: #f7f8ff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .bg-img {
          width: 100%;
          height: 100%;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        p {
          text-align: center;
          color: #999;
        }
        &.active {
          border-color: #016bff;
          color: #016bff;
          p {
            color: #016bff;
          }
        }
        .magic-selected-close {
          display: none;
          width: 20px;
          height: 20px;
          position: absolute;
          top: -10px;
          right: -10px;
          z-index: 9;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        &:hover {
          border-color: #016bff;
          color: #016bff;
          .magic-selected-close {
            display: flex;
          }
        }
      }

      // &.diy-0 div{
      //   width: calc(100% / 4);
      //   height: calc(100% / 4);
      // }
      // &.diy-1 div{
      //   width: calc(100% / 5);
      //   height: calc(100% / 5);
      // }
      // &.diy-2 div{
      //   width: calc(100% / 6);
      //   height: calc(100% / 6);
      // }
      // &.diy-3 div{
      //   width: calc(100% / 7);
      //   height: calc(100% / 7);
      // }
      // &.diy-4 div{
      //   width: calc(100% / 8);
      //   height: calc(100% / 8);
      // }
      // &.diy-5 div{
      //   width: calc(100% / 9);
      //   height: calc(100% / 9);
      // }
      // &.diy-6 div{
      //   width: calc(100% / 10);
      //   height: calc(100% / 10);
      // }
    }
  }
  .iconfont {
    font-size: 22px;
    color: #e6e6e6;
  }
  .iconfont-check {
    color: #016bff;
    background: #e0edff;
    border-color: #016bff !important;
    .iconfont {
      color: #016bff;
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
.check_radio {
  height: 32px;
  line-height: 32px;
  // min-width: 100px;
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
  span {
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
  }
}
</style>

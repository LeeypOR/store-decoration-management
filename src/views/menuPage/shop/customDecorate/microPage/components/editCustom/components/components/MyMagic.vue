<template>
  <div class="magic-box">
    <div
      :class="['magic-item', 'type-' + formData.templateType]"
      :style="{
        height: formData.height + 'px',
        padding: '0 ' + formData.pagePadding + 'px',
      }"
    >
      <div
        :class="['item', formData.angleType == '0' ? '' : 'radius']"
        v-for="index in formData.total"
        :key="index"
        :style="{
          width: formData.itemList[index - 1].imgWidth + 'px',
          height: formData.itemList[index - 1].imgHeight + 'px',
          top: formData.itemList[index - 1].top + 'px',
          left: formData.itemList[index - 1].left + 'px',
        }"
      >
        <template v-if="formData.itemList[index - 1].imgUrl">
          <div
            class="bg-img"
            :style="{
              backgroundImage:
                'url(' + formData.itemList[index - 1].imgUrl + ')',
            }"
          ></div>
        </template>
        <template v-else>
          <div class="default-img">
            <img
              src="~@images/shop/icon_middle_modalbox_mofangdefault.png"
              alt=""
            />
          </div>
        </template>
        <div
          class="bgBox"
          v-if="formData.itemList[index - 1].textShow == 1"
          :style="textStyle(formData.itemList[index - 1])"
        >
          {{ formData.itemList[index - 1].textCon }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMagic",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    formData() {
      return this.item.config.formData || {};
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    toRGBA(data) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var sColor = data.textBgColor.toLowerCase();
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return (
          "rgba(" +
          sColorChange.join(",") +
          "," +
          (data.textBgOpacity / 100).toFixed(2) +
          ")"
        );
      } else {
        return sColor;
      }
    },
    textStyle(boxInfo) {
      let res = {
        height: boxInfo.boxHeight + "px",
        // lineHeight: boxInfo.boxHeight - 4 + "px",
        width: boxInfo.boxWidth + "px",
        color: boxInfo.textColor,
        fontSize: boxInfo.textSize + "px",
        justifyContent: boxInfo.textAlign,
        textAlign: boxInfo.textAlign,
        letterSpacing: boxInfo.textSpace + "px",
        fontWeight: boxInfo.textThickness,
        backgroundColor: this.toRGBA(boxInfo),
        border: boxInfo.boxBorderShow
          ? `1px solid ${boxInfo.boxBorderColor}`
          : "",
        borderRadius: boxInfo.boxBorderRadius + "px",
        top: boxInfo.boxTop + "px",
        left: boxInfo.boxLeft + "px",
        display: "flex",
        alignItems: "center",
        // text
      };
      return res;
    },
  },
};
</script>

<style lang="less">
.magic-box {
  width: 100%;
  .magic-item {
    position: relative;
    display: flex;
    .item {
      width: 100%;
      height: 100%;
      position: absolute;
      .bg-img {
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .default-img {
        width: 100%;
        height: 100%;
        background: #f7f8ff;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 24px;
          height: 24px;
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .bgBox {
        position: absolute;
        overflow: hidden;
        // left: 0;
        // right: 0;
        // bottom: 0;
        // max-height: 100%;
        // line-height: 34px;
      }
      &.radius {
        border-radius: 7px;
        overflow: hidden;
      }
    }
  }
}
</style>

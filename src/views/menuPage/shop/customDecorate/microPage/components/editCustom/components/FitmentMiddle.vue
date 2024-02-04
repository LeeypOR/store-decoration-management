<template>
  <div class="fitment_middle_page">
    <div class="botder_wrap">
      <div
        class="pointer component-item"
        :class="{ current: currentComponent.id === headerConfig.id }"
        @click="openComponentConfig(headerConfig)"
      >
        <component :is="headerConfig.key" :item="headerConfig" />
      </div>
      <draggable
        class="draggable_wrap"
        :list="pageList"
        @add="addModules"
        v-bind="dragOptions"
        :style="{backgroundColor}"
      >
        <transition-group
          name="moduleView"
          type="transition"
          class="transition"
          ref="componentItem"
          tag="div"
        >
          <div
            :class="[
              'pointer component-item',
              currentComponent.id === item.id ? 'current' : '',
              item.key == 'my-Fiexd-icon' ? 'component_absolute' : '',
            ]"
            ref="componentsItem"
            :style="[
              positionStyle(item),
              {
                backgroundColor:
                  item.key != 'my-Fiexd-icon' ? backgroundColor : '',
              },
            ]"
            @click="openComponentConfig(item)"
            v-for="item in pageList"
            :key="item.id"
          >
            <div class="tag_wrap">{{ item.config.title }}</div>
            <div class="delete" @click.stop="deleteComponent(item)"></div>
            <component :is="item.key" :item="item"></component>
          </div>
        </transition-group>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import * as components from "./components/index.js";
const nameInComponents = {};
Object.keys(components).forEach((key) => {
  nameInComponents[components[key].name] = components[key];
});

export default {
  name: "FitmentMiddle",
  components: {
    ...nameInComponents,
    draggable,
  },
  props: {
    headerConfig: {
      type: Object,
      required: false,
    },
    pageList: {
      type: Array,
      required: true,
    },
    currentComponent: {
      type: Object,
    },
  },
  data() {
    return {
      drag: false,
      domH: 0,
    };
  },
  created() {},
  mounted() {
    console.log("aerwrew", this.pageList);
    // this.$nextTick(()=>{
    //   this.getDomH()
    // })
    // console.log('domH',h)
  },
  computed: {
    dragOptions() {
      return {
        group: "moduleView",
        animation: 200,
        ghostClass: "drag_preview_class",
        tag: "div",
        disabled: false,
      };
    },
    backgroundColor() {
      console.log(this.headerConfig);
      if (this.headerConfig.config.formData.backgroundColorType === "1") {
        return this.headerConfig.config.formData.defaultBackgroundColor;
      } else {
        return this.headerConfig.config.formData.backgroundColor;
      }
    },
  },
  methods: {
    getDomH() {
      var dom = document.querySelectorAll(".transition>.component-item");
      var h = 0;
      var arr = null;
      arr = Array.prototype.slice.call(dom, 0);
      arr.map((item) => {
        h = h + item.offsetHeight;
        if (item.className.includes("component_absolute")) {
          h = h - item.offsetHeight;
        }
      });
      this.domH = h;
    },
    // 组件拖拽完成后模拟点击，避免组件拖过来了，右侧配置却没有更新导致的问题。
    addComplete() {
      // 这里输出的序号和通过ref获取的顺序是反的，所以要取反。
      // console.log('componentsItem', componentsItem)
      const componentsItem = this.$refs.componentsItem;
      console.log("componentsItem", componentsItem);

      const targetIndex = componentsItem.length - 1;
      const target = componentsItem[targetIndex];
      // console.log('componentsItem.length', componentsItem.length)
      target.click();
      console.log("targetIndex", targetIndex);
      console.log("target", target);
      // console.log('targetIndex', targetIndex)
      console.log("componentsItem", componentsItem);
    },
    addModules(e) {
      console.log("addModules", e);
      console.log("组件的类型是：", e.from.id);

      console.log("addModules12121313131313", e);
      // console.log('左侧被拖动的组件下标为:', e.oldDraggableIndex)
      // console.log('右侧被拖到的组件下标为:', e.newDraggableIndex)

      const oldDraggableIndex = e.oldDraggableIndex;
      const newDraggableIndex = e.newDraggableIndex;

      const componentsType = e.from.id;
      // console.log(oldDraggableIndex, '0000000000000000000000')
      // console.log(newDraggableIndex, '1111111111111111111111')
      this.$emit(
        "addComponents",
        oldDraggableIndex,
        newDraggableIndex,
        componentsType
      );
    },
    openComponentConfig(item) {
      console.log("点击了click", item);
      this.$emit("openComponentConfig", item);
    },
    deleteComponent(item) {
      this.$emit("deleteComponent", item);
    },
    positionStyle(item) {
      if (item.key != "my-Fiexd-icon") return;
      const { floatPosition, correctLeft, top, listStyle, left, imgWidth } =
        item.config.formData;
      // let custom_w = document.querySelector('.current.component_absolute').offsetWidth

      // let newLeft = left / 100 * 375 - custom_w

      // console.log((375 - custom_w) * left / 100, 'custom_w')
      var obj;
      var imgh;
      switch (listStyle) {
        case "0":
          imgh = 70;
          break;
        case "1":
          imgh = 60;
          break;
        case "2":
          imgh = 114;
          break;
        case "3":
          imgh = 114;
          break;
        default:
          imgh = imgWidth;
          break;
      }
      // let topH =
      //   top -
      //     (imgh / document.querySelector('.transition').offsetHeight) * 100 <
      //   0
      //     ? 0
      //     : top -
      //       (imgh / document.querySelector('.transition').offsetHeight) * 100
      let topH;
      switch (floatPosition) {
        case "0":
          obj = {
            top: top + "px",
            left: correctLeft + "%",
          };
          break;
        case "1":
          obj = {
            top: top + "px",
            right: correctLeft + "%",
          };
          break;
        case "2":
          topH =
            top -
              (imgh / document.querySelector(".transition").offsetHeight) *
                100 <
            0
              ? 0
              : top -
                (imgh / document.querySelector(".transition").offsetHeight) *
                  100;
          obj = {
            top: topH + "%",
            left: correctLeft + "%",
          };
          break;
        default:
          topH =
            top -
              (imgh / document.querySelector(".transition").offsetHeight) *
                100 <
            0
              ? 0
              : top -
                (imgh / document.querySelector(".transition").offsetHeight) *
                  100;
          obj = {
            top: topH + "%",
            right: correctLeft + "%",
          };
          break;
      }
      return obj;
    },
  },
};
</script>
<style lang="less" scoped>
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
  height: 90%;
  .transition {
    height: 100%;
  }
}
.fitment_middle_page {
  // width: 375px;
  width: 477px;
  // 最小高度，避免无组件时不好看。
  // height: 650px;
  // overflow-x: scroll;
  // overflow-y: scroll;

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: unset !important;
  }
  .botder_wrap {
    width: 375px;
    // min-height: 100%;
    height: 100%;
    // height: 645px;
    background: #fff;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
    .draggable_wrap {
      height: calc(100% - 64px);
      .transition {
        // height: 558px;
        width: 100%;
        position: relative;
        // overflow-x: hidden;
        // overflow-y: scroll;
      }
    }
    .component-item {
      // margin-bottom: 10px;
      position: relative;
      // border: 1px dashed transparent;
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
      z-index: 99999;
    }
  }

  .current {
    border: 1px dashed skyblue !important;
  }
}
</style>

<template>
  <div
    class="divisionpage"
    :class="divisionData.styleCode == 'TSO' ? 'TSO' : 'TST'"
  >
    <ul
      :class="
        styleCode == 'TSO'
          ? 'navList'
          : divisionData.styleCode == 'TSO'
          ? 'navList'
          : 'navList1'
      "
      v-if="divisionData.styleCode == 'TSO'"
      :style="{
        justifyContent: divisionData.navList.length <= 3 ? 'center' : '',
      }"
    >
      <li
        v-for="(l, i) in divisionData.navList"
        :key="i + 'name'"
        :style="
          divisionData.navStyle == 1
            ? ''
            : 'background:#ffffff;margin-left: 0px;border-radius: 0;color: #666666;'
        "
        @click="chooseNav(l, i)"
        :class="
          l.active && divisionData.navStyle == 1
            ? 'topNav1'
            : l.active && divisionData.navStyle == 2
            ? 'topNav2'
            : l.active && divisionData.navStyle == 3
            ? 'topNav3'
            : ''
        "
      >
        {{ l.title }}
        <div
          class="underLine"
          v-if="l.active && divisionData.navStyle == 2"
        ></div>
      </li>
      <li class="blackRight" style="background: #fff"></li>
    </ul>
    <ul
      :class="
        styleCode == 'TST'
          ? 'CSNavList'
          : divisionData.styleCode == 'TSO'
          ? 'CSNavList'
          : 'CSNavList1'
      "
      v-if="divisionData.styleCode == 'TST'"
    >
      <li
        v-for="(l, i) in divisionData.navList"
        :key="i + 'division'"
        @click="chooseNav(l, i)"
        :style="
          l.border && divisionData.navStyle == 2
            ? 'border-top-right-radius: 10px;'
            : ''
        "
        :class="l.active ? 'LeftNav' : ''"
      >
        <div
          class="CSnavStyle3"
          v-if="l.active && divisionData.navStyle == 3"
        ></div>
        {{ l.title }}
      </li>
      <li class="bottomList" style="background: rgb(242, 242, 242)"></li>
    </ul>
    <div
      :class="styleCode == 'TST' ? 'componentBox' : 'componentBox1'"
      :style="{
        width: l.active
          ? divisionData.styleCode == 'TST'
            ? styleCode == 'TST'
              ? '210px'
              : '280px'
            : styleCode == 'TST'
            ? '280px'
            : '375px'
          : '0',
      }"
      v-for="(l, i) in divisionData.navList"
      :key="i + 'navList'"
    >
      <div
        class="pointer component-item"
        v-show="l.active"
        ref="componentsItem"
        v-for="(item, i) in l.pageList"
        :key="i + 'id'"
      >
        <component :is="item.key" :item="item"></component>
      </div>
    </div>
  </div>
</template>
<script>
import * as components from "../../../customDecorate/microPage/components/editCustom/components/components/index";
const nameInComponents = {};
Object.keys(components).forEach((key) => {
  nameInComponents[components[key].name] = components[key];
});
export default {
  name: "divisionPage",
  data() {
    return {};
  },
  watch: {},
  components: {
    ...nameInComponents,
  },
  props: {
    divisionData: {
      type: Object,
      default: {},
    },
    styleCode: {
      type: String,
      default: "",
    },
  },
  watch: {},
  methods: {
    chooseNav(l, i) {
      let obj = JSON.parse(JSON.stringify(this.divisionData));
      obj.navList.forEach((item) => {
        item.active = false;
        item.border = false;
      });
      obj.navList[i].active = true;
      if (obj.navList[i + 1]) {
        obj.navList[i + 1].border = true;
      }
      this.$emit("changeDivisionData", obj);
    },
  },
};
</script>
<style rel="stylesheet/less" lang="less" scoped>
.navList {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding: 10px 0;
  height: 50px;
  li {
    flex-shrink: 0;
    text-align: center;
    line-height: 20px;
    border-radius: 8888888px;
    // padding: 0 15px;
    width: 78px;
    text-align: center;
    background: #f9f9f9;
    margin-left: 15px;
    cursor: pointer;
    position: relative;
    font-size: 10px;

    // background: #ffffff;
    // margin-left: 0px;
    // border-radius: 0;
    // color: #666666;
    .underLine {
      background: #d1b085;
      border-radius: 1.5px;
      border-radius: 1.5px;
      width: 18px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 31px;
    }
  }
  .topNav1 {
    flex-shrink: 0;
    text-align: center;
    line-height: 20px;
    border-radius: 8888888px;
    padding: 0 15px;
    background: #d1b085;
    // color: #1890ff;
    cursor: pointer;
    margin-left: 15px;
    font-size: 12px;
  }
  .topNav2 {
    flex-shrink: 0;
    text-align: center;
    line-height: 20px;
    padding: 0 15px;
    cursor: pointer;
    color: #191919;
    font-size: 14px;
    font-weight: bold;
  }
  .topNav3 {
    flex-shrink: 0;
    text-align: center;
    line-height: 20px;
    padding: 0 15px;
    cursor: pointer;
    color: #191919;
    font-size: 14px;
    font-weight: bold;
  }
  .blackRight {
    height: 10px;
    background: #fff;
    margin-left: 0;
    width: 15px;
  }
}
.CSNavList {
  width: 70px;
  // height: 100%;
  // background: rgb(242, 242, 242);
  // padding-top: 1px;
  display: flex;
  flex-direction: column;
  li {
    width: 100%;
    text-align: center;
    line-height: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 12px;
    background: #f2f2f2;
    position: relative;
    .CSnavStyle3 {
      width: 2px;
      height: 10px;
      background: #191919;
      border-radius: 2px;
      border-radius: 2px;
      position: absolute;
      left: 7px;
      top: 10px;
    }
  }
  .LeftNav {
    width: 100%;
    text-align: center;
    line-height: 30px;
    height: 30px;
    cursor: pointer;
    font-size: 12px;
    background: #fff;
  }
  .bottomList {
    background: rgb(242, 242, 242);
    width: 15px;
    flex-grow: 1;
    width: 69px;
  }
}
.divisionpage {
  flex-grow: 1;
  width: 100%;
  // display: flex;
  // flex-direction: column;
}
.TST {
  display: flex;
  .componentBox {
    flex-grow: 1;
    width: 210px;
    .component-item {
      flex-grow: 1;
      // width: 100%;
    }
  }
  .componentBox1 {
    width: 280px;
  }
}
.navList1 {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  padding: 10px 0;
  min-height: 60px;
  li {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    border-radius: 8888888px;
    // padding: 0 15px;
    width: 86px;
    text-align: center;
    background: #f9f9f9;
    margin-left: 15px;
    cursor: pointer;
    position: relative;

    // background: #ffffff;
    // margin-left: 0px;
    // border-radius: 0;
    // color: #666666;
    .underLine {
      background: #d1b085;
      border-radius: 1.5px;
      border-radius: 1.5px;
      width: 18px;
      height: 3px;
      position: absolute;
      bottom: 0;
      left: 34px;
    }
  }
  .topNav1 {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    border-radius: 8888888px;
    padding: 0 15px;
    background: #d1b085;
    // color: #1890ff;
    cursor: pointer;
    margin-left: 15px;
    font-size: 14px;
  }
  .topNav2 {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    padding: 0 15px;
    cursor: pointer;
    color: #191919;
    font-size: 16px;
    font-weight: bold;
  }
  .topNav3 {
    flex-shrink: 0;
    text-align: center;
    line-height: 38px;
    padding: 0 15px;
    cursor: pointer;
    color: #191919;
    font-size: 16px;
    font-weight: bold;
  }
  .blackRight {
    height: 10px;
    background: #fff;
    margin-left: 0;
    width: 15px;
  }
}
.CSNavList1 {
  width: 90px;
  // height: 100%;
  // background: rgb(242, 242, 242);
  // padding-top: 1px;
  display: flex;
  flex-direction: column;
  li {
    width: 100%;
    text-align: center;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 16px;
    background: #f2f2f2;
    position: relative;
    .CSnavStyle3 {
      width: 4px;
      height: 12px;
      background: #191919;
      border-radius: 2px;
      border-radius: 2px;
      position: absolute;
      left: 7px;
      top: 19px;
    }
  }
  .LeftNav {
    width: 100%;
    text-align: center;
    line-height: 50px;
    height: 50px;
    cursor: pointer;
    font-size: 16px;
    background: #fff;
  }
  .bottomList {
    background: rgb(242, 242, 242);
    width: 15px;
    flex-grow: 1;
    width: 90px;
  }
}
</style>
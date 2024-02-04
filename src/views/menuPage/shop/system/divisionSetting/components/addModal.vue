<template>
  <a-modal
    class="choose_url"
    width="900px"
    title="选择样式"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
    :keyboard="false"
    @cancel="closeModal"
    :confirmdd="confirmdd"
  >
    <template slot="footer">
      <a-button key="back" @click="closeModal" style="margin-right: 20px">
        取消
      </a-button>
      <a-button key="submit" type="primary" @click="handleSubmit">
        确定
      </a-button>
    </template>
    <div class="styelShow">
      <div
        @click="value = 'TSO'"
        :style="value == 'TSO' ? 'border:2px solid #1890ff' : ''"
      >
        <img
          src="~@/assets/images/share/sort_bg_style_2.png"
          style="width: 100%; height: 100%"
        />
      </div>
      <div
        @click="value = 'TST'"
        :style="value == 'TST' ? 'border:2px solid #1890ff' : ''"
      >
        <img
          src="~@/assets/images/share/sort_bg_style_1.png"
          style="width: 100%; height: 100%"
        />
      </div>
    </div>
    <a-radio-group v-model="value" @change="onChange" class="modalpage">
      <a-radio :value="'TSO'" class="styleOne">
        自定义样式一
        <div class="typename">顶部导航分类</div>
      </a-radio>
      <a-radio :value="'TST'" class="styleOne">
        自定义样式二
        <div class="typename">侧边导航分类</div>
      </a-radio>
    </a-radio-group>
  </a-modal>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "addModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    typeValue: {
      type: String,
      default: 'TSO',
    },
  },

  data() {
    return {
      selectedRowsInfo: {}, // 选中的页面信息
      dd: false,
      confirmdd: false,
      tabledd: false,
      value: "TSO",
    };
  },

  ...mapState({
    styleCode: (state) => state.divisionSetting.styleCode,
  }),
  created() {
    if (this.styleCode) {
      // console.log("klklklklklkl");
      this.value = this.typeValue;
    }
  },
  watch: {
    visible(y) {
      console.log(y, "value");
      if (y) {
        this.value = this.typeValue;
        console.log(this.value);
      }
    },
  },

  methods: {
    // 取消  关闭模态框
    closeModal() {
      this.$emit("cancel");
    },
    handleSubmit() {
      this.$emit("confirm");
      console.log(this.value);
      this.$store.dispatch("setStyleCode", this.value);
      this.$router.push({
        name: "ShopSystemDivisionSettingStyleEditor",
      });
    },
    onChange(e) {
      console.log(e.target.value);
    },
  },
};
</script>

<style lang='less' scoped>
.typename {
  text-align: center;
}
.modalpage {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  .styleOne {
    .typename {
      font-size: 14px;
      margin-top: 10px;
    }
  }
}
.styelShow {
  display: flex;
  justify-content: space-around;
  div {
    // border: 1px solid #333;
    width: 40%;
    height: 600px;
  }
}
/deep/.ant-modal-body {
  max-height: 800px;
}
/deep/.ant-modal-footer {
  display: flex;
  justify-content: center;
  height: 80px;
  align-items: center;
}
</style>

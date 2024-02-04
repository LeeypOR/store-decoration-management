<template>
  <a-modal
    :visible="visible"
    :title="pagetitle"
    :maskClosable="false"
    :closable="true"
    width="860px"
    @cancel="closeModal()"
    :footer="false"
  >
    <div class="container flex">
      <div class="nav">
        <div class="list">
          <div
            class="list_item"
            v-for="(item, index) in navList"
            :key="index"
            @click="handleNavChange(index)"
          >
            <a href="javascript:;" :class="{ active: navIndex == index }">{{
              item.label
            }}</a>
          </div>
        </div>
      </div>
      <div class="content flex">
        <div class="left">
          <div class="btn_group">
            <a-button
              v-for="(item, index) in subNavList"
              :key="index"
              :class="{ active: subNavIndex == index }"
              @click="handleSubNavChange(index)"
              >{{ item.label }}</a-button
            >
          </div>
          <br />
          <div
            class="big"
            :class="{ qrcode: navIndex == 0 && subNavIndex == 0 }"
          >
            <!--微信小程序-->

            <img
              style="width: 100%; height: 100%"
              :src="weixinQrcode"
              v-if="navIndex == 0 && subNavIndex == 0"
            />
            <div v-else-if="navIndex == 0 && subNavIndex == 1">
              <img :src="image" alt="" />
              <vue-canvas-poster
                :widthPixels="270"
                :painting="painting"
                @success="success"
                @fail="fail"
              >
              </vue-canvas-poster>
            </div>
            <!--<img :src="require('@/assets/images/popularize/1.png')" v-else-if="navIndex==0 && subNavIndex==1"/>-->
            <!--推广设置——海报 样式1-->
            <div
              v-else-if="
                navIndex == 1 && subNavIndex == 0 && Dat.shareHbStyle == 1
              "
              style="margin: 0 auto; text-align: center"
            >
              <div
                style="background-color: #f8f8f8; width: 270px; height: 203px"
              >
                <img
                  v-show="Dat.shareHbDt != ''"
                  :src="Dat.shareHbDt"
                  alt=""
                  style="width: 270px; height: 203px; margin: 0 auto"
                />
              </div>
              <img
                :src="Glogo"
                alt=""
                style="width: 40px; width: 40px; margin: -25px 0 0 0"
              />
              <div style="height: 20px"></div>
              <div style="margin: auto 0; font-weight: bold; height: 35px">
                {{ Dat.shareHbTitle }}
              </div>
              <div style="margin: auto; height: 35px">
                {{ Dat.shareHbDesc }}
              </div>
              <img
                :src="weixinQrcode"
                alt=""
                style="width: 70px; margin: 7px auto"
              />
            </div>
            <!--样式2-->
            <div
              v-else-if="
                navIndex == 1 && subNavIndex == 0 && Dat.shareHbStyle == 2
              "
              style="margin: 0 auto; text-align: center"
            >
              <div
                style="background-color: #f8f8f8; width: 270px; height: 270px"
              >
                <img
                  v-show="Dat.shareHbDt != ''"
                  :src="Dat.shareHbDt"
                  alt=""
                  style="width: 270px; height: 270px; margin: 0 auto"
                />
              </div>
              <img
                :src="Glogo"
                alt=""
                style="width: 40px; width: 40px; margin: -25px 0px 0px -82%"
              />
              <div style="display: flex; justify-content: space-between">
                <div style="display: flex; flex-direction: column">
                  <div
                    style="
                      text-align: left;
                      width: 130px;
                      font-weight: bold;
                      margin: 15px 0 0 10px;
                    "
                  >
                    {{ Dat.shareHbTitle }}
                  </div>
                  <div
                    style="
                      text-align: left;
                      width: 150px;
                      margin: 15px 0 0 10px;
                    "
                  >
                    {{ Dat.shareHbDesc }}
                  </div>
                </div>
                <div>
                  <img
                    :src="weixinQrcode"
                    alt=""
                    style="width: 70px; margin: 16px 10px 0 0"
                  />
                </div>
              </div>
            </div>
            <!--样式3-->
            <div
              v-else-if="
                navIndex == 1 && subNavIndex == 0 && Dat.shareHbStyle == 3
              "
            >
              <div
                style="background-color: #f8f8f8; width: 270px; height: 430px"
              >
                <img
                  v-show="Dat.shareHbDt != ''"
                  :src="Dat.shareHbDt"
                  alt=""
                  style="width: 100%; height: 100%; margin: 0 auto"
                />
              </div>
              <div
                style="
                  width: 270px;
                  position: absolute;
                  top: 280px;
                  left: 180px;
                  text-align: center;
                "
              >
                <img
                  :src="weixinQrcode"
                  alt=""
                  style="
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    margin: 0 auto;
                  "
                />
                <div style="margin: 10px auto; font-weight: bold">
                  {{ Dat.shareHbTitle }}
                </div>
                <div style="margin: 10px auto">{{ Dat.shareHbDesc }}</div>
              </div>
            </div>

            <!---小程序样式-->
            <div v-else-if="navIndex == 1 && subNavIndex == 1">
              <div
                style="
                  width: 200px;
                  height: 300px;
                  margin-top: 40px;
                  position: relative;
                "
              >
                <div style="position: absolute; top: 0; right: 0">
                  <img
                    style="width: 40px; height: 40px"
                    src="~@/assets/images/share/icon_head_portrait_default.png"
                    alt=""
                  />
                </div>
                <div style="display: flex; flex-direction: column">
                  <div style="display: flex">
                    <div
                      style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        background-color: #dcdcdc;
                      "
                    ></div>
                    <div style="display: flex; align-items: center">微商城</div>
                  </div>

                  <div>
                    <div style="font-weight: bold">{{ Dat.shareHyTitle }}</div>
                    <div>{{ Dat.shareHyDesc }}</div>
                  </div>
                </div>
                <div
                  style="
                    width: 200px;
                    height: 200px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <img
                    v-show="Dat.shareHyDt != ''"
                    style="width: 75%; height: 75%"
                    :src="Dat.shareHyDt"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    style="width: 35px; height: 35px"
                    src="~@/assets/images/share/mini.png"
                    alt=""
                  />
                  <span>小程序</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <WechatAppletPath
            @downLoadPoster="downLoadPoster"
            :qrcode="weixinQrcode"
            :subNavIndex="subNavIndex"
            :url="pageUrl"
            :name="(record.pageInfo || {}).pageName"
            v-if="navIndex == 0"
          >
          </WechatAppletPath>
          <!--表单-->
          <div v-show="navIndex == 1">
            <a-form-model
              :label-col="{ span: 24 }"
              :wrapper-col="{ span: 24 }"
              :model="Dat"
              :rules="rules"
              ref="ruleForm"
            >
              <div v-show="navIndex == 1 && subNavIndex == 0">
                <a-form-model-item label="分享标题" prop="shareHbTitle">
                  <a-input
                    v-model="Dat.shareHbTitle"
                    :maxLength="10"
                    placeholder="请输入分享标题"
                    @change="handleChange1"
                  />
                </a-form-model-item>
                <a-form-model-item label="分享描述" prop="shareHbDesc">
                  <a-textarea
                    v-model="Dat.shareHbDesc"
                    :maxLength="15"
                    placeholder="请输入分享描述"
                    @change="handleChange2"
                  ></a-textarea>
                </a-form-model-item>

                <a-form-model-item label="分享大图">
                  <div class="shareImgBox">
                    <div class="h5">
                      <div
                        class="image_wrap"
                        :style="{
                          background: Dat.shareHbDt
                            ? `url(${Dat.shareHbDt}) no-repeat 50% 50% /cover`
                            : '',
                        }"
                      >
                        <div class="hoverBox" v-if="Dat.shareHbDt">
                          <a-popconfirm
                            title="是否确认删除？"
                            @confirm="() => deleteImg('h5Poster')"
                            :getPopupContainer="getPopupContainer()"
                          >
                            <div class="delBtn">删除</div>
                          </a-popconfirm>
                          <div
                            class="updatelBtn"
                            @click="updateImgUrl('h5Poster')"
                          >
                            替换
                          </div>
                        </div>
                        <div class="image addBox" v-else>
                          <img
                            src="~@/assets/images/share/add.png"
                            style="width: 36px; height: 36px; margin-top: -10px"
                            @click="updateImgUrl('h5Poster')"
                          />
                        </div>
                      </div>
                      <div
                        v-show="Dat.shareHbStyle == 1"
                        style="text-align: center; color: #999; font-size: 10px"
                      >
                        建议图片大小270*203像素，适用于分享海报
                      </div>

                      <div
                        v-show="Dat.shareHbStyle == 2"
                        style="text-align: center; color: #999; font-size: 10px"
                      >
                        建议图片大小270*270像素，适用于分享海报
                      </div>

                      <div
                        v-show="Dat.shareHbStyle == 3"
                        style="text-align: center; color: #999; font-size: 10px"
                      >
                        建议图片大小270*430像素，适用于分享海报
                      </div>
                    </div>
                  </div>
                </a-form-model-item>
                <br />
                <br />
                <br />
                <a-form-model-item label="海报模式" prop="style">
                  <a-radio-group
                    v-model="Dat.shareHbStyle"
                    :options="styleList"
                    @change="handleStyleChange"
                  ></a-radio-group>
                </a-form-model-item>
              </div>
              <div v-show="navIndex == 1 && subNavIndex == 1">
                <a-form-model-item label="分享标题" prop="shareHyTitle">
                  <a-input
                    v-model="Dat.shareHyTitle"
                    :maxLength="10"
                    placeholder="请输入分享标题"
                    @change="handleChange"
                  />
                </a-form-model-item>
                <a-form-model-item label="分享描述" prop="shareHyDesc">
                  <a-textarea
                    v-model="Dat.shareHyDesc"
                    :maxLength="15"
                    placeholder="请输入分享描述"
                    @change="handleChange"
                  ></a-textarea>
                </a-form-model-item>

                <!-- <a-form-model-item label="分享大图" prop="shareImage">
                                    <UploadImage
                                      v-model="Dat.shareHyDt"
                                      uploadText="添加图片"
                                      @upload="handleChange">
                                    </UploadImage>
                                    <div class="desc" >建议图片比例4:3，适用于分享海报</div>
                                </a-form-model-item>-->

                <a-form-model-item label="分享大图">
                  <div class="shareImgBox">
                    <div class="h5">
                      <div
                        class="image_wrap"
                        :style="{
                          background: Dat.shareHyDt
                            ? `url(${Dat.shareHyDt}) no-repeat 50% 50% /cover`
                            : '',
                        }"
                      >
                        <div class="hoverBox" v-if="Dat.shareHyDt">
                          <a-popconfirm
                            title="是否确认删除？"
                            @confirm="() => deleteImg('vx')"
                            :getPopupContainer="getPopupContainer()"
                          >
                            <div class="delBtn">删除</div>
                          </a-popconfirm>
                          <div class="updatelBtn" @click="updateImgUrl('vx')">
                            替换
                          </div>
                        </div>
                        <div class="image addBox" v-else>
                          <img
                            src="~@/assets/images/share/add.png"
                            style="width: 36px; height: 36px; margin-top: -10px"
                            @click="updateImgUrl('vx')"
                          />
                        </div>
                      </div>
                      <div
                        style="text-align: center; color: #999; font-size: 10px"
                      >
                        建议图片比例4:3，适用于分享海报
                      </div>
                    </div>
                  </div>
                </a-form-model-item>
              </div>

              <a-form-model-item class="right">
                <a-space :class="{ margin_top70: true }">
                  <a-button @click="handleCancel">取消</a-button>
                  <a-button type="primary" @click="handleOk">确定</a-button>
                </a-space>
              </a-form-model-item>
            </a-form-model>
          </div>
        </div>
      </div>
    </div>
    <upload-modal
      :visible="visible2"
      @cancel="closeInfoModal"
      @getImgUrl="getImgUrl"
    ></upload-modal>
  </a-modal>
</template>

<script>
import { VueCanvasPoster } from "vue-canvas-poster";
import uploadModal from "@components/antBase/uploadModal.vue";
import UploadImage from "@/components/antBase/ImageUpload";
import WechatAppletPath from "./components/WechatAppletPath";
import { mapState } from "vuex";

export default {
  components: {
    WechatAppletPath,
    UploadImage,
    uploadModal,
    VueCanvasPoster,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    record: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapState({
      // mapshareInfo: (state) => state.shareSetting.shareInfo,
    }),
  },
  created() {
    console.log(this.mapshareInfo);

    this.success();
    this.fail();
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.Dat.id = this.record.id;
        this.getImagePath(this.record.id);
        this.getPageInfo(this.record.id);
        this.pageUrl = this.pageUrl + this.record.id;
      } else {
        this.pageUrl = "pages/home/miniPage?scene=";
      }
    },
  },
  data() {
    return {
      pageUrl: "pages/home/miniPage?scene=",
      // id	微页面ID	true	string
      // shareHbTitle	分享海报标题	true	String
      // shareHbDesc	分享海报描述	true	String
      // shareHbDt	分享海报大图	true	String
      // shareHbStyle	1样式一2样式二3样式三	true	int
      // shareHyTitle	分享好友标题	true	String
      // shareHyDesc	分享好友描述	true	String
      // shareHyDt	分享好友描述大图	true	String
      rules: {
        shareHyTitle: [{ required: true, message: "请输入分享标题" }],
        shareHbTitle: [{ required: true, message: "请输入分享标题" }],
        shareHyDesc: [{ required: true, message: "请输入分享标题" }],
        shareHbDesc: [{ required: true, message: "请输入分享描述" }],
      },
      styleList: [
        {
          label: "样式1",
          value: 1,
        },
        {
          label: "样式2",
          value: 2,
        },
        {
          label: "样式3",
          value: 3,
        },
      ],
      Dat: {
        id: "",
        shareHbTitle: "",
        shareHbDesc: "",
        shareHbDt: require("@/assets/BG.png"),
        // shareHbDt:'',
        shareHbStyle: 1,
        shareHyTitle: "",
        shareHyDesc: "",
        shareHyDt: "",
      },
      shareHbDt: require("@/assets/BG.png"),
      shareHbDt2: require("@/assets/haibao_yangshi2@2x.png"),
      shareHbDt3: require("@/assets/haibao_yangshi3@2x.png"),
      // 打开的类型
      DTtype: "",
      // Gbg:require("@/assets/haibao_moren_jinpailogo@2x.png"),
      Glogo: require("@/assets/logo_share_yangshi2@2x.png"),
      pagetitle: "推广",
      title: "",
      description: "",
      navList: [
        {
          label: "微信小程序",
          value: 1,
        },
        {
          label: "推广设置",
          value: 2,
        },
      ],
      navIndex: 0,
      subNavList: [
        {
          label: "二维码",
          value: 1,
        },
        {
          label: "海报",
          value: 2,
        },
      ],
      subNavIndex: 0,
      style: 1,
      weixinQrcode: "",
      visible2: false,

      // 海报相关
      image: "",
      painting: {
        width: "650px",
        height: "1035px",
        background: "#F8F8F8",
        views: [
          //大背景图
          {
            type: "image",
            url: "", // 背景图
            // url:  'http://pic126.nipic.com/file/20170410/19440961_070813128001_2.jpg', // 背景图
            css: {
              /*     top: '60px',
                            left: '26%',
                            // borderRadius: '50px',
                            width: '330px',
                            height: '330px',*/
            },
          },
          // 二维码背景图
          {
            type: "image",
            url: "", // 二维码背景图
            // url:  'http://pic126.nipic.com/file/20170410/19440961_070813128001_2.jpg', // 背景图
            css: {
              /*    bottom: '30px',
                            left: '35%',
                            borderRadius: '50%',
                            width: '200px',
                            height: '200px',*/
            },
          },
          // 小G
          {
            type: "image",
            url: require("@/assets/haibao_touxiang_jinpailogo@2x.png"),
            css: {
              /*      top: '400px',
                            left: '44%',
                            // borderRadius: '40px',
                            width: '100px',
                            height: '100px'*/
            },
          },
          {
            type: "text",
            text: "",
            css: {
              /*        top: '520px',
                               left: '17%',
                               width: '450px',
                               textAlign: 'center',
                               fontSize: '36px',
                               fontWeight:'600px'*/
            },
          },
          {
            type: "text",
            text: "",
            css: {
              /*   top: '580px',
                            left: '17%',
                            width: '450px',
                            textAlign: 'center',
                            fontSize: '36px',*/
            },
          },
        ],
      },

      // 海报样式相关
      shareHbDtStyle1: {
        // top: '60px',
        // left: '26%',
        // borderRadius: '50px',
        width: "650px",
        height: "487px",
        mode: "scaleToFill",
      },
      shareHbDtStyle2: {
        // top: '60px',
        left: "",
        // borderRadius: '50px',
        width: "650px",
        height: "650px",
        mode: "scaleToFill",
      },
      shareHbDtStyle3: {
        // top: '60px',
        // left: '26%',
        // borderRadius: '50px',
        width: "650px",
        height: "1155px",
        mode: "scaleToFill",
        // mode:'aspectFill'
      },
      qrCodeStyle1: {
        bottom: "90px",
        left: "37%",
        borderRadius: "50%",
        width: "200px",
        height: "200px",
      },
      qrCodeStyle2: {
        top: "710px",
        left: "66%",
        borderRadius: "50%",
        width: "200px",
        height: "200px",
      },
      qrCodeStyle3: {
        top: "480px",
        left: "39%",
        borderRadius: "50%",
        width: "200px",
        height: "200px",
      },
      ZSGStyle1: {
        top: "435px",
        left: "44%",
        // borderRadius: '40px',
        width: "100px",
        height: "100px",
      },
      ZSGStyle2: {
        top: "596px",
        left: "2%",
        // borderRadius: '40px',
        width: "100px",
        height: "100px",
      },
      ZSGStyle3: {
        top: "430px",
        left: "44%",
        // borderRadius: '40px',
        width: "100px",
        height: "100px",
      },
      titleStyle1: {
        top: "597px",
        // left: '17%',
        width: "650px",
        textAlign: "center",
        fontSize: "36px",
        fontWeight: "600px",
      },
      titleStyle2: {
        top: "730px",
        left: "4%",
        width: "350px",
        // textAlign: 'center',
        fontSize: "36px",
        fontWeight: "600px",
      },
      titleStyle3: {
        top: "710px",
        width: "650px",
        textAlign: "center",
        fontSize: "36px",
        fontWeight: "600px",
      },
      descStyle1: {
        top: "667px",
        // left: '17%',
        width: "650px",
        textAlign: "center",
        fontSize: "36px",
        // color:'red'
      },
      descStyle2: {
        top: "840px",
        left: "4%",
        width: "380px",
        // textAlign: 'center',
        fontSize: "36px",
        // color:'purple'
      },
      descStyle3: {
        top: "790px",
        width: "650px",
        textAlign: "center",
        fontSize: "36px",
      },
      /*  posterContent: '111', // 文案内容
            posterHtmlBg: require('@/assets/rightCard/bg_saomalingka@3x.png'), // 背景图
            posterImg: '', // 最终生成的海报图片
            coverImgUrl:'',
            test: true,
            imgSrc: ""*/
    };
  },
  methods: {
    async getImagePath(id) {
      console.log(id);
      let res = await this.$get("goldenhome/decoration/admin_/page/ms/ma", {
        id,
        page: "pages/home/miniPage",
      });
      if (res && res.returnCode == 1000) {
        this.weixinQrcode = res.dataInfo || "";
        this.painting.views[1].url = res.dataInfo;
      }
    },
    async getPageInfo(id) {
      let res = await this.$get("goldenhome/decoration/admin_/page/ms/query", {
        id,
      });
      if (res && res.returnCode == 1000) {
        console.log(res);
        let {
          shareHbTitle,
          shareHbDesc,
          shareHbDt,
          shareHbStyle,
          shareHyTitle,
          shareHyDesc,
          shareHyDt,
        } = res.dataInfo.pageInfo;
        this.Dat.shareHbTitle = shareHbTitle || "";
        this.Dat.shareHbDesc = shareHbDesc || "";
        this.Dat.shareHbDt = shareHbDt || this.shareHbDt;
        this.Dat.shareHbStyle = shareHbStyle || 1;
        this.Dat.shareHyTitle = shareHyTitle || "";
        this.Dat.shareHyDesc = shareHyDesc || "";

        this.Dat.shareHyDt = shareHyDt || this.shareHbDt;

        this.painting.views[0].url = shareHbDt || this.shareHbDt;
        this.painting.views[2].url = this.Glogo;
        this.painting.views[3].text = shareHbTitle;
        this.painting.views[4].text = shareHbDesc;
        if (this.Dat.shareHbStyle == 1) {
          this.painting.views[0].css = this.shareHbDtStyle1;
          this.painting.views[1].css = this.qrCodeStyle1;
          this.painting.views[2].css = this.ZSGStyle1;
          this.painting.views[3].css = this.titleStyle1;
          this.painting.views[4].css = this.descStyle1;
        }
        if (this.Dat.shareHbStyle == 2) {
          this.painting.views[0].css = this.shareHbDtStyle2;
          this.painting.views[1].css = this.qrCodeStyle2;
          this.painting.views[2].css = this.ZSGStyle2;
          this.painting.views[3].css = this.titleStyle2;
          this.painting.views[4].css = this.descStyle2;
        }
        if (this.Dat.shareHbStyle == 3) {
          this.painting.views[2].url = "";
          this.painting.views[0].css = this.shareHbDtStyle3;
          this.painting.views[1].css = this.qrCodeStyle3;
          this.painting.views[2].css = this.ZSGStyle3;
          this.painting.views[3].css = this.titleStyle3;
          this.painting.views[4].css = this.descStyle3;
        }
        this.painting.views[0].url = shareHbDt || this.shareHbDt;
        this.painting.views[3].text = shareHbTitle;
        this.painting.views[4].text = shareHbDesc;

        // this.painting.views[1].url = res.dataInfo.pageInfo
        // this.painting.views[2].url = res.dataInfo.pageInfo

        console.log("获取的数据,", this.Dat);
      }
    },
    closeModal(freshTable) {
      this.$emit("cancel", freshTable);
    },
    handleCancel() {
      // 关闭框的时候清空数据
      // this.title=''
      // this.description=''
      this.$emit("cancel");
    },
    handleNavChange(index) {
      this.navIndex = index;
      console.log(this.navIndex, this.subNavIndex);
      if (index == 0) {
        this.subNavList = [
          {
            label: "二维码",
            value: 1,
          },
          {
            label: "海报",
            value: 2,
          },
        ];
      } else if (index == 1) {
        this.subNavList = [
          {
            label: "海报",
            value: 1,
          },
          {
            label: "微信好友",
            value: 2,
          },
        ];
      }
      this.subNavIndex = 0;
    },
    handleSubNavChange(index) {
      this.subNavIndex = index;
      console.log(this.navIndex, this.subNavIndex);
    },
    handleStyleChange(e) {
      // console.log(e.target.value)
      console.log(this.Dat.shareHbStyle);
      if (this.Dat.shareHbStyle == 1) {
        /*if (this.Dat.shareHbDt == this.shareHbDt){

                }else {
                    this.Dat.shareHbDt = this.shareHbDt
                }
                console.log( this.Dat.shareHbDt)*/
        // this.Dat.shareHbDt = "/img/haibao_yangshi1@2x.f854a78d.png" ? "/img/haibao_yangshi1@2x.f854a78d.png"
        this.painting.views[2].url = this.Glogo;
        this.painting.views[0].css = this.shareHbDtStyle1;
        this.painting.views[1].css = this.qrCodeStyle1;
        this.painting.views[2].css = this.ZSGStyle1;
        this.painting.views[3].css = this.titleStyle1;
        this.painting.views[4].css = this.descStyle1;
      }
      if (this.Dat.shareHbStyle == 2) {
        /* if (this.Dat.shareHbDt != "/img/haibao_yangshi2@2x.f854a78d.png"){

                }else {
                    this.Dat.shareHbDt = "/img/haibao_yangshi2@2x.f854a78d.png"
                }
                console.log( this.Dat.shareHbDt)*/
        this.painting.views[2].url = this.Glogo;
        this.painting.views[0].css = this.shareHbDtStyle2;
        this.painting.views[1].css = this.qrCodeStyle2;
        this.painting.views[2].css = this.ZSGStyle2;
        this.painting.views[3].css = this.titleStyle2;
        this.painting.views[4].css = this.descStyle2;
      }
      if (this.Dat.shareHbStyle == 3) {
        /*    if (this.Dat.shareHbDt != "/img/haibao_yangshi3@2x.f854a78d.png"){

                }else {
                    this.Dat.shareHbDt = "/img/haibao_yangshi3@2x.f854a78d.png"
                }
                console.log( this.Dat.shareHbDt)*/
        this.painting.views[2].url = "";
        this.painting.views[0].css = this.shareHbDtStyle3;
        this.painting.views[1].css = this.qrCodeStyle3;
        this.painting.views[2].css = this.ZSGStyle3;
        this.painting.views[3].css = this.titleStyle3;
        this.painting.views[4].css = this.descStyle3;
      }
      // this.Dat.shareHbStyle=style;
    },
    handleChange() {},
    handleChange1(data) {
      this.painting.views[3].text = this.Dat.shareHbTitle;
      console.log(data);
    },
    handleChange2(data) {
      this.painting.views[4].text = this.Dat.shareHbDesc;
    },
    handleOk() {
      console.log("表单数据", this.Dat);
      this.$post("goldenhome/decoration/admin_/page/ms/share", {
        ...this.Dat,
      }).then((res) => {
        if (res && res.returnCode === 1000) {
          console.log("***********");
          console.log(res);
          this.$message.success("操作成功!");
          // this.isShow = true
          /*  this.$router.push({
                          name: 'CustomerVipSettingsDetail',
                          query: {
                              id: res.dataInfo.id
                          }
                      })*/
          this.closeModal(true);
        }
      });
      /*    this.$refs.ruleForm.validate(valid => {
                if (valid) {

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });*/
    },

    updateImgUrl(type) {
      console.log(type);
      this.DTtype = type;
      this.visible2 = true;
    },
    deleteImg(type) {
      console.log(type);
      this.DTtype = type;
      console.log(this.DTtype);
      // console.log()
      if (this.DTtype == "h5Poster") {
        this.Dat.shareHbDt = "";
        this.painting.views[0].url = "";
      }
      if (this.DTtype == "vx") {
        this.Dat.shareHyDt = "";
      }
      /* console.log(type)
            this.Dat.shareHbDt = ''
            this.painting.views[0].url = ''*/
    },
    getPopupContainer() {
      return (triggerNode) => triggerNode.parentNode;
    },
    getImgUrl(value) {
      // console.log(value)
      if (this.DTtype == "h5Poster") {
        this.painting.views[0].url = value;
        this.Dat.shareHbDt = value;
      }
      if (this.DTtype == "vx") {
        this.Dat.shareHyDt = value;
      }
    },
    closeInfoModal() {
      this.visible2 = false;
    },

    downLoadPoster() {
      console.log(this.Dat.shareHbStyle);
      // 三种海报 三种样式排列

      let imgData = this.image; //填写你的base64
      this.downloadFile("poster.png", imgData);
      console.log("下载海报");
    },

    // canvas 绘制海报工具函数

    success(src) {
      this.image = src;
    },
    fail(err) {
      console.log("fail53", this.painting);
    },
    //base下载海报的图片
    /*  download() {
            let imgData = this.image; //填写你的base64
            this.downloadFile('金桔有品.png', imgData);
        },*/
    //下载
    downloadFile(fileName, content) {
      let aLink = document.createElement("a");
      let blob = this.base64ToBlob(content); //new Blob([content]);
      let evt = document.createEvent("HTMLEvents");
      evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
      aLink.download = fileName;
      aLink.href = URL.createObjectURL(blob);

      // aLink.dispatchEvent(evt);
      aLink.click();
    },
    //base64转blob
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-modal-body {
  position: relative;
}
/deep/ .ant-btn {
  border-radius: 4px;
}
.container {
  min-height: 460px;
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 150px;
    height: 100%;
    width: 1px;
    background: #e8e8e8;
  }
  .nav {
    width: 130px;
    text-align: right;
    .list {
      .list_item {
        margin-bottom: 15px;
        a {
          color: #333333;
        }
        .active {
          border-color: #016bff;
          color: #016bff;
        }
      }
    }
  }
  .content {
    margin-left: 50px;
    .left {
      width: 270px;
      .btn_group {
        display: flex;
        justify-content: space-evenly;
      }
      .big {
        /*margin-top:20px;*/
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        /*padding-top: 20px;*/
        /*align-items: center;*/
        overflow: hidden;
        background: #fff;
        height: 430px;
        img {
          /*display: block;*/
          //height: 100%;
        }
        &.qrcode {
          height: 270px;
          display: flex;
          justify-content: center;
          /*align-items: center;*/
          img {
            width: 200px;
            height: 200px;
          }
        }
      }
    }
    .right {
      margin-left: 25px;
      flex: 1;
    }
  }
}
.flex {
  display: flex;
}
/deep/ .image_upload .avatar-uploader .ant-upload {
  width: 1rem;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #016bff;
  .ant-upload-text {
    font-size: 14px !important;
  }
  .text {
    font-size: 13px;
    padding: 5px;
  }
}
.margin_top70 {
  margin-top: 70px;
}

.editor-main {
  margin: 0 auto;
  width: 375px;
  height: 100%;
  background: #ffffff;
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
  position: relative;
  .header_wrap {
    height: 38px;
    width: 375px;
    position: relative;
    background: rgb(238, 240, 244);
    border-radius: 5px;
    .my-header {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      font-weight: 700;
      line-height: 38px;
      color: #191919;
      position: absolute;
      // left: 50%;
      // transform: translateX(-50%);
      margin-bottom: 0;
      padding-left: 10px;
    }
  }
}
.limitWords {
  position: absolute;
  right: 5px;
  top: -10px;
  font-size: 10px;
  color: #eee;
}
.shareImgBox {
  display: flex;
  justify-content: space-around;
  width: 100%;
  .mini,
  .h5 {
    width: 120px;
    height: 120px;
    background: rgb(238, 240, 244);
    .image_wrap {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background-color: #fff;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      .hoverBox {
        background: rgba(25, 25, 25, 0.4);
        border-radius: 4px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99999999;
        display: none;
        div {
          width: 50px;
          height: 26px;
          background: #ffffff;
          border-radius: 2px;
          border: 1px solid #979797;
          line-height: 26px;
          font-weight: 400;
          text-align: center;
          margin: auto;
        }
        .delBtn {
          color: #ff5253;
          margin-top: 25px;
        }
        .updatelBtn {
          margin-top: 15px;
          color: #666666;
        }
      }
      .image {
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      .text {
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        position: absolute;
        bottom: 0;
        text-align: center;
        white-space: nowrap;
        line-height: 30px !important;
        font-size: 16px;
      }
    }
    &:hover {
      .hoverBox {
        display: block;
      }
    }
  }
}
.action {
  width: 100%;
  padding: 0 10px;
  margin-top: 60px;
}
.addBox {
  display: flex;
  justify-content: center;
  align-items: center;
}

/deep/.ant-form-item-control {
  line-height: 25px;
}
/deep/.ant-popover-buttons {
  display: flex;
}
</style>
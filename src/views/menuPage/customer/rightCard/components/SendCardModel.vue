<template>
<div>
  <a-modal
    :visible="visible"
    okText="提交"
    :footer="false"
    cancelText="关闭"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    width="830px"
    @cancel="closeModal()">
    <div>
      <a-tabs default-active-key="1" @change="callback" tab-position="left">
        <a-tab-pane key="1" tab="微信小程序">
          <!--pane1-->
          <div class="pane1">
            <div class="left" style="color: #fff;">
              <div style="font-size: 18px;font-weight: bold;margin: 104px 0 3px 115px;">金桔有品</div>
              <div style="font-size: 18px;margin: 0 0 0 55px;">"你有一张权益卡待领取"</div>
              <div style="font-size: 18px;font-weight: bold;margin: 130px 0 3px 0;text-align: center;">金牌橱柜员工生日礼</div>
              <div style="font-size: 10px;margin: 0 0 0 0;text-align: center;">(扫描下方二维码领取卡片)</div>
              <div style="width: 95px;height: 95px;border-radius: 50%;background:bisque;margin: 45px auto;">
                <img :src="qrcodePicture" alt=""
                     style="width: 100%;height: 100%;border-radius: 50%">
              </div>
            </div>
            <div class="right">
              <div>微信小程序路径</div>
              <div>
                <a-input style="width: 220px; border-radius: 4px 0 0 4px"
                         readOnly
                         v-model="linkContent"
                         :id="'copyUrl'"/>
                <a-button style="border-radius: 0 4px 4px 0"
                          class="copyBtn"
                          type="primary"
                          :data-clipboard-target="'#copyUrl'">复制
                </a-button>
              </div>

              <div style="margin-top:8px;" >用于微信公众号添加小程序</div>
              <div style="color: #016DFF;">
                <a-button type="link" @click="download">下载海报</a-button>

                <a-button type="link" style="margin-left: 15px;" @click="downloadIamge">点击下载小程序码</a-button>
              </div>
              <!-- 海报html元素 -->
              <div style="opacity: 0;">
                <img :src="image" alt="">
                <vue-canvas-poster :widthPixels="270"
                                   :painting="painting"
                                   @success="success"
                                   @fail="fail">
                </vue-canvas-poster>
              </div>

            </div>
          </div>
        </a-tab-pane>

        <!--pane2-->
        <a-tab-pane key="2" tab="批量发卡" force-render>
          <div class="pane2">

            <div>标签身份</div>
            <div class="tagIdt">
              <template v-for="item in clientTags">
                <a-checkable-tag v-model="item.checked" :key="item.id" @change="handleChange(item)">
                  {{item.labelName}}
                </a-checkable-tag>
              </template>
            </div>

            <div>会员身份</div>
            <div  class="tagIdt" v-if="vipList.length>0">
              <template v-for="item in vipList">
                <a-checkable-tag v-model="item.checked" :key="item.id" @change="handleChange2(item)">
                  {{item.gradeName}}
                </a-checkable-tag>
              </template>
            </div>

            <div><a-button type="link" @click="openChooseUserModel">选择用户>></a-button></div>
            <div class="tagIdt2">
              <a-tag v-for="(item) in customerIdList" style="background-color: #1890ff;color: #fff;"
                     :key="item.id"
                     closable
                     @close="tagBtnCloseFunc(item)"
                     @click="tagBtnClickFunc(item)"
              >{{item.nickName}}</a-tag>
            </div>

            <div style="margin:5px 0 20px 15px;">
              <a-checkable-tag v-model="allRequest" @change="handleallUserChange">
              全部客户
            </a-checkable-tag>
            </div>

            <div >
              <a-button type="link"
                        @click="importUsers">批量导入客户>></a-button></div>
            </div>

          <div>
            <div style="margin-left: 40%;">
              <a-button type="primary" @click="submitClients" style="padding: 0 10px;" >确定</a-button>
              <a-button  @click="cancelSubmitClients"  style="margin-left: 20px;padding: 0 10px;">取消</a-button>
            </div>
          </div>

          <a-modal
            :visible="visible2"
            okText="选择"
            cancelText="取消"
            title="选择客户"
            :maskClosable="false"
            :destroyOnClose="true"
            :keyboard="false"
            width="1200px"
            @cancel="closeModal2()"
            @ok="handleSubmit2">
            <search-table :url="url"
                          ref="searchtable"
                          :form="form"
                          :columns="columns">

              <template slot="searchForm">
                <a-form layout="inline"
                        :form="form">

              <!--    <a-form-item>
                    <a-select v-model="selectName" style="width: 120px">
                      <a-select-option value="phoneNumber"> 手机号 </a-select-option>
                      <a-select-option value="customerName"> 姓名 </a-select-option>
                      <a-select-option value="nickName"> 客户昵称 </a-select-option>
                    </a-select>
                    <a-input
                      style="width: 200px"
                      v-decorator="[selectName]"
                      placeholder="请输入搜索关键字"
                      autocomplete="off"
                    >
                    </a-input>
                  </a-form-item>-->

                  <a-form-item>
                    <a-select style="width: 180px"
                              v-decorator="['searchType']"
                              :allowClear="true"
                              placeholder="全部"
                              :options="clientSource"></a-select>
                  </a-form-item>

                  <a-form-item>
                    <a-input v-decorator="['keywords']"/>
                  </a-form-item>
                </a-form>
              </template>
            </search-table>

          </a-modal>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>

</div>
</template>

<script>
  import { VueCanvasPoster } from 'vue-canvas-poster'
  import ClipboardJS from "clipboard";
  import SearchTable from "@/components/form/SearchTable";
  export default {
    name: "SendCardModel",
    components:{
      SearchTable,
      VueCanvasPoster
    },
    props: {
      record: {
        type: Object,
        default() {
          return {}
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      title() {
        return '推广'
      },

    },
    data() {
      return {
        //权益卡名字
        cardName:'',
        clientTags:[],
        vipList:[],
        selectName:'phoneNumber',
        qrcodePicture:'',
        url: 'goldenhome/member/admin_/benefits/cardgiveoutrecord/customer/page',
        // url:'',
        visible2:false,
        form: this.$form.createForm(this, {name: 'table_search'}),
        columns: [
          {
            title: "用户ID",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: "180px",
          },
          {
            title: "头像",
            dataIndex: "avatar",
            key: "avatar",
            align: "center",
            // width: "100px",
            customRender: (text, row) => {
              return <table-img src={text} />;
            },
          },
          {
            title: "客户昵称",
            dataIndex: "nickName",
            align: "center",
            key: "nickName",
            // width: "200px",
          },
          {
            title: "客户姓名",
            dataIndex: "customerName",
            align: "center",
            key: "customerName",
            // width: "200px",
          },
          {
            title: "手机号",
            dataIndex: "phoneNumber",
            align: "center",
            key: "phoneNumber",
            // width: "130px",
          },
                //currentIntegrate
          {
            title: "积分",
            dataIndex: "currentIntegrate",
            align: "center",
            key: "currentIntegrate",
            // width: "130px",
          },
          {
            title: "用户状态",
            align: "center",
            dataIndex: "userStatus",
            key: "userStatus",
            customRender: (text, row) => {
              if (text == 0) {
                text = "黑名单";
              } else {
                text = "正常";
              }
              return text;
            },
          },
          {
            title: "会员等级",
            align: "center",
            dataIndex: "gradeName",
            key: "gradeName"
          },

          {
            title: "消费总额",
            align: "center",
            dataIndex: "totalConsumptionAmount",
            key: "totalConsumptionAmount"
          },
          {
            title: "注册时间",
            align: "center",
            dataIndex: "registerTime",
            key: "registerTime",
          },
        ],
        linkContent:'/pagesB/equityCard/cardCenter' ,

        clientSource: [
          {
            label: "手机号",
            value: 1,
          },
          {
            label: "姓名",
            value: 2,
          },
          {
            label: "客户昵称",
            value: 3,
          }
        ],

        allRequest:false,
        // 标签list
        labelIdList:[],
        // 会员list
        memberGradeIdList:[],
        // 选择的客户list
        customerIdList:[],
        //海报相关
        // posterBgImg:require('@/assets/rightCard/bg_saomalingka@3x.png'),
        // 二维码Img,
        qrcodeImg:'',


        image:'',
        painting: {
          width: '650px',
          height: '900px',
          background: '#f4f5f7',
          views: [
            {
              type: 'image',
              url:  require('@/assets/rightCard/bg_saomalingka@3x.png'), // 背景图
              // url:  'http://pic126.nipic.com/file/20170410/19440961_070813128001_2.jpg', // 背景图
              css: {
                // top: '40px',
                // left: '36px',
                // borderRadius: '50px',
                width: '650px',
                height: '900px'
              }
            },
            {
              type: 'image',
              url:  '', // 背景图
              // url:  'http://pic126.nipic.com/file/20170410/19440961_070813128001_2.jpg', // 背景图
              css: {
                bottom: '30px',
                left: '35%',
                borderRadius: '50%',
                width: '200px',
                height: '200px'
              }
            },
         /*   {
              type: 'qrcode',
              content: '',
              css: {
                top: '500px',
                left: '150px',
                // borderRadius: '40px',
                width: '200px',
                height: '200px'
              }
            }*/
          ]
        },
        posterContent: '111', // 文案内容
        posterHtmlBg: require('@/assets/rightCard/bg_saomalingka@3x.png'), // 背景图
        posterImg: '', // 最终生成的海报图片
        coverImgUrl:'',
        test: true,
        imgSrc: ""

      }
    },
    watch: {
      visible (value) {
        if (value && this.record.id) {
          console.log(this.record)
          this.cardName = this.record.cardName
          console.log(this.record.id,this.record.cardId)
          this.getInfo()
        }
      }
    },

    created() {

      this.success();
      this.fail();
    },

    mounted(){
      // 复制文本
        this.$nextTick(() => {
          new ClipboardJS(".copyBtn");
          let oLayout = document.getElementById('components-layout');
          console.log(oLayout);
          oLayout.style.minWidth = "1639px";
        })
    },
    methods: {
      // 获取小程序二维码
      getInfo() {
        this.$get('goldenhome/member/admin_/benefits/cardgiveoutrecord/applet/code',
          {cardId: this.record.id}).then(res => {
          if (res && res.returnCode === 1000) {
            console.log(res)
            // 二维码图片 小程序链接, 下载海报  下载二维码图片
            this.qrcodePicture = res.dataInfo
            this.qrcodeImg = res.dataInfo
            this.painting.views[1].url = res.dataInfo
            // this.linkContent = res.dataInfo.linkContent
          }
        })

      },
      closeModal(freshTable) {
        // this.form.resetFields()
        this.labelIdList = []
        this.memberGradeIdList = []
        this.customerIdList = []
        this.allRequest = false
        this.$emit('cancel', freshTable)
      },
      async callback(key) {
        console.log(key);
        if (key == 1) {

        }
        if (key == 2) {
          // 获取客户标签
          // 获取VIP列表
          await this.getTagInfo()
          await this.getVipList()

        }

      },
      /** 下载海报*/
      //canvas 下载h海报
      handleDownload() {
        console.log('下载h海报')
        console.log(this.posterImg)
        console.log(this.image)
      },
      /** 下载海报*/


      /** tabPane key = 2*/
      //获取vip配置列表
      async getVipList() {
        const res = await this.$get('goldenhome/member/admin_/member/gradeconfig/list')
        if (res && res.returnCode === 1000) {
          this.vipList = res.dataInfo

          this.vipList.forEach((item) => {
            this.$set(item, "checked", false)
          })
          console.log('this.vipList', this.vipList)

        }
      },
      // 获取全部标签
      async getTagInfo() {
        let res = await this.$get(`customer/label/list`);
        if (res && res.returnCode === 1000)
          // 全部标签
          this.clientTags = res.dataInfo
        console.log(this.clientTags)
        this.clientTags.forEach((item) => {
          this.$set(item, "checked", false)
        })
        console.log("所有标签:", this.clientTags)
      },
      //标签
      handleChange(item) {
        // 每次点击把true的扔进列表 把false的移除列表
        console.log(item)
        if (item.checked == true) {
          this.labelIdList.push(item)
        }
        if (item.checked == false) {
          this.labelIdList = this.labelIdList.filter((items) => {
            return items.id !== item.id
          })
        }

        console.log("客户标签：", this.labelIdList)
      },
      // 会员标签
      handleChange2(item) {
        // 每次点击把true的扔进列表 把false的移除列表
        console.log(item)
        if (item.checked == true){
          this.memberGradeIdList.push(item)
        }

        if (item.checked == false) {
          this.memberGradeIdList = this.memberGradeIdList.filter((items) => {
            return items.id !== item.id
          })
        }
        console.log("会员标签：", this.memberGradeIdList)
      },
      tagBtnCloseFunc(item) {
        // 关闭谁  就要把谁从数组中删掉
        console.log(item)
        this.customerIdList = this.customerIdList.filter((items) => {
          return items.id !== item.id
        })
        console.log("客户id:",this.customerIdList)
      },
      tagBtnClickFunc(item) {
        console.log(item)
      },


      openChooseUserModel() {
        this.visible2 = true
      },
      handleSubmit2() {
        console.log(this.$refs.searchtable.selectedRows)
        // 从里面抽出来客户 赋值 标签数组 数据
        this.customerIdList = this.$refs.searchtable.selectedRows
        this.visible2 = false
      },
      closeModal2() {
        this.visible2 = false
      },
      // 是否选择全部用户
      handleallUserChange(checked) {
        // 选择全部用户的时候 要清空其他选项
        console.log(this.allRequest, checked)
      },


      importUsers() {
        //导入用户 跳转到导入页面
        console.log('跳转至导入客户界面')
        this.$router.push({name:'CustomerImportClientsImportClientsList'})
      },
      // 提交客户
      submitClients(){
        let allRequest = this.allRequest ==true?1:0
        let cardId = this.record.id
        let labelIdList = []
        let memberGradeIdList = []
        let customerIdList	= []
        // 当不是选择全部客户的时候
        // 抽出  标签id 以及会员id  选择客户的id
        if (allRequest ===0){
          this.labelIdList.forEach((item)=>{
            labelIdList.push(item.id)
          })
          this.memberGradeIdList.forEach((item)=>{
            memberGradeIdList.push(item.id)
          })
          this.customerIdList.forEach((item)=>{
            customerIdList.push(item.id)
          })
        }
        ///benefits/cardgiveoutrecord/giveout
        this.$confirm({
          title: '提示',
          content: "请确认为以上客户发放该权益卡",
          okText: '确认',
          cancelText: '取消',
          onOk: ()=> {
            this.$post('goldenhome/member/admin_/benefits/cardgiveoutrecord/giveout',
              {cardId,labelIdList,memberGradeIdList,customerIdList,allRequest}).then(res => {
              if (res && res.returnCode === 1000) {
                // const record = res.dataInfo || {}
                console.log(res)
              }
              console.log('确认提交')
              // 这里也可以调关闭框的操作
              this.cancelSubmitClients(true)
            })
          }
        })

      },
      cancelSubmitClients(freshTable){
        // 不要直接去改这个visible
        this. labelIdList = []
        this.memberGradeIdList = []
        this.customerIdList = []
        this.allRequest = false
        this.$emit('cancel', freshTable)
        // console.log('取消提交')
      },









      // canvas 下载小程序码
      downloadIamge() {
        let imgsrc = this.qrcodePicture
        let name = this.cardName
        //下载图片地址和图片名
        let image = new Image();
        // 解决跨域 Canvas 污染问题
        image.setAttribute("crossOrigin", "anonymous");
        image.onload = function () {
          let canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, image.width, image.height);
          let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
          let a = document.createElement("a"); // 生成一个a元素
          let event = new MouseEvent("click"); // 创建一个单击事件
          a.download = name || "photo"; // 设置图片名称
          a.href = url; // 将生成的URL设置为a.href属性
          a.dispatchEvent(event); // 触发a的单击事件
        };
        image.src = imgsrc;
      },
      /*tabpane key = 1*/





      success(src) {
        this.image=src
      },
      fail(err) {
        console.log('fail53', this.painting)
      },
      //base下载海报的图片
      download() {
        let imgData = this.image; //填写你的base64
        this.downloadFile('金桔有品.png', imgData);
      },
      //下载
      downloadFile(fileName, content) {
        let aLink = document.createElement('a');
        let blob = this.base64ToBlob(content); //new Blob([content]);
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);

        // aLink.dispatchEvent(evt);
        aLink.click()
      },
      //base64转blob
      base64ToBlob(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {type: contentType});
      },
    }
  }
</script>

<style scoped lang="less">

  /deep/.ant-btn{
    padding: 0;
  }

  .pane1 {
    display: flex;

    .left {
      /*position: relative;*/
      min-width: 300px;
      width: 300px;
      height: 550px;
      /*border:1px solid black;*/
      /*background-color: lightblue;*/

      background: url("~@/assets/rightCard/bg_saomalingka@3x.png");
      background-size: 100% 100%;
    }

    .right {
      margin-left: 20px;
    }
    .copyBtn{
      padding: 0 10px;
    }
  }

  .pane2 {
    .tagIdt {
      margin: 15px 0 ;
      width: 90%;
      background-color: #F5F5F5;
      padding: 15px;

    }
    .tagIdt2 {
      margin: 15px 0 ;
      width: 90%;
      background-color: #F5F5F5;
      padding: 15px;

    }
    /deep/.ant-tag-checkable{
      /*background-color: #b3d4fc;*/
      border-color:	#DCDCDC;
    }
    .ant-tag{
      font-size: 16px;
      margin: 5px;
    }
    /deep/.anticon svg{
      color:#fff;
    }
  }
</style>



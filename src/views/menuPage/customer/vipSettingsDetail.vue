
<template>
  <a-card title=" 基本信息" class="add_edit_product">
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="会员等级">
        <a-input placeholder="输入等级名称"
                 :maxLength="9"
                 v-model="formData.gradeName"
                 style="width:200px"
                 @change="vipLevelChange"
        >
          <a-tooltip slot="suffix" title="最多输入9个字">
            <span>{{formData.gradeName.length}}/9</span>
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-form-item>

      <a-form-item label="等级背景">
        <a-radio-group v-model="formData.background" @change="onChange">
          <div style="display: flex;">
            <a-radio :style="radioStyle" :value="0">
              背景色
            </a-radio>
            <div style="display:flex;flex-direction:column;" >
              <div class="finalColor" :style="{'background-color':color.color}"></div>
              <div class="colorChoose" v-if="formData.background===0">
                <template >
                  <div v-for="(item, index) in colors" :key="index" >
                    <div :style="{'background-color':item.color}" class="divColor" @click="chooseColor(item)"></div>
                  </div>
                </template>
              </div>
            </div>

            <div v-if="formData.background===0" class="preview" :style="{'background-color':color.color}">
              <div :style="{position:'absolute',color:'#F5F5F5'}">
                <div style="display:flex;">
                  <div><img :src="color.icon" :style="{'width':'35px','height':'35px','margin':'10px 0 0 10px','visibility':color.icon?'':'hidden'}" alt=""></div>
                  <div style="margin:15px 0 0  0;">金牌会员</div>
                  <div style="font-size: 10px;margin:10px 0 0  30px;">再消费100元可升级为 <span style="font-weight: bold;">金星会员</span></div>
                </div>
                <div class="main">
                  <div>
                    <div>21</div>
                    <div>消费单数</div>
                  </div>
                  <div>
                    <div>1</div>
                    <div>会员优惠券</div>
                  </div>
                  <div>
                    <div>2100</div>
                    <div>积分</div>
                  </div>
                </div>
              </div>
              <img v-show="color.bgc" :src="color.bgc" style="width:100%;height:100%;background-size:cover;" alt="">

            </div>

            <div v-if="formData.background===1" class="preview">
              <!--<img style="width:100%;height:100%;background-size:cover;" :src="formData.imgList" alt="请选择背景图">-->
              <div style="position:absolute;color:#F5F5F5;">
                <div style="display:flex;">
                  <div><img :src="color.icon" :style="{'width':'35px','height':'35px','margin':'10px 0 0 10px','visibility':color.icon?'':'hidden'}" alt=""></div>
                  <div style="margin:15px 0 0  0;">金牌会员</div>
                  <div style="font-size: 10px;margin:10px 0 0  30px;">再消费100元可升级为 <span style="font-weight: bold;">金星会员</span></div>
                </div>
                <div class="main">
                  <div>
                    <div>21</div>
                    <div>消费单数</div>
                  </div>
                  <div>
                    <div>1</div>
                    <div>会员优惠券</div>
                  </div>
                  <div>
                    <div>2100</div>
                    <div>积分</div>
                  </div>
                </div>
              </div>
              <img v-show="formData.imgList" :src="formData.imgList" style="width:100%;height:100%;background-size:cover;" alt="">
            </div>
          </div>
          <div>
            <a-radio :style="radioStyle" :value="1">
              背景图
            </a-radio>
            <div v-if="formData.background===1">
              <upload-image
                v-model="formData.imgList"
                @change="handleProductImageChange">
              </upload-image>
              <div class="desc">尺寸：1000*600像素，小于1M，支持jpg、png、jpeg格式</div>
            </div>

          </div>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="等级图标">
        <upload-image
          v-model="formData.vipLevelPicture"
          @change="handleProductImageChange2">
        </upload-image>
        <div class="desc">尺寸：100*100像素，小于100K，支持jpg、png、jpeg格式</div>
      </a-form-item>

      <a-form-item label="升级规则">
        在官方商城渠道注册，即可成为<span style="font-weight: bold;">金桔有品粉丝会员</span>
        <br>
        <a-select v-model="formData.month"
                  style="width: 120px"
                  :options="vipTimeList">

        </a-select>
        <span> &nbsp;&nbsp;&nbsp;月内消费达&nbsp;&nbsp;&nbsp; </span>
        <a-input type='number' v-model="formData.minMoney" style="width:150px;text-align: center;"></a-input> 元
      </a-form-item>

      <a-form-item label="升级规则说明">
        <a-textarea placeholder="请输入" style="width:500px" :maxLength="200" v-model="formData.remark"></a-textarea>
      </a-form-item>
      <!--★★★★★-->
      <a-form-item label="降级规则">
        <a-radio-group v-model="formData.vipDownRules">
          <a-radio  :value="1">永久有效</a-radio>
          <a-radio  :value="2">条件有效</a-radio>
        </a-radio-group>
        <div v-if="formData.vipDownRules===2">
          <!--★★★-->
          <div v-for="(item, index) in formData.vipDownDetailRulesLit" :key="index">
            <div class="bground">
              <a-select v-model="item.month"
                        style="width: 120px"
                        :options="vipTimeList">

              </a-select>
              <span> &nbsp;&nbsp;&nbsp;内消费&nbsp;&nbsp;&nbsp; </span>
              <a-input type='number' v-model="item.minMoney" style="width:150px;text-align: center;"></a-input>
              <a-input type='number' v-model="item.maxMoney" style="width:150px;text-align: center;"></a-input>  元，等级为

              <a-select v-model="item.gradeName"
                        style="width: 120px"
                        @change="idchange(item)">
                <template v-if="vipList.length>0">
                  <a-select-option v-for="i in vipList" :key="i.gradeId" :label="i.gradeName" :value="i.gradeId">
                    {{i.gradeName}}
                  </a-select-option>
                </template>
              </a-select>

              <span  class="delete" @click="deleteConditions(item)">
               <img src="@/assets/delete.png" alt="">
             </span>
            </div>
          </div>
          <a-button type="primary" @click="addConditions">
            添加条件
          </a-button>
        </div>
      </a-form-item>

      <a-form-item label="降级规则说明" >
        <a-textarea placeholder="请输入" style="width:500px" :maxLength="200" v-model="formData.reduceRemark"></a-textarea>
        <div class="desc"></div>
      </a-form-item>

      <a-form-item label="享受权益" style="">
        <a-textarea readOnly v-model="formData.vipRights" @click="openModel" style="width:500px;color:#1890ff"></a-textarea>
      </a-form-item>

      <!--<a-form-item label="积分倍率" >
        <a-input  v-model="formData.integralMultiple" style="width:200px;"></a-input>
      </a-form-item>-->

      <a-form-item label="是否启用">
        <a-switch v-model="formData.enable" ></a-switch>
      </a-form-item>
      <a-form-item>
        <a-col :offset="11">
          <a-space>
            <a-button type="primary" @click="submitData">保存</a-button>
            <a-button @click="handleCancel">取消</a-button>
          </a-space>
        </a-col>
      </a-form-item>


      <a-modal
        :visible="visible"
        okText="选择"
        cancelText="取消"
        :title="title"
        :maskClosable="false"
        :destroyOnClose="true"
        :keyboard="false"
        width="1000px"
        @cancel="closeModal()"
        @ok="handleSubmit">

        <search-table
          :url="url"
          ref="searchtable"
          :form="form"
          :columns="columns"
          width="1000px"
          :chosenKeys="formData.vipRightsIds"
          :chosenRights="formData.rights"
        >
          <template slot="searchForm">
            <a-form layout="inline" :form="form">

              <a-form-item label="权益类型">
                <a-select
                  showSearch
                  allowClear
                  style="width: 150px"
                  :options="rightTypeList"
                  v-decorator="['benefitType']"
                  placeholder="请选择"
                >
                </a-select>
              </a-form-item>

              <a-form-item label="权益名称">
                <a-input
                  style="width:180px"
                  v-decorator="[
                        'benefitName',
                      ]"
                  placeholder="请输入权益名称"
                >
                </a-input>
              </a-form-item>

            </a-form>
          </template>
        </search-table>
      </a-modal>
    </a-form>
  </a-card>



</template>

<script>
  import deepCopy from '@/utils/deepCopy'
  import ImageUploadList from './components/UploadImage'
  import SearchTable from "./components/SearchTable/SearchTableVipDetail";
  export default {
    // 这个页面是编辑修改页面
    name: 'vipSettingsDetail',
    components: {
      ImageUploadList,
      SearchTable
    },

    computed: {},
    data() {
      return {
        // 保存基本信息之后显示下面一片
        // 背景图只要一张背景图，，颜色使用渐变色填充
        colors: [
          // {color:'#EDEDED',bgc:require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),icon:require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')},
          {
            color: '#D79A7E',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            bgp: require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_01@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')
          },
          {
            color: '#CACACA',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            bgp: require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_02@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel02@2x.png')
          },
          {
            color: '#E9D7A2',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            bgp: require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_03@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel03@2x.png')
          },
          {
            color: '#555555',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            bgp: require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_04@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel04@2x.png')
          },
          {
            color: '#92C8DF',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            bgp: require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_5@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel05@2x.png')
          },
          {
            color: '#A1DDD6',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')
          },
          {
            color: '#AEDDA1',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')
          },
          {
            color: '#F28792',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')
          },
          {
            color: '#9880B5',
            bgc: require('@/assets/middle_modalbox_VIPcard_bg_G@2x.png'),
            icon: require('@/assets/vipbgc/icon/middle_modalbox_icon_viplevel01@2x.png')
          },
        ],
        // bgc:'',
        color: {
          color: '#D79A7E',
          bgc: require('@/assets/vipbgc2/middle_modalbox_VIPcard_bg_01@2x.png'),
          icon: ""
        },
        vipTimeList: [
          {
            label: '3个月',
            value: 3,
          },
          {
            label: '6个月',
            value: 6,
          },
          {
            label: '12个月',
            value: 12,
          },
          {
            label: '24个月',
            value: 24,
          },
          /*  {
              label:'不限时间',
              value:''
            }*/
        ],
        // 会员列表
        vipList: [],

        formData: {
          id: '',
          background: '',
          imgList: '',
          vipLevelPicture: '',
          // 拆分出来的的升级规则
          "minMoney": 100,
          "month": 12,
          "ruleType": 1,
          "gradeId": 448915264185040896,
          "gradeName": '',
          "remark": "",
          "reduceRemark": "",
          vipDownRules: 2,
          vipRights: '',
          vipRightsIds: [],
          rights: [],
          // integralMultiple: 1,
          enable: false,
          effectiveType: 1,

          // 拆分出来的的降级规则
          vipDownDetailRulesLit: [],
          // 初始化添加降级规则
          addDownDetailRule: {
            "ruleType": 2,
            "effectiveType": 2,
            "minMoney": '',
            "month": 12,
            "maxMoney": '',
            "gradeId": "",
            "gradeName": '',
            'childGradeId': ''
          },


        },
        radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
        },

        // 弹框相关
        form: this.$form.createForm(this, {name: 'table_search'}),
        url: 'goldenhome/member/admin_/member/benefits/page',
        visible: false,
        title: '请选择权益',
        columns: [
          {
            title: '权益类型',
            dataIndex: 'benefitTypeName',
            key: 'benefitTypeName',
          },
          {
            title: '权益名称',
            dataIndex: 'generalName',
            key: 'generalName',
          },
          {
            title: '展示名称',
            dataIndex: 'benefitName',
            key: 'benefitName',
          },
          {
            title: '图标',
            dataIndex: 'benefitIcon',
            key: 'benefitIcon',
            customRender: (text, row) => {
              // console.log("text", text);
              return<table-img src = {text}/>;
            },
          },


          {
            title: '权益说明',
            dataIndex: 'remark',
            key: 'remark',
            scopedSlots: {customRender: 'remark'}
          },

          {
            title: '保存时间',
            dataIndex: 'updateDate',
            key: 'updateDate',
          }

        ],
        rightTypeList: [
          {
            label: "开卡礼",
            value: 1,
          },
          {
            label: "赚积分",
            value: 2,
          },
          {
            label: "购物返积分",
            value: 3,
          },
          {
            label: "积分兑换",
            value: 4,
          },
          {
            label: "家居顾问",
            value: 5,
          },
          {
            label: "生日礼包",
            value: 6,
          },
          {
            label: "升级礼包",
            value: 7,
          },
          {
            label: "会员日",
            value: 8,
          },
          {
            label: "超省会员价",
            value: 9,
          },
          {
            label: "自定义权益",
            value: 10,
          }
        ],
        /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

      }
    },
    watch: {
      /*   'formData.vipDownDetailRulesLit': {
           handler(newName, oldName) {
             console.log(newName, oldName)
           },
           deep: true,
           immediate: true
         }*/
    },

    async created() {
      console.log(this.$route.query.id)
      await this.getVipInfo()
      await this.getRights()

    },
    mounted() {
      this.getVipList()
    },
    methods: {
      //查询VIP配置列表
      async getVipList() {
        const res = await this.$get('goldenhome/member/admin_/member/gradeconfig/list')
        if (res && res.returnCode === 1000) {
          // this.$message.success('操作成功!')
          res.dataInfo.forEach((item) => {
            const {id, gradeName, ...other} = item
            this.vipList[this.vipList.length] = {id, gradeName}
          })

          this.vipList.forEach((item) => {
            this.$set(item, "gradeId", item.id)
          })
          console.log('this.vipList', this.vipList)
          // this.vipDownDetailRulesLit.gradeId=this.vipList[0].id
          // console.log(res)
          //
        }
      },
      // 据id查详情
      async getVipInfo() {
        const res = await this.$get('goldenhome/member/admin_/member/gradeconfig/query', {id: this.$route.query.id})
        if (res && res.returnCode === 1000) {
          // this.$message.success('操作成功!')
          console.log(res)
          const result = res.dataInfo

          if (result.backgroundColor === '') {
            this.formData.background = 1
          } else {
            this.formData.background = 0
          }

          this.formData.effectiveType = result.effectiveType
          if (this.formData.effectiveType === 1) {
            this.formData.vipDownRules = 1
          } else {
            this.formData.vipDownRules = 2
          }

          this.color.color = result.backgroundColor || '#D79A7E'

          this.color.bgc = result.backgroundPicture
          this.formData.imgList = result.backgroundPicture
          this.color.icon = result.gradePicture
          this.formData.vipLevelPicture = result.gradePicture
          // 权益ids
          this.formData.vipRightsIds = result.benefits || ''
          this.formData.id = result.id
          this.formData.gradeName = result.gradeName || ''
          this.formData.month = result.month || 12
          this.formData.minMoney = (result.minMoney / 100).toFixed(2)
          this.formData.reduceRemark = result.reduceRemark
          this.formData.remark = result.remark
          // this.formData.integralMultiple = result.integralMultiple || 1

          this.formData.enable = result.enable === 0 ? false : true
          this.formData.vipRightsIds = result.benefits
          console.log(result.gradeRules)
          // 拿降级规则列表
          result.gradeRules.forEach((item) => {
            const {minMoney, maxMoney, month, ruleType, id, gradeName, effectiveType, childGradeId, ...others} = item
            this.formData.vipDownDetailRulesLit.push({
              childGradeId,
              minMoney,
              maxMoney,
              month,
              ruleType,
              id,
              gradeName,
              effectiveType
            })
          })

          this.formData.vipDownDetailRulesLit.forEach((item) => {
            this.$set(item, "gradeId", item.childGradeId)
            item.minMoney = (item.minMoney / 100).toFixed(2)
            item.maxMoney = (item.maxMoney / 100).toFixed(2)
          })
          console.log('vipDownDetailRulesLit:', this.formData.vipDownDetailRulesLit)
        }
      },

      // 查权益
      async getRights() {
        console.log(this.formData.vipRightsIds)
        if (this.formData.vipRightsIds) {
          const res = await this.$get('goldenhome/member/admin_/member/benefits/idList', {id: this.formData.vipRightsIds})
          // const res= await this.$get('goldenhome/member/admin_/member/benefits/idList',{id:"449254816665829376,449211123837698048"})
          if (res && res.returnCode === 1000) {
            console.log('***********')
            console.log(res)
            this.formData.rights = res.dataInfo
            res.dataInfo.forEach((item) => {
              const {id, benefitName, benefitType} = item
              this.formData.vipRights  =   this.formData.vipRights+benefitName+","
             /* switch (benefitType) {
                case 1:
                  this.formData.vipRights += '开卡礼,'
                  break
                case 2:
                  this.formData.vipRights += '赚积分,'
                  break
                case 3:
                  this.formData.vipRights += '购物返积分,'
                  break
                case 4:
                  this.formData.vipRights += ' 积分兑换,'
                  break
                case 5:
                  this.formData.vipRights += '家居顾问,'
                  break
                case 6:
                  this.formData.vipRights += '生日礼包,'
                  break
                case 7:
                  this.formData.vipRights += '升级礼包,'
                  break
                case 8:
                  this.formData.vipRights += '会员日,'
                  break
                case 9:
                  this.formData.vipRights += '超省会员价,'
                  break
                case 10:
                  this.formData.vipRights += '自定义权益,'
                  break
              }*/
            })
            console.log(typeof this.formData.vipRights)
            this.formData.vipRights = this.formData.vipRights.substr(0, this.formData.vipRights.length - 1)
          }
        }

      },
      // 提交之前的改变钱单位的的辅助方法
      fuzhufangfa() {
        console.log(this.formData.vipDownDetailRulesLit)
        this.formData.minMoney = Math.round(this.formData.minMoney * 10 * 10)
        this.formData.vipDownDetailRulesLit.forEach((item) => {
          item.minMoney = Math.round(item.minMoney * 10 * 10)
          item.maxMoney = Math.round(item.maxMoney * 10 * 10)
        })
      },
      //
      idchange(val) {
        console.log('val', val)
        let res = this.vipList.filter((item) => {
          // 右侧名为gradeName  实际变化之后就会变成id
          return item.id === val.gradeName
        })
        // 更新原来数组里面元素的属性
        val.gradeName = res[0].gradeName
        val.gradeId = res[0].gradeId
        val.childGradeId = res[0].gradeId
        console.log(val)
        console.log(this.formData.vipDownDetailRulesLit)
      },
      // 修改会员 配置信息,
      submitData() {

        if (this.formData.gradeName.length<1){
          this.$message.error('身份称谓不能为空')
          return
        }

        if (this.color.bgc == ""){
          this.$message.error('请选择背景图')
          return
        }
        if (this.color.icon == ""){
          this.$message.error('请选择等级图标')
          return
        }

        const test = []
        // 判断降级规则中等级有无重复的，有就不给提交
        this.formData.vipDownDetailRulesLit.forEach((item) => {
          test.push(item.gradeId)
        })
        let tests = test.sort();
        for (var i = 0; i < tests.length; i++) {
          if (tests[i] == tests[i + 1]) {
            this.$message.error("降级规则中存在重复等级请重新选择");
            return false
          }
        }

        console.log('表单数据:', this.formData)
        // 有背景色 无降级规则
        if (this.formData.vipRightsIds instanceof Array) {
          this.formData.vipRightsIds = this.formData.vipRightsIds.join(',')
        }
        if (this.formData.vipDownRules === 1 && this.formData.background === 0) {
          this.fuzhufangfa()
          this.$post('goldenhome/member/admin_/member/gradeconfig/update', {

            id: this.formData.id,
            gradeName: this.formData.gradeName,
            backgroundColor: this.color.color,
            backgroundPicture: this.color.bgc,
            gradePicture: this.color.icon,
            enable: this.formData.enable === true ? 1 : 0,
            // enable:1,
            // integralMultiple: this.formData.integralMultiple,
            remark: this.formData.remark,
            reduceRemark: this.formData.reduceRemark,
            month: this.formData.month,
            minMoney: this.formData.minMoney,
            benefits: this.formData.vipRightsIds,
            list: [],
            effectiveType: 1,
            ruleType: 1
          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push({
                name: 'CustomerVipSettings',
              })
            }
          })
        }
        // 无背景色 无降级规则
        if (this.formData.vipDownRules === 1 && this.formData.background === 1) {
          this.fuzhufangfa()
          this.$post('goldenhome/member/admin_/member/gradeconfig/update', {
            id: this.formData.id,
            gradeName: this.formData.gradeName,
            backgroundColor: '',
            backgroundPicture: this.formData.imgList,
            gradePicture: this.color.icon,
            // enable:this.formData.enable,
            // enable:1,
            enable: this.formData.enable === true ? 1 : 0,
            // integralMultiple: this.formData.integralMultiple,
            remark: this.formData.remark,
            reduceRemark: this.formData.reduceRemark,
            month: this.formData.month,
            minMoney: this.formData.minMoney,
            benefits: this.formData.vipRightsIds,
            list: [],
            effectiveType: 1,
            ruleType: 1
          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push({
                name: 'CustomerVipSettings',
              })
            }
          })
        }
        // 无背景色 有降级规则
        if (this.formData.vipDownRules === 2 && this.formData.background === 1) {

          if (this.formData.vipDownDetailRulesLit.length < 1) {
            this.$message.error('条件不可为空')
            return
          }
          this.fuzhufangfa()
          this.$post('goldenhome/member/admin_/member/gradeconfig/update', {
            id: this.formData.id,
            gradeName: this.formData.gradeName,
            backgroundColor: '',
            backgroundPicture: this.formData.imgList,
            gradePicture: this.color.icon,
            // enable:this.formData.enable,
            // enable:1,
            enable: this.formData.enable === true ? 1 : 0,
            // integralMultiple: this.formData.integralMultiple,
            remark: this.formData.remark,
            reduceRemark: this.formData.reduceRemark,
            month: this.formData.month,
            minMoney: this.formData.minMoney,
            benefits: this.formData.vipRightsIds,
            list: this.formData.vipDownDetailRulesLit,
            effectiveType: 2,
            // enable:1
            ruleType: 1
          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push({
                name: 'CustomerVipSettings',
              })
            }
          })
        }
        // 有背景色 有降级规则
        if (this.formData.vipDownRules === 2 && this.formData.background === 0) {
          if (this.formData.vipDownDetailRulesLit.length < 1) {
            this.$message.error('降级条件不可为空')
            return
          }
          this.fuzhufangfa()
          this.$post('goldenhome/member/admin_/member/gradeconfig/update', {
            id: this.formData.id,
            gradeName: this.formData.gradeName,
            backgroundColor: this.color.color,
            backgroundPicture: this.color.bgc,
            gradePicture: this.color.icon,
            // enable:this.formData.enable,
            // enable:1,
            enable: this.formData.enable === true ? 1 : 0,
            // integralMultiple: this.formData.integralMultiple,
            remark: this.formData.remark,
            reduceRemark: this.formData.reduceRemark,
            month: this.formData.month,
            minMoney: this.formData.minMoney,
            benefits: this.formData.vipRightsIds,
            list: this.formData.vipDownDetailRulesLit,
            effectiveType: 2,
            // enable:1
            ruleType: 1
          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********')
              console.log(res)
              this.$message.success('操作成功!')
              this.$router.push({
                name: 'CustomerVipSettings',
              })
            }
          })
        }

      },

      chooseColor(item) {
        // 选择颜色的时候, 设置对应的背景渐变色   把对应的渐变色 赋值给 一个东西 ，，然后动态给背景添加颜色
        this.color.bgc = item.bgc
        this.formData.imgList = item.bgc
        this.color.color = item.color
      },

      vipLevelChange(val) {
        // console.log(this.formData.gradeName.length)
      },

      onChange(e){
        console.log(e.target.value,this.color)
        // 背景图 切换到背景色的时候  给他一个默认背景色
        if (e.target.value ==0){
          this.formData.imgList = this.colors[0].bgc
          this.color.bgc = this.colors[0].bgc
        }

        if (e.target.value ==1){
          this.formData.imgList = ""
          this.color.bgc =  ""
        }
      },
      handleProductImageChange(val) {
        this.formData.imgList = val
        this.color.bgc = val
        console.log(this.formData.imgList)
      },
      handleProductImageChange2(val) {
        this.formData.vipLevelPicture = val
        this.color.icon = val
        // this.color.icon =  val
        console.log(this.color, this.formData.vipLevelPicture)
      },

      openModel() {
        // this.formData.vipRights=''
        // this.formData.vipRightsIds=''
        if (typeof this.formData.vipRightsIds === 'string') {
          this.formData.vipRightsIds = this.formData.vipRightsIds.split(',')
        }
        console.log(this.formData.vipRightsIds)
        this.visible = true
      },
      handleCancel() {
        this.$router.push({name: 'CustomerVipSettings'})
      },


      async getrightsbyIds(rightIds){
        let ids = rightIds.join(',')

        // let ids = rightIds
        // console.log({ids})
        const res = await this.$get('goldenhome/member/admin_/member/benefits/idList', {id: ids})
        if (res && res.returnCode === 1000) {

          console.log('***********')
          console.log(res.dataInfo)
        /*  res.dataInfo.forEach((item) => {
            const { benefitName} = item
            this.formData.vipRights = this.formData.vipRights+benefitName+","
          })*/
/*          console.log(typeof this.formData.vipRights)
          this.formData.vipRights = this.formData.vipRights.substr(0, this.formData.vipRights.length - 1)*/
          return res.dataInfo
        }
      },
      // 弹框相关
     async handleSubmit() {
        // this.formData.vipRightsIds = this.$refs.searchtable.selectedRowKeys
        let vipRightsIds = this.$refs.searchtable.selectedRowKeys
        // let vipRightsIds = []
        let vipRightsBenefitsType = []
        // for (const item of vipRightsIds) {
        //    vipRightsIds.push(item)
        // }
        let rights = await this.getrightsbyIds( vipRightsIds)
        for (const item of rights) {
          vipRightsBenefitsType.push(item.benefitType)
        }
        console.log(vipRightsBenefitsType)
        let result = this.chongfu(vipRightsBenefitsType)
        for(let i of result){
           switch (i) {
               case 1:
                 this.$message.error('开卡礼权益类型不能重复选择')
                 break
               case 2:
                 this.$message.error('赚积分权益类型不能重复选择')
                 break
               case 3:
                 this.$message.error('购物返积分权益类型不能重复选择')
                 break
               case 4:
                 this.$message.error('积分兑换权益类型不能重复选择')
                 break
               case 5:
                 this.$message.error('家居顾问权益类型不能重复选择')
                 break
               case 6:
                 this.$message.error('生日礼包权益类型不能重复选择')
                 break
               case 7:
                 this.$message.error('升级礼包权益类型不能重复选择')
                 break
               case 8:
                 this.$message.error('会员日权益类型不能重复选择')
                 break
               case 9:
                 this.$message.error('超省会员价权益类型不能重复选择')
                 break
               case 10:
                 this.$message.error('自定义权益权益类型不能重复选择')
                 break
             }
        }
        if (result.length==0){
          console.log("走到这")
          
          this.formData.vipRightsIds =  vipRightsIds
          let vipRights = []
            for (let item of rights){
                vipRights.push(item.benefitName)
            }
          this.formData.vipRights = vipRights.join(',')
          console.log(this.formData.vipRights)
          /*    rights.forEach((item) => {
              const { benefitName} = item
              this.formData.vipRights = this.formData.vipRights+benefitName+","
              console.log(typeof this.formData.vipRights)
              this.formData.vipRights = this.formData.vipRights.substr(0, this.formData.vipRights.length - 1)
            })*/
          this.visible = false
        }else {
          return
        }

        // let a
        // this.formData.rights

      },
      // 工具函数  获取重复元素
      chongfu(arr) {
        var arr1=[];
        var flag=0;
        for(var i=0;i<arr.length;i++)
        {
          for(var j=i+1;j<arr.length;j++)
          {
            if(arr[i]==arr[j])
            {
              flag++;
              if(flag==1)        //判断是不是第一次重复
              {arr1.push(arr[i]);}
              arr.splice(j,1);    //如果不是第一次重复，那么删除多余的重复元素
            }
          }
          flag=0;        //标记清零
        }
        return arr1;
      },
      closeModal() {

        this.visible = false
      },

      addConditions() {
        let a = deepCopy(this.formData.addDownDetailRule)
        this.formData.vipDownDetailRulesLit.push(a)
      },
      deleteConditions(rule) {
        console.log(rule)
        if (this.formData.vipDownDetailRulesLit.length > 1) {
          this.formData.vipDownDetailRulesLit = this.formData.vipDownDetailRulesLit.filter((item) => {
            return item !== rule
          })
        } else {
          this.$message.error('降级条件不可为空')
          return
        }
        console.log(this.formData.vipDownDetailRulesLit)

      },
      /*-------------------------------------*/

    }
  }
</script>
<style lang="less" scoped>
  .colorChoose{

    width:178px;
    height:66px;

    margin-top: 3px;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(102, 102, 102, 0.3);

    display: flex;

    flex-wrap: wrap;
  }
  /deep/.ant-upload.ant-upload-select-picture-card{
    width: 75px;
    height: 75px;
  }
  .finalColor{
    width:60px;
    height:30px;
    background-color:#D79A7E;

  }
  .divColor{
    width: 18px;
    height: 18px;
    border-radius: 3px;
    margin: 10px 0 0 10px;

  }
  .preview{
    position: absolute;
    width:310px;
    height: 160px;
    border:1px solid;
    margin-left:570px;
    border-radius:8px;

  }

  .bground{
    position: relative;
    width: 780px;
    height: 60px;
    padding:10px 10px 0 10px;
    margin-bottom: 10px;
    background-color: #DCDCDC;
  }
  .delete{
    position: absolute;
    right:0;
    top:-10px;
    display:inline-block;
    width: 30px;
    height: 30px;
    opacity: 0;
  }
  .delete:hover{
    opacity: 1;
    color: red;
  }
  .main{
    width:100%;height:100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }
  /deep/.ant-card-head-title::before{
    content:'';
    display: inline-block;
    width:5px;
    height: 20px;
    transform: scaleX(-1) scaleY(-1);
    background-image: linear-gradient(135deg, #0B59F9 0%, #48DCFF 100%);
    border-radius: 5px;
    position: relative;
    left:0;
    top:3px;
  }
  /deep/.ant-card-head-title{
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    line-height: 26px;
  }
</style>

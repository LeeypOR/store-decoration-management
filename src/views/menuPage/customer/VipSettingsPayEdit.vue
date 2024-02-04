
<template>
  <div>
    <div>
      修改卡/修改权益卡
    </div>
    <div style="font-weight: bold;margin: 20px 0;font-size: 18px;">
      基本信息:
    </div>
    <div style="height: 1px;width: 100%;border:1px solid lightgray;margin: 0 auto;">
    </div>
    <br>
    <br>
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <a-form-item label="名称">
        <a-input placeholder="输入权益卡名称"
                 :maxLength="9"
                 v-model="RCData.cardName"
                 style="width:200px"
                 @blur="cardName">
          <a-tooltip slot="suffix" title="最多输入9个字">
            <span>{{RCData.cardName.length}}/9</span>
            <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
          </a-tooltip>
        </a-input>
      </a-form-item>

      <a-form-item >
        <a-radio-group v-model="RCData.receiveWay" disabled>
          <a-radio :value="1">
            付费购买
          </a-radio>
          <a-radio :value="2">
            发放领取
          </a-radio>
        </a-radio-group>
        <template>
          <a-select  v-show="RCData.receiveWay==2" v-model="RCData.fafangfayouxiaoqi" style="width: 120px" >
            <a-select-option :value="1">
              1年
            </a-select-option>
            <a-select-option :value="2" >
              3个月
            </a-select-option>
            <a-select-option :value="3">
              1个月
            </a-select-option>
          </a-select>
        </template>
        <span slot="label" class="ant-form-item-required">付费规则</span>
        <div style="width: 600px;">
          <a-button @click="addRule" type="primary" v-show="RCData.receiveWay==1">添加规则</a-button>
          <br>
          <a-table :columns="payRuleListColumn" v-show="RCData.receiveWay==1"
                   size="small"
                   :data-source="RCData.payRuleList"
                   bordered
                   table-layout="fixed"
                   :pagination="false">

                      <span slot="price" slot-scope="text, record">
                       <template v-if="record.editable ==false">
                         {{record.price}}元
                       </template>

                        <template v-else>
                         <a-input type="number" v-model="record.price" suffix="元"></a-input>
                        </template>
                      </span>

            <span slot="valid" slot-scope="text, record">
                       <template v-if="record.editable ==false">
                         <span v-if="record.validPeriodUnit==1">1年</span>
                         <span v-if="record.validPeriodUnit==2">3个月</span>
                         <span v-if="record.validPeriodUnit==3">1个月</span>
                       </template>
                       <template v-else>
                          <a-select v-model="record.validPeriodUnit" style="width: 120px" >
                            <a-select-option :value="1">
                              1年
                            </a-select-option>
                            <a-select-option :value="2" >
                              3个月
                            </a-select-option>
                            <a-select-option :value="3">
                              1个月
                            </a-select-option>
                      </a-select>
                       </template>
                      </span>

            <span slot="operation" slot-scope="text, record">
                            <span v-if="record.editable==false" class="text-primary pointer" @click="editRules(record)" >编辑</span>
                            <span v-if="record.editable==true" class="text-primary pointer" @click="confirmRules(record)" >确定</span>
                            <a-divider type="vertical"/>
                            <span class="text-primary pointer" @click="deleteRule(record)" >删除</span>
                      </span>
          </a-table>
        </div>
      </a-form-item>

      <a-form-item label="配置付费权益礼包">
        <a-col>
          <a-textarea style="width: 500px;color: #1890ff" readOnly v-model="RCData.benefitListString"></a-textarea>
        </a-col>
      </a-form-item>

      <a-form-item label="使用须知">
        <a-col>
          <tinymce-editor v-model="RCData.remark">></tinymce-editor>
        </a-col>
      </a-form-item>
      <!--勿删-->
    <!--  <div style="font-weight: bold;margin: 20px 0;font-size: 18px;">
        权益礼包:
      </div>
      <div style="height: 1px;width: 100%;border:1px solid lightgray;margin: 0 auto;"></div>
      <br>
      <br>

      <a-form-item label="权益">
        <a-checkbox @change="rightChange" :default-checked="true" disabled>
        </a-checkbox>
        &lt;!&ndash; <a-input  defaultValue="支持会员价" readOnly style="width: 120px;margin-left: 15px;"
                  :disabled="RCData.isSupportMemberPrice==0?true:false"></a-input>&ndash;&gt;
        <a-input  defaultValue="支持会员价" readOnly style="width: 120px;margin-left: 15px;"></a-input>
        <div>
          选择支持会员价，获取到此卡，用户会得到最高等级的会员身份
        </div>

        
        <a-checkbox @change="disCountChange">
        </a-checkbox>
        <a-input defaultValue="消费折扣" readOnly style="width: 120px;margin-left: 15px;"
                 :disabled="!RCData.hasDisCount">
        </a-input>
        <a-input-number defaultValue="88" :min="0" :max="99"  v-model="RCData.consumptionDiscount" style="width: 120px;margin-left: 15px;"
                        :disabled="!RCData.hasDisCount" >

        </a-input-number> 折  <span v-if="RCData.hasDisCount"  style="margin-left: 20px;color: darkgray;">例：8折请输入数字8 (80也可以), 85折请输入85即可</span>
        <br>
        <a-button type="link" style="margin-left:15px;" :disabled="!RCData.hasDisCount" @click="chooseDisCountGoods">
          选择商品
        </a-button>
        <br>
        &lt;!&ndash;折扣商品表格&ndash;&gt;
        <div v-if="RCData.discountGoodsList.length>0" style="width: 60%;">
          <a-table :columns="disCountTableColumns"
                   size="small"
                   :data-source="RCData.discountGoodsList"
                   bordered
                   table-layout="fixed"
                   :pagination="false">
                <span slot="operation" slot-scope="text, record">
                           <a-button type="primary" @click='deleteDisCountGood(record)'>删除</a-button>
                      </span>
          </a-table>
        </div>


        <a-checkbox @change="integralRatioChange" v-model="RCData.hasintegralRatio">
        </a-checkbox>
        <a-input defaultValue="积分回馈倍率" readOnly style="width: 120px;margin-left: 15px;"
                 :disabled="!RCData.hasintegralRatio"></a-input>
        <a-input-number :min="1"   v-model="RCData.integralRatio"  style="width: 120px;margin-left: 15px;"
                 :disabled="!RCData.hasintegralRatio"></a-input-number> 倍
        <br>

        <a-checkbox @change="couponChange" v-model="RCData.hascoupon">
        </a-checkbox>
        <a-input defaultValue="送优惠券" readOnly style="width: 120px;margin-left: 15px;"></a-input>
        <br>
        <a-button type="link" style="margin-left:15px;" :disabled="!RCData.hascoupon" @click="chooseCouponList">
          选择优惠券
        </a-button>

        &lt;!&ndash;优惠券表格&ndash;&gt;
        <div v-if="RCData.couponList.length>0" style="width: 77%;">
          <a-table :columns="couponTableColumns"
                   size="small"
                   :data-source="RCData.couponList"
                   bordered
                   table-layout="fixed"
                   :pagination="false">
            <div slot="amount" slot-scope="text, record">
              <a-input-number v-model="record.amount"  style="width: 120px;" type="number" placeholder="填写数量"></a-input-number>
            </div>
            <span slot="operation" slot-scope="text, record">
                           <a-button type="primary" @click='deleteCoupon(record)'>删除</a-button>
                      </span>
          </a-table>
        </div>


        <br>
        <a-checkbox @change="sendGoodsChange" v-model="RCData.isSendgoodsFree">
        </a-checkbox>
        <a-input defaultValue="送商品" readOnly style="width: 120px;margin-left: 15px;"></a-input>
        <br>
        <a-button type="link" style="margin-left:15px;" :disabled="!RCData.isSendgoodsFree" @click="chooseSendGoods">
          选择商品
        </a-button>

        &lt;!&ndash;送的商品&ndash;&gt;
        <div v-show="RCData.goodsList.length>0" style="width: 60%;">
          <a-table :columns="sendGoodsTableColumns"
                   size="small"
                   :data-source="RCData.goodsList"
                   bordered
                   table-layout="fixed"
                   :pagination="false">
                      <span slot="operation" slot-scope="text, record">
                           <a-button type="link" @click='chooseGoodsSpecId(record,"specVisible")'>选择商品规格</a-button>
                           <a-button type="link" @click='deleteSendGood(record)'>删除</a-button>
                      </span>

          </a-table>
        </div>
        <chooseSpecModel  @submitSpec="submitSpec" :record="currentRecord" @cancel="closeGoodsSpecIdModal" :visible="specVisible" />
      </a-form-item>-->





<!--      <div style="font-weight: bold;margin: 20px 0;font-size: 18px;">
        高级设置:
      </div>
      <div style="height: 1px;width: 100%;border:1px solid lightgray;margin: 0 auto;"></div>
      <br>
      <br>

      <a-form-item label="分享设置">
        <a-checkbox @change="shareChange" v-model="RCData.isShare">
          允许分享
        </a-checkbox>
      </a-form-item>

      <a-form-item label="卡券码兑换权益卡">
        <a-checkbox @change="exchangeCard" v-model="RCData.isExchangeCode">
          允许兑换
        </a-checkbox>
        <a-input style="width: 220px; border-radius: 4px 0 0 4px" readOnly v-model="RCData.redemptionCode" id="copyUrl"/>
        <a-button style="border-radius: 0 4px 4px 0" class="copyBtn" type="primary"
                  :data-clipboard-target="'#copyUrl'">复制
        </a-button>
      </a-form-item>-->

      <!--<a-form-item label="是否启用:">
        <a-switch v-model="RCData.isEnabled	" @change="enableChange" ></a-switch>
      </a-form-item>-->

      <a-form-item>
        <a-col :offset="11">
          <a-space>
            <a-button type="primary" @click="submitDataEle">保存</a-button>
            <a-button @click="handleCancel">取消</a-button>
          </a-space>
        </a-col>
      </a-form-item>
      <!--打折商品model-->
      <a-modal
        :visible="discountModelVisible"
        okText="选择"
        cancelText="取消"
        :title="title"
        :maskClosable="false"
        :destroyOnClose="true"
        :keyboard="false"
        width="1000px"
        @cancel="closeModal"
        @ok="handleSubmit">

        <search-table
          :url="chooseDiscountGoodsUrl"
          ref="discountsearchtable"
          :form="discountForm"
          @changeStatus=""
          :columns="disCountColumns"
          :chosen-keys="RCData.discountGoodskeys"
          :chosen-rows="RCData.discountGoodsList"
          width="1000px"
        >
          <template slot="searchForm">
            <a-form layout="inline" :form="discountForm">

              <a-form-item label="商品名称">
                <a-input
                  style="width:180px"
                  v-decorator="[
                'goodsName',
              ]"
                  placeholder="请输入商品名称"
                >
                </a-input>
              </a-form-item>

              <a-form-item label="商品分类">
                <a-tree-select
                  allowClear
                  style="width:180px"
                  :replaceFields="{children:'children', title:'classifyName', key:'id', value: 'id' }"
                  v-decorator="[
                'goodsClassificationId',
              ]"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="discountProductClassifyList"
                  placeholder="请选择"
                  tree-default-expand-all
                >
              <span slot="title" slot-scope="{ key, value }">
                  {{ value }}
              </span>
                </a-tree-select>
              </a-form-item>

              <a-form-item label="商品分组">
                <a-tree-select
                  allowClear
                  style="width:180px"
                  :replaceFields="{children:'children', title:'groupName', key:'id', value: 'id' }"
                  v-decorator="[
                  'goodsGroupId',
                ]"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="discountProductGroupList"
                  placeholder="请选择"
                  tree-default-expand-all
                >
                <span slot="title" slot-scope="{ key, value }">
                    {{ value }}
                </span>
                </a-tree-select>
              </a-form-item>

            </a-form>
          </template>
        </search-table>

      </a-modal>
      <!--优惠券model-->
      <a-modal
        :visible="couponModelVisible"
        okText="保存"
        cancelText="取消"
        :title="title2"
        :maskClosable="false"
        :destroyOnClose="true"
        :keyboard="false"
        width="1000px"
        @cancel="closeModal2()"
        @ok="handleSubmit2">

        <search-table
          :url="chooseCouponListUrl"
          ref="couponsearchtable"
          :form="couponForm"
          :columns="couponcolumns"
          width="1000px"
          :chosen-keys="RCData.couponListkeys"
          :chosen-rows="RCData.couponList"
        >
          <template slot="searchForm">
            <a-form layout="inline" :form="couponForm">

              <a-form-item label="优惠卷名称">
                <a-input
                  style="width:180px"
                  v-decorator="[
                'couponName',
              ]"
                  placeholder="输入优惠卷名称"
                >
                </a-input>
              </a-form-item>
              <a-form-item>
                <a-select style="width: 180px"
                          :allowClear="true"
                          placeholder="全部"
                          :options="couponListType"
                          v-decorator="['couponType']"
                ></a-select>
              </a-form-item>
            </a-form>
          </template>
        </search-table>


      </a-modal>

      <!--送商品model-->
      <a-modal
        :visible="sendGoodsModelVisible"
        okText="选择"
        cancelText="取消"
        :title="title3"
        :maskClosable="false"
        :destroyOnClose="true"
        :keyboard="false"
        width="1000px"
        @cancel="closeModal3"
        @ok="handleSubmit3">

        <search-table
          tableSelectType="radio"
          :url="chooseSendGoodsUrl"
          ref="sendgoodssearchtable"
          :form="sendGoodsForm"
          :columns="disCountColumns"
          width="1000px"
          :chosen-keys="RCData.goodsListkeys"
          :chosen-rows="RCData.goodsList"
        >
          <template slot="searchForm">
            <a-form layout="inline" :form="sendGoodsForm">

              <a-form-item label="商品名称">
                <a-input
                  style="width:180px"
                  v-decorator="[
                'goodsName',
              ]"
                  placeholder="请输入商品名称"
                >
                </a-input>
              </a-form-item>

              <a-form-item label="商品分类">
                <a-tree-select
                  allowClear
                  style="width:180px"
                  :replaceFields="{children:'children', title:'classifyName', key:'id', value: 'id' }"
                  v-decorator="[
                'goodsClassificationId',
              ]"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="discountProductClassifyList"
                  placeholder="请选择"
                  tree-default-expand-all
                >
              <span slot="title" slot-scope="{ key, value }">
                  {{ value }}
              </span>
                </a-tree-select>
              </a-form-item>

              <a-form-item label="商品分组">
                <a-tree-select
                  allowClear
                  style="width:180px"
                  :replaceFields="{children:'children', title:'groupName', key:'id', value: 'id' }"
                  v-decorator="[
                  'goodsGroupId',
                ]"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="discountProductGroupList"
                  placeholder="请选择"
                  tree-default-expand-all
                >
                <span slot="title" slot-scope="{ key, value }">
                    {{ value }}
                </span>
                </a-tree-select>
              </a-form-item>

            </a-form>
          </template>
        </search-table>

      </a-modal>
    </a-form>
  </div>

</template>

<script>
  import deepCopy from "../../../utils/deepCopy";
  import moment from 'moment';
  import ImageUploadList from './components/UploadImage'
  import SearchTable from "@/components/form/SearchTableW";
  import chooseSpecModel from "./rightCard/components/ChooseSpecModel"
  export default {
    name: 'vipSettingsPayEdit',
    components: {
      ImageUploadList,
      SearchTable,
      chooseSpecModel
    },

    computed: {
      userInfo(){
        return this.$store.getters.userInfo || {};
      }
    },
    data() {
      return {

        // RC代表付费会员卡
        payRuleListColumn:[
          {
            title: '有效期',
            dataIndex: 'validPeriodUnit',
            key: 'validPeriodUnit',
            scopedSlots: { customRender: 'valid'}
            /*   customRender:(text,record)=>{
                 if (text==1){
                   return text +"年"
                 }
                 if (text==2){
                   return 3 +"个月"
                 }
                 if (text==3){
                   return 1 +"个月"
                 }
               }*/
          },
          {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            scopedSlots: { customRender: 'price'}
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation'}
          }
        ],
        RCData:{
          cardName:'',
          payRuleList:[],
          remark:'',
          // 发放的有效期
          fafangfayouxiaoqi:1,
          /*使用次数类型1:永久有效; 2:有效期内使用次数; 3:有效期内每时间单位内使用次数*/
          // useTimesType:1,
          //有效期内使用次数
          // useTime:0,
          //有效期内每 (年月周日)什么 的使用次数
          // useUnitTime:1,
          // useTimes:0,
          //权益卡存储数量

          // 权益部分
          // 是否支持会员价
          benefitList:[],
          benefitListString:'',
          isSupportMemberPrice:0,
          // 是否有折扣
          hasDisCount:false,
          // 折扣
          consumptionDiscount:null,
          // 折扣商品集合
          discountGoodsList:[],

          // 是否有积分倍率
          hasintegralRatio:false,
          // 积分倍率
          integralRatio:null,


          // 是否有优惠券
          hascoupon:false,
          // 优惠券商品集合
          couponList:[],
          couponListkeys:[],
          discountGoodskeys:[],
          // 是否赠送商品
          isSendgoodsFree:false,
          goodsList:[],
          goodsListkeys:[],
          // 是否允许分享
          isShare:0,
          // 允许兑换码？
          // isExchangeCode:false,
          // 具体什么码
          // redemptionCode:null,
          // 是否开启
          isEnabled	:false,
          receiveWay:1
        },

        // model相关
        discountProductClassifyList: [],//商品类型
        discountProductGroupList: [],//商品分组
        discountModelVisible:false,
        couponModelVisible:false,
        sendGoodsModelVisible:false,
        title:'选择折扣商品',
        title2:'选择优惠券',
        title3:'选择赠送的商品',
        discountForm: this.$form.createForm(this, { name: 'table_search' }),
        couponForm: this.$form.createForm(this, { name: 'table_search' }),
        sendGoodsForm: this.$form.createForm(this, { name: 'table_search' }),
        chooseDiscountGoodsUrl:'goldenhome/seckill/admin_/seckill/goods/chose',
        chooseCouponListUrl:'/coupon/customer/page',
        chooseSendGoodsUrl:'goldenhome/seckill/admin_/seckill/goods/chose',
        //优惠券类型
        couponListType:[

          {
            label:'满减券',
            value:'0'
          },
          {
            label:'礼品券',
            value:'1'
          },
          {
            label:'折扣券',
            value:'2'
          }

        ],
        // 打折商品列
        disCountTableColumns:[

          {
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
            customRender: (text, row) => {
              //文字+图片
              return <div class="product_td"><table-img src={row.goodsPicture}/><div class="product_name">{text}</div></div>
            }

          },

         /* {
            title: '价格',
            dataIndex: 'salePrice',
            key: 'salePrice',
            customRender:(text,row)=>{
              return (text/100).toFixed(2)+"元"
            }
          },*/
       /*   {
            title: '分类',
            dataIndex: 'goodsClassificationName',
            key: 'goodsClassificationName',
          },*/
        /*  {
            title: '总可售库存',
            dataIndex: 'goodsInventoryTotal',
            key: 'goodsInventoryTotal',
          },*/
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation'}
          }
        ],
        disCountColumns:[
          {
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
          },
          {
            title: '价格',
            dataIndex: 'goodsLowestPrice',
            key: 'goodsLowestPrice',
            customRender:(text,row)=>{
              return (text/100).toFixed(2)+"元"
            }
          },
          {
            title: '总可售库存',
            dataIndex: 'goodsInventoryTotal',
            key: 'goodsInventoryTotal',
          },
        /*  {
            title: '销量',
            dataIndex: 'realSales',
            key: 'realSales',
          },*/

          {
            title: '状态',
            dataIndex: 'goodsStatus',
            key: 'goodsStatus',
            customRender: (text, record) => {

              return '已上架'
            }
          },
       /*   {
            title: '商品分类',
            dataIndex: 'goodsClassificationId',
            key: 'goodsClassificationId',
          },*/
          {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',
          },


        ],
        // 优惠券表格
        couponTableColumns: [

          {
            title: '优惠卷名称',
            dataIndex: 'couponName',
            key: 'couponName',
            customRender: (text, record) => {
              return <div style='white-space: normal;font-size:13px;'>{text}</div>
            }
          },
          {
            title: "优惠内容",
            dataIndex: "couponAmount",
            key: "couponAmount",
            width:150,
            customRender: (value,row) => {
              if(row.couponType==0 || row.couponType==1){
                return '优惠金额'+value+'元';
              }
              else if(row.couponType==2){
                return '打'+row.discountRatio+'折';
              }
              return value;
              // return '优惠金额'+value+'元';
            },
          },
          {
            title: "使用条件",
            dataIndex: "couponFullMoney",
            key: "couponFullMoney",
            width:200,
            customRender: (text, row) => {
              // 1、订单满xx元可用，最多优惠xx钱（使用门槛和最多优惠都不为-1）
              // 2、无门槛，最多优惠xx钱（使用门槛为-1，最多优惠不为-1）
              // 3、订单满xx元可用（最多优惠为-1，使用门槛不为-1）
              // 4、无门槛（使用门槛为-1，最多优惠也为-1）
              if(row.couponFullMoney>0 && row.mostDiscount>0 ){
                return `订单满${row.couponFullMoney}元可用，最多优惠${row.mostDiscount}元`;
              }
              else if(row.couponFullMoney<0 && row.mostDiscount>0){
                return `无门槛，最多优惠${row.mostDiscount}元`;
              }
              else if(row.couponFullMoney>0 && (row.mostDiscount<0 || row.mostDiscount==null)){
                return `订单满${row.couponFullMoney}元可用`;
              }
              else if(row.couponFullMoney<0 && (row.mostDiscount<0 || row.mostDiscount==null)){
                return '无门槛';
              }
              return '';
            /*  if (text<0){
                return "无门槛"
              }else{
                return '满'+text+"元可用";
              }*/
              // if(row.couponType==0 || row.couponType==1){
              //   if(row.couponFullMoney!=-1){
              //     return '订单满'+text+'元可用';
              //   }
              //   return '无门槛';
              // }
              // else if(row.couponType==2){
              //   if(row.mostDiscount>0){
              //     return '最多优惠'+row.mostDiscount+'元'
              //   }
              //   return '';
              // }
              // return text;
            }
          },
          {
            title: '发放数量',
            dataIndex: 'amount',
            key: 'amount',
            scopedSlots: { customRender: 'amount'}
          } ,
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation'}
          }

        ],

        couponcolumns: [

          {
            title: '优惠卷名称',
            dataIndex: 'couponName',
            key: 'couponName',
            customRender: (text, record) => {
              return <div style='white-space: normal;font-size:13px;'>{text}</div>
            }
          },
          {
            title: "优惠内容",
            dataIndex: "couponAmount",
            key: "couponAmount",
            width:150,
            customRender: (value,row) => {
              if(row.couponType==0 || row.couponType==1){
                return '优惠金额'+value+'元';
              }
              else if(row.couponType==2){
                return '打'+row.discountRatio+'折';
              }
              return value;
            },
          },
          {
            title: "使用条件",
            dataIndex: "couponFullMoney",
            key: "couponFullMoney",
            width:200,
            customRender: (text, row) => {
              // 1、订单满xx元可用，最多优惠xx钱（使用门槛和最多优惠都不为-1）
              // 2、无门槛，最多优惠xx钱（使用门槛为-1，最多优惠不为-1）
              // 3、订单满xx元可用（最多优惠为-1，使用门槛不为-1）
              // 4、无门槛（使用门槛为-1，最多优惠也为-1）
              if(row.couponFullMoney>0 && row.mostDiscount>0 ){
                return `订单满${row.couponFullMoney}元可用，最多优惠${row.mostDiscount}元`;
              }
              else if(row.couponFullMoney<0 && row.mostDiscount>0){
                return `无门槛，最多优惠${row.mostDiscount}元`;
              }
              else if(row.couponFullMoney>0 && (row.mostDiscount<0 || row.mostDiscount==null)){
                return `订单满${row.couponFullMoney}元可用`;
              }
              else if(row.couponFullMoney<0 && (row.mostDiscount<0 || row.mostDiscount==null)){
                return '无门槛';
              }
              return '';
              // if(row.couponType==0 || row.couponType==1){
              //   if(row.couponFullMoney!=-1){
              //     return '订单满'+text+'元可用';
              //   }
              //   return '无门槛';
              // }
              // else if(row.couponType==2){
              //   if(row.mostDiscount>0){
              //     return '最多优惠'+row.mostDiscount+'元'
              //   }
              //   return '';
              // }
              // return text;
            }
          },
          {
            title: '分类',
            dataIndex: 'couponType',
            key: 'couponType',
            align: 'center',
            customRender: (text, record) => {
              // console.log(record.couponType)
              if (record.couponType ==1){
                return '礼品券'
              }
              if (record.couponType ==0)
              {
                return'满减券'
              }
              if (record.couponType ==2){
                return "折扣券"
              }
            }
          },
          {
            title: '适用商品',
            dataIndex: 'couponUseType',
            key: 'couponUseType',
            align: 'center',
            customRender: (text, record) => {
              if (record.couponUseType==0){
                return '全部商品'
              }
              if (record.couponUseType==1){
                return '指定商品分组可用'
              }
              if (record.couponUseType==2){
                return '指定商品可用'
              }
            }
          },
          {

            title: '库存',
            align: 'center',
            dataIndex: 'couponStocks',
            key: 'couponStocks',
            customRender:(text,row)=>{
              if (text==-1){
                return "不限量"
              }else {
                return text
              }
            }
          }


        ],
        // 赠品表格
        sendGoodsTableColumns:[
          {
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName',
            customRender: (text, row) => {
              //文字+图片
              return <div class="product_td"><table-img src={row.goodsPicture}/><div class="product_name">{text}</div></div>
            }

          },

       /*   {
            title: '价格',
            dataIndex: 'salePrice',
            key: 'salePrice',
            customRender:(text,row)=>{
              return (text/100).toFixed(2)+"元"
            }
          },*/
      /*    {
            title: '分类',
            dataIndex: 'goodsClassificationName',
            key: 'goodsClassificationName',
          },
          {
            title: '总可售库存',
            dataIndex: 'goodsInventoryTotal',
            key: 'goodsInventoryTotal',
          },*/
          {
            title: '数量',
            dataIndex: 'amount',
            key: 'amount',
          },
          {

            title: '商品规格',
            dataIndex: 'normString',
            key: 'normString'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            scopedSlots: { customRender: 'operation'}
          }
        ],
        specVisible:false,
        currentRecord: null,
        //单选按钮样式
        radioStyle: {
          display: 'inline-block',
          height: '30px',
          lineHeight: '35px',
        },

        // 年月周
        /*useTimeAndTimes: [{label: "年",value: 1,},{label: "月",value: 2,},{ label: "周",value: 3,},{label: "日",value: 4,}],*/
      }
    },
    watch: {

    },

    async created() {
      console.log(this.$route.query.id)
      //
      const res =  await this.$get('goldenhome/member/admin_/member/card/id',{id:this.$route.query.id})
      if (res && res.returnCode == '1000'){
        console.log("会员卡信息:",res.dataInfo)
      }
      // this.RCData = deepCopy(res.dataInfo)
      this.RCData = Object.assign(this.RCData,res.dataInfo)
      // 数组转字符串
      this.RCData.benefitListString = this.RCData.benefitList.join()
      this.RCData.payRuleList.forEach((item)=>{
        this.$set(item,"editable",false)
      })
      //每个 要打上标识editable ★★★★★
      if (this.RCData.payRuleList ==null){
        this.RCData.payRuleList = []
      }
      console.log(this.RCData)


      // 支持会员价
      if (this.RCData.isSupportMemberPrice ==1){
        // this.$set(this.RCData,"isSupportMemberPrice",true)
        this.RCData.isSupportMemberPrice =true
      }else{
        // 响应式赋值
        this.RCData.isSupportMemberPrice =false
      }
      // 有没有积分优惠
      if (this.RCData.integralRatio !== null){
        this.RCData.hasintegralRatio = true
      }
      if(this.RCData.receiveWay == 2){
        this.RCData.fafangfayouxiaoqi = this.RCData.payRuleList[0].validPeriodUnit
      }


      // 有没有优惠券
      if (this.RCData.couponList.length>0){
        this.RCData.hascoupon = true
        this.RCData.couponList.forEach((item)=>{
          this.RCData.couponListkeys.push(item.couponId)
        })
        console.log(this.RCData.couponListkeys)
      }

      // 有没有折扣商品
      if (this.RCData.discountGoodsList.length>0){
        console.log("有折扣商品")
        this.RCData.hasDisCount = true
        this.RCData.discountGoodsList.forEach((item)=>{
          this.RCData.discountGoodskeys.push(item.goodsId)
        })
        console.log(this.RCData.discountGoodskeys)
      }
      // 有没有赠送商品
      if (this.RCData.goodsList.length>0){
        console.log("有赠品")
        this.RCData.isSendgoodsFree = true
        this.RCData.goodsList.forEach((item)=>{
          this.RCData.goodsListkeys.push(item.goodsId)
        })
        console.log(this.RCData.goodsListkeys)
      }

      // 是否启用
      if (this.RCData.isEnabled==1){
        this.RCData.isEnabled=true
      }else {
        this.RCData.isEnabled=false
      }


    },
    methods: {
      moment,


      cardName(){
        if (this.RCData.cardName.length<1){
          this.$message.error('权益卡名称不能为空')
          return
        }
      },
      onChange(value){},



      handleCancel(){
        this.$router.push({
          name: 'CustomerVipSettings',
          query: {
            key:'2',
            current:this.$route.query.current
          }
        })
      },

      //权益变化
      rightChange(e){
        console.log(`checked = ${e.target.checked}`);
        // this.RCData.isSupportMemberPrice = e.target.checked===true?1:0;
        // console.log(this.RCData.isSupportMemberPrice)

      },
      // 折扣变化
      disCountChange(e){
        console.log(`checked = ${e.target.checked}`);
        this.RCData.hasDisCount = e.target.checked
        console.log(this.RCData.hasDisCount)
        if (e.target.checked===false){
          this.RCData.consumptionDiscount= null
          this.RCData.discountGoodsList = []
          this.RCData.discountGoodskeys = []
        }
        console.log(this.RCData.consumptionDiscount)
      },
      async chooseDisCountGoods(){
        this.discountModelVisible = true
        await this.getProductClassify()
        await this.getProductGroup()
        console.log('选择折扣商品，打开折扣商品model')
      },
      // 积分变化
      integralRatioChange(e){
        console.log(`checked = ${e.target.checked}`);
        this.RCData.hasintegralRatio = e.target.checked
        console.log(this.RCData.hasintegralRatio)
        if (e.target.checked===false){
          this.RCData.integralRatio= null
        }
        console.log(this.RCData.integralRatio)
      },
      //优惠券变化
      couponChange(e){
        console.log(`checked = ${e.target.checked}`);
        this.RCData.hascoupon = e.target.checked
        if (e.target.checked===false){
          this.RCData.couponList= []
          this.RCData.couponListkeys= []
        }
      },
      chooseCouponList(){
        console.log('选择优惠券，打开优惠券model')
        this.couponModelVisible = true
      },
      // 送商品变化
      sendGoodsChange(e){
        console.log(`checked = ${e.target.checked}`);
        this.RCData.isSendgoodsFree = e.target.checked
        if (this.RCData.isSendgoodsFree ==false){
          this.RCData.goodsList = []
          this.RCData.goodsListkeys = []
        }
      },
      chooseSendGoods(){
        console.log('选择赠送商品，打开赠送商品model')
        this.sendGoodsModelVisible = true
      },
      // 提交基本数据
      submitDataEle(){

    /*    this.RCData.payRuleList.forEach((item) => {
          if (item.editable===false){
            this.$message.warn("请确认付费会员的价格")
            return
          }
        })*/

        if (this.RCData.cardName.length<1) {
          this.$message.error('权益卡名称不能为空')
          return
        }

        for (let item of this.RCData.payRuleList){
          if (item.editable===true){
            this.$message.warn("请确认付费会员的价格")
            return
          }
        }

        // 发放领取 清空RCData.payRuleList
        if (this.RCData.receiveWay==2) {
          this.RCData.payRuleList = [
            {
              validPeriodUnit:this.RCData.fafangfayouxiaoqi,
              price:0
            }
          ]
        }

        if (this.RCData.goodsList.length>0){
          for (let item of this.RCData.goodsList) {
            if (!item.normString){
              return this.$message.warning(`请选择${item.goodsName}的规格信息`)
            }
          }
        }

        // 表单数据拷贝一份
        let RCData = deepCopy(this.RCData)
        RCData.isEnabled = RCData.isEnabled==true?1:0
        RCData.isSupportMemberPrice = RCData.isSupportMemberPrice==true?1:0
        RCData.discountGoodsList.forEach((item)=>{
          item.amount = 1
        })
        // console.log('表单数据:',RCdata)
        // 根据有无背景 分成两部分
          console.log('表单数据:',RCData)
          this.$post('goldenhome/member/admin_/member/card/update', {
            ...RCData
          }).then(res => {
            if (res && res.returnCode === 1000) {
              console.log('***********',res)
              this.$message.success('修改会员卡成功!')
              this.$router.push({
                name: 'CustomerVipSettings',
                query: {
                  key:'2',
                  current:this.$route.query.current
                }
              })
            }
          })


      },

      //折扣商品model
      closeModal(){
        this.discountModelVisible = false
      },
      async getGoodsListByIds(goodsIdList){
        // let ids = goodsIdList.join(',')
        let ids = goodsIdList
        console.log({ids})
        const res = await this.$post('/goods/queryByIds',{ids})
        if (res && res.returnCode === 1000) {
          console.log('***********')
          console.log(res.dataInfo.dataInfo)
          return res.dataInfo.dataInfo
        }
      },
     async handleSubmit(){
       /* console.log(this.$refs.discountsearchtable.selectedRows)
        this.RCData.discountGoodsList = this.$refs.discountsearchtable.selectedRows
        this.RCData.discountGoodsList.forEach((item)=>{
          this.$set(item,'amount',1)
          this.$set(item,'goodsId',item.id)
        })
        this.discountModelVisible =false*/
       this.RCData.discountGoodskeys = this.$refs.discountsearchtable.selectedRowKeys
       console.log(this.RCData.discountGoodskeys)
       this.RCData.discountGoodsList = await this.getGoodsListByIds(this.RCData.discountGoodskeys )

       this.RCData.discountGoodskeys = Array.from(new Set(this.RCData.discountGoodskeys))
       console.log(this.RCData.discountGoodsList,this.RCData.discountGoodskeys)
       this.RCData.discountGoodsList.forEach((item)=>{
         this.$set(item,'amount',1)
         this.$set(item,'goodsId',item.id)
         this.$set(item,"goodsPicture",item.goodsPictures.split(',')[0])
         this.$set(item,"salePrice",item.goodsLowestPrice)
       })
       console.log( this.RCData.discountGoodskeys,this.RCData.discountGoodsList)
       this.discountModelVisible = false
      },
      // deleteDisCountGood
      deleteDisCountGood(record){
        this.RCData.discountGoodsList= this.RCData.discountGoodsList.filter((item)=>{
          return  item.goodsId !==record.goodsId
        })
        this.RCData.discountGoodskeys= this.RCData.discountGoodskeys.filter((item)=>{
          return  item !==record.goodsId
        })
      },
      //折扣商品model结束

      // 优惠券model开始
      closeModal2(){
        this.couponModelVisible = false
      },
      async  getCouponListByIds(couponIdList){
        let ids = couponIdList.join(',')
        console.log("ids",ids)
        const res = await this.$get('/coupon/querybyids', {ids})
        if (res && res.returnCode === 1000) {
          console.log('***********')
          console.log(res.dataInfo)
          // this.chooseActPage = res.dataInfo.pageInfo.pageName
          // this.$message.success('操作成功!')
          return res.dataInfo
        }
      },
      async handleSubmit2(){
        // console.log(this.$refs.couponsearchtable.selectedRows)
        // this.RCData.couponList = this.$refs.couponsearchtable.selectedRows
        this.RCData.couponListkeys = this.$refs.couponsearchtable.selectedRowKeys
        this.RCData.couponList = await this.getCouponListByIds(this.RCData.couponListkeys )
        // 使用push肯定是有问题的
        // this.RCData.couponList.push(...this.$refs.couponsearchtable.selectedRows)
        // this.RCData.couponList = this.unique(this.RCData.couponList)
        // this.RCData.couponListkeys.push(...this.$refs.couponsearchtable.selectedRowKeys)
        this.RCData.couponListkeys = Array.from(new Set(this.RCData.couponListkeys))
        console.log(this.RCData.couponList,this.RCData.couponListkeys)
        this.RCData.couponList.forEach((item)=>{
          this.$set(item,'amount',1)
          this.$set(item,'couponId',item.id)
        })

        this.couponModelVisible = false
      },
      // deleteDisCountGood
      deleteCoupon(record){
        console.log(record)
        this.RCData.couponList= this.RCData.couponList.filter((item)=>{
          return  item.id !==record.id
        })
        this.RCData.couponListkeys= this.RCData.couponListkeys.filter((item)=>{
          return  item !==record.couponId
        })
        console.log(this.RCData.couponList)
        console.log(this.RCData.couponListkeys)
      },
      // 优惠券model结束


      //赠品model开始
      closeModal3(){
        // this.couponModelVisible = false
        this.sendGoodsModelVisible = false
      },
      async getSendGoodsListByIds(goodsIdList){
        // let ids = goodsIdList.join(',')

        let ids = goodsIdList
        console.log({ids})
        const res = await this.$post('/goods/queryByIds',{ids})
        if (res && res.returnCode === 1000) {
          console.log('***********')
          console.log(res.dataInfo.dataInfo)
          return res.dataInfo.dataInfo
        }
      },
     async handleSubmit3(){
        this.RCData.goodsListkeys = this.$refs.sendgoodssearchtable.selectedRowKeys
        this.RCData.goodsList = await this.getSendGoodsListByIds(this.RCData.goodsListkeys )
        this.RCData.goodsListkeys = Array.from(new Set(this.RCData.goodsListkeys))
        console.log(this.RCData.goodsList,this.RCData.goodsListkeys)
        this.RCData.goodsList.forEach((item)=>{
          this.$set(item,'amount',1)
          this.$set(item,'goodsId',item.id)
          this.$set(item,'goodsSpecId',"")
          this.$set(item,"goodsPicture",item.goodsPictures.split(',')[0])
          this.$set(item,"salePrice",item.goodsLowestPrice)
        })
        console.log( this.RCData.goodsList,this.RCData.goodsListkeys)
        this.sendGoodsModelVisible = false
      },
      deleteSendGood(record){
        console.log(record)
        this.RCData.goodsList= this.RCData.goodsList.filter((item)=>{
          return  item.id !==record.id
        })
        this.RCData.goodsListkeys= this.RCData.goodsListkeys.filter((item)=>{
          return  item !==record.goodsId
        })
      },
      closeGoodsSpecIdModal(freshTable) {
        this.specVisible = false
      },
      // 打开对应商品的 规格model
      chooseGoodsSpecId(record,key){

        console.log(record)
        this.currentRecord = record
        this[key] = true
        console.log("根据商品id选择商品规格",)
      },
      submitSpec(obj){
        this.RCData.goodsList.forEach((item)=>{
          if (item.goodsId == obj.goodsId){
            this.$set(item,"goodsSpecId",obj.goodsSpecId)
            this.$set(item,"normString",obj.normString)
          }
        })
        console.log(this.RCData.goodsList)
      },
      //送商品model结束

 /*     shareChange(e){
        console.log(`checked = ${e.target.checked}`);
        this.RCData.isShare = e.target.checked ==false?0:1
      },
      exchangeCard(e) {
        console.log(`checked = ${e.target.checked}`);
        this.RCData.isExchangeCode = e.target.checked
        if (!this.RCData.isExchangeCode) {
          this.RCData.redemptionCode = null
        } else {
          // /goldenhome/member/admin/benefits/card/code
          this.$get('goldenhome/member/admin_/benefits/card/code').then((res)=>{
            if (res && res.returnCode ==1000){
              console.log(res.dataInfo)
              this.RCData.redemptionCode = res.dataInfo
            }
          })

        }
      },*/

      enableChange(e){
        // console.log(e);
        this.RCData.isEnabled = e
      },



      //商品分类
      async getProductClassify() {
        let res = await this.$get('/goods/classify/tree', {
          shopId:this.userInfo.shopId || '',
          a:'a'
        });
        if (res && res.returnCode == '1000') {
          this.discountProductClassifyList = res.dataInfo || [];
        } else {
          this.discountProductClassifyList = [];
        }
      },
      //商品分组
      async getProductGroup() {
        let res = await this.$get('/goods/group/tree', {
          shopId:this.userInfo.shopId || ''
        }, false, true);
        if (res && res.returnCode == '1000') {
          this.discountProductGroupList = res.dataInfo || [];
        } else {
          this.discountProductGroupList = [];
        }
      },



      //规则表格
      // 规则payRuleList
      addRule(){
        this.RCData.payRuleList.push({
          validPeriodUnit:null,
          price:null,
          editable:true
        })
        console.log("添加规则")

      },
      editRules(record){
        console.log(record)
        record.editable = true
        console.log("编辑规则")
      },
      confirmRules(record){
        console.log(record)
        console.log("确认保存规则")
        if (!record.validPeriodUnit){
          this.$message.warn("付费时间不可为空")
          return
        }
        if (!record.price){
          this.$message.warn("付费不可没有")
          return
        }
        record.editable = false

      },
      deleteRule(record){
        console.log(record)
        if (this.RCData.payRuleList.length > 1) {
          this.RCData.payRuleList = this.RCData.payRuleList.filter((item) => {
            return item !== record
          })
        }
        console.log("删除规则")
      }

    },


  }
</script>
<style lang="less" scoped>

  .product_td{
    display: flex;
    align-items: center;
    .product_name{
      margin-left:6px;
    }
  }

  /deep/.ant-upload.ant-upload-select-picture-card{
    width: 75px;
    height: 75px;
  }

  .colorChoose{

    width:160px;
    height:166px;
    margin: 10px 0 0 10px;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(102, 102, 102, 0.3);
    /*position: absolute;*/
    /*z-index: 9999;*/
    /*top:-142px;*/
    /*left:95px;*/
    display: flex;

    flex-wrap: wrap;
  }

  .finalColor{
    width:60px;
    height:30px;
    background-color:#698EB9;

  }
  .bgc{
    width: 64px;
    height: 30px;
    border-radius: 3px;
    margin: 10px 0 0 10px;
  }
  .divColor{
    width: 64px;
    height: 30px;
    border-radius: 3px;
    margin: 10px 0 0 10px;

  }
  .preview{
    position: absolute;
    width:310px;
    height: 160px;
    border:1px solid;
    margin-left:700px;
    border-radius:8px;
  }
  .bground{
    width: 780px;
    height: 60px;
    padding:10px 10px 0 10px;
    margin-bottom: 10px;
    background-color: #DCDCDC;
  }

  .main{
    width:100%;height:100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }
  /*  /deep/.ant-card-head-title::before{
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
    }*/
  /* /deep/.ant-card-head-title{
     font-size: 20px;
     font-weight: bold;
     color: #333333;
     line-height: 26px;
   }*/
</style>

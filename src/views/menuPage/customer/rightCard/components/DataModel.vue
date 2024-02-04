<template>
  <a-modal
    :visible="visible"
    okText="提交"
    :footer="false"
    cancelText="关闭"
    :title="title"
    :maskClosable="false"
    :destroyOnClose="true"
    :keyboard="false"
    width="800px"
    @cancel="closeModal()">
    <div>

      <div style="display: flex;justify-content:space-between">
        <div style="font-weight: bold">
          权益卡名称：金牌厨柜员工生日礼
        </div>

        <div>
          数据统计值从发卡起至前一天
        </div>
      </div>

      <div style="margin-top: 40px;">
        <span>统计时间 :&nbsp; &nbsp; &nbsp; &nbsp;</span>
        <a-select v-model="dateLabel" style="width: 120px" @change="handleChange">

          <a-select-option value="day">
            日
          </a-select-option>
          <a-select-option value="week" >
            周
          </a-select-option>
          <a-select-option value="month">
            月
          </a-select-option>
        </a-select>
        <span style="margin-left: 10px;"></span>

        <a-date-picker @change="onChange"
                       v-if="dateLabel==='day'"
                       :disabled-date="disabledDate"
                       :disabled-time="disabledDateTime"
                       v-model="dateValue"
                       :show-time="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
        />

        <a-month-picker
          v-if="dateLabel==='month'"
          :disabled-date="disabledDate2"
          placeholder="选择月"
          v-model="monthValue"
          @change="onChange2"/>

        <a-week-picker
          v-if="dateLabel==='week'"
          placeholder="选择周"
          v-model="weekValue"
          :disabled-date="disabledDate3"
          @change="onChange3" />

      </div>

      <div class="middleSection">

        <div style="margin-left: 33px;">
          <div>累计持卡用户数</div>
          <div  style="font-size: 30px;font-weight: bold;">3</div>
        </div>

      <!--  <div>
          <div>
            <span>
              新增发卡数/售卡数
            </span>
            <a-tooltip slot="suffix" title="八个雅鹿">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)"/>
            </a-tooltip>
          </div>
          <div style="font-size: 30px;font-weight: bold;">3</div>

        </div>-->

      </div>
      
      <div  class="bottomSection">

        <div>
          <div>
            <span>
              使用该卡支付总金额(元)
            </span>
            <a-tooltip slot="suffix" title="八个雅鹿">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)"/>
            </a-tooltip>
          </div>
          <div style="font-size: 30px;font-weight: bold;">3.00</div>

        </div>

        <div>
          <div>
            <span>
              使用该卡支付总人数
            </span>
            <a-tooltip slot="suffix" title="八个雅鹿">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)"/>
            </a-tooltip>
          </div>
          <div style="font-size: 30px;font-weight: bold;">3</div>

        </div>

        <div>
          <div>
            <span>
              使用该卡支付总订单数
            </span>
            <a-tooltip slot="suffix" title="八个雅鹿">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)"/>
            </a-tooltip>
          </div>
          <div style="font-size: 30px;font-weight: bold;">3</div>

        </div>

      </div>
    </div>
  </a-modal>
</template>
<script>
  import moment from "moment";
  export default {
    name: 'dataModel',
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
        return '数据效果'
      },

    },
    data() {
      return {
          dateLabel:'day',

          dateValue:'',
          monthValue:'',
          weekValue:''
      }
    },
    watch: {
      visible(value) {
        if (value && this.record.id) {
          // this.getInfo()
        }
      }
    },
    created() {
      this.accquireInitValue()
    },
    mounted() {
     
    },
    methods: {
      moment,
      /* getInfo () {
         this.$get('/product/reviews/id', {id: this.record.id}).then(res => {
           if (res && res.returnCode === 1000) {
             const record = res.dataInfo || {}
             console.log(record)
             this.isTop =  record.isTop === 1? '是':'否'
             record.source = ['', '小程序', '虚拟评价'][record.source]
             this.$nextTick(()=> {
               const formItems = this.form.getFieldsValue();
               Object.keys(formItems).forEach(key => {
                 formItems[key] = record[key]
               })
               this.form.setFieldsValue(formItems);
             })
           }
         })
       },*/


      accquireInitValue(){
        // YYYY.MM.DD HH:mm:ss
        // moment 上来获取当前月数据  当前天数据，当前周数据

        let dateValue =  moment(new Date());
        console.log(dateValue,typeof dateValue)
        this.dateValue = dateValue

        let monthValue = moment(new Date()).startOf('month')
        console.log(monthValue,typeof monthValue)
        this.monthValue = monthValue
      },

      closeModal(freshTable) {
        // this.form.resetFields()
        this.$emit('cancel', freshTable)
      },

      handleChange(value) {
        // 根据dateLabel的值 判断提交哪两组数据
        console.log(this.dateLabel,"this.dateValue:",this.dateValue,"this.monthValue:",this.monthValue,"this.weekValue:",this.weekValue);
      },
      /*第一个时间框的处理*/
      onChange(date, dateString) {
        // 提交的是dateString是需要的
        console.log(date, dateString,this.dateValue);
        //
        // console.log(moment().subtract(29, 'days'), moment())
      },
      range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
          result.push(i);
        }
        return result;
      },
      disabledDate(current) {
        // 本月开始的第一天 ~ 今天
        return (current && current) > moment().endOf('day') || (current && current)<moment().startOf('month');;

      },

      disabledDateTime() {
        return {
          disabledHours: () => this.range(0, 24).splice(4, 20),
          disabledMinutes: () => this.range(30, 60),
          disabledSeconds: () => [55, 56],
        };
      },

      /*第一个时间框的处理结束*/

      /*第二个时间框的处理*/
      onChange2(date, dateString) {
        console.log(date, dateString,this.monthValue);
      },
      disabledDate2(current) {
        // 只能选择当前月和之前的月份
        return (current && current) > moment().endOf('day');

      },
      /*第二个时间框的处理结束*/

      disabledDate3(current) {
        return (current && current) > moment().endOf('day') || (current && current)<moment().startOf('month');;
        // return current && current
      },
      onChange3(date, dateString) {
       /* var test = moment().day("Monday").week(0);
        console.log(test)*/
        console.log(date, dateString);
      },
    }
  }
</script>

<style scoped="scoped" lang="less">
  .middleSection{
    margin: 50px auto;
    width: 85%;
    height: 100px;
    background-color:	#F0F8FF;
    display: flex;
    /*justify-content: space-around;*/
    padding-top: 20px;
  }
  .bottomSection{
    margin: 50px auto;
    width: 85%;
    height: 100px;
    background-color:	#F0F8FF;
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
</style>
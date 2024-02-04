<template>
  <a-card title="积分设置" class="points_setting">
    <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }">
      <div class="form-title">积分有效周期：</div>
      <a-form-item>
        <a-radio-group v-model="formData.integrateType">
          <a-radio :style="radioStyle" :value="1">
            永久有效
          </a-radio>
          <a-radio :style="radioStyle" :value="2">
            <div class="form-item-label">
              <span>从获得开始至</span>
              <div class="form-item-label-child" v-if="formData.integrateType == 2">
                <a-select
                  style="width:150px"
                  allow-clear
                  :options="yearOptions"
                  :max-length="20"
                  v-model="formData.year"
                  placeholder="请选择" />
              </div>
              <div class="form-item-label-child" v-if="formData.integrateType == 2">
                <a-cascader
                  style="width:150px"
                  :options="mdArr"
                  v-model="formData.date"
                  :displayRender="({labels, selectedOptions}) => labels.join('-')"
                  placeholder="请选择日期"
                  @change="mdChange">
                  <a-icon slot="suffixIcon" type="down" class="test" />
                </a-cascader>
                <!-- <a-date-picker
                  style="width:150px"
                  allow-clear
                  v-model="formData.date"
                  :showToday="false"
                  :disabled-date="disabledDate"
                  :format="'YYYY-MM-DD'"
                  placeholder="请选择日期"
                  @focus="dateFocus" /> -->
              </div>
            </div>
            <template v-if="formData.integrateType == 2">
              <p class="form-tips">示例：若设置为“1年后的01月01日”，则用户在2018年05月01日获得的积分，将在2019年01月01日 00:00:00失效。</p>
            </template>
          </a-radio>
          <!-- <a-radio :style="radioStyle" :value="3">
            <div class="form-item-label">
              <span>每笔积分有效期为</span>
              <div class="form-item-label-child" v-if="formData.integrateType == 3">
                <a-input
                  style="width: 150px"
                  v-model="formData.validity"
                  @change="validityChange" >
                  <a-select
                    style="width: 50px"
                    slot="addonAfter"
                    v-model="formData.validityType"
                    @change="validityTypeChange">
                    <a-select-option v-for="(item, index) in validityTypeOptions" :key="index" :value="item.value">{{ item.name }}</a-select-option>
                  </a-select>
                </a-input>
              </div>
            </div>
            <template v-if="formData.integrateType == 3">
              <p class="form-tips">“年”支持 1-3 年，“月”支持 1-18 个月，“日”支持 1-365 日。</p>
            </template>
          </a-radio> -->
        </a-radio-group>
      </a-form-item>
      <div class="form-title">积分兑换比例：</div>
      <a-form-item>
        <div class="form-item-label">
          <span>购买商品获取积分兑换比例</span>
          <div class="form-item-label-child">
            <a-input-number v-model="formData.addScale" :min="0" :max="1000" />
          </div>
          <span>元=1积分</span>
        </div>
        <div class="form-item-label">
          <span>使用积分兑换商品兑换比例</span>
          <div class="form-item-label-child">
            <a-input-number v-model="formData.reduceScale" :min="0" :max="1000" />
          </div>
          <span>积分=1元</span>
        </div>
        <p class="form-tips">积分兑换比例修改后，之前获取的积分是修改后的积分/修改前的积分的倍数</p>
      </a-form-item>
      <a-form-item>
        <a-col :offset="2">
            <a-space>
                <!-- <a-button @click="handleCancel">取消</a-button> -->
                <a-button type="primary" @click="submitData()">提交保存</a-button>
            </a-space>
        </a-col>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import moment from 'moment'
import { mdArr } from './components/mdArr.js'
import {createOptionsByDict} from '@/utils/dict'
import deepCopy from '@/utils/deepCopy'
const formData={
  id: '',
  year: undefined,
  date: [],
  integrateType: 1,
  effectiveDate: '',
  addScale: 0.01,
  reduceScale: 100
}
export default {
  name: 'CustomerPointsSetting',
  data() {
    return {
      formData,
      mdArr,
      yearOptions: createOptionsByDict('EFFECTIVE_PERIOD_TIME'),
      // validityTypeOptions: [
      //   { value: 1, name: '年' },
      //   { value: 2, name: '月' },
      //   { value: 3, name: '日' }
      // ],
      // nearestYear: moment().year(),
      // validityMin: 1,
      // validityMax: 3,
      radioStyle: {
        display: 'block',
        height: 'auto',
        lineHeight: '30px',
      }
    };
  },
  created() {
    this.getPointsSetting();
  },
  mounted() {},
  methods: {
    moment,
    async getPointsSetting(){
      let res = await this.$get('/member/integrateconfig/query',
        {},
        { baseURL: `${location.origin}/goldenhome/member/admin` });
      if(res && res.returnCode=='1000'){
        if(res.dataInfo){
          let year = undefined
          let dateArr = []
          if(res.dataInfo.integrateType == 2) {
            if(res.dataInfo.effectiveDate) {
              let arr = res.dataInfo.effectiveDate.split('-')
              year = arr[0]
              arr[1] && dateArr.push(arr[1])
              arr[2] && dateArr.push(arr[2])
            }
          }
          this.formData = {
            id: res.dataInfo.id || '',
            year: year,
            date: dateArr,
            integrateType: res.dataInfo.integrateType,
            effectiveDate: res.dataInfo.effectiveDate,
            addScale: res.dataInfo.addScale,
            reduceScale: res.dataInfo.reduceScale
          }
          
        }
      }
    },
    // yearChange(val) {
    //   this.nearestYear = moment().year() + Number(val)
    //   this.formData.date = this.nearestYear+'-01-01'
    // },
    mdChange(val) {
      if(!this.formData.year) {
        this.$message.error('请先选择时间段')
        return
      }
      this.formData.effectiveDate = this.formData.year+'-'+val.join('-')
    },
    dateFocus() {
      if(!this.formData.year) {
        this.$message.error('请先选择时间段')
        return
      }
    },
    // disabledDate(current) {
    //   return current < moment(this.nearestYear+'-01-01') || current > moment(this.nearestYear+'-12-31')
    // },
    // validityChange(e) {
    //   if(!e.target.value) {
    //     return
    //   }
    //   let val = Number(e.target.value)
    //   if(!val && val != 0){
    //     this.$message.error('请输入数字')
    //     return
    //   } else if(val < this.validityMin || val > this.validityMax) {
    //     this.$message.error('请输入'+this.validityMin+'和'+this.validityMax+'之间的数值')
    //     return
    //   }
    // },
    // validityTypeChange(val) {
    //   switch (val) {
    //     case 1:
    //       this.validityMin = 1
    //       this.validityMax = 3
    //       break;
    //     case 2:
    //       this.validityMin = 1
    //       this.validityMax = 18
    //       break;
    //     case 3:
    //       this.validityMin = 1
    //       this.validityMax = 365
    //       break;
    //   }
    // },
    handleCancel(){
      console.log('取消')
    },
    async submitData(){
      if(this.formData.integrateType == 2) {
        if(!this.formData.year) {
          this.$message.error('请设置有效有限期限！');
          return
        }
        if(this.formData.date.length != 2) {
          this.$message.error('请设置有效有限期限！');
          return
        }
        this.formData.effectiveDate = this.formData.year+'-'+this.formData.date.join('-')
      }
      if(!this.formData.reduceScale || !this.formData.addScale) {
        this.$message.error('兑换比例不能为空');
        return
      }
      let res = await this.$post('/member/integrateconfig/add',
        this.formData,
        { baseURL: `${location.origin}/goldenhome/member/admin` } );
      if(res && res.returnCode=='1000'){
        if(this.formData.integrateType == 1) {
          this.formData.year = undefined
          this.formData.date = []
        }
        return this.$message.success('商品保存成功！');
      }
      else{
        return this.$message.success('商品保存失败！');
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .points_setting{
    .form-item-label{
      display: inline;
      .form-item-label-child{
        display: inline;
        margin-left: 10px;
      }
      &+.form-item-label{
        margin-left: 20px;
      }
    }
  }
</style>

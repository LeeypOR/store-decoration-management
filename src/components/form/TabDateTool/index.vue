<template>
  <div class="tab-date-tool">
    <div class="tool-btns">
      <span :class="dateType == 1 ? 'active': ''" @click="changeDateType(1)">日</span>
      <span :class="dateType == 2 ? 'active': ''" @click="changeDateType(2)">周</span>
      <span :class="dateType == 3 ? 'active': ''" @click="changeDateType(3)">月</span>
      <span :class="dateType == 4 ? 'active': ''" @click="changeDateType(4)">季度</span>
    </div>
    <div class="tool-forms">
      <template v-if="dateType == 1">
        <a-date-picker
          style="width: 180px"
          format="YYYY-MM-DD"
          valueFormat="YYYY-MM-DD"
          :showToday="false"
          :disabled-date="disabledDate"
          v-model="date"
          @change="datePickerChange" />
      </template>
      <template v-if="dateType == 2">
        <a-week-picker
          style="width: 180px"
          format="YYYY-WW[周]"
          valueFormat="YYYY-MM-DD"
          placeholder="请选择周"
          :disabled-date="disabledWeek"
          v-model="week"
          @change="weekPickerChange">
          <a-icon slot="suffixIcon" type="calendar" />
        </a-week-picker>
      </template>
      <template v-if="dateType == 3">
        <a-month-picker
          style="width: 180px"
          format="YYYY-MM"
          valueFormat="YYYY-MM-15"
          placeholder="请选择月份"
          :disabled-date="disabledDate"
          v-model="month"
          @change="monthPickerChange" />
      </template>
      <template v-if="dateType == 4">
        <a-month-picker
          style="width: 180px"
          format="YYYY-MM"
          valueFormat="YYYY-MM-15"
          placeholder="请选择季度所在月份"
          :disabled-date="disabledDate"
          v-model="quarter"
          @change="quarterPickerChange" />
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'TabDateTool',
  data() {
    return {
      dateType: 1,
      date: moment().subtract(1, "days").format("YYYY-MM-DD"),
      week: moment().format("YYYY-MM-DD"),
      month: moment().format("YYYY-MM"),
      quarter: moment().format("YYYY-MM")
    };
  },
  created() {},
  mounted() {},
  methods: {
    moment,
    // 日期类型切换
    changeDateType(type) {
      this.dateType = type
      this.$emit('change', type)
    },
    // 按 日
    datePickerChange(val) {
      this.date = val
      let res = {
        type: 1,
        value: val
      }
      this.$emit('submit', res)
    },
    // 按 周
    weekPickerChange(val) {
      this.week = val
      let res = {
        type: 2,
        value: val
      }
      this.$emit('submit', res)
    },
    // 按 月
    monthPickerChange(val) {
      this.month = val
      let res = {
        type: 3,
        value: val
      }
      this.$emit('submit', res)
    },
    // 按 季度
    quarterPickerChange(val) {
      let cYear = moment(val).format('YYYY')
      let cQuarter = Number(moment(val).format('Q'))
      let resMonth = ''
      switch (cQuarter) {
        case 4:
          resMonth = '12'
          break;
        case 3:
          resMonth = '09'
          break;
        case 2:
          resMonth = '06'
          break;
        case 1:
          resMonth = '03'
          break;
      }
      this.quarter = val
      let res = {
        type: 4,
        value: cYear+'-'+resMonth+'-15'
      }
      this.$emit('submit', res)
    },
    // 不可选日期
    disabledDate(current) {
      return current && current > moment().subtract(1, "days")
    },
    disabledWeek(current) {
      return current && current > moment().endOf("weeks")
    },
  }
};
</script>

<style lang="less">
.tab-date-tool{
  display: flex;
  align-items: center;
  .tool-btns{
    display: flex;
    margin-right: 8px;
    span{
      margin: 0 12px;
      cursor: pointer;
      &.active{
        color: #016BFF;
      }
    }
  }
}
</style>

<template>
  <div>
    <div
      class="showBeCustomTime"
      @click="chooseBeCustomTime"
      v-if="normalConditions.includes(aValue)"
      ref="a"
    >
      {{ customerTime }}
      <a-icon type="down" class="showBeCustomTimeIcon" />
    </div>
    <div class="showBeCustomTime stopShowBeCustomTime" v-else>
      {{ customerTime }}
      <a-icon type="down" class="showBeCustomTimeIcon" />
    </div>
    <div
      class="chooseTime"
      v-if="showCustomTime"
      @click.stop="showCustomTime = showCustomTime"
    >
      <div style="min-width: 300px; padding: 10px">
        <ul class="beCustomTime">
          <li @mouseenter="getTodayDate1" @click="comfirmDate">今天</li>
          <li @mouseenter="getYestodayDate1" @click="comfirmDate">昨天</li>
          <li @mouseenter="getSevenDaysAgodate1(7)" @click="comfirmDate">
            最近7天
          </li>
          <li @mouseenter="getSevenDaysAgodate1(30)" @click="comfirmDate">
            最近30天
          </li>
          <li @mouseenter="getCurrentMonth1" @click="comfirmDate">这个月</li>
          <li @mouseenter="getLastMonthDate1" @click="comfirmDate">上个月</li>
          <li
            @click="chooseDateRank($event)"
            class="customLi"
            style="position: relative; padding-left: 0; text-indent: 10px"
          >
            自定义范围
            <div style="position: absolute; top: 0; left: 0">
              <a-range-picker

                @change="ondateChange"
                :getCalendarContainer="getCalendarContainer()"
                @openChange="openPiker"
                :placeholder="['', '']"
                :disabled-date="disabledDate"
                style="
                  cursor: pointer;
                  width: 185px;
                  margin-left: -26px;
                  opacity: 0;
                "
              />
            </div>
          </li>
        </ul>
        <div
          style="display: flex; justify-content: space-between; margin-top: 8px"
        >
          <div style="width: 50%">
            <div style="width: 100%; text-align: center">开始时间</div>
            <div class="chooseTimeBox">
              {{ totalTime.startTime }}
            </div>
          </div>
          <div style="width: 50%">
            <div style="width: 100%; text-align: center">结束时间</div>
            <div class="chooseTimeBox">
              {{ totalTime.endTime }}
            </div>
          </div>
        </div>
        <div style="margin-top: 8px">
          <a-button
            size="small"
            style="margin-right: 10px"
            @click="cancleChoose"
            >取消</a-button
          >
          <a-button type="primary" size="small" @click="comfirmDate">
            确定
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "DateRankpiker",
  data() {
    return {
      showCustomTime: false,
      customerTime: "",
      totalTime: "",
      num: 0,
    };
  },
  created() {
    this.customerTime = this.customerTimes
  },
  props: {
    customerTimes:{
      default:'',
      type:String
    },
    normalConditions: {
      default: "",
      type: Array,
    },
    aValue: {
      default: "",
      type: String,
    },
    changeTime: {
      type: Function,
    },
    stylecss: {
      default: "width:120px;height:unset",
      type: String,
    },
    getNewTime: {
      type: Function,
    },

  },
  mounted: function () {
    document.addEventListener("click", (e) => {
      if (e.target != this.$refs.a) {
        this.showCustomTime = false;
      }
    });
  },
  destroyed() {

  },
  methods: {
    //获取当天日期
    getTodayDate() {
      let date = new Date();
      let s2 =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() + 1 > 10
          ? date.getDate()
          : "0" + (date.getDate()))

      let startTime = s2;
      let endTime = s2;
      return {
        startTime,
        endTime,
      };
    },
    getTodayDate1() {
      this.totalTime = this.getTodayDate();
    },
    //获取昨天日期
    getYestodayDate() {
      let day1 = new Date();
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 10 * 10 * 10);
      let s1 =
        day1.getFullYear() +
        "-" +
        (day1.getMonth() + 1 > 9
          ? day1.getMonth() + 1
          : "0" + (day1.getMonth() + 1)) +
        "-" +
        (day1.getDate() + 1 > 10
          ? day1.getDate()
          : "0" + (day1.getDate()))
        // (day1.getDate() + 1 >9?day1.getDate() :("0" + (day1.getDate())));
      let startTime = s1;
      let endTime = s1;
      return {
        startTime,
        endTime,
      };
    },
    getYestodayDate1() {
      this.totalTime = this.getYestodayDate();
    },
    //获取七天及三十天前日期
    getSevenDaysAgodate(dayNum) {
      let date = new Date();
      let s1 =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() + 1 > 10
          ? date.getDate()
          : "0" + (date.getDate()))

      date.setTime(date.getTime() - 24 * 60 * 60 * 10 * 10 * 10 * (dayNum - 1));

      let s2 =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1)) +
        "-" +
        (date.getDate() + 1 > 10
          ? date.getDate()
          : "0" + (date.getDate()))
      let startTime = s2;
      let endTime = s1;
      return {
        startTime,
        endTime,
      };
    },
    getSevenDaysAgodate1(dayNum) {
      this.totalTime = this.getSevenDaysAgodate(dayNum);
    },
    //获取上个月的日期范围
    getLastMonthDate() {
      let nowdays = new Date();
      let year = nowdays.getFullYear();
      let month = nowdays.getMonth();
      if (month === 0) {
        month = 12;
        year = year - 1;
      }
      if (month < 10) {
        month = "0" + month;
      }
      let yDate = new Date(year, month, 0);
      let startDateTime = year + "-" + month + "-01"; //上个月第一天
      let endDateTime = year + "-" + month + "-" + yDate.getDate(); //上个月最后一天
      let startTime = startDateTime;
      let endTime = endDateTime;
      return {
        startTime,
        endTime,
      };
    },
    getLastMonthDate1() {
      this.totalTime = this.getLastMonthDate();
    },
    //获取本月时间段
    getCurrentMonth() {
      let nowdays = new Date();
      let year = nowdays.getFullYear();
      let month = nowdays.getMonth() + 1;
      if (month === 0) {
        month = 12;
        year = year - 1;
      }
      if (month < 10) {
        month = "0" + month;
      }
      let yDate = new Date(year, month, 0);
      let startDateTime = year + "-" + month + "-01"; //上个月第一天
      let endDateTime = year + "-" + month + "-" + yDate.getDate(); //上个月最后一天
      let startTime = startDateTime;
      let endTime = endDateTime;
      return {
        startTime,
        endTime,
      };
    },
    getCurrentMonth1() {
      this.totalTime = this.getCurrentMonth();
    },
    comfirmDate() {
      console.log(this.totalTime.startTime,this.totalTime.endTime)
      this.customerTime = this.totalTime.startTime + ' ' + "00:00:00 " + "-"+ ' ' + this.totalTime.endTime +" "+"23:59:59 ";
      this.showCustomTime = false;
      this.getNewTime(this.customerTime);
    },
    cancleChoose() {
      this.customerTime = ''
      this.showCustomTime = false;
    },
    chooseBeCustomTime() {
      this.showCustomTime = !this.showCustomTime;
    },
    chooseDateRank(e) {
      e.target.style.background = "rgb(68, 153, 255)";
      e.target.style.color = "#fff";
    },
    async openPiker() {
      let oLi = document.querySelector(".customLi");
      oLi.style.background = "rgb(68, 153, 255)";
      oLi.style.color = "#fff";
      this.num++;
      const pre = await document.getElementsByClassName(
        "ant-calendar-prev-month-btn"
      );
      if (this.num == 1) {
        setTimeout(() => {
          pre[0].click();
        }, 0);
        setTimeout(() => {
          pre[1].click();
        }, 50);
      }
    },
    ondateChange(date, dateString) {
      this.totalTime = {
        startTime: dateString[0],
        endTime: dateString[1],
      };
    },
    getCalendarContainer() {
      return (triggerNode) =>
        triggerNode.parentNode.parentNode.parentNode.parentNode;
    },
    disabledDate(current) {
      return current && current > moment().endOf("day");
    },
  },
};
</script>

<style  rel="stylesheet/less" lang="less" scoped>
/deep/.ant-select-selection--single {
  height: 30px !important;
}
.beCustomTime {
  li {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
    padding-left: 10px;
    color: rgb(68, 153, 255);
    background: #f5f5f5;
    line-height: 30px;
    cursor: pointer;
  }
  li + li {
    margin-top: 8px;
  }
  li:hover {
    background: rgb(68, 153, 255);
    color: #fff;
  }
}
.showBeCustomTime {
  line-height: 30px;
  height: 30px;
  width: 300px;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 5px;
  position: relative;
  font-size: 12px;
  padding-left: 20px;
}
.stopShowBeCustomTime {
  background: #f5f5f5;
  color: rgba(0, 0, 0, 0.25);
}
.stopShowBeCustomTime:hover {
  cursor: not-allowed;
}
.showBeCustomTimeIcon {
  float: right;
  line-height: 28px;
  margin-right: 10px;
  color: #999;
}
.chooseTime {
  position: absolute;
  left: 128px;
  top: 28px;
  background: #fff;
  box-shadow: 0 2px 5px 2px #f3f3f3;
  z-index: 999999;
}
.chooseTimeBox {
  width: 95%;
  border: 1px solid #eee;
  height: 28px;
  line-height: 28px;
  border-radius: 5px;
  text-align: center;
  font-size: 12px;
}
/deep/.ant-modal-body {
  max-height: unset;
  min-height: 800px;
  overflow: visible;
}
/deep/.ant-calendar-picker-container {
  left: 203px !important;
  top: 40px;
}
</style>

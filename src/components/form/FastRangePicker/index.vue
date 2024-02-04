<template>
<span>
  <a-range-picker
    ref="rangepicker"
    v-bind="attrs"
    v-on="$listeners"
  >
    <a-icon slot="suffixIcon" type="calendar" />
  </a-range-picker>
  <span v-if="showBtn">
    <a-button @click="changeRangeDate(1)">今</a-button>
    <a-button @click="changeRangeDate(-1)">昨</a-button>
    <a-button @click="changeRangeDate(-7)">近7天</a-button>
    <a-button @click="changeRangeDate(-30)">近30天</a-button>
  </span>
  
</span>
  
</template>
<script>
import Moment from 'moment'
export default {
  name: 'fast-range-picker',
  props: {
    value: {

    },
    showBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    attrs () {
      return Object.assign({}, this.$attrs, {
        inputReadOnly: true,
        value: this.value,
        valueFormat: this.$attrs.valueFormat || 'YYYY-MM-DD HH:mm:ss',
        showTime: {
          defaultValue: [Moment('00:00:00', 'HH:mm:ss'),Moment('23:59:59', 'HH:mm:ss')]
        }
      })
    }
  },
  methods: {
    changeRangeDate (value) {
      const time = this.fastSelectDate(value)
      this.$emit('change', time)
      this.$emit('input', time)
    },
    fastSelectDate (value) {
      const date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            today = new Date(`${year}/${month}/${day}`).valueOf()
      const diff = value * 24 * 60 * 60 * 1000
      let start,end 
      switch (+value) {
        case 1:
          start = today
          end = today + diff - 1000
          break;
        case -1:
          start = today + diff
          end = today - 1000
          break;
        case -7:
        case -30:
          start = today + 24 * 60 * 60 * 1000 + diff
          end = today + 24 * 60 * 60 * 1000 - 1000
          break;
      }
      return [
        Moment(start).format(this.$attrs.valueFormat || 'YYYY-MM-DD HH:mm:ss'),
        Moment(end).format(this.$attrs.valueFormat || 'YYYY-MM-DD HH:mm:ss'),
      ]
    },
  },
  created () {
    console.log(this.$attrs, "attrs")
  }
}
</script>
<template>
  <table cellspacing="0" cellpadding="0" class="up-date-table" @click="handleClick" @mousemove="handleMouseMove">
    <tbody>
      <tr>
        <th v-if="showWeekNumber">周次</th>
        <th v-for="(week, key) in WEEKS" :key="key">{{week}}</th>
      </tr>
      <tr class="up-date-table__row" v-for="(row, key) in rows" :key="key">
        <td v-for="(cell, key) in row" :class="getCellClasses(cell)" :key="key">
          <div>
            <span>{{cell.text}}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getDayCountOfMonth, getFirstDayOfMonth, getWeekNumber, getStartDateOfMonth, nextDate, isDate, getDateTimestamp, getRangeDates, prevDate } from './date-util'
import { isTwoDimensionArray } from './util'

const WEEKS = ['日', '一', '二', '三', '四', '五', '六']

const isEqualArray = (newVal, oldVal) => newVal.length === oldVal.length && newVal.every((item, index) => getDateTimestamp(item) === getDateTimestamp(oldVal[index]))

const isInRange = (time, minDate, maxDate) => time >= getDateTimestamp(minDate) && time <= getDateTimestamp(maxDate)
const isStart = (time, minDate) => minDate && time === getDateTimestamp(minDate)
const isEnd = (time, maxDate) => maxDate && time === getDateTimestamp(maxDate)

export default {
  name: 'UpDateTable',

  props: {
    firstDayOfWeek: {
      default: 7,
      type: Number,
      validator: val => val >= 1 && val <= 7
    },
    defaultValue: {
      validator (val) {
        return val === null || isTwoDimensionArray(val, isDate)
      }
    },
    date: {},
    showWeekNumber: {
      type: Boolean,
      default: false
    },
    disabledDate: {},
    minDate: {
      type: Array,
      default: () => []
    },
    maxDate: {
      type: Array,
      default: () => []
    },
    rangeState: {
      default: () => ({
        endDate: null,
        lastDate: null,
        selecting: false
      })
    }
  },

  computed: {
    offsetDay () {
      const week = this.firstDayOfWeek
      // 周日为界限，左右偏移的天数，3217654 例如周一就是 -1，目的是调整前两行日期的位置
      return week > 3 ? 7 - week : -week
    },

    WEEKS () {
      const week = this.firstDayOfWeek
      return WEEKS.concat(WEEKS).slice(week, week + 7)
    },

    year () {
      return this.date.getFullYear()
    },

    month () {
      return this.date.getMonth()
    },

    startDate () {
      return getStartDateOfMonth(this.year, this.month)
    },

    rows () {
      const date = new Date(this.year, this.month, 1)
      let day = getFirstDayOfMonth(date)
      const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth())
      const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1))

      day = (day === 0 ? 7 : day)

      const offset = this.offsetDay
      const rows = this.tableRows
      let count = 1

      const startDate = this.startDate
      const disabledDate = this.disabledDate
      const now = getDateTimestamp(new Date())
      const isMinDateAndMaxDateBothArray = Array.isArray(this.minDate) && Array.isArray(this.maxDate)

      for (let i = 0; i < 6; i++) {
        const row = rows[i]

        if (this.showWeekNumber) {
          if (!row[0]) {
            row[0] = { type: 'week', text: getWeekNumber(nextDate(startDate, i * 7 + 1)) }
          }
        }

        for (let j = 0; j < 7; j++) {
          let cell = row[this.showWeekNumber ? j + 1 : j]
          if (!cell) {
            cell = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false }
          }

          cell.type = 'normal'

          const index = i * 7 + j
          const time = nextDate(startDate, index - offset).getTime()
          if (isMinDateAndMaxDateBothArray) {
            cell.inRange = this.minDate.some((item, index) => isInRange(time, item, this.maxDate[index]))
            cell.start = this.minDate.some(item => isStart(time, item))
            cell.end = this.maxDate.some(item => isEnd(time, item))
          }

          const isToday = time === now
          if (isToday) {
            cell.type = 'today'
          }

          if (i >= 0 && i <= 1) {
            const numberOfDaysFromPreviousMonth = day + offset < 0 ? 7 + day + offset : day + offset

            if (j + i * 7 >= numberOfDaysFromPreviousMonth) {
              cell.text = count++
            } else {
              cell.text = dateCountOfLastMonth - (numberOfDaysFromPreviousMonth - j % 7) + 1 + i * 7
              cell.type = 'prev-month'
            }
          } else {
            if (count <= dateCountOfMonth) {
              cell.text = count++
            } else {
              cell.text = count++ - dateCountOfMonth
              cell.type = 'next-month'
            }
          }

          let cellDate = new Date(time)
          cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate)

          this.$set(row, this.showWeekNumber ? j + 1 : j, cell)
        }
      }

      return rows
    }
  },

  watch: {
    'rangeState.endDate' (newVal) {
      this.setDateRange(newVal)
      this.markRange(this.minDate, this.maxDate)
    },
    minDate (newVal, oldVal) {
      // console.log('FROM [date-table] minDate: ', newVal, oldVal)
      if (Array.isArray(newVal) && ((Array.isArray(oldVal) && !isEqualArray(newVal, oldVal)) || !Array.isArray(oldVal))) {
        // newVal.forEach((item, index) => {
        //   this.markRange(item, this.maxDate[index])
        // })
        this.markRange(newVal, this.maxDate)
      }
    },
    maxDate (newVal, oldVal) {
      // console.log('FROM [date-table] maxDate: ', newVal, oldVal)
      if (Array.isArray(newVal) && ((Array.isArray(oldVal) && !isEqualArray(newVal, oldVal)) || !Array.isArray(oldVal))) {
        // newVal.forEach((item, index) => {
        //   this.markRange(this.minDate[index], item)
        // })
        this.markRange(this.minDate, newVal)
      }
    }
  },

  data () {
    return {
      tableRows: [[], [], [], [], [], []],
      lastRow: null,
      lastColumn: null
    }
  },

  methods: {
    cellMatchesDate (cell, date) {
      const value = new Date(date)
      return this.year === value.getFullYear() &&
        this.month === value.getMonth() &&
        Number(cell.text) === value.getDate()
    },

    getCellClasses (cell) {
      const defaultValue = this.defaultValue && isTwoDimensionArray(this.defaultValue, isDate) ? this.defaultValue.reduce((acc, val) => acc.concat(getRangeDates(...val)), []) : []

      let classes = []
      if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
        classes.push('available')
        if (cell.type === 'today') {
          classes.push('today')
        }
      } else {
        classes.push(cell.type)
      }

      if (cell.type === 'normal' && defaultValue.some(date => this.cellMatchesDate(cell, date))) {
        classes.push('default')
      }

      if (cell.inRange && (cell.type === 'normal' || cell.type === 'today')) {
        classes.push('in-range')

        if (cell.start) {
          classes.push('start-date')
        }

        if (cell.end) {
          classes.push('end-date')
        }
      }

      if (cell.disabled) {
        classes.push('disabled')
      }

      return classes.join(' ')
    },

    getDateOfCell (row, column) {
      const offsetFromStart = row * 7 + (column - (this.showWeekNumber ? 1 : 0)) - this.offsetDay
      return nextDate(this.startDate, offsetFromStart)
    },

    markRange (minDate, maxDate) {
      // minDate = getDateTimestamp(minDate)
      // maxDate = getDateTimestamp(maxDate) || minDate
      // ;[minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)]

      const startDate = this.startDate
      const rows = this.rows
      for (let i = 0, k = rows.length; i < k; i++) {
        const row = rows[i]
        for (let j = 0, l = row.length; j < l; j++) {
          if (this.showWeekNumber && j === 0) continue

          const cell = row[j]
          const index = i * 7 + j + (this.showWeekNumber ? -1 : 0)
          const time = nextDate(startDate, index - this.offsetDay).getTime()

          // cell.inRange = cell.inRange || minDate && time >= minDate && time <= maxDate
          // cell.start = cell.start || minDate && time === minDate
          // cell.end = cell.end || maxDate && time === maxDate
          cell.inRange = minDate.some((item, index) => isInRange(time, item, maxDate[index]))
          cell.start = minDate.some(item => isStart(time, item))
          cell.end = maxDate.some(item => isEnd(time, item))
        }
      }
    },

    setDateRange (newDate) {
      if (this.minDate.length > 0 && this.maxDate.length > 0) {
        if (!this.rangeState.selecting) {
          const index = this.minDate.findIndex((item, index) => isInRange(newDate, item, this.maxDate[index]))
          if (index > -1) { // 在所选范围内
            const currentMinDate = this.minDate[index]
            const currentMaxDate = this.maxDate[index]
            if (getDateTimestamp(newDate) === getDateTimestamp(currentMinDate) && getDateTimestamp(newDate) === getDateTimestamp(currentMaxDate)) {
              this.minDate.splice(index, 1)
              this.maxDate.splice(index, 1)
            } else if (getDateTimestamp(newDate) === getDateTimestamp(currentMinDate)) {
              this.minDate.splice(index, 1, nextDate(newDate, 1))
            } else if (getDateTimestamp(newDate) === getDateTimestamp(currentMaxDate)) {
              this.maxDate.splice(index, 1, prevDate(newDate, 1))
            } else {
              this.minDate.splice(index + 1, 0, nextDate(newDate, 1))
              if (index === 0) {
                this.maxDate.unshift(prevDate(newDate, 1))
              } else {
                this.maxDate.splice(index, 0, prevDate(newDate, 1))
              }
            }

            this.$emit('pick', { minDate: this.minDate, maxDate: this.maxDate })
          } else { // 范围之外
            this.rangeState.lastDate = newDate
            this.rangeState.selecting = true
          }
        } else { // 二次选择
          const getDateIndex = (dates, currentDate) => {
            return dates.every(item => getDateTimestamp(item) < getDateTimestamp(currentDate))
              ? dates.length
              : dates.findIndex(item => getDateTimestamp(item) > getDateTimestamp(currentDate))
          }
          let [minDate, maxDate] = []
          let nextIndex = this.minDate.findIndex((item, index) => isInRange(newDate, item, this.maxDate[index]))
          if (newDate < this.rangeState.lastDate) {
            [minDate, maxDate] = [newDate, this.rangeState.lastDate]

            const prevIndex = getDateIndex(this.maxDate, maxDate)
            if (nextIndex > -1) {
              this.minDate.splice(nextIndex + 1, prevIndex - nextIndex - 1, nextDate(minDate, 1))
              this.maxDate.splice(nextIndex, prevIndex - nextIndex, prevDate(minDate, 1), maxDate)
            } else {
              nextIndex = getDateIndex(this.minDate, minDate)
              this.minDate.splice(nextIndex, prevIndex - nextIndex, minDate)
              this.maxDate.splice(nextIndex, prevIndex - nextIndex, maxDate)
            }
          } else {
            [minDate, maxDate] = [this.rangeState.lastDate, newDate]

            const prevIndex = getDateIndex(this.minDate, minDate)
            if (nextIndex > -1) { // newDate 在范围内容，并且比 lastDate 大
              this.minDate.splice(prevIndex, nextIndex - prevIndex + 1, minDate, nextDate(maxDate, 1))
              this.maxDate.splice(prevIndex, nextIndex - prevIndex, prevDate(maxDate, 1))
            } else {
              nextIndex = getDateIndex(this.maxDate, maxDate)
              this.minDate.splice(prevIndex, nextIndex - prevIndex, minDate)
              this.maxDate.splice(prevIndex, nextIndex - prevIndex, maxDate)
            }
          }

          this.$emit('pick', { minDate: this.minDate, maxDate: this.maxDate })
          this.rangeState.lastDate = null
          this.rangeState.selecting = false
        }
      } else {
        if (!this.rangeState.selecting) {
          this.rangeState.lastDate = newDate
          this.rangeState.selecting = true
        } else {
          if (newDate >= this.rangeState.lastDate) {
            this.minDate.push(this.rangeState.lastDate)
            this.maxDate.push(newDate)
          } else {
            this.minDate.push(newDate)
            this.maxDate.push(this.rangeState.lastDate)
          }

          this.$emit('pick', { minDate: this.minDate, maxDate: this.maxDate })
          this.rangeState.lastDate = null
          this.rangeState.selecting = false
        }
      }
    },

    handleMouseMove () {
      if (!this.rangeState.selecting) return false

      let target = event.target
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode
      } else if (target.tagName === 'DIV') {
        target = target.parentNode
      }
      if (target.tagName !== 'TD') return false

      const row = target.parentNode.rowIndex - 1
      const column = target.cellIndex

      // can not select disabled date
      if (this.rows[row][column].disabled) return false

      if (row !== this.lastRow || column !== this.lastColumn) {
        this.lastRow = row
        this.lastColumn = column
        // this.$emit('changerange', {
        //   minDate: this.minDate,
        //   maxDate: this.maxDate,
        //   rangeState: {
        //     selecting: true,
        //     lastDate: this.rangeState.lastDate,
        //     endDate: this.getDateOfCell(row, column)
        //   }
        // })
      }
    },

    handleClick (event) {
      let target = event.target
      if (target.tagName === 'SPAN') {
        target = target.parentNode.parentNode
      } else if (target.tagName === 'DIV') {
        target = target.parentNode
      }

      if (target.tagName !== 'TD') return false

      const row = target.parentNode.rowIndex - 1
      const column = target.cellIndex
      const cell = this.rows[row][column]

      if (cell.disabled) return false

      const newDate = this.getDateOfCell(row, column)

      this.setDateRange(newDate)
    }
  }
}
</script>

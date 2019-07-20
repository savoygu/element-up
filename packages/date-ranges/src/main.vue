<template>
  <div
    class="up-date-ranges up-date-editor up-ranges-editor up-input__inner"
    :class="[
        'up-date-editor--daterange',
        pickerSize ? `up-date-ranges-editor--${ pickerSize }` : '',
        pickerDisabled ? 'is-disabled' : '',
        pickerVisible ? 'is-active' : ''
      ]"
    @click="handleRangeClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="showClose = false"
    v-clickoutside="handleClose"
    ref="reference"
  >
    <i :class="['up-input__icon', 'up-range__icon', triggerClass]"></i>
    <input
      autocomplete="off"
      :placeholder="startPlaceholder"
      :value="displayValue && displayValue[0]"
      :disabled="pickerDisabled"
      :readonly="!editable || readonly"
      :name="name && name[0]"
      @input="handleStartInput"
      @change="handleStartChange"
      @focus="handleFocus"
      class="up-range-input"
    />
    <slot name="range-separator">
      <span class="up-range-separator">{{ rangeSeparator }}</span>
    </slot>
    <input
      autocomplete="off"
      :placeholder="endPlaceholder"
      :value="displayValue && displayValue[1]"
      :disabled="pickerDisabled"
      :readonly="!editable || readonly"
      :name="name && name[1]"
      @input="handleEndInput"
      @change="handleEndChange"
      @focus="handleFocus"
      class="up-range-input"
    />
    <i @click="handleClickIcon" :class="[showClose ? '' + clearIcon : '']" class="up-input__icon up-range__close-icon"></i>
    <transition name="el-zoom-in-top" @after-leave="doDestroy">
      <div v-show="pickerVisible" class="up-picker-panel up-date-ranges-picker" :class="popperClass" ref="picker">
        <div class="up-picker-panel__body-wrapper">
          <div class="up-picker-panel__body">
            <div class="up-picker-panel__content up-date-ranges-picker__content is-left">
              <div class="up-date-ranges-picker__header">
                <button type="button" @click="leftPrevYear" class="up-picker-panel__icon-btn el-icon-d-arrow-left"></button>
                <button type="button" @click="leftPrevMonth" class="up-picker-panel__icon-btn el-icon-arrow-left"></button>
                <button
                  type="button"
                  @click="leftNextYear"
                  v-if="unlinkPanels"
                  class="up-picker-panel__icon-btn el-icon-d-arrow-right"
                ></button>
                <button
                  type="button"
                  @click="leftNextMonth"
                  v-if="unlinkPanels"
                  class="up-picker-panel__icon-btn el-icon-arrow-right"
                ></button>
                <div>{{ leftLabel }}</div>
              </div>
              <date-table
                :date="leftDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                :first-day-of-week="firstDayOfWeek"
                @changerange="handleChangeRange"
                @pick="handlePick"
              ></date-table>
            </div>
            <div class="up-picker-panel__content up-date-ranges-picker__content is-right">
              <div class="up-date-ranges-picker__header">
                <button
                  type="button"
                  @click="rightPrevYear"
                  v-if="unlinkPanels"
                  class="up-picker-panel__icon-btn el-icon-d-arrow-left"
                ></button>
                <button
                  type="button"
                  @click="rightPrevMonth"
                  v-if="unlinkPanels"
                  class="up-picker-panel__icon-btn el-icon-arrow-left"
                ></button>
                <button type="button" @click="rightNextYear" class="up-picker-panel__icon-btn el-icon-d-arrow-right"></button>
                <button type="button" @click="rightNextMonth" class="up-picker-panel__icon-btn el-icon-arrow-right"></button>
                <div>{{ rightLabel }}</div>
              </div>
              <date-table
                :date="rightDate"
                :default-value="defaultValue"
                :min-date="minDate"
                :max-date="maxDate"
                :range-state="rangeState"
                :disabled-date="disabledDate"
                :first-day-of-week="firstDayOfWeek"
                @changerange="handleChangeRange"
                @pick="handlePick"
              ></date-table>
            </div>
          </div>
        </div>
        <!-- <div class="up-date-ranges__time"></div> -->
      </div>
    </transition>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import Popper from 'element-ui/src/utils/vue-popper'
import merge from 'element-ui/src/utils/merge'
import { prevYear, nextYear, prevMonth, nextMonth, isDate, nextDate, mergeDates, normalizeDates, isDateObject, parseDate, formatDate, toDate } from './date-util'
import { isTwoDimensionArray, getDataByCol } from './util'
import DateTable from './date-table'

const NewPopper = {
  props: {
    appendToBody: Popper.props.appendToBody,
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    arrowOffset: Popper.props.arrowOffset
  },
  methods: Popper.methods,
  data () {
    return merge({ visibleArrow: true }, Popper.data)
  },
  beforeDestroy: Popper.beforeDestroy
}

const isLegalDateRanges = (dateranges) => isTwoDimensionArray(dateranges, (el, index, data) => isDate(el) && data.length === 2)

const isLegalDateRangesObject = (dateranges) => isTwoDimensionArray(dateranges, (el, index, data) => isDateObject(el) && data.length === 2)

const calcDefaultValue = (defaultValue) => {
  if (isLegalDateRanges(defaultValue)) {
    const [values0, values1] = getDataByCol(defaultValue, [0, 1])
    return [values0[0], values1[0]]
  } else {
    return [new Date(), nextDate(new Date(), 1)]
  }
}

const RANGE_FORMATTER = (value, format) => {
  if (Array.isArray(value) && value.length === 2) {
    const [start, end] = value
    if (start && end) {
      return [formatDate(start, format), formatDate(end, format)]
    }
  }
  return []
}

const RANGE_PARSER = (array, format, separator) => {
  if (!Array.isArray(array)) {
    array = array.split(separator)
  }
  if (array.length === 2) {
    const [range1, range2] = array

    return [parseDate(range1, format), parseDate(range2, format)]
  }
  return []
}

const PLACEMENT_MAP = {
  left: 'bottom-start',
  center: 'bottom',
  right: 'bottom-end'
}

const parseAsFormatAndType = (value, format = 'yyyy-MM-dd', rangeSeparator = '-') => {
  if (!value) return null
  return value.map(item => item.every(isDateObject) ? item : RANGE_PARSER(item, format, rangeSeparator))
}

const formatAsFormatAndType = (value, format = 'yyyy-MM-dd') => {
  if (!value) return null
  return value.map(item => RANGE_FORMATTER(item, format))
}

/*
 * Considers:
 *   1. Date object
 *   2. date string
 *   3. array of 1 or 2
 */
const valueEquals = function (a, b) {
  // considers Date object and string
  const dateEquals = function (a, b) {
    const aIsDate = a instanceof Date
    const bIsDate = b instanceof Date
    if (aIsDate && bIsDate) {
      return a.getTime() === b.getTime()
    }
    if (!aIsDate && !bIsDate) {
      return a === b
    }
    return false
  }

  const aIsArray = a instanceof Array
  const bIsArray = b instanceof Array
  if (aIsArray && bIsArray) {
    if (a.length !== b.length) {
      return false
    }
    return a.every((item, index) => Array.isArray(item) ? valueEquals(item, b[index]) : dateEquals(item, b[index]))
  }
  if (!aIsArray && !bIsArray) {
    return dateEquals(a, b)
  }
  return false
}

const isString = function (val) {
  return typeof val === 'string' || val instanceof String
}

const validator = function (val) {
  // either: String, Array of String, null / undefined
  return (
    val === null ||
    val === undefined ||
    isString(val) ||
    (Array.isArray(val) && val.length === 2 && val.every(isString))
  )
}

export default {
  name: 'UpDateRanges',

  components: {
    DateTable
    // [DateRanges.name]: DateRanges
  },

  mixins: [NewPopper],

  directives: { Clickoutside },

  props: {
    format: String,
    valueFormat: String,
    readonly: Boolean,
    placeholder: String,
    startPlaceholder: String,
    endPlaceholder: String,
    prefixIcon: String,
    clearIcon: {
      type: String,
      default: 'el-icon-circle-close'
    },
    name: {
      default: '',
      validator
    },
    disabled: Boolean,
    clearable: {
      type: Boolean,
      default: true
    },
    popperClass: String,
    editable: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'right'
    },
    value: {
      type: Array,
      default: () => [],
      validator: val => (Array.isArray(val) && val.length === 0) || isLegalDateRanges(val)
    },
    defaultValue: {},
    rangeSeparator: {
      default: '-'
    },
    pickerOptions: {},
    disabledDate: {}
  },

  computed: {
    reference () {
      const reference = this.$refs.reference
      return reference.$el || reference
    },

    valueIsEmpty () {
      const val = this.value
      if (Array.isArray(val)) {
        for (let i = 0, len = val.length; i < len; i++) {
          if (val[i]) {
            return false
          }
        }
      } else {
        if (val) {
          return false
        }
      }
      return true
    },

    triggerClass () {
      return this.prefixIcon || 'el-icon-date'
    },

    displayValue () {
      const formattedValue = formatAsFormatAndType(this.parsedValue, this.format, this.rangeSeparator)
      if (formattedValue) {
        return formattedValue.reduce((acc, [start, end]) => {
          acc[0].push(start)
          acc[1].push(end)
          return acc
        }, [[], []]).map(item => item.join(', '))
      } else {
        return ''
      }
    },

    parsedValue () {
      if (!this.value) return this.value
      if (isLegalDateRangesObject(this.value)) {
        return this.value
      }

      if (this.valueFormat) {
        return parseAsFormatAndType(this.value, this.valueFormat, this.rangeSeparator) || this.value
      }

      return this.value.map(range => range.map(toDate))
    },

    pickerSize () {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    },

    pickerDisabled () {
      return this.disabled || (this.elForm || {}).disabled
    },

    leftLabel () {
      return this.leftDate.getFullYear() + ' 年 ' + (this.leftDate.getMonth() + 1) + ' 月'
    },

    rightLabel () {
      return this.rightDate.getFullYear() + ' 年 ' + (this.rightDate.getMonth() + 1) + ' 月'
    },

    leftYear () {
      return this.leftDate.getFullYear()
    },

    leftMonth () {
      return this.leftDate.getMonth()
    },

    leftMonthDate () {
      return this.leftDate.getDate()
    },

    rightYear () {
      return this.rightDate.getFullYear()
    },

    rightMonth () {
      return this.rightDate.getMonth()
    },

    rightMonthDate () {
      return this.rightDate.getDate()
    }

  },

  data () {
    return {
      minDate: [],
      maxDate: [],
      leftDate: new Date(),
      rightDate: nextMonth(new Date()),
      rangeState: {
        endDate: null,
        lastDate: null,
        selecting: false,
        row: null,
        column: null
      },
      firstDayOfWeek: 7,
      unlinkPanels: false,
      pickerVisible: false,
      showClose: false
    }
  },

  watch: {
    pickerVisible (val) {
      if (this.readonly || this.pickerDisabled) return false

      if (val) {
        this.popperElm = this.$refs.picker
        // this.unwatchPickerOptions = this.$watch('pickerOptions', () => updateOptions(), { deep: true })
        this.$el.appendChild(this.$refs.picker)

        this.updatePopper()
      } else {
        this.destroyPopper()

        if (this.$refs.picker) {
          this.$refs.picker.parentNode.removeChild(this.$refs.picker)
        }
      }
    },
    value: {
      handler (newVal) {
        if (!newVal) {
          this.minDate = []
          this.maxDate = []
        } else if (isLegalDateRanges(newVal)) {
          this.minDate = getDataByCol(this.parsedValue, 0)
          this.maxDate = getDataByCol(this.parsedValue, 1)

          let firstOfMinDate = new Date(this.minDate[0])
          let firstOfMaxDate = new Date(this.maxDate[0])

          if (firstOfMinDate) {
            this.leftDate = firstOfMinDate
            if (this.unlinkPanels && firstOfMaxDate) {
              const minDateYear = firstOfMinDate.getFullYear()
              const minDateMonth = firstOfMinDate.getMonth()
              const maxDateYear = firstOfMaxDate.getFullYear()
              const maxDateMonth = firstOfMaxDate.getMonth()
              this.rightDate = minDateYear === maxDateYear && minDateMonth === maxDateMonth
                ? nextMonth(firstOfMaxDate)
                : firstOfMaxDate
            } else {
              this.rightDate = nextMonth(this.leftDate)
            }
          } else {
            this.leftDate = calcDefaultValue(this.defaultValue)[0]
            this.rightDate = nextMonth(this.leftDate)
          }
        }
      },
      immediate: true
    },
    defaultValue: {
      handler (val) {
        if (!isLegalDateRanges(this.value)) {
          const [left, right] = calcDefaultValue(val)
          this.leftDate = left
          this.rightDate = val && getDataByCol(val, 1)[0] && this.unlinkPanels
            ? right
            : nextMonth(this.leftDate)
        }
      },
      immediate: true
    }
  },

  created () {
    this.popperOptions = {
      boundariesPadding: 0,
      gpuAcceleration: false
    }

    this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left
  },

  methods: {
    formatToValue (date) {
      const isFormattable = isTwoDimensionArray(date) && date.every(item => item.every(isDateObject))
      if (this.valueFormat && isFormattable) {
        return formatAsFormatAndType(date, this.valueFormat, this.rangeSeparator)
      } else {
        return date
      }
    },

    handleMouseEnter () {
      if (this.readonly || this.pickerDisabled) return
      if (!this.valueIsEmpty && this.clearable) {
        this.showClose = true
      }
    },

    handleStartInput () { },
    handleEndInput () { },
    handleStartChange () { },
    handleEndChange () { },

    handleClickIcon (event) {
      if (this.readonly || this.pickerDisabled) return
      if (this.showClose) {
        event.stopPropagation()
        this.emitInput(null)
        this.showClose = false
      } else {
        this.pickerVisible = !this.pickerVisible
      }
    },

    handleClose () {
      if (!this.pickerVisible) return
      this.pickerVisible = false
    },

    handleFocus () {
      if (!this.pickerVisible) {
        this.pickerVisible = true
      }
      this.$emit('focus', this)
    },

    handleRangeClick () {
      if (!this.pickerVisible) {
        this.pickerVisible = true
      }
      this.$emit('focus', this)
    },

    handleChangeRange (val) {
      this.minDate = val.minDate
      this.maxDate = val.maxDate
      this.rangeState = val.rangeState
    },

    handlePick (val) {
      console.log(val)
      const { minDate, maxDate } = val
      const mergedValue = mergeDates(minDate, maxDate)
      const normalizedValue = normalizeDates(mergedValue)
      const [values0, values1] = getDataByCol(normalizedValue, [0, 1])

      this.minDate = values0
      this.maxDate = values1

      this.handleConfirm(normalizedValue)
    },

    // leftPrev*, rightNext* need to take care of `unlinkPanels`
    leftPrevYear () {
      this.leftDate = prevYear(this.leftDate)
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate)
      }
    },

    leftPrevMonth () {
      this.leftDate = prevMonth(this.leftDate)
      if (!this.unlinkPanels) {
        this.rightDate = nextMonth(this.leftDate)
      }
    },

    rightNextYear () {
      if (!this.unlinkPanels) {
        this.leftDate = nextYear(this.leftDate)
        this.rightDate = nextMonth(this.leftDate)
      } else {
        this.rightDate = nextYear(this.rightDate)
      }
    },

    rightNextMonth () {
      if (!this.unlinkPanels) {
        this.leftDate = nextMonth(this.leftDate)
        this.rightDate = nextMonth(this.leftDate)
      } else {
        this.rightDate = nextMonth(this.rightDate)
      }
    },

    // leftNext*, rightPrev* are called when `unlinkPanels` is true
    leftNextYear () {
      this.leftDate = nextYear(this.leftDate)
    },

    leftNextMonth () {
      this.leftDate = nextMonth(this.leftDate)
    },

    rightPrevYear () {
      this.rightDate = prevYear(this.rightDate)
    },

    rightPrevMonth () {
      this.rightDate = prevMonth(this.rightDate)
    },

    handleConfirm (value) {
      if (this.isValidValue(value)) {
        this.pickerVisible = true
        this.emitInput(value)
      }
    },

    emitInput (val) {
      const formatted = this.formatToValue(val)
      if (!valueEquals(this.value, formatted)) {
        this.$emit('input', formatted)
      }
    },

    isValidValue (value) {
      const isValid = (value) => Array.isArray(value) &&
        value && value[0] && value[1] &&
        isDate(value[0]) && isDate(value[1]) &&
        value[0].getTime() <= value[1].getTime() && (typeof this.disabledDate === 'function' ? !this.disabledDate(value[0]) && !this.disabledDate(value[1]) : true)
      return isTwoDimensionArray(value) && value.every(isValid)
    }
  }
}
</script>

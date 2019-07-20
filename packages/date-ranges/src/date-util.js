import fecha from 'element-ui/src/utils/date'

export const toDate = function (date) {
  return isDate(date) ? new Date(date) : null
}

export const isDate = function (date) {
  if (date === null || date === undefined) return false
  if (isNaN(new Date(date).getTime())) return false
  if (Array.isArray(date)) return false // deal with `new Date([ new Date() ]) -> new Date()`
  return true
}

export const isDateObject = function (val) {
  return val instanceof Date
}

export const formatDate = function (date, format) {
  date = toDate(date)
  if (!date) return ''
  return fecha.format(date, format || 'yyyy-MM-dd')
}

export const parseDate = function (string, format) {
  return fecha.parse(string, format || 'yyyy-MM-dd')
}

export const getDayCountOfMonth = function (year, month) {
  if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30
  }

  if (month === 1) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return 29
    } else {
      return 28
    }
  }

  return 31
}

export const getFirstDayOfMonth = function (date) {
  const temp = new Date(date.getTime())
  temp.setDate(1)
  return temp.getDay()
}

export const prevDate = function (date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount)
}

export const nextDate = function (date, amount = 1) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount)
}

export const getStartDateOfMonth = function (year, month) {
  const result = new Date(year, month)
  const day = result.getDay()
  if (day === 0) {
    return prevDate(result, 7)
  } else {
    return prevDate(result, day)
  }
}

export const getWeekNumber = function (src) {
  if (!isDate(src)) return null
  const date = new Date(src.getTime())
  date.setHours(0, 0, 0, 0)
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  // January 4 is always in week 1.
  const week1 = new Date(date.getFullYear(), 0, 4)
  // Adjust to Thursday in week 1 and count number of weeks from date to week 1.
  // Rounding should be fine for Daylight Saving Time. Its shift should never be more than 12 hours.
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

export const clearTime = function (date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export const modifyDate = function (date, y, m, d) {
  return new Date(y, m, d, date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds())
}

export const changeYearMonthAndClampDate = function (date, year, month) {
  // clamp date to the number of days in `year`, `month`
  // eg: (2010-1-31, 2010, 2) => 2010-2-28
  const monthDate = Math.min(date.getDate(), getDayCountOfMonth(year, month))
  return modifyDate(date, year, month, monthDate)
}

export const prevMonth = function (date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return month === 0
    ? changeYearMonthAndClampDate(date, year - 1, 11)
    : changeYearMonthAndClampDate(date, year, month - 1)
}

export const nextMonth = function (date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return month === 11
    ? changeYearMonthAndClampDate(date, year + 1, 0)
    : changeYearMonthAndClampDate(date, year, month + 1)
}

export const prevYear = function (date, amount = 1) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return changeYearMonthAndClampDate(date, year - amount, month)
}

export const nextYear = function (date, amount = 1) {
  const year = date.getFullYear()
  const month = date.getMonth()
  return changeYearMonthAndClampDate(date, year + amount, month)
}

export const getRangeDates = (startDate, endDate, addFn, interval = 1) => {
  typeof addFn !== 'function' && (addFn = (date, interval) => {
    date = new Date(date)
    date.setDate(date.getDate() + interval)
    return date
  })

  const retVal = []
  const end = new Date(endDate)
  let current = new Date(startDate)

  while (current <= end) {
    retVal.push(new Date(current))
    current = addFn(current, interval)
  }

  return retVal
}

export const getDateTimestamp = function (time) {
  if (typeof time === 'number' || typeof time === 'string') {
    return clearTime(new Date(time)).getTime()
  } else if (time instanceof Date) {
    return clearTime(time).getTime()
  } else {
    return NaN
  }
}

export const mergeDates = (...dates) => {
  return dates.reduce((acc, val) => {
    val.forEach((item, index) => {
      if (!acc[index]) {
        acc.push([item])
      } else {
        acc[index].push(item)
      }
    })
    return acc
  }, [])
}

/**
 * 修正存在连续日期段的日期
 * [
 *  ['2019-07-02', '2019-07-12'],
 *  ['2019-07-24', '2019-08-04'],
 *  ['2019-08-04', '2019-08-20'],
 *  ['2019-08-22', '2019-09-10'],
 *  ['2019-09-10', '2019-09-11'],
 *  ['2019-09-11', '2019-09-15']
 * ]
 * =>
 * [
 *  ['2019-07-02', '2019-07-12'],
 *  ['2019-07-24', '2019-08-20'],
 *  ['2019-08-22', '2019-09-15']
 * ]
 * @param {*} dates
 */
export const normalizeDates = (dates) => dates.reduce((acc, val, index, data) => {
  if (data[index + 1] && getDateTimestamp(val[1]) === getDateTimestamp(prevDate(toDate(data[index + 1][0]), 1))) {
    let count = 1
    let current = data[index + 1]
    let next = data[index + 2]
    while (next && getDateTimestamp(current[1]) === getDateTimestamp(prevDate(toDate(next[0])))) {
      count++
      current = data[index + count]
      next = data[index + count + 1]
    }
    acc.push([val[0], data[index + count][1]])
    dates.splice(index + 1, count)
  } else {
    acc.push(val)
  }
  return acc
}, [])

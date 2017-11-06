import format from '../datetime/format'

export function zero (n) {
  return n < 10 ? '0' + n : n
}

export function splitValue (value) {
  let split = value.split('-')
  return {
    year: parseInt(split[0], 10),
    month: parseInt(split[1], 10) - 1,
    day: parseInt(split[2], 10)
  }
}

export function getPrevTime (year, month) {
  if (month === 0) {
    return {
      month: 11,
      year: year - 1
    }
  } else {
    return {
      year,
      month: month - 1
    }
  }
}

export function getNextTime (year, month) {
  if (month === 11) {
    return {
      month: 0,
      year: year + 1
    }
  } else {
    return {
      year,
      month: month + 1
    }
  }
}

function getTime (str) {
  if (typeof str === 'number') {
    return str
  }
  return typeof str === 'string' ? new Date(str.replace(/-/g, '/')).getTime() : str.getTime()
}

export function isBetween (value, disablePast, disableFuture, rangeBegin, rangeEnd) {
  const { start, end } = getRange(disablePast, disableFuture, rangeBegin, rangeEnd)
  value = getTime(value)
  let isGte = start ? value >= getTime(start) : true
  let isLte = end ? value <= getTime(end) : true
  return isGte && isLte
}

function getRange (disablePast = false, disableFuture = false, rangeBegin, rangeEnd) {
  let startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  if (disablePast) {
    if (!rangeBegin) {
      rangeBegin = startOfToday
    } else {
      rangeBegin = Math.max(startOfToday.getTime(), getTime(rangeBegin))
    }
  }

  if (disableFuture) {
    if (!rangeEnd) {
      rangeEnd = startOfToday
    } else {
      rangeEnd = Math.min(startOfToday.getTime(), getTime(rangeEnd))
    }
  }
  return {
    start: rangeBegin,
    end: rangeEnd
  }
}

export function getDays ({year, month, value, rangeBegin, rangeEnd, returnSixRows = true}) {
  let today = format(new Date(), 'YYYY-MM-DD')

  let _splitValue = splitValue(value || today)

  // if year or month is not specified, get them from value
  if (typeof year !== 'number' || typeof month !== 'number' || month < 0) {
    year = _splitValue.year
    month = _splitValue.month
  }

  var firstDayOfMonth = new Date(year, month, 1).getDay()
  var lastDateOfMonth = new Date(year, month + 1, 0).getDate()
  var lastDayOfLastMonth = new Date(year, month, 0).getDate()

  var i
  var line = 0
  var temp = []
  for (i = 1; i <= lastDateOfMonth; i++) {
    var dow = new Date(year, month, i).getDay()
      // 第一行
    if (dow === 0) {
      temp[line] = []
    } else if (i === 1) {
      temp[line] = []

      var k = lastDayOfLastMonth - firstDayOfMonth + 1
      for (let j = 0; j < firstDayOfMonth; j++) {
        let rs = getPrevTime(year, month)
        temp[line].push({
          year: rs.year,
          month: rs.month,
          month_str: rs.month + 1,
          day: k,
          isLastMonth: true
        })
        k++
      }
    }

    let _format = format(new Date(year + '/' + (month + 1) + '/' + i), 'YYYY/MM/DD')
    let options = {
      year: year,
      month: month,
      month_str: month + 1,
      day: i,
      isCurrent: value && format(new Date(value), 'YYYY/MM/DD') === _format,
      isToday: format(new Date(), 'YYYY/MM/DD') === _format
    }
    temp[line].push(options)

    if (dow === 6) {
      line++
    } else if (i === lastDateOfMonth) {
      let k = 1
      for (dow; dow < 6; dow++) {
        let rs = getNextTime(year, month)
        temp[line].push({
          year: rs.year,
          month: rs.month,
          month_str: rs.month + 1,
          day: k,
          isNextMonth: true
        })
        k++
      }
    }
  }

  if (returnSixRows && temp.length === 5) {
    let rs = getNextTime(year, month)
    let start = temp[4][6].isNextMonth ? temp[4][6].day : 0
    temp[5] = []
    for (let i = 0; i < 7; i++) {
      let day = ++start
      temp[5].push({
        year: rs.year,
        month: rs.month,
        month_str: rs.month + 1,
        day: day,
        isNextMonth: true
      })
    }
  }

  // 2026-02, there is only 4 lines
  if (returnSixRows && temp.length === 4) {
    let rs = getNextTime(year, month)
    let start = 0
    temp[4] = []
    temp[5] = []
    for (let i = 0; i < 7; i++) {
      let day = ++start
      temp[4].push({
        year: rs.year,
        month: rs.month,
        month_str: rs.month + 1,
        day: day,
        isNextMonth: true
      })
      day = ++start
      temp[5].push({
        year: rs.year,
        month: rs.month,
        month_str: rs.month + 1,
        day: day,
        isNextMonth: true
      })
    }
  }

  return {
    year: year,
    month: month,
    month_str: month + 1,
    days: temp.map(line => {
      /**
      * https://github.com/airyland/vux/issues/1361
      * @todo day will be changed to weekDay after v3.0
      */
      line.map((item, index) => {
        item.date = item.day
        item.weekDay = index
        item.isWeekend = index === 0 || index === 6
        item.formatedDate = format(new Date(`${item.year}/${item.month_str}/${item.date}`), 'YYYY-MM-DD')
        return item
      })
      return line
    })
  }
}

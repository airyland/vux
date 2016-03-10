// fork from https://github.com/rookie125/mobile-calendar
import {
  assign
}
from 'lodash'
import * as Eventor from '../../libs/eventor'
var mNow = 0, // 当前相对月份
  yNow = 0 // 当前相对年份


function Calendar(option) {
  var _this = this
    // 过去的时间是否可选
  _this.calenTitles // 年，月标题
  _this.aMonths // 可以选择的所有月份
  _this.aYears // 可以选择的所有年份
  _this.yearTitle // 当前年标题
  _this.monthTitle // 当前月标题
  _this.prevYearBtn // 上一年
  _this.nextYearBtn // 下一年
  _this.prevMonthBtn // 上个月
  _this.nextMonthBtn // 下个月
  _this.selectYearBox // 年份选择
  _this.selectMonthBox // 月份选择

  _this.slide = false // 日历列表正在滑动

  option = option || {}
  var defaults = {
    hours: false, // show hour select
    hoursPast: false,
    focusObj: null,
    shield: '[]',
    start: '', // start of year
    end: '', // end of year
    disablePast: false, // past date can be selected
    startDate: '',
    startJSON: {},
    format: 'yy-mm-dd'
  }
  _this.o = assign(defaults, option)
  var oDate = new Date()
  _this.hours = false
  _this.hoursPast = false
  _this.focusObj = null
  _this.shield = '[]'
  _this.startDate = ''
  _this.startJSON = {}
  _this.fixDate = {
    y: oDate.getFullYear(),
    m: oDate.getMonth() + 1,
    d: 0
  }

  // 开始初始化
  this.init()
}

Eventor.mixTo(Calendar)

// 初始化
Calendar.prototype.init = function () {
  var _this = this

  _this.oCalenWrap = create('div', {
      "class": 'calendar'
    }) // 最大父级

  _this.oCalenMask = create('div', {
      "class": 'calendar-mask'
    })
    // 灰快遮罩
  _this.oCalen = create('div', {
      "class": 'calendar-content'
    })
    // 日历box
  _this.calendarList = create('div', {
      "class": 'calendar-list'
    }) // 日历列表

  if (!this.o.trigger) return

  var aCalendars = [this.o.trigger]

  document.body.appendChild(this.oCalenWrap)
  this.oCalenWrap.appendChild(this.oCalenMask)
  this.oCalenWrap.appendChild(this.oCalen)
  var calenTitle = getElement(this.oCalen, '.calendar-title')

  // 创建头部
  this.createHeader(function () {

    // 创建星期标题头
    _this.createWeek()

    _this.oCalen.appendChild(_this.calendarList)

    // 滑动切换上下月
    _this.slideSwitch(_this.calendarList, function (obj, dir) {
      dir > 0 ? mNow-- : mNow++

      _this.startJSON.prev.m = mNow - 1
      _this.startJSON.now.m = mNow
      _this.startJSON.next.m = mNow + 1
      _this.transitions(obj, dir)
    })

    // 显示/隐藏 月/年 份选择
    for (var i = 0; i < _this.calenTitles.length; i++) {

      _this.calenTitles[i].onclick = function () {

        if (toolClass(this, 'calendar-month-txt', 'has')) {

          // 显示或者隐藏
          toolClass(_this.selectMonthBox, 'active', (_this.selectMonthBox.show ? 'remove' : 'add'))

          // 同时隐藏年月份
          if (_this.selectYearBox.show) {
            toolClass(_this.selectYearBox, 'active', 'remove')
            _this.selectYearBox.show = false
          }

          // 设置当前月份高亮
          for (var x = 0; x < _this.aMonths.length; x++) {
            if (attr(_this.aMonths[x], 'data-value') == attr(this, 'data-value')) {
              toolClass(_this.aMonths[x], 'active')
            } else {
              toolClass(_this.aMonths[x], 'active', 'remove')
            }
          }

          _this.selectMonthBox.show = !_this.selectMonthBox.show
        } else if (toolClass(this, 'calendar-year-txt', 'has')) {

          toolClass(_this.selectYearBox, 'active', (_this.selectYearBox.show ? 'remove' : 'add'))

          if (_this.selectMonthBox.show) {
            toolClass(_this.selectMonthBox, 'active', 'remove')
            _this.selectMonthBox.show = false
          }

          // 设置当前年份高亮
          for (var x = 0; x < _this.aYears.length; x++) {

            if (attr(_this.aYears[x], 'data-value') == attr(this, 'data-value')) {
              toolClass(_this.aYears[x], 'active')
            } else {
              toolClass(_this.aYears[x], 'active', 'remove')
            }
          }

          _this.selectYearBox.show = !_this.selectYearBox.show
        }
      }
    }
  })

  // 月
  this.createDate({}, function (months) {

    for (var i = 0; i < _this.aMonths.length; i++) {

      months[i].onclick = function () {
        for (var x = 0; x < months.length; x++) toolClass(months[x], 'active', 'remove')

        mNow += attr(this, 'data-value') - attr(_this.monthTitle, 'data-value')
        _this.selectDate(this, _this.selectMonthBox, "m", mNow)
      }
    }
  })

  // 显示日历
  for (var i = 0; i < aCalendars.length; i++) {

    aCalendars[i].onclick = function () {
      if (attr(this, 'disabled') != null) return

      var start = Number(attr(this, 'start')) || 1915,
        end = Number(attr(this, 'end')) || 2020

      var past = _this.o.disablePast
      _this.hours = _this.o.hours
      _this.hoursPast = !(attr(this, 'hours-past') == null)

      _this.shield = getDate(attr(this, 'shield') || '')
      _this.startDate = getDate(attr(this, 'start-date') || '')
      var prev, now, next, oDate = new Date()

      if (_this.startDate instanceof Array && _this.startDate.length) {
        var startDate = _this.startDate[0]

        yNow = startDate.y - oDate.getFullYear()
        mNow = startDate.m - (oDate.getMonth() + 1)

        for (var a in startDate) _this.fixDate[a] = startDate[a]

        prev = {
          y: yNow,
          m: mNow - 1,
          d: startDate.d
        }
        now = {
          y: yNow,
          m: mNow,
          d: startDate.d
        }
        next = {
          y: yNow,
          m: mNow + 1,
          d: startDate.d
        }

        _this.startJSON = {
          "prev": prev,
          "now": now,
          "next": next
        }
      } else {
        _this.fixDate.y = oDate.getFullYear()
        _this.fixDate.m = oDate.getMonth() + 1
        _this.fixDate.d = 0
      }

      if (_this.focusObj != this) {

        if (!_this.startDate instanceof Array || !_this.startDate) {
          mNow = 0
          yNow = 0

          _this.startJSON.prev = {
            y: yNow,
            m: mNow - 1
          }
          _this.startJSON.now = {
            y: yNow,
            m: mNow
          }
          _this.startJSON.next = {
            y: yNow,
            m: mNow + 1
          }
        }

        // 创建日历对象列表
        _this.appendList(_this.startJSON, function () {
          _this.addEvent()
        })

        // 年
        _this.createDate({
          "start": start,
          "end": end,
          "type": 'year'
        }, function (years) {
          for (var k = 0; k < years.length; k++) {

            years[k].onclick = function () {
              for (var x = 0; x < years.length; x++) toolClass(years[x], 'active', 'remove')

              yNow += attr(this, 'data-value') - attr(_this.yearTitle, 'data-value')
              _this.selectDate(this, _this.selectYearBox, "y", yNow)
            }
          }

          _this.slideSwitch(_this.selectYearBox, function (obj, dir) {
            _this.selectYearBox.index = _this.selectYearBox.index || 0
            var count = _this.selectYearBox.children.length

            if (dir > 0) {
              _this.selectYearBox.index++
              if (_this.selectYearBox.index >= 0) _this.selectYearBox.index = 0
            } else {
              _this.selectYearBox.index--
              if (_this.selectYearBox.index <= -count) _this.selectYearBox.index = -(count - 1)
            }

            var val = 'translateX(' + (_this.selectYearBox.index * (100 / count)) + '%)'

            _this.selectYearBox.style.WebkitTransform = val
            _this.selectYearBox.style.transform = val

            setTimeout(function () {
              _this.slide = false
            }, 500)
          })
        })
      }

      toolClass(_this.oCalenWrap, 'active')
      _this.focusObj = this
    }
  }
  this.oCalen.onclick = function (ev) {
    var oEv = ev.targetTouches ? ev.targetTouches[0] : (ev || event)
    oEv.cancelBubble = true
  }

  this.oCalenMask.onclick = _this.hideCalen.bind(_this)
}

/**
 * 创建日历列表
 * @return {[type]}        [description]
 */
Calendar.prototype.createCalenList = function (data, setTitle) {
  var _this = this
  var oList = document.createElement('div'),
    created = 0


  data = data || {}
  data.m = data.m || 0
  data.y = data.y || 0
  var date = new Date()

  //
  var date = new Date(),
    tDay = date.getDate()

  date.setFullYear(date.getFullYear() + data.y, (date.getMonth() + data.m + 1), 1, 0, 0, 0)
  date.setDate(0)

  var dSun = date.getDate()

  date.setDate(1)
  var dWeek = date.getDay()

  var date = new Date()
  date.setFullYear(date.getFullYear() + data.y, date.getMonth() + data.m, 1, 0, 0, 0)

  // 获取当前年月
  var tMonth = date.getMonth() + 1,
    tYear = date.getFullYear()

  // 设置上一个月的最后一天
  date.setDate(0)

  var lastDay = date.getDate(),
    lastMonths = []
  for (var i = lastDay; i > 0; i--) lastMonths.push(i)

  // 设置标题
  if (setTitle) {
    _this.yearTitle.innerHTML = tYear
    _this.monthTitle.innerHTML = (tMonth < 10 ? '0' + tMonth : tMonth)
    attr(_this.yearTitle, 'data-value', tYear)
    attr(_this.monthTitle, 'data-value', tMonth - 1)
  }

  // 创建上月尾部分
  var lastMonthDay = dWeek + 7
  lastMonthDay = lastMonthDay >= 10 ? lastMonthDay - 7 : lastMonthDay

  for (var i = 0; i < lastMonthDay; i++) {

    var oSpan = create('span'),
      oNum = create('a', {
        "data-calen": (tYear + '/' + (tMonth - 1) + '/' + lastMonths[i]),
        "class": 'prev-m prev-to-month pasted',
        "href": 'javascript:'
      }, lastMonths[i])

    if (lastMonths[i] == tDay && data.m == 1 && !data.y && !data.d || !data.y && Number(_this.fixDate.m) + 1 == tMonth && _this.fixDate.d == lastMonths[i]) {
      toolClass(oNum, 'today')
    }

    // 设置禁用日期
    if (setShiled(tYear, tMonth - 1, lastMonths[i])) toolClass(oNum, 'pasted shield')

    oSpan.appendChild(oNum)

    if (oList.children.length) {
      oList.insertBefore(oSpan, oList.children[0])
    } else {
      oList.appendChild(oSpan)
    }

    created++
  }

  // 这当前月的日期列表
  for (var i = 0; i < dSun; i++) {
    created++

    var n = i + 1,
      oSpan = create('span'),
      oNum = create('a', {
        "data-calen": (tYear + '/' + tMonth + '/' + n),
        "href": 'javascript:'
      }, n),
      oDate = new Date()

    switch (created % 7) {
      case 0:
      case 1:
        oNum.className = 'weekend'
        break
    }

    if (!data.m && !data.y || !data.y && _this.fixDate.m == tMonth) {
      if ((_this.fixDate.d == n && _this.fixDate.m == tMonth) || (!_this.fixDate.d && n == tDay)) {

        oNum.className = oNum.className + ' today'
      } else if ((_this.o.disablePast || _this.hoursPast) && n < tDay) {
        oNum.className = oNum.className + ' expire pasted'
      }
    } else if ((_this.o.disablePast || _this.hoursPast) && data.m < 0 && data.y <= 0) {
      oNum.className = ' expire pasted'
    }

    // 设置是否小于用户定义的开始日期
    if (tYear <= _this.fixDate.y && tMonth <= _this.fixDate.m && n < data.d || tYear <= _this.fixDate.y && tMonth < _this.fixDate.m) {
      if (_this.startDate) toolClass(oNum, 'expire pasted')
    }

    // 设置禁用日期
    if (setShiled(tYear, tMonth, n)) toolClass(oNum, 'pasted shield')

    oSpan.appendChild(oNum)
    oList.appendChild(oSpan)
  }

  // 创建下月尾部分
  var nextMonths = 42 - oList.children.length

  for (var i = 0; i < nextMonths; i++) {
    var n = i + 1,
      oSpan = create('span'),
      oNum = create('a', {
        "data-calen": (tYear + '/' + (tMonth + 1) + '/' + n),
        "class": 'next-m next-to-month',
        "href": 'javascript:'
      }, n)

    if (n == tDay && data.m == -1 && !data.y && !data.d || !data.y && _this.fixDate.m - 1 == tMonth && _this.fixDate.d == n) {
      toolClass(oNum, 'today')
    }

    // 设置禁用日期
    if (setShiled(tYear, tMonth + 1, n)) toolClass(oNum, 'pasted shield')

    oSpan.appendChild(oNum)
    oList.appendChild(oSpan)
  }

  // 设置禁用日期
  function setShiled(iyear, imonth, idate) {
    if (!_this.shield) return false

    for (var k = 0; k < _this.shield.length; k++) {
      _this.shield[k].y = _this.shield[k].y || data.getFullYear()
      _this.shield[k].m = _this.shield[k].m || data.getMonth() + 1
      _this.shield[k].d = _this.shield[k].d || data.getDate()

      if (iyear == _this.shield[k].y && imonth == _this.shield[k].m && idate == _this.shield[k].d) return true
    }
    return false
  }

  return oList
}

/**
 * 创建年月
 * @param  {[type]} data.start  [开始日期]
 * @param  {[type]} data.end    [结束日期]
 * @param  {[type]} data.type   ["year"/"month"(默认)]
 * @param  {[type]} cb          [description]
 * @return {[type]}             [description]
 */
Calendar.prototype.createDate = function (data, cb) {
  var _this = this
  data = data || {}
  data.start = data.start || 1
  data.end = data.end || 12
  data.type = data.type || 'month'

  var oDateList = create('div', {
    "class": (data.type == 'month' ? 'calendar-months' : 'calendar-years')
  })

  var oList = create('div'),
    arr = [],
    count = 0,
    len = 0,
    now = 0,
    nowY = (new Date()).getFullYear()

  for (var i = data.start; i <= data.end; i++) {

    var oSpan = create('span'),
      oNum = create('a', {
        "data-value": (data.type == 'year' ? i : i - 1),
        "href": 'javascript:'
      }, (i < 10 ? '0' + i : i))

    arr.push(oNum)

    if (data.type == 'year') {

      if (count >= 12) {
        oDateList.appendChild(oList)
        oList = create('div')
        count = 0
        len++
      }

      if (i == nowY) now = len

      oSpan.appendChild(oNum)
      oList.appendChild(oSpan)
    } else {
      oSpan.appendChild(oNum)
      oDateList.appendChild(oSpan)
    }
    count++
  }

  if (data.type == 'year') {
    if (_this.selectYearBox && this.oCalen) this.oCalen.removeChild(_this.selectYearBox)
    oDateList.appendChild(oList)
    _this.selectYearBox = oDateList
    _this.aYears = arr

    if (count) len++

    oDateList.style.width = (len * 100) + '%'

    for (var i = 0; i < len; i++) {
      oDateList.children[i].style.width = 100 / len + '%'
    }

    // 设置当前显示的页
    oDateList.style.WebkitTransform = 'translateX(-' + (now * (100 / len)) + '%)'
    oDateList.style.transform = 'translateX(-' + (now * (100 / len)) + '%)'
    _this.selectYearBox.index = -now
  } else {
    if (_this.selectMonthBox && _this.oCalen) this.oCalen.removeChild(_this.selectMonthBox)
    _this.selectMonthBox = oDateList
    _this.aMonths = arr
  }
  this.oCalen.appendChild(oDateList)

  cb && cb(arr)
}

/**
 * 创建时间
 * @return {[type]} [description]
 */
Calendar.prototype.createTime = function (obj, date, today, past) {
  var _this = this
  var oTime = getElement(this.oCalen, '.calendar-time'),
    child = [],
    oDate = new Date(),
    day = oDate.getDate(),
    hours = oDate.getHours()

  if (!oTime.length) {
    oTime = create('div', {
      "class": 'calendar-time'
    })

    for (var i = 0; i < 24; i++) {

      var time = i < 10 ? '0' + i : i
      time += ':00'

      var oSpan = create('span'),
        oNum = create('a', {
          "href": 'javascript:',
          "data-time": time
        }, time)

      oSpan.appendChild(oNum)
      oTime.appendChild(oSpan)
      child.push({
        "obj": oNum,
        "time": parseInt(time, 10)
      })
    }
  } else {
    oTime = oTime[0]
    var arr = getElement(oTime, 'a')

    for (var i = 0; i < arr.length; i++) {
      child.push({
        "obj": arr[i],
        "time": parseInt(attr(arr[i], 'data-time'), 10)
      })
    }
  }

  toolClass(oTime, 'active')

  for (var i = 0; i < child.length; i++) {

    if (_this.hoursPast && ((mNow < 0 && yNow <= 0) || (today == day && child[i].time <= hours) || (mNow <= 0 && yNow <= 0 && today < day))) {
      toolClass(child[i].obj, 'expire pasted')
      child[i].obj.active = false
    } else {
      toolClass(child[i].obj, 'expire pasted', 'remove')
      child[i].obj.active = true
    }

    (function (time) {
      child[i].obj.onclick = function () {

        // 设置日期时间
        if (this.active) {
          var val = date + ' ' + (time < 10 ? '0' + time : time) + ':00'

          if (obj.value != null) {
            obj.value = val
          } else if (obj.innerHTML != null) {
            obj.innerHTML = val
          }
          _this.hideCalen()
          _this.changes(val)
        }
        toolClass(oTime, 'active', 'remove')
      }
    })(child[i].time)
  }

  this.oCalen.appendChild(oTime)
}

/**
 * 创建头部
 * @return {[type]}      [description]
 */
Calendar.prototype.createHeader = function (cb) {
  var _this = this
  this.calenTitles = []

  var header = create('div', {
    "class": 'calendar-header'
  })

  var year = create('div', {
      "class": 'calendar-year'
    }),
    prevYear = create('a', {
      "class": 'year-prev switch-btn',
      "href": 'javascript:'
    }, '&lt'),
    nextYear = create('a', {
      "class": 'year-next switch-btn',
      "href": 'javascript:'
    }, '&gt'),
    calenYearTxt = create('a', {
      "class": 'calendar-year-txt calendar-title',
      "href": 'javascript:'
    })

  year.appendChild(prevYear)
  year.appendChild(calenYearTxt)
  year.appendChild(nextYear)

  var month = create('div', {
      "class": 'calendar-month'
    }),
    prevMonth = create('a', {
      "class": 'month-prev switch-btn',
      "href": 'javascript:'
    }, '&lt'),
    nextMonth = create('a', {
      "class": 'month-next switch-btn',
      "href": 'javascript:'
    }, '&gt'),
    calenMonthTxt = create('a', {
      "class": 'calendar-month-txt calendar-title',
      "href": 'javascript:'
    })

  month.appendChild(prevMonth)
  month.appendChild(calenMonthTxt)
  month.appendChild(nextMonth)

  header.appendChild(year)
  header.appendChild(month)

  _this.calenTitles.push(calenYearTxt, calenMonthTxt)

  this.monthTitle = calenMonthTxt
  this.yearTitle = calenYearTxt

  // 按钮切换上下月/年
  prevMonth.onclick = function () {
    _this.switchDate(-1)
  }
  nextMonth.onclick = function () {
    _this.switchDate(1)
  }
  prevYear.onclick = function () {
    _this.switchDate(-1, 'year')
  }
  nextYear.onclick = function () {
    _this.switchDate(1, 'year')
  }

  if (this.oCalen.children.length) {
    this.oCalen.insertBefore(header, this.oCalen.children[0])
  } else {
    this.oCalen.appendChild(header)
  }

  for (var i = 0; i < header.children.length; i++) {
    header.children[i].ontouchstart = function () {
      toolClass(this, 'active')
    }
    header.children[i].ontouchend = function () {
      toolClass(this, 'active', 'remove')
    }
  }

  cb && cb()
}

/**
 * 创建头部
 * @return {[type]}      [description]
 */
Calendar.prototype.createWeek = function () {
  const dateListEn = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  var week = create('div', {
      "class": 'calendar-week'
    }),
    weeks = this.o.dateList || dateListEn

  for (var i = 0; i < 7; i++) {
    var n = i + 1,
      data = {}
    if (n % 7 == 1 || n % 7 == 0) data["class"] = 'weekend'

    week.appendChild(create('span', data, weeks[i]))
  }
  this.oCalen.appendChild(week)
}

/**
 *
 * 插入日历对象
 * @param  {Function} cb [description]
 * @return {[type]}      [description]''
 */
Calendar.prototype.appendList = function (data, cb) {
  var _this = this
  data = data || {}
  data.prev = data.prev || {
    m: mNow - 1,
    y: yNow
  }
  data.now = data.now || {
    m: mNow,
    y: yNow
  }
  data.next = data.next || {
    m: mNow + 1,
    y: yNow
  }

  _this.calendarList.innerHTML = ''

  _this.calendarList.appendChild(this.createCalenList(data.prev))
  _this.calendarList.appendChild(this.createCalenList(data.now, true))
  _this.calendarList.appendChild(this.createCalenList(data.next))

  cb && cb()
}

/**
 * 设置日历事件
 */
Calendar.prototype.addEvent = function () {
  var _this = this
  var aCalenSet = _this.calendarList.getElementsByTagName('a')

  for (var i = 0; i < aCalenSet.length; i++) {
    aCalenSet[i].onclick = function () {

      if (toolClass(this, 'prev-to-month', 'has')) {
        _this.switchDate(-1)
      } else if (toolClass(this, 'next-to-month', 'has')) {
        _this.switchDate(1)
      } else if (!toolClass(this, 'pasted', 'has') && !toolClass(this, 'shield', 'has')) {

        var date = attr(this, 'data-calen'),
          today = this.innerHTML
        date = format(date, (attr(_this.focusObj, 'format') || false))
        _this.emit('change', date)
        if (_this.o.hours) {
          _this.createTime(_this.focusObj, date, today, _this.o.disablePast)
        } else {
          if (_this.focusObj && typeof _this.focusObj.value == 'undefined') {
            _this.focusObj.innerHTML = date
          } else if (_this.focusObj) {
            var type = typeof _this.focusObj.value
            if (type === 'string' || type === 'number') {
              if (_this.focusObj.oldValue != date) {

                _this.focusObj.value = date
                _this.focusObj.oldValue = date

                _this.changes()
              }
            }
          }
          _this.hideCalen()
        }
      }
    }
  }
}

/**
 * 切换上下月
 * @param  {[type]} dir  [description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
Calendar.prototype.switchDate = function (dir, type) {
  var _this = this
  type = type || 'month'

  switch (type) {
    case 'month':
      dir > 0 ? mNow++ : mNow--

      _this.startJSON.prev.m = mNow - 1
      _this.startJSON.now.m = mNow
      _this.startJSON.next.m = mNow + 1

      _this.transitions(_this.calendarList, dir > 0 ? -1 : 1)
      break
    case 'year':
      _this.appendList({
        prev: {
          m: mNow,
          y: yNow - 1
        },
        next: {
          m: mNow,
          y: yNow + 1
        }
      }, function () {
        dir > 0 ? yNow++ : yNow--
        _this.startJSON.prev.y = yNow
        _this.startJSON.now.y = yNow
        _this.startJSON.next.y = yNow
        _this.transitions(_this.calendarList, dir > 0 ? -1 : 1)
      })
      break
  }
}

/**
 * 切换月份动画
 * @param  {[type]} obj [description]
 * @param  {[type]} dir [上个月还是下个月]
 */
Calendar.prototype.transitions = function (obj, dir) {
  var _this = this
  if (dir > 0) {
    toolClass(obj, 'slide prev-to')
  } else {
    toolClass(obj, 'slide next-to')
  }

  setTimeout(function () {
    end()
  }, 1000)

  function end() {
    _this.appendList(_this.startJSON, function () {
      toolClass(obj, 'slide prev-to next-to', 'remove')
      _this.addEvent()
      _this.slide = false
    })
  }
}

/**/
Calendar.prototype.selectDate = function (obj, obj2, attr, val) {
  var _this = this

  this.startJSON.prev[attr] = (attr == 'm' ? val - 1 : val)
  this.startJSON.now[attr] = val
  this.startJSON.next[attr] = (attr == 'm' ? val + 1 : val)

  this.appendList(this.startJSON, function () {
    _this.addEvent()
  })

  toolClass(obj, 'active')
  toolClass(obj2, 'active', 'remove')

  _this.selectYearBox.show = false
  _this.selectMonthBox.show = false
}

/**/
Calendar.prototype.changes = function (val) {
  this.emit('change', val)
}

/**
 * 滑动切换日期
 * @param  {[type]} ev [description]
 * @return {[type]}    [description]
 */
Calendar.prototype.slideSwitch = function(obj, callBack) {
  var _this = this
  obj.onmousedown = start
  obj.addEventListener('touchstart', start, false)

  function start(ev) {
    ev.preventDefault()
    var oEv = ev.targetTouches ? ev.targetTouches[0] : (ev || event)
    var disX = oEv.pageX
    var needW = parseInt(document.documentElement.clientWidth / 5, 10)
    var dir

    function move(ev) {
      var oEv = ev.targetTouches ? ev.targetTouches[0] : (ev || event)
      dir = oEv.pageX - disX
      if (_this.slide) return false

      if (Math.abs(dir) >= needW) {
        _this.slide = true
        callBack && callBack(this, dir)
      }

      oEv.preventDefault && oEv.preventDefault()
      return false
    }

    function end(ev) {
      this.onmousemove && (this.onmousemove = null)
      this.onmouseup && (this.onmouseup = null)

      this.removeEventListener('touchmove', move, false)
      this.removeEventListener('touchend', end, false)
    }

    this.onmousemove = move
    this.onmouseup = end

    obj.addEventListener('touchmove', move, false)
    obj.addEventListener('touchend', end, false)
  }
}

/**
 * 查找/添加/删除 className
 * @param  {[type]} obj    [description]
 * @param  {[type]} sClass [需要处理的class]
 * @param  {[type]} type   ['add:添加'(默认), 'remove:删除', 'has:查找']
 */
function toolClass(obj, sClass, type) {
  if (!sClass) return

  var nowClass = obj.className.replace(/\s+/g, ' ')
  nowClass = nowClass.split(' ')

  sClass = sClass.replace('^\s+|\s+$').replace(/\s+/, ' ').split(' ')
  type = type || 'add'

  for (var i = 0; i < nowClass.length; i++) {
    switch (type) {
      case 'has':
        if (sClass[0] == nowClass[i]) return true
        break
      case 'add':
      case 'remove':
        for (var x = 0; x < sClass.length; x++) {
          if (sClass[x] == nowClass[i]) nowClass.splice(i, 1)
        }
        break
    }
  }

  if (type == 'add') nowClass = nowClass.concat(sClass)

  obj.className = nowClass.join(' ')
}

/**
 * 获取元素
 * @param  {[type]} parent [description]
 * @param  {[type]} str    [type]
 */
function getElement(parent, str) {
  var result

  switch (str.charAt(0)) {
    case '#':
      result = parent.getElementById(str.substring(1))
      break
    case '.':
      result = parent.getElementsByClassName(str.substring(1))
      break
    default:
      result = parent.getElementsByTagName(str)
      break
  }

  return result
}

/**
 * 创建元素
 * @param  {[type]} tagname [标签名字]
 * @param  {[type]} attr    [属性(多个)]
 * @param  {[type]} html    [内容]
 */
function create(tagname, attr, html) {
  if (!tagname) return

  attr = attr || {}
  html = html || ''

  var element = document.createElement(tagname)

  for (var i in attr) {
    element.setAttribute(i, attr[i])
  }

  element.innerHTML = html
  return element
}

/**
 * 隐藏日历
 */
Calendar.prototype.hideCalen = function () {
  var _this = this
  toolClass(_this.oCalenWrap, 'close')
  setTimeout(function () {
    toolClass(_this.oCalenWrap, 'active close', 'remove')
  }, 290)
}

/**
 * 日历的格式
 * @param  {[type]} str  [description]
 * @param  {[type]} fmat [description]
 * @return {[type]}      [description]
 */
function format(str, fmat) {
  if (!str) return false
  str = str.split('/')
  fmat = fmat || 'y/m/d'

  var n = fmat.charAt(0),
    count = 0

  for (var i = 0; i < fmat.length; i++) {
    if (n.charAt(count) != fmat.charAt(i)) {
      n += fmat.charAt(i)
      count++
    }
  }

  var data = {
      "y": str[0],
      "m": str[1],
      "d": str[2]
    },
    symbol = '',
    result = ''

  if (/\//g.test(n)) {
    symbol = '/'
  } else if (/\-/g.test(n)) {
    symbol = '-'
  }

  n = n.split(symbol)

  for (var i = 0; i < n.length; i++) {
    result += data[n[i]]
    if (i < n.length - 1) result += symbol
  }

  return result
}

/**
 * / 字符串获取年月日
 * @param  {[type]} str [description]
 * @param  {[type]} one [description]
 */
function getDate(str, one) {
  str = str.replace(/[\'\s]+/g, '')
  if (!str) return

  str = str.match(/(\d+[\/\-]\d+[\/\-]\d+)/g)

  var data = []

  for (var i = 0; i < str.length; i++) {
    var arr = str[i].match(/\d+/g),
      result = {}

    if (arr.length == 3) {
      result["m"] = arr[1]

      if (arr[0].length == 4) {
        result["y"] = arr[0]
        result["d"] = arr[2]
      } else {
        result["d"] = arr[0]
        result["y"] = arr[2]
      }
    } else if (arr.length == 2) {
      if (arr[0].length == 4) {
        result["y"] = arr[0]
        result["m"] = arr[1]
      } else if (arr[0].length <= 2) {
        result["m"] = arr[0]
        result["d"] = arr[1]
      }
    }
    data.push(result)
  }

  return data
}

/**
 * 操作对象属性
 */
function attr(obj, attr, val) {
  if (!obj) return null
  switch (arguments.length) {
    case 3:
      obj.setAttribute(attr, val)
      break
    case 2:
      return obj.getAttribute(attr)
      break
  }
}

export default Calendar
import Scroller from '../picker/scroller'
import { each, trimZero, addZero, getMaxDay, parseRow, parseDate, getElement, toElement, removeElement } from './util'

const MASK_TEMPLATE = '<div class="dp-mask"></div>'

const TEMPLATE = `<div class="dp-container">
  <div class="dp-header">
    <div class="dp-item dp-left" data-role="cancel">cancel</div>
    <div class="dp-item dp-center"></div>
    <div class="dp-item dp-right" data-role="confirm">ok</div>
  </div>
  <div class="dp-content">
    <div class="dp-item" data-role="year"></div>
    <div class="dp-item" data-role="month"></div>
    <div class="dp-item" data-role="day"></div>
    <div class="dp-item" data-role="hour"></div>
    <div class="dp-item" data-role="minute"></div>
  </div>
</div>`

var SHOW_ANIMATION_TIME = 100 // ms
var SHOW_CONTAINER_TIME = 300

var TYPE_MAP = {
  year: ['YYYY'],
  month: ['MM', 'M'],
  day: ['DD', 'D'],
  hour: ['HH', 'H'],
  minute: ['mm', 'm']
}

var BODY = document.body

var MASK = null

var CURRENT_PICKER

var NOW = new Date()

var DEFAULT_CONFIG = {
  template: TEMPLATE,
  trigger: null,
  output: null,
  currentYear: NOW.getFullYear(),
  currentMonth: NOW.getMonth() + 1,
  minYear: 2000,
  maxYear: 2030,
  yearRow: '{value}',
  monthRow: '{value}',
  dayRow: '{value}',
  hourRow: '{value}',
  minuteRow: '{value}',
  format: 'YYYY-MM-DD',
  value: NOW.getFullYear() + '-' + (NOW.getMonth() + 1) + '-' + NOW.getDate(),
  onSelect () {},
  onConfirm () {},
  onShow () {},
  onHide () {},
  confirmText: 'ok',
  cancelText: 'cancel'
}

function renderScroller (el, data, value, fn) {
  var scroller = new Scroller(el, {
    data: data,
    defaultValue: value,
    onSelect: fn
  })
  return scroller
}

function showMask () {
  if (!MASK) {
    MASK = toElement(MASK_TEMPLATE)
    BODY.appendChild(MASK)

    MASK.addEventListener('click', function () {
      CURRENT_PICKER && CURRENT_PICKER.hide()
    }, false)
  }

  MASK.style.display = 'block'

  setTimeout(function () {
    MASK && (MASK.style.opacity = 0.5)
  }, 0)
}

function hideMask () {
  if (!MASK) {
    return
  }

  MASK.style.opacity = 0

  setTimeout(function () {
    MASK && (MASK.style.display = 'none')
    // hideMaskTimer = null
  }, SHOW_ANIMATION_TIME)
}

function DatetimePicker (config) {
  var self = this
  self.config = {}
  self.value = config.value || ''
  each(DEFAULT_CONFIG, function (key, val) {
    self.config[key] = config[key] || val
  })

  var trigger = self.config.trigger
  if (trigger) {
    var output = self.config.output || trigger
    trigger = self.trigger = getElement(trigger)
    output = self.output = getElement(output)

    trigger.addEventListener('click', function (e) {
      e.preventDefault()
      self.show(self.value)
    }, false)
  }
}

DatetimePicker.prototype = {

  _show (newValueMap) {
    var self = this

    self.container.style.display = 'block'

    each(TYPE_MAP, function (type) {
      self[type + 'Scroller'] && self[type + 'Scroller'].select(trimZero(newValueMap[type]), false)
    })

    setTimeout(function () {
      self.container.style['-webkit-transform'] = 'translateY(0)'
      self.container.style.transform = 'translateY(0)'
    }, 0)
  },
  show (value) {
    var self = this
    var config = self.config
    CURRENT_PICKER = self
    var valueMap = self.valueMap = parseDate(config.format, value || config.value)
    var newValueMap = {}

    each(TYPE_MAP, function (type, list) {
      newValueMap[type] = list.length === 1 ? valueMap[list[0]] : (valueMap[list[0]] || valueMap[list[1]])
    })

    if (self.container) {
      self._show(newValueMap)
    } else {
      var container = self.container = toElement(config.template)

      BODY.appendChild(container)

      self.container.style.display = 'block'

      container.addEventListener('touchstart', function (e) {
        // e.preventDefault()
      }, false)

      each(TYPE_MAP, function (type) {
        // 清除格式里没有列
        var div = self.find('[data-role=' + type + ']')
        if (newValueMap[type] === undefined) {
          removeElement(div)
          return
        }
        var data
        if (type === 'day') {
          data = self._makeData(type, trimZero(newValueMap.year), trimZero(newValueMap.month))
        } else {
          data = self._makeData(type)
        }

        self[type + 'Scroller'] = renderScroller(div, data, trimZero(newValueMap[type]), function (currentValue) {
          config.onSelect.call(self, type, currentValue)
          var currentDay
          if (!self.dayScroller) {
            return
          }
          if (type === 'year') {
            var currentMonth = self.monthScroller ? self.monthScroller.value : config.currentMonth
            currentDay = self.dayScroller.value
            self._setDayScroller(currentValue, currentMonth, currentDay)
          } else if (type === 'month') {
            var currentYear = self.yearScroller ? self.yearScroller.value : config.currentYear
            currentDay = self.dayScroller.value
            self._setDayScroller(currentYear, currentValue, currentDay)
          }
        })
      })

      if (!self.renderText) {
        if (self.config.confirmText) {
          self.find('[data-role=confirm]').innerText = self.config.confirmText
        }

        if (self.config.cancelText) {
          self.find('[data-role=cancel]').innerText = self.config.cancelText
        }
        self.renderText = true
      }

      this._show(newValueMap)

      self.find('[data-role=cancel]').addEventListener('click', function (e) {
        e.preventDefault()
        self.hide()
      }, false)

      self.find('[data-role=confirm]').addEventListener('click', function (e) {
        e.preventDefault()
        self.confirm()
      }, false)
    }

    showMask()
    config.onShow.call(self)
  },

  _makeData (type, year, month) {
    var config = this.config
    var valueMap = this.valueMap
    var list = TYPE_MAP[type]
    var data = []
    var min
    var max
    if (type === 'year') {
      min = config.minYear
      max = config.maxYear
    } else if (type === 'month') {
      min = 1
      max = 12
    } else if (type === 'day') {
      min = 1
      max = getMaxDay(year, month)
    } else if (type === 'hour') {
      min = 0
      max = 23
    } else if (type === 'minute') {
      min = 0
      max = 59
    }
    for (var i = min; i <= max; i++) {
      var name
      if (type === 'year') {
        name = parseRow(config.yearRow, i)
      } else {
        var val = valueMap[list[0]] ? addZero(i) : i
        name = parseRow(config[type + 'Row'], val)
      }
      data.push({
        name: name,
        value: i
      })
    }
    return data
  },

  _setDayScroller (year, month, day) {
    var self = this
    var maxDay = getMaxDay(year, month)
    if (day > maxDay) {
      day = maxDay
    }
    self.dayScroller.destroy()
    var div = self.find('[data-role=day]')
    self.dayScroller = renderScroller(div, self._makeData('day', year, month), day, function (currentValue) {
      self.config.onSelect.call(self, 'day', currentValue)
    })
  },

  find (selector) {
    return this.container.querySelector(selector)
  },

  hide () {
    var self = this
    self.container.style.removeProperty('transform')
    self.container.style.removeProperty('-webkit-transform')

    setTimeout(function () {
      self.container.style.display = 'none'
    }, SHOW_CONTAINER_TIME)

    hideMask()

    self.config.onHide.call(self)
  },

  select (type, value) {
    this[type + 'Scroller'].select(value, false)
  },

  destroy () {
    var self = this
    removeElement(MASK)
    removeElement(self.container)
    MASK = null
    self.container = null
  },

  getValue () {
    var self = this
    var config = self.config

    var value = config.format

    function formatValue (scroller, expr1, expr2) {
      if (scroller) {
        var val = scroller.value
        if (expr1) {
          value = value.replace(new RegExp(expr1, 'g'), addZero(val))
        }
        if (expr2) {
          value = value.replace(new RegExp(expr2, 'g'), trimZero(val))
        }
      }
    }

    each(TYPE_MAP, function (key, list) {
      formatValue(self[key + 'Scroller'], list[0], list[1])
    })

    return value
  },

  confirm () {
    var self = this
    var value = self.getValue()
    this.value = value

    if (self.config.onConfirm.call(self, value) === false) {
      return
    }

    self.hide()
  }
}

export default DatetimePicker

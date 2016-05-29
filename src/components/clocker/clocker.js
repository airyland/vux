// https://github.com/MoeKit/clocker
var instances = []
var matchers = []
// Miliseconds
matchers.push(/^[0-9]*$/.source)
// Month/Day/Year [hours:minutes:seconds]
matchers.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/
  .source)
// Year/Day/Month [hours:minutes:seconds] and
// Year-Day-Month [hours:minutes:seconds]
matchers.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/
  .source)
// Cast the matchers to a regular expression object
matchers = new RegExp(matchers.join('|'))
// Parse a Date formatted has String to a native object

function parseDateString (dateString) {
  // Pass through when a native object is sent
  if (dateString instanceof Date) {
    return dateString
  }
  // Caste string to date object
  if (String(dateString).match(matchers)) {
    // If looks like a milisecond value cast to number before
    // final casting (Thanks to @msigley)
    if (String(dateString).match(/^[0-9]*$/)) {
      dateString = Number(dateString)
    }
    // Replace dashes to slashes
    if (String(dateString).match(/\-/)) {
      dateString = String(dateString).replace(/\-/g, '/')
    }
    return new Date(dateString)
  } else {
    throw new Error('Couldn\'t cast `' + dateString +
      '` to a date object.')
  }
}
// Map to convert from a directive to offset object property
var DIRECTIVE_KEY_MAP = {
  'Y': 'years',
  'm': 'months',
  'w': 'weeks',
  'D': 'days',
  'H': 'hours',
  'M': 'minutes',
  'S': 'seconds'
}
// Returns an escaped regexp from the string

function escapedRegExp (str) {
  var sanitize = str.toString().replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
  return new RegExp(sanitize)
}
// Time string formatter

function strftime (offsetObject) {
  return function (format) {
    var directives = format.match(/%(-|!)?[A-Z]{1}(:[^]+)?/gi)
    if (directives) {
      for (var i = 0, len = directives.length; i < len; ++i) {
        var directive = directives[i].match(/%(-|!)?([a-zA-Z]{1})(:[^]+)?/)
        var regexp = escapedRegExp(directive[0])
        var modifier = directive[1] || ''
        var plural = directive[3] || ''
        var value = null
        // Get the key
        directive = directive[2]
        // Swap shot-versions directives
        if (DIRECTIVE_KEY_MAP.hasOwnProperty(directive)) {
          value = DIRECTIVE_KEY_MAP[directive]
          value = Number(offsetObject[value])
        }
        if (value !== null) {
          // Pluralize
          if (modifier === '!') {
            value = pluralize(plural, value)
          }
          // Add zero-padding
          if (modifier === '') {
            if (value < 10) {
              value = '0' + value.toString()
            }
          }
          // Replace the directive
          format = format.replace(regexp, value.toString())
        }
      }
    }
    format = format.replace('%_M1', offsetObject.minutes_1)
      .replace('%_M2', offsetObject.minutes_2)
      .replace('%_S1', offsetObject.seconds_1)
      .replace('%_S2', offsetObject.seconds_2)
      .replace('%_H1', offsetObject.hours_1)
      .replace('%_H2', offsetObject.hours_2)
      .replace('%_D1', offsetObject.days_1)
      .replace('%_D2', offsetObject.days_2)
    format = format.replace(/%%/, '%')
    return format
  }
}
// Pluralize

function pluralize (format, count) {
  var plural = 's'
  var singular = ''
  if (format) {
    format = format.replace(/(:||\s)/gi, '').split(/,/)
    if (format.length === 1) {
      plural = format[0]
    } else {
      singular = format[0]
      plural = format[1]
    }
  }
  if (Math.abs(count) === 1) {
    return singular
  } else {
    return plural
  }
}

function splitNumber (number) {
  number = number + ''
  number = (number.length === 1 ? ('0' + number) : number) + ''
  return number.split('')
}

// The Final Countdown
var Countdown = function (finalDate, option) {
  option = option || {}
  this.PRECISION = option.precision || 100 // 0.1 seconds, used to update the DOM
  this.interval = null
  this.offset = {}
  // Register this instance
  this.instanceNumber = instances.length
  instances.push(this)
  // Set the final date and start
  this.setFinalDate(finalDate)
}
var Eventor = require('../../libs/eventor')
Eventor.mixTo(Countdown)
var pro = Countdown.prototype

var fns = {
  start () {
    if (this.interval !== null) {
      clearInterval(this.interval)
    }
    var self = this
    this.update()
    this.interval = setInterval(function () {
      self.update()
    }, this.PRECISION)
    return this
  },
  stop () {
    clearInterval(this.interval)
    this.interval = null
    this._dispatchEvent('stoped')
    return this
  },
  toggle () {
    if (this.interval) {
      this.stop()
    } else {
      this.start()
    }
    return this
  },
  pause () {
    return this.stop()
  },
  resume () {
    return this.start()
  },
  remove () {
    this.stop()
    instances[this.instanceNumber] = null
  },
  setFinalDate (value) {
    this.finalDate = parseDateString(value) // Cast the given date
    return this
  },
  getOffset () {
    this.totalSecsLeft = this.finalDate.getTime() - new Date().getTime() // In miliseconds
    this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1000)
    this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft
    // Calculate the offsets
    return {
      seconds: this.totalSecsLeft % 60,
      minutes: Math.floor(this.totalSecsLeft / 60) % 60,
      hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
      days: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
      weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
      months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
      years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)
    }
  },
  update () {
    // Calculate the offsets
    this.offset = this.getOffset()
    // split offset only for days, hours, minutes, seconds and two number like 45, do not support 100

    var list = ['days', 'hours', 'minutes', 'seconds']

    for (var i = 0; i < list.length; i++) {
      var key = list[i]
      var numbers = splitNumber(this.offset[key])
      this.offset[key + '_1'] = numbers[0]
      this.offset[key + '_2'] = numbers[1]
    }
    // Dispatch an event
    if (this.totalSecsLeft === 0) {
      this.stop()
      this._dispatchEvent('finish')
    } else {
      this._dispatchEvent('update')
    }
    return this
  },
  _dispatchEvent (eventName) {
    var event = {}
    event.finalDate = this.finalDate
    event.offset = this.offset
    event.strftime = strftime(this.offset)
    this.emit(eventName, event)
    this.emit('tick', event)
  }
}

for (var i in fns) {
  pro[i] = fns[i]
}

module.exports = Countdown

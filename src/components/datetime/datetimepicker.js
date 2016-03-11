var Scroller = require('../picker/scroller');
var formater = require('./format');

var MASK_TEMPLATE = '<div class="dp-mask"></div>';

var TEMPLATE = '<div class="dp-container"> \
  <div class="dp-header"> \
    <div class="dp-item dp-left" data-role="cancel">cancel</div> \
    <div class="dp-item dp-center"></div> \
    <div class="dp-item dp-right" data-role="confirm">ok</div> \
  </div> \
  <div class="dp-content"> \
    <div class="dp-item" data-role="year"></div> \
    <div class="dp-item" data-role="month"></div> \
    <div class="dp-item" data-role="day"></div> \
    <div class="dp-item" data-role="hour"></div> \
    <div class="dp-item" data-role="minute"></div> \
  </div> \
</div>';

var SHOW_ANIMATION_TIME = 100; // ms

var TYPE_MAP = {
  year: ['YYYY'],
  month: ['MM', 'M'],
  day: ['DD', 'D'],
  hour: ['HH', 'H'],
  minute: ['II', 'I']
};

var BODY = document.body;

var MASK = null;

var CURRENT_PICKER;

var NOW = new Date();

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
  onSelect: function () {},
  onConfirm: function () {},
  onShow: function () {},
  onHide: function () {},
  confirmText: 'ok',
  cancelText: 'cancel'
};

function each(obj, fn) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (fn.call(obj[key], key, obj[key]) === false) {
        break;
      }
    }
  }
}

function trimZero(val) {
  val = String(val);
  val = val ? parseFloat(val.replace(/^0+/g, '')) : '';
  val = val || 0;
  val = val + ''
  return val
}

function addZero(val) {
  val = String(val);
  return val.length < 2 ? '0' + val : val;
}

function isLeapYear(year) {
  return year % 100 != 0 && year % 4 == 0 || year % 400 == 0;
}

function getMaxDay(year, month) {
  year = parseFloat(year);
  month = parseFloat(month);
  if (month == 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return [4, 6, 9, 11].indexOf(month) >= 0 ? 30 : 31;
}

function parseRow(tmpl, value) {
  return tmpl.replace(/\{value\}/g, value);
}

// parse Date String
function parseDate(format, value) {
  var formatParts = format.split(/[^A-Z]+/);
  var valueParts = value.split(/\D+/);
  if (formatParts.length !== valueParts.length) {
    // throw 'Invalid format or value';
    // 当日期格式不对时，默认为当前日期
    var date = formater(new Date(), format.toLowerCase());
    valueParts = date.split(/\D+/);
  }

  var result = {};

  for (var i = 0; i < formatParts.length; i++) {
    if (formatParts[i]) {
      result[formatParts[i]] = valueParts[i];
    }
  }
  return result;
}

function getElement(expr) {
  return (typeof expr == 'string') ? document.querySelector(expr) : expr;
}

// HTML to Element
function toElement(html) {
  var tempContainer = document.createElement('div');
  tempContainer.innerHTML = html;
  return tempContainer.firstElementChild;
}

function getComputedStyle(el, key) {
  var computedStyle = window.getComputedStyle(el);
  return computedStyle[key] || '';
}

function removeElement(el) {
  el && el.parentNode.removeChild(el);
}

function renderScroller(el, data, value, fn) {
  var scroller = new Scroller(el, {
    data: data,
    defaultValue: value,
    onSelect: fn
  });
  return scroller;
}

function showMask() {
  if (MASK) {
    MASK.style.display = 'block';
    MASK.style.opacity = 0.5;
    return;
  }

  MASK = toElement(MASK_TEMPLATE);
  BODY.appendChild(MASK);

  setTimeout(function () {
    MASK && (MASK.style.opacity = 0.5);
  }, 0);

  $(MASK).click(function () {
    CURRENT_PICKER && CURRENT_PICKER.hide();
  });
}

function hideMask() {
  if (!MASK) {
    return;
  }

  MASK.style.opacity = 0;

  setTimeout(function () {
    MASK && (MASK.style.display = 'none');
    //hideMaskTimer = null;
  }, SHOW_ANIMATION_TIME);
}

function DatetimePicker(config) {
  var self = this;
  self.config = {};
  self.value = config.value || '';
  each(DEFAULT_CONFIG, function (key, val) {
    self.config[key] = config[key] || val;
  });

  var trigger = self.config.trigger;
  if (trigger) {
    var output = self.config.output || trigger;
    trigger = self.trigger = getElement(trigger);
    output = self.output = getElement(output);

    $(trigger).click(function (e) {
      e.preventDefault();
      self.show(self.value);
    });
  }
}

DatetimePicker.prototype = {

  show: function (value) {
    var self = this;
    var config = self.config;
    CURRENT_PICKER = self;
    var valueMap = self.valueMap = parseDate(config.format, value || config.value);
    var newValueMap = {};

    each(TYPE_MAP, function (type, list) {
      newValueMap[type] = list.length == 1 ? valueMap[list[0]] : (valueMap[list[0]] || valueMap[list[1]]);
    });

    if (self.container) {
      self.container.style.display = 'block';

      each(TYPE_MAP, function (type) {
        self[type + 'Scroller'] && self[type + 'Scroller'].select(trimZero(newValueMap[type]), false);
      });

    } else {
      var container = self.container = toElement(config.template);

      BODY.appendChild(container);

      self.container.style.display = 'block';

      container.addEventListener('touchstart', function (e) {
        //e.preventDefault();
      }, false);

      each(TYPE_MAP, function (type) {
        // 清除格式里没有列
        var div = self.find('[data-role=' + type + ']');
        if (newValueMap[type] === undefined) {
          removeElement(div);
          return;
        }
        var data;
        if (type == 'day') {
          data = self._makeData(type, trimZero(newValueMap.year), trimZero(newValueMap.month));
        } else {
          data = self._makeData(type);
        }

        self[type + 'Scroller'] = renderScroller(div, data, trimZero(newValueMap[type]), function (currentValue) {
          config.onSelect.call(self, type, currentValue);
          if (!self.dayScroller) {
            return;
          }
          if (type == 'year') {
            var currentMonth = self.monthScroller ? self.monthScroller.value : config.currentMonth;
            if (currentMonth == 2) {
              var currentDay = self.dayScroller.value;
              self._setDayScroller(currentValue, currentMonth, currentDay);
            }
          } else if (type == 'month') {
            var currentYear = self.yearScroller ? self.yearScroller.value : config.currentYear;
            var currentDay = self.dayScroller.value;
            self._setDayScroller(currentYear, currentValue, currentDay);
          }
        });

      });

      if(!self.renderText) {
        if(self.config.confirmText) {
          $(self.find('[data-role=confirm]')).text(self.config.confirmText)
        }

        if(self.config.cancelText) {
          $(self.find('[data-role=cancel]')).text(self.config.cancelText)
        }
        self.renderText = true
      }

      this.show(value)

      $(self.find('[data-role=cancel]')).click(function (e) {
        e.preventDefault();
        self.hide();
      });

      $(self.find('[data-role=confirm]')).on('click', function (e) {
        e.preventDefault();
        self.confirm();
      });
    }

    showMask();
    config.onShow.call(self);
  },

  _makeData: function (type, year, month) {
    var config = this.config;
    var valueMap = this.valueMap;
    var list = TYPE_MAP[type];
    var data = [];
    var min;
    var max;
    if (type == 'year') {
      min = config.minYear;
      max = config.maxYear;
    } else if (type == 'month') {
      min = 1;
      max = 12;
    } else if (type == 'day') {
      min = 1;
      max = getMaxDay(year, month);
    } else if (type == 'hour') {
      min = 0;
      max = 23;
    } else if (type == 'minute') {
      min = 0;
      max = 59;
    }
    for (var i = min; i <= max; i++) {
      var name;
      if (type == 'year') {
        name = parseRow(config.yearRow, i);
      } else {
        var val = valueMap[list[0]] ? addZero(i) : i;
        name = parseRow(config[type + 'Row'], val);
      }
      data.push({
        name: name,
        value: i
      });
    }
    return data;
  },

  _setDayScroller: function (year, month, day) {
    var self = this;
    var maxDay = getMaxDay(year, month);
    if (day > maxDay) {
      day = maxDay;
    }
    self.dayScroller.destroy();
    var div = self.find('[data-role=day]');
    self.dayScroller = renderScroller(div, self._makeData('day', year, month), day, function (currentValue) {
      self.config.onSelect.call(self, 'day', currentValue);
    });
  },

  find: function (selector) {
    return this.container.querySelector(selector);
  },

  hide: function () {
    var self = this;
    self.container.style.display = 'none';

    hideMask();

    self.config.onHide.call(self);
  },

  select: function (type, value) {
    this[type + 'Scroller'].select(value, false);
  },

  destroy: function () {
    var self = this;
    removeElement(MASK);
    removeElement(self.container);
    MASK = null;
    self.container = null;
  },

  getValue: function () {
    var self = this;
    var config = self.config;

    var value = config.format;

    function formatValue(scroller, expr1, expr2) {
      if (scroller) {
        var val = scroller.value;
        if (expr1) {
          value = value.replace(new RegExp(expr1, 'g'), addZero(val));
        }
        if (expr2) {
          value = value.replace(new RegExp(expr2, 'g'), trimZero(val));
        }
      }
    }

    each(TYPE_MAP, function (key, list) {
      formatValue(self[key + 'Scroller'], list[0], list[1]);
    });

    return value;
  },

  confirm: function () {
    var self = this;
    var output = self.output;

    var value = self.getValue();

    this.value = value;

    if (self.config.onConfirm.call(self, value) === false) {
      return;
    }

    self.hide();
  }
};

DatetimePicker.parseDate = parseDate;
DatetimePicker.trimZero = trimZero;
DatetimePicker.addZero = addZero;

export default DatetimePicker;

var prefix = getPrefix();

var reqAnimFrame = window.requestAnimationFrame || window[prefix['js'] + 'requestAnimationFrame'] || function (callback) {
  setTimeout(callback, 1000 / 60);
};
var xForm = prefix['css'] + 'transform'; // transform css属性名
var support3d;
var timeConstant = 325; // 时间系数，越大动画越快 425
var pressed; // 是否以有手指在操作

let Swipable = class {
  constructor() {
    this.props = {
      // 方向，可取vertical, horizontal
      direction: {
        type: String,
        value: 'vertical'
      },
      // 滑动速度
      speed: {
        type: Number,
        value: 0.5
      }
    }
    this.createdHandler()
  }

  createdHandler() {
    var me = this;
    (support3d === undefined) && (support3d = has3d());
    // 滑动方向
    this.isVertical = this.direction === 'vertical' ? 1 : 0;
    this.$element = $(this);
    // 滑动范围
    this.$view = this.$element.children(); // view是滑动区域中的内容
    this.min = this.isVertical ? this.$element.height() - this.$view.height() : this.$element.width() - this.$view.width();
    this.max = 0;
    // 若容器比内容宽或高，则不做初始化
    if (this.min >= 0) return;
    this._initEvents();
    $(window).on('resize', function () {
      me.refresh();
    });
  }

  refresh() {
    this.min = this.isVertical ? this.$element.height() - this.$view.height() : this.$element.width() - this.$view.width();
    this.max = 0;
    if (this.offset !== undefined) {
      if (this.offset > this.max) {
        this._scroll(this.max);
      }
      if (this.offset < this.min) {
        this._scroll(this.min);
      }
    }
  }

  _initEvents() {
    var me = this,
      $ele = me.$element,
      $body = $('body'),
      dir, // 用户试图滑动的方向，1垂直，0水平
      velocity, // 滑动速度
      frame, // 每一帧偏移
      timeStamp, // 每一帧时间
      amplitude, // 振幅
      reference, // 当前偏移
      startX, // touchstart的X偏移
      startY,
      moveOffsetX, // 从touchstart到touchend在X轴的总偏移
      moveOffsetY,
      target;
    me.offset = 0;
    $ele.on('touchstart', tap);
    var throttleDrag = throttle(drag, 1000 / 70);
    // touchstart
    function tap(e) {
      if (!pressed) {
        pressed = true;
        dir = undefined;
        moveOffsetX = 0;
        moveOffsetY = 0;
        reference = me._pos(e);
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        $body.on('touchmove', throttleDrag);
        $body.on('touchend', release);
        $body.on('touchcancel', release);
        frame = me.offset;
        timeStamp = (new Date()).getTime();
        velocity = 0;
        amplitude = 0;
      }
    }
    // touchmove handler
    function drag(e) {
      var x = e.touches[0].clientX,
        y = e.touches[0].clientY,
        pos, delta;
      if (me.isVertical) {
        e.preventDefault();
      } else {
        if (dir === undefined) {
          dir = Math.abs(y - startY) > Math.abs(x - startX) ? 1 : 0;
        }
        if (dir === 1) {
          return;
        }
        e.preventDefault();
      }
      me.trigger('nDrag');
      pos = me._pos(e);
      moveOffsetY = y - startY;
      moveOffsetX = x - startX;
      delta = pos - reference;
      reference = pos;
      if (me.offset < me.min || me.offset > me.max) {
        delta /= 4;
      }
      me._scroll(me.offset + delta);
      track();
    }
    // touchend handler
    function release(e) {
      pressed = false;
      var bound,
        touch = e.touches[0];
      $body.off('touchmove', throttleDrag);
      $body.off('touchend', release);
      $body.off('touchcancel', release);
      me.trigger('nRelease');
      // 超出边界，回弹
      if (me.offset < me.min || me.offset > me.max) {
        target = me.offset < me.min ? me.min : me.max;
        amplitude = target - me.offset;
        timeStamp = (new Date).getTime();
        reqAnimFrame(rebound);
      }
      // 速度足够大，则惯性移动
      else if (Math.abs(velocity) > 80) {
        amplitude = me.speed * velocity;
        target = Math.round(me.offset + amplitude);
        timeStamp = (new Date).getTime();
        reqAnimFrame(autoScroll);
        if (target < me.min || target > me.max) {
          bound = target < me.min ? me.min : me.max;
        }
      }
      // 偏移大，则视为移动，而非tap，因此阻止默认行为
      if (Math.abs(moveOffsetX) > 5 || Math.abs(moveOffsetY) > 5) {
        e.preventDefault();
      }
    }
    // 跟踪速度
    function track() {
      var d = (new Date()).getTime();
      var delta = me.offset - frame;
      var t = d - timeStamp;
      var v = 1000 * delta / (1 + t);
      velocity = 0.05 * velocity + 0.95 * v;
      frame = me.offset;
      timeStamp = d;
    }
    // 惯性滑动的每一帧
    function autoScroll() {
      var elapsed, delta, bound, boundTarget;
      if (amplitude) {
        elapsed = (new Date()).getTime() - timeStamp;
        delta = -amplitude * Math.exp(-elapsed / timeConstant);
        if (Math.abs(delta) > 0.5) {
          // rebound
          if (me.offset > me.max || me.offset < me.min) {
            bound = target < me.min ? me.min : me.max;
            boundTarget = Math.round(bound + (target - bound) / 8);
            if (Math.abs(target + delta) > Math.abs(boundTarget)) {
              target = me.offset < me.min ? me.min : me.max;
              amplitude = target - me.offset;
              timeStamp = (new Date).getTime();
              reqAnimFrame(rebound);
              return;
            }
          }
          me._scroll(target + delta);
          reqAnimFrame(autoScroll);
        } else {
          me._scroll(target);
        }
      }
    }
    // 回弹的每一帧
    function rebound() {
      var elapsed, delta;
      if (amplitude) {
        elapsed = (new Date()).getTime() - timeStamp;
        delta = -amplitude * Math.exp(-elapsed / 100);
        if (Math.abs(delta) > 0.5) {
          me._scroll(target + delta);
          reqAnimFrame(rebound);
        } else {
          me._scroll(target);
        }
      }
    }
  }

  _scroll(pos) {
      var me = this;
      me.offset = pos;
      if (support3d) {
        var translate = me.isVertical ? 'translate3d(0, ' + me.offset + 'px, 0)' : 'translate3d(' + me.offset + 'px, 0, 0)';
        me.$view.css({
          '-webkit-transform': translate
        });
      } else {
        var translate = me.isVertical ? 'translateY' : 'translateX';
        me.$view.css(xForm, translate + '(' + me.offset + 'px)');
      }
    },
    _pos(e) {
      return this.isVertical ? e.touches[0].clientY : e.touches[0].clientX;
    }
};
/* helper */
function getPrefix() {
  var styles = window.getComputedStyle(document.documentElement, ''),
    pre = (Array.prototype.slice
      .call(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
    )[1],
    dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
  return {
    dom: dom,
    lowercase: pre,
    css: '-' + pre + '-',
    js: pre
  };
}

function has3d() {
  var el = document.createElement('p'),
    has3d;
  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null);
  if (el.style[xForm] != undefined) {
    el.style[xForm] = 'translate3d(1px, 1px, 1px)';
    has3d = window.getComputedStyle(el).getPropertyValue(xForm);
  }
  document.body.removeChild(el);
  return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
}

function throttle(func, threshold, alt) {
  var last = Date.now();
  threshold = threshold || 100;
  return function () {
    var now = Date.now();
    if (now - last < threshold) {
      if (alt) {
        alt.apply(this, arguments);
      }
      return;
    }
    last = now;
    func.apply(this, arguments);
  };
};
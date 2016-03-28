/**
 * 横竖屏切换监听器
 * @author ningzbruc@gmail.com
 * @gitbub http://gitbub.com/kingback/orientation/
 * @date 2014-01-15
 * @version 0.0.1
 */

// 原生不支持用resize模拟
var ORIENTATION_CHANGE = 'orientationchange'
var RESIZE = 'resize'
var EVT_ORIENTATION_CHANGE = 'onorientationchange' in window ? ORIENTATION_CHANGE : RESIZE
var FUNCTION = 'function'
var ON = 'on'
var AFTER = 'after'

/**
 * 混入对象属性
 * @method merge
 * @param {Object} s 提供对象
 * @return {Object} r 接收对象
 * @private
 */

function merge (s) {
  var r = {}
  var k

  if (s) {
    for (k in s) {
      if (s.hasOwnProperty(k)) {
        r[k] = s[k]
      }
    }
  }

  return r
}

/**
 * 绑定方法上下文
 * @method bind
 * @param {Function} fn
 * @param {Object} context
 * @return {Function}
 * @private
 */

function bind (fn, context) {
  return fn.bind ? fn.bind(context) : function () {
    fn.apply(context, arguments)
  }
}

/**
 * 横竖屏切换监听器
 * @constructor Orientation
 * @class
 */

function Orientation () {
  this.init.apply(this, arguments)
}

Orientation.prototype = {

  /**
   * 构造器
   * @property constructor
   * @public
   */
  constructor: Orientation,

  /**
   * 初始化
   * @method init
   * @public
   */
  init: function (cfg) {
    this._cfg = merge({
      delay: 400
    }, cfg)

    // 事件订阅数组
    this._subs = {
      on: [],
      after: []
    }

    // 当前信息
    this.info = this.getInfo()

    // 绑定事件回调上下文
    this._onWinOrientationChange = bind(this._onWinOrientationChange, this)

    // 绑定窗口切换事件
    window.addEventListener(EVT_ORIENTATION_CHANGE, this._onWinOrientationChange, false)
  },

  /**
   * 销毁
   * @method destroy
   * @public
   */
  destroy: function () {
    window.removeEventListener(EVT_ORIENTATION_CHANGE, this._onWinOrientationChange, false)
    delete this._subs
  },

  /**
   * 创建新实例
   * @method create
   * @return {Orientation} Orientation实例对象
   * @public
   */
  create: function (cfg) {
    return new Orientation(cfg)
  },

  /**
   * 获取横竖屏信息
   * @method getInfo
   * @return {Object} 横竖屏相关信息
   * @public
   */
  getInfo: function () {
    // 90度为横屏
    return (EVT_ORIENTATION_CHANGE === ORIENTATION_CHANGE) ? {
      landscape: (window.orientation === 90 || window.orientation === -90),
      portrait: (window.orientation === 0 || window.orientation === -180),
      orientation: window.orientation
    } : {
      landscape: window.screen.width > window.screen.height,
      portrait: window.screen.width <= window.screen.height,
      orientation: window.screen.width > window.screen.height ? 90 : 0
    }
  },

  /**
   * 是否是横屏
   * @method isLandscape
   * @return {Boolean}
   * @public
   */
  isLandscape: function () {
    return this.info.landscape
  },

  /**
   * 是否是竖屏
   * @method isPortrait
   * @return {Boolean}
   * @public
   */
  isPortrait: function () {
    return this.info.portrait
  },

  /**
   * 添加change事件
   * @method change
   * @param {Function} fn 回调函数
   * @param {Boolean} after 时候绑定after事件
   * @chainable
   */
  change: function (fn, after) {
    if (typeof fn === FUNCTION) {
      this._subs[after ? AFTER : ON].push(fn)
    }

    return this
  },

  /**
   * 触发横竖屏事件
   * @method _fireChange
   * @param {EventFacade} e
   * @protected
   */
  _fireChange: function (e) {
    var self = this
    var info = this.getInfo()
    var subs = this._subs
    var i
    var l

    // 如果不等于上次方向，则触发
    if (info.landscape !== this.info.landscape) {
      this.info = merge(info)
      info.originEvent = e
      info.originType = e.type

      // 执行on
      for (i = 0, l = subs.on.length; i < l; i++) {
        subs.on[i].call(self, e)
      }

      // 执行after
      setTimeout(function () {
        for (i = 0, l = subs.after.length; i < l; i++) {
          subs.after[i].call(self, e)
        }
      }, 0)
    }
  },

  /**
   * 检查旋转是否已经完成
   * @method _checkChange
   * @param {EventFacade} e
   * @protected
   */
  _checkChange: function (e) {
    var self = this

    if (self._cfg.delay) {
      // iPad打开键盘时旋转比较慢
      clearTimeout(this._changeTimer)
      self._changeTimer = setTimeout(function () {
        self._fireChange(e)
      }, self._cfg.delay)
    } else {
      self._fireChange(e)
    }
  },

  /**
   * 横竖屏事件回调
   * @method _onWinOrientationChange
   * @param {EventFacade} e 事件对象
   * @protected
   */
  _onWinOrientationChange: function (e) {
    if (e.type === RESIZE) {
      this._fireChange(e)
    } else {
      this._checkChange(e)
    }
  }

}

// 返回实例
export default Orientation.prototype.create()

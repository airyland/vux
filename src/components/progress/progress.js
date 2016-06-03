/**
 * https://github.com/lightningtgc/MProgress.js
 * MIT © gctang
 **/

/* MProgress  inspire from Material Design and NProgress...
 * @license MIT */
import Utils from './utils'

(function (root, factory) {
  // UMD
  if (typeof define === 'function' && define.amd) { // eslint-disable-line
    define(factory) // eslint-disable-line
  } else if (typeof exports === 'object') {
    module.exports = factory()
  } else {
    root.Mprogress = factory()
  }
})(typeof window !== 'undefined' ? window : this, function () {
  var SETTINGS = {
    template: 1,
    parent: 'body',
    start: false,

    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800
  }

  var TPL_UNKOWN_ID = '99'
  var SPEED_ANIMATION_SHOW = 500
  var SPEED_ANIMATION_HIDE = 1500
  var SELECTOR_BAR = '[role="mpbar"]'
  var SELECTOR_BUFFER = '[role="bufferBar"]'
  var SELECTOR_DASHED = '[role="dashed"]'

  var renderTemplate = {

    determinate: '<div class="deter-bar" role="mpbar1">' + '<div class="peg"></div>' + '</div>' + '<div class="bar-bg"></div>',

    buffer: '<div class="deter-bar" role="mpbar2">' + '<div class="peg"></div>' + '</div>' + '<div class="buffer-bg" role="bufferBar"></div>' + '<div class="mp-ui-dashed" role="dashed"></div>',

    indeterminate: '<div class="indeter-bar" role="mpbar3">' + '</div>' + '<div class="bar-bg"></div>',

    query: '<div class="query-bar" role="mpbar4">' + '<div class="peg"></div>' + '</div>' + '<div class="bar-bg"></div>'
  }

  var cacheStore = {}

  var Mprogress = function (opt) {
    var options = Utils.extend(opt, SETTINGS)
    var idName = options.parent + options.template
    var data = cacheStore[idName] || ''

    if (!data) {
      data = new MProgress(options)
      cacheStore[idName] = data
    }

    if (typeof opt === 'string' && typeof data[opt] === 'function') {
      // using like: Mprogress('start')
      data[opt]()
    } else if (options['start']) {
      data.start()
    }

    return data
  }

  var MProgress = function (options) {
    this.options = options || {}
    this.status = null // Last number
    this.bufferStatus = null
  }

  MProgress.prototype = {
    version: '0.1.0',
    constructor: MProgress,

    /**
     * Shows the progress bar.
     * This is the same as setting the status to 0%, except that it doesn't go backwards.
     *
     *     MProgress.start()
     *
     */
    start () {
      if (!this.status && !this._isBufferStyle()) this.set(0)

      /**
       * indeterminate and query just have 'start' and 'end' method
       */
      if (this._isIndeterminateStyle() || this._isQueryStyle()) {
        return this
      }

      var that = this
      // buffer show front dashed scroll
      if (this._isBufferStyle() && !this.bufferStatus) {
        var progress = this._render()
        var dashed = progress.querySelector(SELECTOR_DASHED)
        var bar = progress.querySelector(this._getCurrSelector())

        Utils.hideEl(bar)
        Utils.hideEl(dashed)
        this.setBuffer(0)// .setBuffer(0.9)

        setTimeout(function () {
          Utils.showEl(dashed)
          Utils.showEl(bar)

          that.set(0).setBuffer(0)
        }, SPEED_ANIMATION_SHOW)
      }

      function work () {
        if (that.stop) return
        setTimeout(function () {
          if (!that.status) return
          that._trickle()
          work()
        }, that.options.trickleSpeed)
      }

      if (this.options.trickle) work()

      return this
    },

    /**
     * Hides the progress bar.
     * This is the *sort of* the same as setting the status to 100%, with the
     * difference being `end()` makes some placebo effect of some realistic motion.
     *
     *     MProgress.end()
     *
     * If `true` is passed, it will show the progress bar even if its hidden.
     *
     *     MProgress.end(true)
     */
    end (force) {
      if (!force && !this.status) return this

      var that = this
      var speed = this.options.speed
      var progress = this._getRenderedId()

      if (this._isBufferStyle() && force) {
        return this.set(0).set(1)
      }

      if (this._isIndeterminateStyle()) {
        // force end
        if (!this._isRendered() && force) {
          this.set(0)
          progress = this._getRenderedId()
          speed = SPEED_ANIMATION_SHOW
        }
        // Fade out
        Utils.setcss(progress, {
          transition: 'none',
          opacity: 1
        })
        progress.offsetWidth /* Repaint */

        setTimeout(function () {
          Utils.setcss(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: 0
          })
          setTimeout(function () {
            that._remove()
          }, speed)
        }, speed)

        return this
      }

      if (this._isQueryStyle()) {
        // add one more animation and remove it
        if (this._isRendered()) {
          var bar = progress.querySelector(this._getCurrSelector())
          Utils.addClass(bar, 'end')

          setTimeout(function () {
            that._remove()
          }, SPEED_ANIMATION_HIDE)

          return this
        } else if (force) {
          this.set(0)
          progress = this._getRenderedId()
          setTimeout(function () {
            that._remove()
          }, SPEED_ANIMATION_HIDE)
          return this
        }
      }

      return this.inc(0.3 + 0.5 * Math.random()).set(1)
    },

    /**
     * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
     *
     *     MProgress.set(0.4)
     *     MProgress.set(1.0)
     */
    set (n) {
      n = Utils.clamp(n, this.options.minimum, 1)
      this.status = (n === 1 ? null : n)

      this._setProgress(this._getCurrSelector(), n)

      return this
    },

    setBuffer (n) {
      n = Utils.clamp(n, this.options.minimum, 1)
      this.bufferStatus = (n === 1 ? null : n)

      this._setProgress(SELECTOR_BUFFER, n)

      return this
    },

    /**
     * Increments by a random amount.
     */
    inc (amount) {
      var n = this.status
      var bn = this.bufferStatus

      if (!n) {
        return this.start()
      } else {
        n = this._getRandomNum(n, amount)
        if (this._isBufferStyle()) {
          bn = this._getRandomNum(bn > n ? bn : n + 0.1, amount)
          this.setBuffer(bn)
        }
        return this.set(n)
      }
    },

    _trickle () {
      return this.inc(Math.random() * this.options.trickleRate)
    },
    /**
     * (Internal) renders the progress bar markup based on the `template`
     *
     */
    _render (noFromStart) {
      if (this._isRendered()) {
        return this._getRenderedId()
      }

      var progress = document.createElement('div')
      var currTpl = this._getCurrTemplate() || ''
      var MParent = document.querySelector(this.options.parent)

      if (!MParent) {
        return
      }

      var fromStart

      progress.id = this._getRenderedId(true)
      progress.className = 'ui-mprogress'
      progress.innerHTML = currTpl

      if (!this._isIndeterminateStyle() && !this._isQueryStyle()) {
        // Default: fromstart
        if (!noFromStart) {
          fromStart = !this._isStarted()
        }

        var bar = progress.querySelector(this._getCurrSelector())
        var perc = fromStart ? '-100' : Utils.toBarPerc(this.status || 0)

        Utils.setcss(bar, {
          transition: 'all 0 linear',
          transform: 'translate3d(' + perc + '%,0,0)'
        })

        if (this._isBufferStyle()) {
          var buffer = progress.querySelector(SELECTOR_BUFFER)
          var bufferPerc = fromStart ? '-100' : Utils.toBarPerc(this.bufferStatus || 0)
          Utils.setcss(buffer, {
            transition: 'all 0 linear',
            transform: 'translate3d(' + bufferPerc + '%,0,0)'
          })
        }
      }

      if (MParent !== document.body) {
        Utils.addClass(MParent, 'mprogress-custom-parent')
      }
      MParent.appendChild(progress)
      return progress
    },

    /**
     * Removes the element. Opposite of _render().
     */
    _remove () {
      var progress = this._getRenderedId()
      var MParent = document.querySelector(this.options.parent)

      if (MParent !== document.body) {
        Utils.removeClass(MParent, 'mprogress-custom-parent')
      }

      // clear cache
      var idName = this.options.parent + this.options.template
      if (cacheStore[idName]) {
        cacheStore[idName] = null
      }

      if (progress) {
        this.status = null
        this.bufferStatus = null
        Utils.removeElement(progress)
      }
    },

    /**
     * interior method
     *
     */
    _setProgress (barSelector, n) {
      if (this.stop) {
        return
      }
      var progress = this._render()
      if (!progress) {
        return
      }
      var bar = progress.querySelector(barSelector)
      var speed = this.options.speed
      var ease = this.options.easing
      var that = this

      progress.offsetWidth /* Repaint */

      /**
       * indeterminate and query just has 'start' and 'end' method
       */

      if (this._isIndeterminateStyle() || this._isQueryStyle()) {
        return this
      }

      Utils.queue(function (next) {
        // Set positionUsing if it hasn't already been set
        if (that.options.positionUsing === '') that.options.positionUsing = that._getPositioningCSS()

        // Add transition
        Utils.setcss(bar, that._barPositionCSS(n, speed, ease))

        if (n === 1) {
          // Fade out
          Utils.setcss(progress, {
            transition: 'none',
            opacity: 1
          })
          progress.offsetWidth /* Repaint */

          that.timer = setTimeout(function () {
            Utils.setcss(progress, {
              transition: 'all ' + speed + 'ms linear',
              opacity: 0
            })
            that.timer = setTimeout(function () {
              that._remove()
              next()
            }, speed)
          }, speed)
        } else {
          that.timer = setTimeout(next, speed)
        }
      })
    },

    _getCurrSelector () {
      var tplType = this._getCurrTplId()

      if (tplType !== TPL_UNKOWN_ID) {
        return '[role="mpbar' + tplType + '"]'
      } else {
        return SELECTOR_BAR
      }
    },

    _isStarted () {
      return typeof this.status === 'number'
    },

    _getRandomNum (n, amount) {
      if (typeof amount !== 'number') {
        amount = (1 - n) * Utils.clamp(Math.random() * n, 0.1, 0.95)
      }

      n = Utils.clamp(n + amount, 0, 0.994)

      return n
    },

    /**
     * Checks if the progress bar is rendered.
     */
    _isRendered () {
      return !!this._getRenderedId()
    },

    _getRenderedId (getId) {
      var tplType = this._getCurrTplId()
      var idName = 'mprogress' + tplType

      if (!getId) {
        return document.getElementById(idName)
      } else {
        return idName
      }
    },

    _isBufferStyle () {
      return this._getCurrTplId() === 2
    },

    _isIndeterminateStyle () {
      return this._getCurrTplId() === 3
    },

    _isQueryStyle () {
      return this._getCurrTplId() === 4
    },

    _getCurrTplId () {
      var tplType = ~~this.options.template || 1
      if (typeof tplType === 'number') {
        return tplType
      } else {
        return TPL_UNKOWN_ID
      }
    },

    _getCurrTemplate () {
      var tplType = this.options.template || 1
      var tplNameArr = ['determinate', 'buffer', 'indeterminate', 'query']
      var tplKey

      if (typeof ~~tplType === 'number') {
        tplKey = tplNameArr[tplType - 1]
        return renderTemplate[tplKey] || ''
      }

      if (typeof tplType === 'string') {
        return tplType
      }
    },

    /**
     * Determine which positioning CSS rule to use.
     */
    _getPositioningCSS () {
      // Sniff on document.body.style
      var bodyStyle = document.body.style

      // Sniff prefixes
      var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit'
      : ('MozTransform' in bodyStyle) ? 'Moz'
      : ('msTransform' in bodyStyle) ? 'ms'
      : ('OTransform' in bodyStyle) ? 'O' : ''

      if (vendorPrefix + 'Perspective' in bodyStyle) {
        // Modern browsers with 3D support, e.g. Webkit, IE10
        return 'translate3d'
      } else if (vendorPrefix + 'Transform' in bodyStyle) {
        // Browsers without 3D support, e.g. IE9
        return 'translate'
      } else {
        // Browsers without translate() support, e.g. IE7-8
        return 'margin'
      }
    },

    /**
     * (Internal) returns the correct CSS for changing the bar's
     * position given an n percentage, and speed and ease from Settings
     */
    _barPositionCSS (n, speed, ease) {
      var barCSS

      if (this.options.positionUsing === 'translate3d') {
        barCSS = {
          transform: 'translate3d(' + Utils.toBarPerc(n) + '%,0,0)'
        }
      } else if (this.options.positionUsing === 'translate') {
        barCSS = {
          transform: 'translate(' + Utils.toBarPerc(n) + '%,0)'
        }
      } else {
        barCSS = {
          'margin-left': Utils.toBarPerc(n) + '%'
        }
      }

      barCSS.transition = 'all ' + speed + 'ms ' + ease

      return barCSS
    },

    destroy () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.stop = true
    }

  }
  /**
   * Waits for all supplied jQuery or Zepto promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQuery or Zepto Promise
   */
  ;(function () {
    var initial = 0
    var current = 0

    MProgress.prototype.promise = function ($promise) {
      if (!$promise || $promise.state() === 'resolved') {
        return this
      }

      var that = this

      if (current === 0) {
        that.start()
      }

      initial++
      current++

      $promise.always(function () {
        current--
        if (current === 0) {
          initial = 0
          that.end()
        } else {
          that.set((initial - current) / initial)
        }
      })

      return this
    }
  })()

  return Mprogress
})

const time = Date.now || function () {
  return +new Date()
}

let running = {}
let counter = 1
let desiredFrames = 60
let millisecondsPerSecond = 1000

export default {

  // A requestAnimationFrame wrapper / polyfill.
  requestAnimationFrame: (function () {
    var requestFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
    return function (callback, root) {
      requestFrame(callback, root)
    }
  })(),

  // Stops the given animation.
  stop: function (id) {
    var cleared = running[id] != null
    if (cleared) {
      running[id] = null
    }
    return cleared
  },

  // Whether the given animation is still running.
  isRunning: function (id) {
    return running[id] != null
  },

  // Start the animation.
  start: function (stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
    var _this = this
    var start = time()
    var lastFrame = start
    var percent = 0
    var dropCounter = 0
    var id = counter++

    if (!root) {
      root = document.body
    }

    // Compacting running db automatically every few new animations
    if (id % 20 === 0) {
      var newRunning = {}
      for (var usedId in running) {
        newRunning[usedId] = true
      }
      running = newRunning
    }

    // This is the internal step method which is called every few milliseconds
    var step = function (virtual) {
      // Normalize virtual value
      var render = virtual !== true
      // Get current time
      var now = time()

      // Verification is executed before next animation step
      if (!running[id] || (verifyCallback && !verifyCallback(id))) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, false)
        return
      }

      // For the current rendering to apply let's update omitted steps in memory.
      // This is important to bring internal state variables up-to-date with progress in time.
      if (render) {
        var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1
        for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
          step(true)
          dropCounter++
        }
      }

      // Compute percent value
      if (duration) {
        percent = (now - start) / duration
        if (percent > 1) {
          percent = 1
        }
      }

      // Execute step callback, then...
      var value = easingMethod ? easingMethod(percent) : percent
      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
        running[id] = null
        completedCallback && completedCallback(desiredFrames - (dropCounter / ((now - start) / millisecondsPerSecond)), id, percent === 1 || duration == null)
      } else if (render) {
        lastFrame = now
        _this.requestAnimationFrame(step, root)
      }
    }

    // Mark as running
    running[id] = true
    // Init first step
    _this.requestAnimationFrame(step, root)
    // Return unique animation ID
    return id
  }
}

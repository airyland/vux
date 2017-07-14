/* Image Blur plugin, author @msurguy

 Usage:

 Create a set of elements that follows the following HTML structure:

 <div class="container">
   <div class="content">
   ...
   </div>
 </div>

 Add the following css:

 .container {
   overflow: hidden
   width: 100%
   position: relative
 }

 .container .bg-blur-overlay {
   z-index: -1
   position: absolute
   width: 100%
   height: 100%
   background-image: url('data:image/svg+xmlbase64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSI0NiUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4wOCIvPjxzdG9wIG9mZnNldD0iNTklIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMDgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC45Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g')
   background-size: 100%
   background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(46%, rgba(0, 0, 0, 0.08)), color-stop(59%, rgba(0, 0, 0, 0.08)), color-stop(100%, rgba(0, 0, 0, 0.9)))
   background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.08) 46%, rgba(0, 0, 0, 0.08) 59%, rgba(0, 0, 0, 0.9) 100%)
   background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.08) 46%, rgba(0, 0, 0, 0.08) 59%, rgba(0, 0, 0, 0.9) 100%)
   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 46%, rgba(0, 0, 0, 0.08) 59%, rgba(0, 0, 0, 0.9) 100%)
 }

 .container .bg-blur {
   z-index: -2
   opacity: 0
   position: absolute
   width: 100%
   min-height: 100%
   height: auto
   display: block
   top: 0
   left: 0
 }

 .container .content {
  z-index: 1
 }

 */

import Eventor from '../../libs/eventor'

// Random ID generator
var randomID = function () {
  return '_' + Math.random().toString(36).substr(2, 9)
}

// micro lib that creates SVG elements and adds attributes to it
var SVG = {

  // namespaces
  svgns: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',

  // creating of SVG element
  createElement (name, attrs) {
    var element = document.createElementNS(SVG.svgns, name)

    if (attrs) {
      SVG.setAttr(element, attrs)
    }
    return element
  },

  // setting attributes
  setAttr (element, attrs) {
    for (var i in attrs) {
      if (i === 'href') { // path of an image should be stored as xlink:href attribute
        element.setAttributeNS(SVG.xlink, i, attrs[i])
      } else { // other common attribute
        element.setAttribute(i, attrs[i])
      }
    }
    return element
  }
}

// backgroundBlur PUBLIC CLASS DEFINITION
// ================================

var Blur = function (element, options) {
  this.internalID = randomID()
  this.element = element
  this.width = element.offsetWidth
  this.height = element.offsetHeight
  this.element = element
  this.parent = this.element.parentNode
  this.options = Object.assign({}, Blur.DEFAULTS, options)
  this.overlayEl = this.createOverlay()
  this.blurredImage = null
  this.attachListeners()
  this.generateBlurredImage(this.options.url)
}

Blur.VERSION = '0.0.1'

Eventor.mixTo(Blur)

Blur.DEFAULTS = {
  url: '', // URL to the image
  blurAmount: 10, // Amount of blurrines
  imageClass: '', // CSS class that will be applied to the image and to the SVG element,
  overlayClass: '', // CSS class of the element that will overlay the blur image
  duration: false, // If the image needs to be faded in, how long should that take
  opacity: 1 // Specify the final opacity
}

Blur.prototype.setBlurAmount = function (blurAmount) {
  this.options.blurAmount = blurAmount
}

Blur.prototype.attachListeners = function () {
  this.on('ui.blur.loaded', this.fadeIn.bind(this))
  this.on('ui.blur.unload', this.fadeOut.bind(this))
}

Blur.prototype.fadeIn = function () {
}

Blur.prototype.fadeOut = function () {
}

Blur.prototype.generateBlurredImage = function (url) {
  const previousImage = this.blurredImage
  this.internalID = randomID()

  if (previousImage) {
    previousImage.parentNode.removeChild(previousImage)
  }

  this.blurredImage = this.createSVG(url, this.width, this.height)
}

Blur.prototype.createOverlay = function () {
  if (this.options.overlayClass && this.options.overlayClass !== '') {
    const div = document.createElement('div')
    div.classList.add(this.options.overlayClass)
    this.parent.insertBefore(div, this.element)
    return div
  }

  return false
}

Blur.prototype.createSVG = function (url, width, height) {
  var that = this
  var svg = SVG.createElement('svg', { // our SVG element
    xmlns: SVG.svgns,
    version: '1.1',
    width: width,
    height: height,
    id: 'blurred' + this.internalID,
    'class': this.options.imageClass,
    viewBox: '0 0 ' + width + ' ' + height,
    preserveAspectRatio: 'none'
  })

  var filterId = 'blur' + this.internalID // id of the filter that is called by image element
  var filter = SVG.createElement('filter', { // filter
    id: filterId
  })

  var gaussianBlur = SVG.createElement('feGaussianBlur', { // gaussian blur element
    'in': 'SourceGraphic', // "in" is keyword. Opera generates an error if we don't put quotes
    stdDeviation: this.options.blurAmount // intensity of blur
  })

  var image = SVG.createElement('image', { // The image that uses the filter of blur
    x: 0,
    y: 0,
    width: width,
    height: height,
    'externalResourcesRequired': 'true',
    href: url,
    style: 'filter:url(#' + filterId + ')', // filter link
    preserveAspectRatio: 'none'
  })

  image.addEventListener('load', function () {
    that.emit('ui.blur.loaded')
  }, true)

  image.addEventListener('SVGLoad', function () {
    that.emit('ui.blur.loaded')
  }, true)

  filter.appendChild(gaussianBlur) // adding the element of blur into the element of filter
  svg.appendChild(filter) // adding the filter into the SVG
  svg.appendChild(image) // adding an element of an image into the SVG

  // Ensure that the image is shown after duration + 100 msec in case the SVG load event didn't fire or took too long
  if (that.options.duration && that.options.duration > 0) {
    svg.style.opacity = 0
    window.setTimeout(function () {
      if (getStyle(svg, 'opacity') === '0') {
        svg.style.opacity = 1
      }
    }, this.options.duration + 100)
  }
  this.element.insertBefore(svg, this.element.firstChild)
  return svg
}

Blur.prototype.createIMG = function (url, width, height) {
  var that = this
  var originalImage = this.prependImage(url)
  var newBlurAmount = ((this.options.blurAmount * 2) > 100) ? 100 : (this.options.blurAmount * 2)
  // apply special CSS attributes to the image to blur it
  const styles = {
    // filter property here the intensity of blur multipied by two is around equal to the intensity in common browsers.
    filter: 'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + newBlurAmount + ') ',
    // aligning of the blurred image by vertical and horizontal
    top: -this.options.blurAmount * 2.5,
    left: -this.options.blurAmount * 2.5,
    width: width + (this.options.blurAmount * 2.5),
    height: height + (this.options.blurAmount * 2.5)
  }
  for (var i in styles) {
    originalImage.style[i] = styles[i]
  }
  originalImage.setAttribute('id', this.internalID)

  originalImage.onload = function () {
    that.trigger('ui.blur.loaded')
  }
  // Ensure that the image is shown after duration + 100 msec in case the image load event didn't fire or took too long
  if (this.options.duration && this.options.duration > 0) {
    window.setTimeout(function () {
      if (getStyle(originalImage, 'opacity') === '0') {
        originalImage.style.opacity = 1
      }
    }, this.options.duration + 100)
  }
  return originalImage
}

Blur.prototype.prependImage = function (url) {
  const img = document.createElement('img')
  img.url = url
  img.setAttribute('id', this.internalID)
  img.classList.add(this.options.imageClass)
  if (this.overlayEl) {
    this.parent.insertBefore(img, this.overlayEl)
  } else {
    this.parent.insertBefore(img, this.parent.firstChild)
  }
  return img
}

export default Blur

function getStyle (ele, prop) {
  return window.getComputedStyle(ele, null).getPropertyValue(prop)
}

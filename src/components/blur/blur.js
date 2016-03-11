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
   overflow: hidden;
   width: 100%;
   position: relative;
 }

 .container .bg-blur-overlay {
   z-index: -1;
   position: absolute;
   width: 100%;
   height: 100%;
   background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4gPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkIiBncmFkaWVudFVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgeDE9IjAuNSIgeTE9IjAuMCIgeDI9IjAuNSIgeTI9IjEuMCI+PHN0b3Agb2Zmc2V0PSI0NiUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4wOCIvPjxzdG9wIG9mZnNldD0iNTklIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMDgiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC45Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmFkKSIgLz48L3N2Zz4g');
   background-size: 100%;
   background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(46%, rgba(0, 0, 0, 0.08)), color-stop(59%, rgba(0, 0, 0, 0.08)), color-stop(100%, rgba(0, 0, 0, 0.9)));
   background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0.08) 46%, rgba(0, 0, 0, 0.08) 59%, rgba(0, 0, 0, 0.9) 100%);
   background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.08) 46%, rgba(0, 0, 0, 0.08) 59%, rgba(0, 0, 0, 0.9) 100%);
   background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 46%, rgba(0, 0, 0, 0.08) 59%, rgba(0, 0, 0, 0.9) 100%);
 }

 .container .bg-blur {
   z-index: -2;
   opacity: 0;
   position: absolute;
   width: 100%;
   min-height: 100%;
   height: auto;
   display: block;
   top: 0;
   left: 0;
 }

 .container .content {
  z-index: 1;
 }

 Call the plugin on the container element to add a blurred background to it:

 $('.container').backgroundBlur({
   url : 'http://website.com/images/img.jpg', // URL to the image that will be used for blurring
   blurAmount : 10, // Amount of blurrines
   imageClass : 'bg-blur', // CSS class that will be applied to the image and to the SVG element,
   overlayClass : 'bg-blur-overlay', // CSS class of an element that will overlay the blur background (useful for additional effects)
   duration : 1000, // If the image needs to be faded in, how long that should take
   endOpacity : 0.6 // Specify the final opacity that the image will have
 });

 Available methods of the plugin are :

 $('.container').backgroundBlur('string'); // swap the image to another image while using initial settings for animation
 $('.container').backgroundBlur('fadeIn'); // fade in
 $('.container').backgroundBlur('fadeOut'); // fade out

 */

// IE version detection

// Random ID generator
var randomID = function() {
  return '_' + Math.random().toString(36).substr(2, 9);
};

//micro lib that creates SVG elements and adds attributes to it
var SVG = {

  //namespaces
  svgns: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',

  //creating of SVG element
  createElement: function(name, attrs) {
    var element = document.createElementNS(SVG.svgns, name);

    if (attrs) {
      SVG.setAttr(element, attrs);
    }
    return element;
  },

  //setting attributes
  setAttr: function(element, attrs) {
    for (var i in attrs) {
      if (i === 'href') { //path of an image should be stored as xlink:href attribute
        element.setAttributeNS(SVG.xlink, i, attrs[i]);
      } else { //other common attribute
        element.setAttribute(i, attrs[i]);
      }
    }
    return element;
  }
};

// backgroundBlur PUBLIC CLASS DEFINITION
// ================================

var Blur = function(element, options) {
  this.internalID = randomID();
  this.$element = $(element);
  this.$width = this.$element.width();
  this.$height = this.$element.height();
  this.element = element;
  this.options = $.extend({}, Blur.DEFAULTS, options);
  this.$overlayEl = this.createOverlay();
  this.$blurredImage = [];
  this.attachListeners();
  this.generateBlurredImage(this.options.url);
};

Blur.VERSION = '0.0.1';

Blur.DEFAULTS = {
  url: '', // URL to the image
  blurAmount: 10, // Amount of blurrines
  imageClass: '', // CSS class that will be applied to the image and to the SVG element,
  overlayClass: '', // CSS class of the element that will overlay the blur image
  duration: false, // If the image needs to be faded in, how long should that take
  opacity: 1 // Specify the final opacity
};

Blur.prototype.setBlurAmount = function(blurAmount) {
  this.options.blurAmount = blurAmount
}

Blur.prototype.attachListeners = function() {
  this.$element.on('ui.blur.loaded', $.proxy(this.fadeIn, this));
  this.$element.on('ui.blur.unload', $.proxy(this.fadeOut, this));
};

Blur.prototype.fadeIn = function() {
  if (this.options.duration && this.options.duration > 0) {
    this.$blurredImage
      .animate({
        opacity: this.options.opacity
      }, {
        duration: this.options.duration
      });
  }
};

Blur.prototype.fadeOut = function() {
  if (this.options.duration && this.options.duration > 0) {
    this.$blurredImage
      .animate({
        opacity: 0
      }, {
        duration: this.options.duration
      });
  } else {
    this.$blurredImage.css({
      'opacity': 0
    });
  }
};

Blur.prototype.generateBlurredImage = function(url) {
  var $previousImage = this.$blurredImage;
  this.internalID = randomID();

  if ($previousImage.length > 0) {
    $previousImage.remove();
  }
  this.$blurredImage = this.createSVG(url, this.$width, this.$height);
};

Blur.prototype.createOverlay = function() {
  if (this.options.overlayClass && this.options.overlayClass !== '') {
    return $('<div></div>').prependTo(this.$element).addClass(this.options.overlayClass);
  }

  return false;
};

Blur.prototype.createSVG = function(url, width, height) {
  var that = this;
  var svg = SVG.createElement('svg', { //our SVG element
    xmlns: SVG.svgns,
    version: '1.1',
    width: width,
    height: height,
    id: 'blurred' + this.internalID,
    'class': this.options.imageClass,
    viewBox: '0 0 ' + width + ' ' + height,
    preserveAspectRatio: 'none'
  });

  var filterId = 'blur' + this.internalID; //id of the filter that is called by image element
  var filter = SVG.createElement('filter', { //filter
    id: filterId
  });

  var gaussianBlur = SVG.createElement('feGaussianBlur', { // gaussian blur element
    'in': 'SourceGraphic', //"in" is keyword. Opera generates an error if we don't put quotes
    stdDeviation: this.options.blurAmount // intensity of blur
  });

  var image = SVG.createElement('image', { //The image that uses the filter of blur
    x: 0,
    y: 0,
    width: width,
    height: height,
    'externalResourcesRequired': 'true',
    href: url,
    style: 'filter:url(#' + filterId + ')', //filter link
    preserveAspectRatio: 'none'
  });

  image.addEventListener('load', function() {
    that.$element.trigger('ui.blur.loaded');
  }, true);

  image.addEventListener('SVGLoad', function() {
    that.$element.trigger('ui.blur.loaded');
  }, true);

  filter.appendChild(gaussianBlur); //adding the element of blur into the element of filter
  svg.appendChild(filter); //adding the filter into the SVG
  svg.appendChild(image); //adding an element of an image into the SVG
  var $svg = $(svg);

  // Ensure that the image is shown after duration + 100 msec in case the SVG load event didn't fire or took too long
  if (that.options.duration && that.options.duration > 0) {
    $svg.css({
      opacity: 0
    });
    window.setTimeout(function() {
      if ($svg.css('opacity') === '0') {
        $svg.css({
          opacity: 1
        });
      }
    }, this.options.duration + 100);
  }
  this.element.insertBefore(svg, this.element.firstChild);
  return $svg;
};

Blur.prototype.createIMG = function(url, width, height) {
  var that = this;
  var $originalImage = this.prependImage(url);
  var newBlurAmount = ((this.options.blurAmount * 2) > 100) ? 100 : (this.options.blurAmount * 2);
  // apply special CSS attributes to the image to blur it
  $originalImage.css({
      //filter property; here the intensity of blur multipied by two is around equal to the intensity in common browsers.
      filter: 'progid:DXImageTransform.Microsoft.Blur(pixelradius=' + newBlurAmount + ') ',
      //aligning of the blurred image by vertical and horizontal
      top: -this.options.blurAmount * 2.5,
      left: -this.options.blurAmount * 2.5,
      width: width + (this.options.blurAmount * 2.5),
      height: height + (this.options.blurAmount * 2.5)
    })
    .attr('id', 'blurred' + this.internalID);

  $originalImage.load(function() {
    that.$element.trigger('ui.blur.loaded');
  });

  // Ensure that the image is shown after duration + 100 msec in case the image load event didn't fire or took too long
  if (this.options.duration && this.options.duration > 0) {
    window.setTimeout(function() {
      if ($originalImage.css('opacity') === '0') {
        $originalImage.css({
          opacity: 1
        });
      }
    }, this.options.duration + 100);
  }
  return $originalImage;
};

Blur.prototype.prependImage = function(url) {
  var $image;
  var $imageEl = $('<img src="' + url + '" />');
  if (this.$overlayEl) {
    $image = $imageEl.insertBefore(this.$overlayEl).attr('id', this.internalID).addClass(this.options.imageClass);
  } else {
    $image = $imageEl.prependTo(this.$element).attr('id', this.internalID).addClass(this.options.imageClass);
  }

  return $image;
};

export default Blur
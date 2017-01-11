/*
 *
 * zy.media.js
 * HTML5 <video> and <audio> native player
 *
 * Copyright 2016, iReader FE(掌阅书城研发--前端组)
 * License: MIT
 * 
 */
;


var zyMedia = {};


// Default config
zyMedia.config = {
	// Overrides the type specified, for dynamic instantiation
	type: '',
	// Set media title
	mediaTitle: '',
	// Force native controls
	nativeControls: false,
	// Autoplay
	autoplay: false,
	// Preload, not 'auto', in native app of xiaomi HM 1SW,
	// the images does not synchronize with sound of video which is cross-domain
	preload: 'none',
	// Video width
	videoWidth: '100%',
	// Video height
	videoHeight: 'auto',
	// Aspect ration 16:9
	aspectRation: (16 / 9),
	// Audio width
	audioWidth: '100%',
	// Audio height
	audioHeight: 44,
	// AutoLoop, true for infinite loop, false for rewind to beginning when media ends
	autoLoop: false,
	// Time format to show. Default 1 for 'mm:ss', 2 for 'm:s'
	timeFormatType: 1,
	// Forces the hour marker (##:00:00)
	alwaysShowHours: false,
	// Hide controls when playing and mouse is not over the video
	alwaysShowControls: false,
	// Display the video control
	hideVideoControlsOnLoad: false,
	// Show fullscreen button
	enableFullscreen: true,
	// When this player starts, it will pause other players
	pauseOtherPlayers: true,
	// Media duration
	duration: 0,
	// Sucess callback
	success: null,
	// Error callback
	error: null
};


// Feature detect
(function(t) {
	var ua = window.navigator.userAgent.toLowerCase();
	var v = document.createElement('video');

	t.isiOS = /iphone|ipod|ipad/i.test(ua) && !window.MSStream;
	t.isAndroid = /android/i.test(ua) && !window.MSStream;
	t.isBustedAndroid = /android 2\.[12]/i.test(ua);
	t.isChromium = /chromium/i.test(ua);

	t.hasTouch = 'ontouchstart' in window;
	t.supportsCanPlayType = typeof v.canPlayType !== 'undefined';

	// Vendor for no big Play button
	t.isVendorBigPlay = /iphone/i.test(ua) && !window.MSStream;
	// Vendor for no controls bar
	t.isVendorControls = /baidu/i.test(ua);
	// Vendor and app for fullscreen button
	t.isVendorFullscreen = /micromessenger|weibo/i.test(ua);
	// Vendor for autoplay be disabled, iOS device and 昂达
	t.isVendorAutoplay = /v819mini/i.test(ua) || t.isiOS;
	// Prefix of current working browser

	t.nativeFullscreenPrefix = (function() {
		if (v.requestFullScreen) {
			return '';
		} else if (v.webkitRequestFullScreen) {
			return 'webkit'
		} else if (v.mozRequestFullScreen) {
			return 'moz'
		} else if (v.msRequestFullScreen) {
			return 'ms'
		}
		return '-'
	})();

	// None-standard
	t.hasOldNativeFullScreen = (t.nativeFullscreenPrefix == '-') && v.webkitEnterFullscreen;

	// OS X 10.5 can't do this even if it says it can
	if (t.hasOldNativeFullScreen && /mac os x 10_5/i.test(ua)) {
		t.nativeFullscreenPrefix = '-';
		t.hasOldNativeFullScreen = false
	}
})(zyMedia.features = {});


// Get style
function _css(el, property) {
	return parseInt(el.style[property] || window.getComputedStyle(el, null).getPropertyValue(property))
}

// Has Class
function _hasClass(el, token) {
	return new RegExp('(\\s|^)' + token + '(\\s|$)').test(el.className)
}

// Add class
function _addClass(el, token) {
	if (el.classList) {
		el.classList.add(token)
	} else if (!_hasClass(el, token)) {
		el.className += '' + token
	}
}

// Remove class
function _removeClass(el, token) {
	if (el.classList) {
		el.classList.remove(token)
	} else if (_hasClass(el, token)) {
		el.className = el.className.replace(new RegExp('(\\s|^)' + token + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '')
	}
}

// Get time format
function timeFormat(time, options) {
	// Video's duration is Infinity in GiONEE(金立) device
	if (!isFinite(time) || time < 0) {
		time = 0;
	}
	// Get hours
	var _time = options.alwaysShowHours ? [0] : [];
	if (Math.floor(time / 3600) % 24) {
		_time.push(Math.floor(time / 3600) % 24)
	}
	// Get minutes
	_time.push(Math.floor(time / 60) % 60);
	// Get seconds
	_time.push(Math.floor(time % 60));
	_time = _time.join(':');
	// Fill '0'
	if (options.timeFormatType == 1) {
		_time = _time.replace(/(:|^)([0-9])(?=:|$)/g, '$10$2')
	}

	return _time
};

// Report whether or not the document in fullscreen mode
function isInFullScreenMode() {
	return document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen
}

// Get media type from file extension
function getTypeFromFileExtension(url) {
	url = url.toLowerCase().split('?')[0];
	var _ext = url.substring(url.lastIndexOf('.') + 1);
	var _av = /mp4|m4v|ogg|ogv|m3u8|webm|webmv|wmv|mpeg|mov/gi.test(_ext) ? 'video/' : 'audio/';

	switch (_ext) {
		case 'mp4':
		case 'm4v':
		case 'm4a':
			return _av + 'mp4';
		case 'webm':
		case 'webma':
		case 'webmv':
			return _av + 'webm';
		case 'ogg':
		case 'oga':
		case 'ogv':
			return _av + 'ogg';
		case 'm3u8':
			return 'application/x-mpegurl';
		case 'ts':
			return _av + 'mp2t';
		default:
			return _av + _ext;
	}
}

// Get media type
function getType(url, type) {
	// If no type is specified, try to get from the extension
	if (url && !type) {
		return getTypeFromFileExtension(url)
	} else {
		// Only return the mime part of the type in case the attribute contains the codec
		// see http://www.whatwg.org/specs/web-apps/current-work/multipage/video.html#the-source-element
		// `video/mp4; codecs="avc1.42E01E, mp4a.40.2"` becomes `video/mp4`
		if (type && ~type.indexOf(';')) {
			return type.substr(0, type.indexOf(';'))
		} else {
			return type
		}
	}
}

// Detect if current type is supported  
function detectType(media, options, src) {
	var mediaFiles = [];
	var i;
	var n;
	var isCanPlay;

	// Get URL and type
	if (options.type) {
		// Accept either string or array of types
		if (typeof options.type == 'string') {
			mediaFiles.push({
				type: options.type,
				url: src
			});
		} else {
			for (i = 0; i < options.type.length; i++) {
				mediaFiles.push({
					type: options.type[i],
					url: src
				});
			}
		}
	} else if (src !== null) {
		// If src attribute
		mediaFiles.push({
			type: getType(src, media.getAttribute('type')),
			url: src
		});
	} else {
		// If <source> elements
		for (i = 0; i < media.children.length; i++) {
			n = media.children[i];

			if (n.nodeType == 1 && n.tagName.toLowerCase() == 'source') {
				src = n.getAttribute('src');
				mediaFiles.push({
					type: getType(src, n.getAttribute('type')),
					url: src
				});
			}
		}
	}

	// For Android which doesn't implement the canPlayType function (always returns '')
	if (zyMedia.features.isBustedAndroid) {
		media.canPlayType = function(type) {
			return /video\/(mp4|m4v)/i.test(type) ? 'maybe' : ''
		};
	}
	// For Chromium to specify natively supported video codecs (i.e. WebM and Theora) 
	if (zyMedia.features.isChromium) {
		media.canPlayType = function(type) {
			return /video\/(webm|ogv|ogg)/i.test(type) ? 'maybe' : ''
		};
	}

	if (zyMedia.features.supportsCanPlayType) {
		for (i = 0; i < mediaFiles.length; i++) {
			// Normal detect
			if (mediaFiles[i].type == "video/m3u8" || media.canPlayType(mediaFiles[i].type).replace(/no/, '') !== ''
				// For Mac/Safari 5.0.3 which answers '' to canPlayType('audio/mp3') but 'maybe' to canPlayType('audio/mpeg')
				|| media.canPlayType(mediaFiles[i].type.replace(/mp3/, 'mpeg')).replace(/no/, '') !== ''
				// For m4a supported by detecting mp4 support
				|| media.canPlayType(mediaFiles[i].type.replace(/m4a/, 'mp4')).replace(/no/, '') !== '') {
				isCanPlay = true;
				break
			}
		}
	}

	return isCanPlay
};

// Mediaplayer instance No
var zymIndex = 0;
// Store Mediaplayer instance
zyMedia.players = {};


// Constructor, MediaPlayer
zyMedia.MediaPlayer = function(media, option) {
	var t = this;
	var i;

	// Make sure it can't be instantiated again
	if (media.isInstantiated) {
		return
	} else {
		media.isInstantiated = true
	}

	t.media = media;

	// Detect video or audio
	var _tagName = t.media.tagName.toLowerCase();
	if (!/audio|video/.test(_tagName)) return;

	t.isVideo = _tagName === 'video';

	// Extend options
	t.options = {};
	for (i in zyMedia.config) {
		t.options[i] = zyMedia.config[i]
	}

	try {
		for (i in option) {
			t.options[i] = option[i]
		}
		// Data-config has the highest priority
		var config = JSON.parse(t.media.getAttribute('data-config'));
		for (i in config) {
			t.options[i] = config[i]
		}
	} catch (exp) {}

	// Autoplay be disabled
	if (t.options.autoplay) {
		t.options.autoplay = !zyMedia.features.isVendorAutoplay
	}

	if (!t.isVideo) {
		t.options.alwaysShowControls = true
	}

	if (t.options.nativeControls || zyMedia.features.isVendorControls) {
		// Use native controls
		t.media.setAttribute('controls', 'controls')
	} else {
		var src = t.media.getAttribute('src');
		src = src === '' ? null : src;

		if (detectType(t.media, t.options, src)) {
			// Unique ID
			t.id = 'zym_' + zymIndex++;
			zyMedia.players[t.id] = t;
			t.init()
		} else {
			alert('不支持此' + (t.isVideo ? '视' : '音') + '频')
		}
	}
};


zyMedia.MediaPlayer.prototype = {

	isControlsVisible: true,
	isFullScreen: false,

	setPlayerSize: function(width, height) {
		var t = this;
		var _W = _css(t.container, 'width');
		// The width is not more than container width
		if (width > _W) {
			t.width = _W
		}

		// Set height for video
		if (t.enableAutoSize) {
			var nativeWidth = t.media.videoWidth;
			var nativeHeight = t.media.videoHeight;
			// Uniform scale
			if (nativeWidth && nativeHeight) {
				if (Math.abs(t.options.aspectRation - nativeWidth / nativeHeight) < .1) {
					t.options.aspectRation = nativeWidth / nativeHeight
				}
			}

			t.height = parseInt(_W / t.options.aspectRation)
		}

		t.container.style.width = t.width + 'px';
		t.media.style.height = t.container.style.height = t.height + 'px'
	},

	showControls: function() {
		var t = this;

		if (t.isControlsVisible)
			return;

		t.controls.style.bottom = 0;

		if (t.options.mediaTitle) {
			t.title.style.top = 0
		}

		t.isControlsVisible = true;
	},

	hideControls: function() {
		var t = this;

		if (!t.isControlsVisible || t.options.alwaysShowControls)
			return;

		t.controls.style.bottom = '-45px';

		if (t.options.mediaTitle) {
			t.title.style.top = '-35px'
		}

		t.isControlsVisible = false
	},

	setControlsTimer: function(timeout) {
		var t = this;
		clearTimeout(t.controlsTimer);

		t.controlsTimer = setTimeout(function() {
			t.hideControls()
		}, timeout);
	},

	updateTimeline: function(e) {
		var t = this;
		var el = (e !== undefined) ? e.target : t.media;
		var percent = null;
		var _W = _css(t.slider, 'width');

		// Support buffered
		if (el.buffered && el.buffered.length > 0 && el.buffered.end && el.duration) {
			percent = el.buffered.end(el.buffered.length - 1) / el.duration
		}
		// Support bufferedBytes
		else if (el.bytesTotal !== undefined && el.bytesTotal > 0 && el.bufferedBytes !== undefined) {
			percent = el.bufferedBytes / el.bytesTotal
		}
		// Support progressEvent.lengthComputable
		else if (e && e.lengthComputable && e.total !== 0) {
			percent = e.loaded / e.total
		}

		// Update the timeline
		if (percent !== null) {
			percent = Math.min(1, Math.max(0, percent));
			t.loaded.style.width = _W * percent + 'px';
			// Adjust when pause change from playing (魅族)
			if(t.media.paused) {
				setTimeout(function() {
					t.loaded.style.width = _W * percent + 'px';
					t.updateTimeline()
				}, 300)
			};
		}

		if (t.media.currentTime !== undefined && t.media.duration) {
			// Update bar and handle
			var _w = Math.round(_W * t.media.currentTime / t.media.duration);
			t.current.style.width = _w + 'px';
			t.handle.style.left = _w - Math.round(_css(t.handle, 'width') / 2) + 'px'
		}
	},

	updateTime: function() {
		var t = this;
		t.currentTime.innerHTML = timeFormat(t.media.currentTime, t.options);

		// Duration is 1 in (读者) device
		if (t.options.duration > 1 || t.media.duration > 1) {
			t.durationDuration.innerHTML = timeFormat(t.options.duration > 1 ? t.options.duration : t.media.duration, t.options)
		}
	},

	enterFullScreen: function() {
		var t = this;
		// Store size
		t.normalHeight = _css(t.container, 'height');
		t.normalWidth = _css(t.container, 'width');

		// Attempt to do true fullscreen
		if (zyMedia.features.nativeFullscreenPrefix != '-') {
			t.container[zyMedia.features.nativeFullscreenPrefix + 'RequestFullScreen']()
		} else if (zyMedia.features.hasOldNativeFullScreen) {
			t.media.webkitEnterFullscreen();
			return
		}

		// Set it to not show scroll bars so 100% will work
		_addClass(document.documentElement, 'zy_fullscreen');

		// Make full size
		t.media.style.width = t.container.style.width = '100%';
		t.media.style.height = t.container.style.height = '100%';
		_addClass(t.fullscreenBtn, 'zy_unfullscreen');
		t.isFullScreen = true
	},

	exitFullScreen: function() {
		var t = this;
		// Come out of native fullscreen
		if (isInFullScreenMode() || t.isFullScreen) {
			if (zyMedia.features.nativeFullscreenPrefix != '-') {
				document[zyMedia.features.nativeFullscreenPrefix + 'CancelFullScreen']()
			} else if (zyMedia.features.hasOldNativeFullScreen) {
				document.webkitExitFullscreen()
			}
		}
		_removeClass(document.documentElement, 'zy_fullscreen');
		t.media.style.width = t.container.style.width = t.normalWidth + 'px';
		t.media.style.height = t.container.style.height = t.normalHeight + 'px';
		_removeClass(t.fullscreenBtn, 'zy_unfullscreen');
		t.isFullScreen = false
	},

	// Media container
	buildContainer: function() {
		var t = this;

		t.container = t.media.parentNode;
		t.container.style.overflow = 'hidden';
		// Preset container's height by aspectRation
		t.container.style.height = (t.isVideo ? _css(t.container, 'width') / t.options.aspectRation : t.options.audioHeight) + 'px';
		t.container.innerHTML = '<div class="zy_wrap"></div><div class="zy_controls"></div>' +
			(t.options.mediaTitle ? '<div class="zy_title">' + t.options.mediaTitle + '</div>' : '');

		t.title = t.container.querySelector('.zy_title');

		t.media.setAttribute('preload', t.options.preload);
		t.container.querySelector('.zy_wrap').appendChild(t.media);
		t.controls = t.container.querySelector('.zy_controls');

		if (t.isVideo) {
			t.width = t.options.videoWidth;
			t.height = t.options.videoHeight;

			if (t.width == '100%' && t.height == 'auto') {
				t.enableAutoSize = true
			}
			t.setPlayerSize(t.width, t.height)
		}
	},

	// Play/pause button
	buildPlaypause: function() {
		var t = this;
		var play = document.createElement('div');
		play.className = 'zy_playpause_btn zy_play';
		t.controls.appendChild(play);
		play.addEventListener('click', function() {
			t.media.isUserClick = true;

			if (t.media.paused) {
				t.media.play();
				// Controls bar auto hide after 3s
				if (!t.media.paused && !t.options.alwaysShowControls) {
					t.setControlsTimer(3000)
				}
			} else {
				t.media.pause()
			}
		});

		function togglePlayPause(s) {
			if (t.media.isUserClick || t.options.autoplay) {
				if ('play' === s) {
					_removeClass(play, 'zy_play');
					_addClass(play, 'zy_pause')
				} else {
					_removeClass(play, 'zy_pause');
					_addClass(play, 'zy_play')
				}
			}
		};

		t.media.addEventListener('play', function() {
			togglePlayPause('play')
		});

		t.media.addEventListener('playing', function() {
			togglePlayPause('play')
		});

		t.media.addEventListener('pause', function() {
			togglePlayPause('pse')
		});

		t.media.addEventListener('paused', function() {
			togglePlayPause('pse')
		});
	},

	// Timeline
	buildTimeline: function() {
		var t = this;
		var timeline = document.createElement('div');
		timeline.className = 'zy_timeline';
		timeline.innerHTML = '<div class="zy_timeline_slider">' +
			'<div class="zy_timeline_buffering" style="display:none"></div>' +
			'<div class="zy_timeline_loaded"></div>' +
			'<div class="zy_timeline_current"></div>' +
			'<div class="zy_timeline_handle"></div>' +
			'</div>';
		t.controls.appendChild(timeline);

		t.slider = timeline.children[0];
		t.buffering = t.slider.children[0];
		t.loaded = t.slider.children[1];
		t.current = t.slider.children[2];
		t.handle = t.slider.children[3];

		var isPointerDown = false;
		var _X = t.slider.offsetLeft;
		var _W = _css(t.slider, 'width');

		var pointerMove = function(e) {
			var _time = 0;
			var x;

			if (e.changedTouches) {
				x = e.changedTouches[0].pageX
			} else {
				x = e.pageX
			}

			if (t.media.duration) {
				if (x < _X) {
					x = _X
				} else if (x > _W + _X) {
					x = _W + _X
				}

				_time = ((x - _X) / _W) * t.media.duration;

				if (isPointerDown && _time !== t.media.currentTime) {
					t.media.currentTime = _time
				}
			}
		};
		// Handle clicks
		if (zyMedia.features.hasTouch) {
			t.slider.addEventListener('touchstart', function(e) {
				isPointerDown = true;
				pointerMove(e);
				_X = t.slider.offsetLeft;
				_W = _css(t.slider, 'width');
				t.slider.addEventListener('touchmove', pointerMove);
				t.slider.addEventListener('touchend', function(e) {
					isPointerDown = false;
					t.slider.removeEventListener('touchmove', pointerMove)
				});
			});
		} else {
			t.slider.addEventListener('mousedown', function(e) {
				isPointerDown = true;
				pointerMove(e);
				_X = t.slider.offsetLeft;
				_W = _css(t.slider, 'width');
				t.slider.addEventListener('mousemove', pointerMove);
				t.slider.addEventListener('mouseup', function(e) {
					isPointerDown = false;
					t.slider.addEventListener('mousemove', pointerMove)
				});
			});
		}

		t.slider.addEventListener('mouseenter', function(e) {
			t.slider.addEventListener('mousemove', pointerMove);
		});

		t.slider.addEventListener('mouseleave', function(e) {
			if (!isPointerDown) {
				t.slider.removeEventListener('mousemove', pointerMove)
			}
		});

		//4Hz ~ 66Hz, no longer than 250ms
		t.media.addEventListener('timeupdate', function(e) {
			t.updateTimeline(e)
		});
	},

	// Current and duration time 00:00/00:00
	buildTime: function() {
		var t = this;

		var time = document.createElement('div');
		time.className = 'zy_time';
		time.innerHTML = '<span class="zy_currenttime">' +
			timeFormat(0, t.options) +
			'</span>/' +
			'<span class="zy_duration">' +
			timeFormat(t.options.duration, t.options) +
			'</span>';
		t.controls.appendChild(time);

		t.currentTime = time.children[0];
		t.durationDuration = time.children[1];

		//4Hz ~ 66Hz, no longer than 250ms
		t.media.addEventListener('timeupdate', function() {
			t.updateTime()
		});
	},

	// Fullscreen button
	buildFullscreen: function() {
		var t = this;
		// Native events
		if (zyMedia.features.nativeFullscreenPrefix != '-') {
			// Chrome doesn't alays fire this in an iframe
			var func = function(e) {
				if (t.isFullScreen) {
					if (!isInFullScreenMode()) {
						t.exitFullScreen()
					}
				}
			};

			document.addEventListener(zyMedia.features.nativeFullscreenPrefix + 'fullscreenchange', func)
		}

		t.fullscreenBtn = document.createElement('div');
		t.fullscreenBtn.className = 'zy_fullscreen_btn';
		t.controls.appendChild(t.fullscreenBtn);

		t.fullscreenBtn.addEventListener('click', function() {
			if ((zyMedia.features.nativeFullscreenPrefix != '-' && isInFullScreenMode()) || t.isFullScreen) {
				t.exitFullScreen()
			} else {
				t.enterFullScreen()
			}
		});
	},

	// bigPlay, loading and error info
	buildDec: function() {
		var t = this;

		var loading = document.createElement('div');
		loading.className = 'dec_loading';
		loading.style.display = 'none';
		t.container.appendChild(loading);

		var error = document.createElement('div');
		error.className = 'dec_error';
		error.style.display = 'none';
		error.innerHTML = '播放异常';
		t.container.appendChild(error);

		var bigPlay = document.createElement('div');

		if (!zyMedia.features.isVendorBigPlay) {
			bigPlay.className = 'dec_play';
			t.container.appendChild(bigPlay);
			bigPlay.addEventListener('click', function() {
				// For some device trigger 'play' event 
				t.media.isUserClick = true;

				t.media.play();
				// Controls bar auto hide after 3s
				if (!t.media.paused && !t.options.alwaysShowControls) {
					t.setControlsTimer(3000)
				}
			});
		}

		t.media.addEventListener('play', function() {
			// Only for user click
			if (t.media.isUserClick) {
				bigPlay.style.display = 'none';
				loading.style.display = '';
				t.buffering.style.display = 'none'
			}
		});

		t.media.addEventListener('playing', function() {
			bigPlay.style.display = 'none';
			loading.style.display = 'none';
			t.buffering.style.display = 'none';
			error.style.display = 'none';
		});

		t.media.addEventListener('seeking', function() {
			loading.style.display = '';
			bigPlay.style.display = 'none';
			t.buffering.style.display = '';
		});

		t.media.addEventListener('seeked', function() {
			loading.style.display = 'none';
			t.buffering.style.display = 'none';
		});

		t.media.addEventListener('pause', function() {
			bigPlay.style.display = ''
		});

		t.media.addEventListener('waiting', function() {
			loading.style.display = '';
			bigPlay.style.display = 'none';
			t.buffering.style.display = '';
		});

		// Don't listen to 'loadeddata' and 'canplay', 
		// some Android device can't fire 'canplay' or irregular working when use 'createEvent' to trigger 'canplay' (读者i800)

		// Error handling
		t.media.addEventListener('error', function(e) {
			loading.style.display = 'none';
			bigPlay.style.display = '';
			t.buffering.style.display = 'none';
			t.media.pause();
			error.style.display = '';

			if (typeof t.options.error == 'function') {
				t.options.error(e);
			}
		});
	},

	init: function() {
		var t = this;

		// Build
		var batch = ['Container', 'Playpause', 'Timeline', 'Time'];
		if (t.options.enableFullscreen && !zyMedia.features.isVendorFullscreen && t.isVideo) {
			batch.push('Fullscreen')
		}

		if (t.isVideo) {
			batch.push('Dec')
		}

		for (var i = 0; i < batch.length; i++) {
			try {
				t['build' + batch[i]]()
			} catch (exp) {}
		}

		// Controls fade
		if (t.isVideo) {
			if (zyMedia.features.hasTouch) {
				t.media.addEventListener('click', function() {
					// Toggle controls
					if (t.isControlsVisible) {
						t.hideControls()
					} else {
						t.showControls();
						// Controls bar auto hide after 3s
						if (!t.media.paused && !t.options.alwaysShowControls) {
							t.setControlsTimer(3000)
						}
					}
				});
			} else {
				// Click to play/pause
				t.media.addEventListener('click', function() {
					if (t.media.paused) {
						t.media.play()
					} else {
						t.media.pause()
					}
				});

				// Show/hide controls
				t.container.addEventListener('mouseenter', function() {
					t.showControls();

					if (!t.options.alwaysShowControls) {
						t.setControlsTimer(3000)
					}
				});

				t.container.addEventListener('mousemove', function() {
					t.showControls();

					if (!t.options.alwaysShowControls) {
						t.setControlsTimer(3000)
					}
				});
			}

			if (t.options.hideVideoControlsOnLoad) {
				t.hideControls()
			}

			t.media.addEventListener('loadedmetadata', function(e) {
				if (t.enableAutoSize) {
					// For more properly videoWidth or videoHeight of HM 1SW(小米), QQ browser is 0
					setTimeout(function() {
						if (!isNaN(t.media.videoHeight)) {
							t.setPlayerSize()
						}
					}, 50)
				}
			});

		}

		t.media.addEventListener('play', function() {
			var p;

			for (var i in zyMedia.players) {
				p = zyMedia.players[i];

				if (p.id != t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended) {
					try {
						p.media.pause()
					} catch (exp) {}
				}
			}
		});


		// Adjust controls when orientation change, 500ms for Sumsung tablet
		window.addEventListener('orientationchange', function() {
			setTimeout(function() {
				t.setPlayerSize()
			}, 500)
		});

		t.media.addEventListener('ended', function(e) {
			t.media.currentTime = 0;

			if (t.options.autoLoop) {
				t.media.play()
			} else {
				// Fixing an Android stock browser bug, where "seeked" isn't fired correctly after ending the video and jumping to the beginning
				if (t.isVideo) {
					setTimeout(function() {
						t.container.querySelector('.dec_loading').style.display = 'none'
					}, 20)
				}

				t.media.pause()
			}

			t.updateTimeline(e)
		});

		t.media.addEventListener('loadedmetadata', function(e) {
			t.updateTime()
		});

		if (t.options.autoplay) {
			t.media.isUserClick = false;
			t.media.play()
		}

		if (typeof t.options.success == 'function') {
			t.options.success(t.media)
		}
	}

};


// String or node
export default function(selector, options) {
	return new zyMedia.MediaPlayer(selector, options)
}



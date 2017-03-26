// http://efe.baidu.com/blog/position-sticky/

// 检测iOS版本大于等于6
function gtIOS6 () {
  var userAgent = window.navigator.userAgent
  var ios = userAgent.match(/(iPad|iPhone|iPod)\s+OS\s([\d_.]+)/)
  return ios && ios[2] && (parseInt(ios[2].replace(/_/g, '.'), 10) >= 6)
}

// 判断是否支持sticky属性
function isSupportSticky () {
  var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-']
  var stickyText = ''
  for (var i = 0; i < prefixTestList.length; i++) {
    stickyText += 'position:' + prefixTestList[i] + 'sticky'
  }
  // 创建一个dom来检查
  var div = document.createElement('div')
  var body = document.body
  div.style.cssText = 'display:none' + stickyText
  body.appendChild(div)
  var isSupport = /sticky/i.test(window.getComputedStyle(div).position)
  body.removeChild(div)
  div = null
  return isSupport
}

export default function (nav, options = {}) {
  let scrollBox = options.scrollBox || window
  let offset = options.offset || 0
  const checkStickySupport = options.checkStickySupport === true || false
  if (typeof scrollBox === 'string') {
    scrollBox = document.getElementById(scrollBox)
  }

  let navOffsetY = nav.offsetTop - offset

  const getTop = function () {
    if (scrollBox === window) {
      return document.documentElement.scrollTop
    } else {
      return scrollBox.scrollTop
    }
  }

  const scrollHandler = function () {
    const distance = getTop()
    if (distance >= navOffsetY) {
      nav.style.top = offset + 'px'
      nav.classList.add('vux-fixed')
    } else {
      nav.classList.remove('vux-fixed')
    }
  }

  if (checkStickySupport && (gtIOS6() || isSupportSticky())) {
    // 大于等于iOS6版本使用sticky
    nav.classList.add('vux-sticky')
  } else {
    setTimeout(() => {
      navOffsetY = nav.offsetTop - offset
      scrollBox.addEventListener('scroll', scrollHandler)
    }, 1000)
  }
}

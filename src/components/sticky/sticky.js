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
    if (!scrollBox) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[VUX] sticky:scroll-box element doesn\'t exist')
      }
      return
    }
  }

  let navOffsetY = nav.offsetTop - offset
  scrollBox.removeEventListener('scroll', scrollBox.e)

  const getTop = function () {
    if (scrollBox === window) {
      return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    } else {
      return scrollBox.scrollTop
    }
  }

  const getFillElem = function (el) {
    let next = el.nextSibling
    // 寻找最近的一个兄弟元素
    while (next.nodeType !== 1) {
      next = next.nextSibling
    }
    if (next.classList.contains('vux-sticky-fill')) {
      return next
    }
    // 没有使用vux-sticky-fill按照之前的方式获取外层容器
    return el.parentNode
  }

  const scrollHandler = function () {
    const distance = getTop()
    if (distance > navOffsetY) {
      nav.style.top = offset + 'px'
      nav.classList.add('vux-fixed')
    } else {
      nav.classList.remove('vux-fixed')
    }
  }

  if (checkStickySupport && (gtIOS6() || isSupportSticky())) {
    nav.style.top = offset + 'px'
    // 大于等于iOS6版本使用sticky
    nav.classList.add('vux-sticky')
  } else {
    if (nav.classList.contains('vux-fixed')) {
      const top = getTop()
      navOffsetY = getFillElem(nav).offsetTop - offset
      if (top < navOffsetY) {
        nav.classList.remove('vux-fixed')
      }
    } else {
      navOffsetY = nav.offsetTop - offset
    }
    scrollBox.e = scrollHandler
    scrollBox.addEventListener('scroll', scrollHandler)
  }
}

import EXIF from 'exif-js'

/**
 * Detecting vertical squash in loaded image.
 * Fixes a bug which squash image vertically while drawing into canvas for some images.
 */
function detectVerticalSquash (img) {
  let data
  let ih = img.naturalHeight
  let canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = ih
  let ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)
  try {
    // Prevent cross origin error
    data = ctx.getImageData(0, 0, 1, ih).data
  } catch (err) {
    // hopeless, assume the image is well and good.
    console.log('Cannot check verticalSquash: CORS?')
    return 1
  }
  // search image edge pixel position in case it is squashed vertically.
  var sy = 0
  var ey = ih
  var py = ih
  while (py > sy) {
    var alpha = data[(py - 1) * 4 + 3]
    if (alpha === 0) {
      ey = py
    } else {
      sy = py
    }
    py = (ey + sy) >> 1
  }
  var ratio = py / ih
  return ratio === 0 ? 1 : ratio
}

/**
 * Detect subsampling in loaded image.
 * In iOS, larger images than 2M pixels may be subsampled in rendering.
 */
function detectSubsampling (img) {
  var iw = img.naturalWidth
  var ih = img.naturalHeight
  if (iw * ih > 1024 * 1024) {
    // subsampling may happen over megapixel image
    var canvas = document.createElement('canvas')
    canvas.width = canvas.height = 1
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, -iw + 1, 0)
    // subsampled image becomes half smaller in rendering size.
    // check alpha channel value to confirm image is covering edge pixel or not.
    // if alpha value is 0 image is not covering, hence subsampled.
    return ctx.getImageData(0, 0, 1, 1).data[3] === 0
  } else {
    return false
  }
}

/**
 * Transform canvas coordination according to specified frame size and orientation
 * Orientation value is from EXIF tag
 */
function transformCoordinate (canvas, ctx, width, height, orientation) {
  switch (orientation) {
    case 5:
    case 6:
    case 7:
    case 8:
      canvas.width = height
      canvas.height = width
      break
    default:
      canvas.width = width
      canvas.height = height
  }
  switch (orientation) {
    case 2:
      // horizontal flip
      ctx.translate(width, 0)
      ctx.scale(-1, 1)
      break
    case 3:
      // 180 rotate left
      ctx.translate(width, height)
      ctx.rotate(Math.PI)
      break
    case 4:
      // vertical flip
      ctx.translate(0, height)
      ctx.scale(1, -1)
      break
    case 5:
      // vertical flip + 90 rotate right
      ctx.rotate(0.5 * Math.PI)
      ctx.scale(1, -1)
      break
    case 6:
      // 90 rotate right
      ctx.rotate(0.5 * Math.PI)
      ctx.translate(0, -height)
      break
    case 7:
      // horizontal flip + 90 rotate right
      ctx.rotate(0.5 * Math.PI)
      ctx.translate(width, -height)
      ctx.scale(-1, 1)
      break
    case 8:
      // 90 rotate left
      ctx.rotate(-0.5 * Math.PI)
      ctx.translate(-width, 0)
      break
    default:
      break
  }
}

// https://stackoverflow.com/a/12300351/6472444
function dataURItoBlob (dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1])

  // separate out the mime component
  var mimeString = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length)

  // create a view into the buffer
  var ia = new Uint8Array(ab)

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString })
  return blob
}

/**
 * convert blob to canvas to blob
 */
function handleFile (file, options, doSquash) {
  return new Promise((resolve, reject) => {
    const { maxWidth, quality, enableCompress } = options
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const image = new Image()
    try {
      image.src = URL.createObjectURL(file)
    } catch (e) {
      throw Error(e)
    }
    image.onload = () => {
      let w = image.naturalWidth
      let h = image.naturalHeight
      EXIF.getData(image, function () {
        const orientation = EXIF.getTag(this, 'Orientation')
        const subsampled = detectSubsampling(image)
        if (subsampled) {
          w /= 2
          h /= 2
        }
        const vertSquashRatio = doSquash ? detectVerticalSquash(image) : 1
        const dw = enableCompress ? Math.min(Number(maxWidth), w) : w
        const dh = (h * (dw / w)) / vertSquashRatio
        detectImageAutoRotate().then(isImageAutoRotate => {
          console.log('detectImageAutoRotate:', isImageAutoRotate)
          if (!isImageAutoRotate) {
            transformCoordinate(canvas, ctx, dw, dh, orientation)
          } else {
            canvas.width = dw
            canvas.height = dh
          }
          ctx.clearRect(0, 0, dw, dh)
          ctx.drawImage(image, 0, 0, dw, dh)
          URL.revokeObjectURL(image.src)
          canvas.toBlob(
            blob => {
              resolve(new File([blob], file.name, {
                type: file.type
              }))
            },
            file.type,
            quality
          )
        })
      })
    }
    image.onerror = err => reject(err)
  })
}

/**
 * https://github.com/Mawi137/ngx-image-cropper/issues/306#issuecomment-611771078
 * 判断图片是否被浏览器自动旋转
 */
function detectImageAutoRotate () {
  // 一张 2x1 的 JPEG 图片, EXIF Orientation: 6
  const testAutoOrientationImageURL = 'data:image/jpeg;base64,/9j/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAYAAAAAAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIAAEAAgMBEQACEQEDEQH/xABKAAEAAAAAAAAAAAAAAAAAAAALEAEAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8H//2Q=='
  let isImageAutoRotate
  return new Promise(resolve => {
    if (isImageAutoRotate === undefined) {
      const img = new Image()
      img.onload = () => {
        isImageAutoRotate = img.width === 1 && img.height === 2
        resolve(isImageAutoRotate)
      }
      img.src = testAutoOrientationImageURL
    } else {
      resolve(isImageAutoRotate)
    }
  })
}

export {
  detectVerticalSquash,
  detectSubsampling,
  transformCoordinate,
  dataURItoBlob,
  handleFile,
  detectImageAutoRotate
}

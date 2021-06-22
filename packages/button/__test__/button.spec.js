import { mount } from '@vue/test-utils'
import Button from '../index'

function colorHex(color) {
  let reg = /^(rgb|RGB)/
  if (reg.test(color)) {
    let strHex = '#'
    let colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",")
    for(let i = 0; i < colorArr.length; i++) {
      let hex = Number(colorArr[i]).toString(16)
      if (hex === "0") {
        hex += hex
      }
      strHex += hex
    }
    return strHex.toUpperCase()
  } else {
    return String(color)
  }
}

test('renders props color', () => {
  const color = '#409EFE'
  const wrapper = mount(Button, {
    props: {
      color,
      plain: true
    }
  });
  expect(colorHex(wrapper.element.style.color)).toBe(color)
})
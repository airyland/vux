function one (selector, el = document) {
  return el.querySelector(selector)
}
function all (selector, el = document) {
  return el.querySelectorAll(selector)
}
// function engine(obj) {
//   if (!obj.one) throw new Error('.one callback required')
//   if (!obj.all) throw new Error('.all callback required')
//   return exportJson
// }
export {
  one, all
}
// export default one

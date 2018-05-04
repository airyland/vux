export default function (self, name) {
  if (self.$parent && typeof self.$parent[name] !== 'undefined') {
    return self.$parent[name]
  }
  if (self.$parent && self.$parent.$parent && typeof self.$parent.$parent[name] !== 'undefined') {
    return self.$parent.$parent[name]
  }
}

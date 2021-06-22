const path = require('path')
const pkg = require('../package.json')

module.exports = {
  normalizePath(path) {
    return path.replace(/\\/g, '/')
  },
  deepGet(object, path, defaultValue = '') {
    return path.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o, k) => (o || {})[k], object) || defaultValue;
  },
  // myName -> my-name
  toKebabCase(input) {
    return input.replace(
      /[A-Z]/g,
      (val, index) => (index === 0 ? '' : '-') + val.toLowerCase()
    );
  },
  // name `v2.0.0` -> name
  removeVersion(str) {
    return str.replace(/`(\w|\.)+`/g, '').trim();
  },
  // *boolean* -> boolean
  // _boolean_ -> boolean
  formatType(type) {
    return type.replace(/(^(\*|_))|((\*|_)$)/g, '');
  },
  ROOT: path.resolve(__dirname, '../packages'),
  PACKAGE_DEPENDENCIES: Object.keys(pkg.dependencies),
  NO_VUX_PREFIX_FILE: /(utils|directives|hooks|locale)/,
  VETUR_DIR: path.resolve(__dirname, '../vetur'),
  VUX_CONFIG_FILE: require(path.resolve(__dirname, '../vux-config.json')),
  PACKAGE_FILE: pkg
}
var fs = require('fs');
var str = fs.readFileSync('../vendors/SUI-Mobile/js/picker.js').toString();

str = str.replace('+ function($) {','').replace('}(Zepto);','').replace('"use strict";','')
str = '"use strict";var $ = require("./zepto.min");'+str;
str = str + ';module.exports = Picker \n';
console.log(str);

fs.writeFileSync('../src/libs/picker.js',str);
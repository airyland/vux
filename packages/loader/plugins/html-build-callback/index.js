'use strict'

/**
* https://www.npmjs.com/package/html-webpack-plugin
* Async
  html-webpack-plugin-before-html-generation
  html-webpack-plugin-before-html-processing
  html-webpack-plugin-alter-asset-tags
  html-webpack-plugin-after-html-processing
  html-webpack-plugin-after-emit
  Sync:
  html-webpack-plugin-alter-chunks
*/

/**
* 
{
 events: {
  'before-html-generation': function (data, cb) {
    cb(null, data)
  }
 }  
}
*/

function Plugin(options) {
  this.events = options.events
}

Plugin.prototype.apply = function (compiler) {
  let _this = this
  compiler.plugin('compilation', function (compilation) {
    for (let i in _this.events) {
      compilation.plugin('html-webpack-plugin-' + i, _this.events[i]);
    }
  });

};

module.exports = Plugin;
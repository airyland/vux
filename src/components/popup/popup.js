var Eventor = require('../../libs/eventor');
var F_tap = require('./tap');
var PickerDialog = function(option) {
  this.params = {};
  if (Object.prototype.toString.call(option) === '[object Object]') {
    this.params = { 
      "input": option.input || "",
      "container": document.querySelector(option.input) || "",
      "innerHTML": option.innerHTML || "",
      "onOpen": option.onOpen || function() {},
      "onClose": option.onClose || function() {},
      "_open": option._open || function() {},
      "_close": option._close || function() {}
    };
    this.input = document.querySelector(option.input);
  }

  // input不存在提示处理
  /**
  if (!this.params || !this.params.input) {
    console.error('picker-dialog: input对应的dom对象不存在');
    return false;
  }
  **/
  /**
  if (!this.params.container || !this.params.container) {
    console.error('picker-dialog: container对应的dom对象不存在');
    return false;
  }
  **/
  // 透明黑色遮罩
  if (!!document.querySelectorAll('.picker-mask').length <= 0) {
    var divMask = document.createElement('a');
    divMask.className = 'picker-mask';
    divMask.href = 'javascript:void(0);';
    document.body.appendChild(divMask);
  }
  var div;
  if(!option.container){
    div = document.createElement('div');
  }else{
    div = option.container;
  }
  
  div.className = 'picker-dialog';

  if(!option.container){
    document.body.appendChild(div);
  }
   
  this.mask = document.querySelector(".picker-mask");
  this.container = document.querySelectorAll(".picker-dialog");
  this.container = this.container[this.container.length - 1];
  // this.container.innerHTML = this.params.innerHTML;
  // this._hackInputFocus();
  this._bindEvents();
  option = null;
  return this;
}
Eventor.mixTo(PickerDialog);
PickerDialog.prototype.updateInputPosition = function() {
  this._hackInputFocus();
}
PickerDialog.prototype._bindEventInput = function() {
  // 设置input被触发的事件
  var _this = this;
  F_tap.untap(this.input);
  var inputEvent = function() {
    _this.show();
    // 如果input被picker遮挡到，则滚动input至可视区域
    (function() {
      var clientHeight = document.documentElement.clientHeight; //  浏览器高度
      var scrollTop = document.body.scrollTop; // 滚动高度
      var pickerHeight = _this.container.offsetHeight; // picker高度
      var inputTop = _this.input.getBoundingClientRect().top + scrollTop; // input相对body高度
      var inputHeight = _this.input.offsetHeight; // input高度
      if (inputTop - scrollTop + inputHeight > clientHeight - pickerHeight || inputTop - scrollTop + inputHeight < inputHeight) {
        _this.scrollAnimate(inputTop - (clientHeight - pickerHeight) / 2, 400);
      } else {}
    }());
  };
  F_tap.tap(this.input, inputEvent);
  F_tap.tap(this.params.container, inputEvent);
  return this;

};
// input输入框如果不在可视区域内，将其滑动到可视区域
PickerDialog.prototype.scrollAnimate = function(position, timestamp) {
  var _this = this;
  var needs = (document.body.scrollTop - position) / timestamp * 25;
  var old = -1;
  _this.interval = setInterval(function() {
    if (Math.abs(document.body.scrollTop - position) < Math.abs(needs)) {
      clearInterval(_this.interval);
    }
    old = document.body.scrollTop;
    document.body.scrollTop = old - needs;
    if (old == document.body.scrollTop) {
      clearInterval(_this.interval);
    }
  }, 8);
  return this;
};
PickerDialog.prototype._bindEvents = function() {
  var _this = this;

  function triggerClick(e) {
    _this.hide();
    _this.emit('close');
  }
  F_tap.tap(this.mask, triggerClick);
  this.container.addEventListener("touchmove", function(e) {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }, false);
  // this.mask.tap(triggerClick);
  //this.setClick(this.mask, triggerClick);
  return this;
}
PickerDialog.prototype.show = function() {
  var _this = this;
  _this.mask.classList.add("show");
  //_this.container.classList.add("modal-in");
  _this.params._open && _this.params._open(this);
  _this.params.onOpen && _this.params.onOpen(this);
  return this;
}
PickerDialog.prototype.hide = function() {
  var _this = this;
  _this.mask.classList.remove("show");
  //_this.container.classList.remove("modal-in");
  _this.params._close && _this.params._close(this);
  _this.params.onClose && _this.params.onClose(this);
  return this;
}
PickerDialog.prototype.html = function(html) {
  var _this = this;
  this.container.innerHTML = html;
  return this;
}
module.exports = PickerDialog;
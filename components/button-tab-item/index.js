!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.vuxButtonTabItem=e():t.vuxButtonTabItem=e()}(this,function(){return function(t){function e(s){if(o[s])return o[s].exports;var n=o[s]={exports:{},id:s,loaded:!1};return t[s].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var o={};return e.m=t,e.c=o,e.p="",e(0)}([function(t,e,o){t.exports=o(3)},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{selected:{type:Boolean,"default":!1}},methods:{onClick:function(){this.$dispatch("on-item-click",this.$el.getAttribute("data-index")),this.selected=!0}},events:{"on-item-click":function(t){var e=this.$el.getAttribute("data-index");this.selected=e===t,this.shouldRemoveBorder=t-1===e-0}},computed:{"class":function(){return{"vux-button-group-current":this.selected,"no-border-right":this.shouldRemoveBorder}},style:function(){return this.$parent.height?{height:this.$parent.height+"px",lineHeight:this.$parent.height+"px"}:void 0}},data:function(){return{shouldRemoveBorder:!1}}}},function(t,e){t.exports="<a class=vux-button-tab-item :class=class href=javascript: :style=style @click=onClick> <slot></slot> </a>"},function(t,e,o){var s,n;s=o(1),n=o(2),t.exports=s||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)}])});
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.vuxChecklist=e():t.vuxChecklist=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(51)},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(31),o=n(26);t.exports=function(t){return r(o(t))}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){t.exports=!n(7)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(2),o="__core-js_shared__",u=r[o]||(r[o]={});t.exports=function(t){return u[t]||(u[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(10)("wks"),o=n(11),u=n(2).Symbol;t.exports=function(t){return r[t]||(r[t]=u&&u[t]||(u||o)("Symbol."+t))}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(18),u=r(o),i=n(17),c=r(i),f=n(53),s=r(f),a=n(52),l=r(a),p=n(16),d=n(43),y=r(d);e["default"]={components:{Tip:s["default"],Icon:l["default"]},filters:{getValue:p.getValue,getKey:p.getKey},mixins:[c["default"]],props:{title:{type:String,required:!0},required:{type:Boolean,required:!1,"default":!0},options:{type:Array,required:!0},value:{type:Array,required:!1,twoWay:!0},max:{type:Number,required:!1},fillMode:{type:Boolean,required:!1,"default":!1},randomOrder:{type:Boolean,required:!1,"default":!1}},ready:function(){this.handleChangeEvent=!0;var t=this.fill_mode?this.options.length+1:this.options.length;this.max?this.max>t&&(this.max=t):this.max=t,this.min?(this.min<0&&(this.min=1),this.min>=t&&(this.min=t)):this.min=1,this.required||(this.min=0),this.randomOrder&&(this.options=(0,y["default"])(this.options))},computed:{valid:function(){return this.value.length>=this.min&&this.value.length<=this.max},error:function(){var t=[];return this.value.length<this.min&&t.push(this.$interpolate("最少要选择{{min}}个哦")),this.value.length>this.max&&t.push(this.$interpolate("最多只能选择{{max}}个哦")),t}},data:function(){return{}},watch:{value:function(t){this.$dispatch("change",JSON.parse((0,u["default"])(t)))}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{type:String},computed:{className:function(){return"weui_icon weui_icon_"+this.type}}}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{align:{type:String,"default":"left"}}}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.getKey=e.getValue=void 0;var o=n(20),u=r(o);e.getValue=function(t){return"object"===("undefined"==typeof t?"undefined":(0,u["default"])(t))?t.value:t},e.getKey=function(t){return"object"===("undefined"==typeof t?"undefined":(0,u["default"])(t))?t.key:t}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={props:{required:{type:Boolean,"default":!0}},created:function(){this.uuid=Math.random().toString(36).substring(3,8),this.handleChangeEvent=!1},computed:{dirty:function(){return!this.prisine},invalid:function(){return!this.valid}},methods:{setTouched:function(){this.touched=!0}},watch:{value:function(t){this.prisine===!0&&(this.prisine=!1),this.handleChangeEvent||this.$dispatch("change",t)}},data:function(){return{errors:{},prisine:!0,touched:!1,valid:!0}}}},function(t,e,n){t.exports={"default":n(21),__esModule:!0}},function(t,e,n){t.exports={"default":n(22),__esModule:!0}},function(t,e,n){"use strict";var r=n(19)["default"];e["default"]=function(t){return t&&t.constructor===r?"symbol":typeof t},e.__esModule=!0},function(t,e,n){var r=n(3);t.exports=function(t){return(r.JSON&&r.JSON.stringify||JSON.stringify).apply(JSON,arguments)}},function(t,e,n){n(39),n(38),t.exports=n(3).Symbol},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(33);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(23);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(1);t.exports=function(t){var e=r.getKeys(t),n=r.getSymbols;if(n)for(var o,u=n(t),i=r.isEnum,c=0;u.length>c;)i.call(t,o=u[c++])&&e.push(o);return e}},function(t,e,n){var r=n(2),o=n(3),u=n(25),i="prototype",c=function(t,e,n){var f,s,a,l=t&c.F,p=t&c.G,d=t&c.S,y=t&c.P,h=t&c.B,v=t&c.W,b=p?o:o[e]||(o[e]={}),g=p?r:d?r[e]:(r[e]||{})[i];p&&(n=e);for(f in n)s=!l&&g&&f in g,s&&f in b||(a=s?g[f]:n[f],b[f]=p&&"function"!=typeof g[f]?n[f]:h&&s?u(a,r):v&&g[f]==a?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};return e[i]=t[i],e}(a):y&&"function"==typeof a?u(Function.call,a):a,y&&((b[i]||(b[i]={}))[f]=a))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,t.exports=c},function(t,e,n){var r=n(4),o=n(1).getNames,u={}.toString,i="object"==typeof window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return o(t)}catch(e){return i.slice()}};t.exports.get=function(t){return i&&"[object Window]"==u.call(t)?c(t):o(r(t))}},function(t,e,n){var r=n(1),o=n(9);t.exports=n(6)?function(t,e,n){return r.setDesc(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(5);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(5);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(1),o=n(4);t.exports=function(t,e){for(var n,u=o(t),i=r.getKeys(u),c=i.length,f=0;c>f;)if(u[n=i[f++]]===e)return n}},function(t,e){t.exports=!0},function(t,e,n){t.exports=n(30)},function(t,e,n){var r=n(1).setDesc,o=n(8),u=n(12)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,u)&&r(t,u,{configurable:!0,value:e})}},function(t,e){},function(t,e,n){"use strict";var r=n(1),o=n(2),u=n(8),i=n(6),c=n(28),f=n(36),s=n(7),a=n(10),l=n(37),p=n(11),d=n(12),y=n(34),h=n(29),v=n(27),b=n(32),g=n(24),m=n(4),x=n(9),_=r.getDesc,w=r.setDesc,j=r.create,S=h.get,O=o.Symbol,P=o.JSON,M=P&&P.stringify,N=!1,k=d("_hidden"),E=r.isEnum,A=a("symbol-registry"),F=a("symbols"),D="function"==typeof O,$=Object.prototype,q=i&&s(function(){return 7!=j(w({},"a",{get:function(){return w(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=_($,e);r&&delete $[e],w(t,e,n),r&&t!==$&&w($,e,r)}:w,T=function(t){var e=F[t]=j(O.prototype);return e._k=t,i&&N&&q($,t,{configurable:!0,set:function(e){u(this,k)&&u(this[k],t)&&(this[k][t]=!1),q(this,t,x(1,e))}}),e},J=function(t){return"symbol"==typeof t},C=function(t,e,n){return n&&u(F,e)?(n.enumerable?(u(t,k)&&t[k][e]&&(t[k][e]=!1),n=j(n,{enumerable:x(0,!1)})):(u(t,k)||w(t,k,x(1,{})),t[k][e]=!0),q(t,e,n)):w(t,e,n)},K=function(t,e){g(t);for(var n,r=v(e=m(e)),o=0,u=r.length;u>o;)C(t,n=r[o++],e[n]);return t},B=function(t,e){return void 0===e?j(t):K(j(t),e)},I=function(t){var e=E.call(this,t);return e||!u(this,t)||!u(F,t)||u(this,k)&&this[k][t]?e:!0},V=function(t,e){var n=_(t=m(t),e);return!n||!u(F,e)||u(t,k)&&t[k][e]||(n.enumerable=!0),n},W=function(t){for(var e,n=S(m(t)),r=[],o=0;n.length>o;)u(F,e=n[o++])||e==k||r.push(e);return r},G=function(t){for(var e,n=S(m(t)),r=[],o=0;n.length>o;)u(F,e=n[o++])&&r.push(F[e]);return r},z=function(t){if(void 0!==t&&!J(t)){for(var e,n,r=[t],o=1,u=arguments;u.length>o;)r.push(u[o++]);return e=r[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){return n&&(e=n.call(this,t,e)),J(e)?void 0:e}),r[1]=e,M.apply(P,r)}},R=s(function(){var t=O();return"[null]"!=M([t])||"{}"!=M({a:t})||"{}"!=M(Object(t))});D||(O=function(){if(J(this))throw TypeError("Symbol is not a constructor");return T(p(arguments.length>0?arguments[0]:void 0))},f(O.prototype,"toString",function(){return this._k}),J=function(t){return t instanceof O},r.create=B,r.isEnum=I,r.getDesc=V,r.setDesc=C,r.setDescs=K,r.getNames=h.get=W,r.getSymbols=G,i&&!n(35)&&f($,"propertyIsEnumerable",I,!0));var H={"for":function(t){return u(A,t+="")?A[t]:A[t]=O(t)},keyFor:function(t){return y(A,t)},useSetter:function(){N=!0},useSimple:function(){N=!1}};r.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),function(t){var e=d(t);H[t]=D?e:T(e)}),N=!0,c(c.G+c.W,{Symbol:O}),c(c.S,"Symbol",H),c(c.S+c.F*!D,"Object",{create:B,defineProperty:C,defineProperties:K,getOwnPropertyDescriptor:V,getOwnPropertyNames:W,getOwnPropertySymbols:G}),P&&c(c.S+c.F*(!D||R),"JSON",{stringify:z}),l(O,"Symbol"),l(Math,"Math",!0),l(o.JSON,"JSON",!0)},function(t,e){},function(t,e){},function(t,e){},function(t,e,n){function r(t){return o(t,u)}var o=n(44),u=4294967295;t.exports=r},function(t,e,n){function r(t,e,n){return t===t&&(void 0!==n&&(t=n>=t?t:n),void 0!==e&&(t=t>=e?t:e)),t}function o(t,e){return t+P(M()*(e-t+1))}function u(t,e){var n=-1,u=p(t),i=u.length,c=i-1;for(e=r(a(e),0,i);++n<e;){var f=o(n,c),s=u[f];u[f]=u[n],u[n]=s}return u.length=e,u}function i(t){var e=c(t)?O.call(t):"";return e==v||e==b}function c(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function f(t){return!!t&&"object"==typeof t}function s(t){return"symbol"==typeof t||f(t)&&O.call(t)==g}function a(t){if(!t)return 0===t?t:0;if(t=l(t),t===d||t===-d){var e=0>t?-1:1;return e*y}var n=t%1;return t===t?n?t-n:t:0}function l(t){if("number"==typeof t)return t;if(s(t))return h;if(c(t)){var e=i(t.valueOf)?t.valueOf():t;t=c(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(m,"");var n=_.test(t);return n||w.test(t)?j(t.slice(2),n?2:8):x.test(t)?h:+t}var p=n(45),d=1/0,y=1.7976931348623157e308,h=NaN,v="[object Function]",b="[object GeneratorFunction]",g="[object Symbol]",m=/^\s+|\s+$/g,x=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,w=/^0o[0-7]+$/i,j=parseInt,S=Object.prototype,O=S.toString,P=Math.floor,M=Math.random;t.exports=u},function(t,e,n){function r(t,e){for(var n=-1,r=t.length,o=Array(r);++n<r;)o[n]=e(t[n],n,t);return o}function o(t,e){return r(e,function(e){return t[e]})}function u(t){var e=!1;if(null!=t&&"function"!=typeof t.toString)try{e=!!(t+"")}catch(n){}return e}function i(t){for(var e,n=[];!(e=t.next()).done;)n.push(e.value);return n}function c(t){var e=-1,n=Array(t.size);return t.forEach(function(t,r){n[++e]=[r,t]}),n}function f(t){var e=-1,n=Array(t.size);return t.forEach(function(t){n[++e]=t}),n}function s(t){return t.match(tt)}function a(t){return function(e){return null==e?void 0:e[t]}}function l(t,e){var n=-1,r=t.length;for(e||(e=Array(r));++n<r;)e[n]=t[n];return e}function p(t,e){var n=t[e];return m(n)?n:void 0}function d(t){return ot.call(t)}function y(t){return null!=t&&v(gt(t))&&!h(t)}function h(t){var e=b(t)?ot.call(t):"";return e==P||e==M}function v(t){return"number"==typeof t&&t>-1&&t%1==0&&O>=t}function b(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function g(t){return!!t&&"object"==typeof t}function m(t){return null==t?!1:h(t)?ut.test(nt.call(t)):g(t)&&(u(t)?ut:T).test(t)}function x(t){return"string"==typeof t||!mt(t)&&g(t)&&ot.call(t)==F}function _(t){if(!t)return[];if(y(t))return x(t)?s(t):l(t);if(ct&&t[ct])return i(t[ct]());var e=d(t),n=e==N?c:e==A?f:w;return n(t)}function w(t){return t?o(t,j(t)):[]}var j=n(47),S=n(46),O=9007199254740991,P="[object Function]",M="[object GeneratorFunction]",N="[object Map]",k="[object Object]",E="[object Promise]",A="[object Set]",F="[object String]",D="[object WeakMap]",$="[object DataView]",q=/[\\^$.*+?()[\]{}|]/g,T=/^\[object .+?Constructor\]$/,J="\\ud800-\\udfff",C="\\u0300-\\u036f\\ufe20-\\ufe23",K="\\u20d0-\\u20f0",B="\\ufe0e\\ufe0f",I="["+J+"]",V="["+C+K+"]",W="\\ud83c[\\udffb-\\udfff]",G="(?:"+V+"|"+W+")",z="[^"+J+"]",R="(?:\\ud83c[\\udde6-\\uddff]){2}",H="[\\ud800-\\udbff][\\udc00-\\udfff]",L="\\u200d",Q=G+"?",U="["+B+"]?",X="(?:"+L+"(?:"+[z,R,H].join("|")+")"+U+Q+")*",Y=U+Q+X,Z="(?:"+[z+V+"?",V,R,H,I].join("|")+")",tt=RegExp(W+"(?="+W+")|"+Z+Y,"g"),et=Object.prototype,nt=Function.prototype.toString,rt=et.hasOwnProperty,ot=et.toString,ut=RegExp("^"+nt.call(rt).replace(q,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),it=S.Symbol,ct="symbol"==typeof(ct=it&&it.iterator)?ct:void 0,ft=p(S,"DataView"),st=p(S,"Map"),at=p(S,"Promise"),lt=p(S,"Set"),pt=p(S,"WeakMap"),dt=ft?ft+"":"",yt=st?nt.call(st):"",ht=at?nt.call(at):"",vt=lt?nt.call(lt):"",bt=pt?nt.call(pt):"",gt=a("length");(ft&&d(new ft(new ArrayBuffer(1)))!=$||st&&d(new st)!=N||at&&d(at.resolve())!=E||lt&&d(new lt)!=A||pt&&d(new pt)!=D)&&(d=function(t){var e=ot.call(t),n=e==k?t.constructor:null,r="function"==typeof n?nt.call(n):"";if(r)switch(r){case dt:return $;case yt:return N;case ht:return E;case vt:return A;case bt:return D}return e});var mt=Array.isArray;t.exports=_},function(t,e,n){(function(t,n){function r(t){return t&&t.Object===Object?t:null}var o={"function":!0,object:!0},u=o[typeof e]&&e&&!e.nodeType?e:void 0,i=o[typeof t]&&t&&!t.nodeType?t:void 0,c=r(u&&i&&"object"==typeof n&&n),f=r(o[typeof self]&&self),s=r(o[typeof window]&&window),a=r(o[typeof this]&&this),l=c||s!==(a&&a.window)&&s||f||a||Function("return this")();t.exports=l}).call(e,n(54)(t),function(){return this}())},function(t,e){function n(t,e){for(var n=-1,r=Array(t);++n<t;)r[n]=e(n);return r}function r(t,e){return t="number"==typeof t||S.test(t)?+t:-1,e=null==e?m:e,t>-1&&t%1==0&&e>t}function o(t,e){return P.call(t,e)||"object"==typeof t&&e in t&&null===c(t)}function u(t){return E(Object(t))}function i(t){return function(e){return null==e?void 0:e[t]}}function c(t){return k(Object(t))}function f(t){var e=t?t.length:void 0;return y(e)&&(F(t)||b(t)||a(t))?n(e,String):null}function s(t){var e=t&&t.constructor,n="function"==typeof e&&e.prototype||O;return t===n}function a(t){return p(t)&&P.call(t,"callee")&&(!N.call(t,"callee")||M.call(t)==x)}function l(t){return null!=t&&y(A(t))&&!d(t)}function p(t){return v(t)&&l(t)}function d(t){var e=h(t)?M.call(t):"";return e==_||e==w}function y(t){return"number"==typeof t&&t>-1&&t%1==0&&m>=t}function h(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function v(t){return!!t&&"object"==typeof t}function b(t){return"string"==typeof t||!F(t)&&v(t)&&M.call(t)==j}function g(t){var e=s(t);if(!e&&!l(t))return u(t);var n=f(t),i=!!n,c=n||[],a=c.length;for(var p in t)!o(t,p)||i&&("length"==p||r(p,a))||e&&"constructor"==p||c.push(p);return c}var m=9007199254740991,x="[object Arguments]",_="[object Function]",w="[object GeneratorFunction]",j="[object String]",S=/^(?:0|[1-9]\d*)$/,O=Object.prototype,P=O.hasOwnProperty,M=O.toString,N=O.propertyIsEnumerable,k=Object.getPrototypeOf,E=Object.keys,A=i("length"),F=Array.isArray;t.exports=g},function(t,e){t.exports='<div class=weui_cells_title>{{title}}</div> <div class="weui_cells weui_cells_checkbox"> <label class="weui_cell weui_check_label" for=checkbox_{{uuid}}_{{index}} v-for="(index,one) in options"> <div class=weui_cell_hd> <input type=checkbox class=weui_check value="{{one | getKey}}" v-model=value id=checkbox_{{uuid}}_{{index}}> <i class=weui_icon_checked></i> </div> <div class="weui_cell_bd weui_cell_primary"> <p>{{one | getValue}}</p> </div> </label> </div> <tip v-show="!valid && dirty"><icon type=warn class=icon_small></icon>{{error}}</tip>'},function(t,e){t.exports="<i class={{className}}></i>"},function(t,e){t.exports="<div class=group-tip :style=\"{'text-align':align}\"> <slot></slot> </div>"},function(t,e,n){var r,o;n(40),r=n(13),o=n(48),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var r,o;n(41),r=n(14),o=n(49),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var r,o;n(42),r=n(15),o=n(50),t.exports=r||{},t.exports.__esModule&&(t.exports=t.exports["default"]),o&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}}])});
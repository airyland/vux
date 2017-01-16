---
nav: zh-CN
---
### v2.0.0_COM

#### Actionsheet
<ul><li><span style="font-size:15px;"><span class="change change-change">change</span>  更新到 vue@2.0，使用 `v-model` 而不是`:show.sync`进行显示属性绑定</span></li><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  添加属性 `close-on-clicking-mask`, 适用于强制选择的场景</span></li></ul>

#### Alert
<ul><li><span style="font-size:15px;"><span class="change change-change">change</span>  使用 `v-model` 而不是`:show.sync`进行显示属性绑定</span></li><li><span style="font-size:15px;"><span class="change change-todo">todo</span>  修复动画</span></li></ul>

#### Badge
<ul><li><span style="font-size:15px;"><span class="change change-todo">todo</span>  在cell使用时，似乎不够居中</span></li></ul>

#### ButtonTab
<ul><li><span style="font-size:15px;"><span class="change change-enhance">enhance</span>  去除 Android 下点击可能出现的蓝色边框</span></li></ul>

#### Checker
<ul><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  支持Object类型的值 #705</span></li></ul>

#### Checklist
<ul><li><span style="font-size:15px;"><span class="change change-change">change</span>  默认不显示错误，你可以监听on-error事件结合slot进行处理和显示</span></li><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  添加插槽 footer、after-title</span></li><li><span style="font-size:15px;"><span class="change change-change">change</span>  如果已经达到max上限，没有选中的选项将不能选择，因此不再和之前版本一样会出现最多可选max个的error信息</span></li><li><span style="font-size:15px;"><span class="change change-change">change</span>  默认 required 值为false, 与html规范一致</span></li></ul>

#### ColorPicker
<ul><li><span style="font-size:15px;"><span class="change change-deprecated">deprecated</span>  废弃，当前版本后不再继续维护</span></li></ul>

#### Countdown
<ul><li><span style="font-size:15px;"><span class="change change-deprecated">deprecated</span>  下一版本开始不再维护</span></li></ul>

#### Countup
<ul><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  添加 prop:`start`, 现在你可以手动开始计数了</span></li><li><span style="font-size:15px;"><span class="change change-change">change</span>  更新依赖`countup`为`countup.js`</span></li></ul>

#### FormPreview
<ul><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  增加`form-preview`组件</span></li></ul>

#### LoadMore
<ul><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  增加`load-more`组件</span></li></ul>

#### Popover
<ul><li><span style="font-size:15px;"><span class="change change-todo">todo</span>  当切换i18n语言时，位置不正确</span></li></ul>

#### Toast
<ul><li><span style="font-size:15px;"><span class="change change-change">change</span>  使用 `v-model` 而不是`:show.sync`进行显示属性绑定</span></li><li><span style="font-size:15px;"><span class="change change-change">change</span>  默认不显示遮罩</span></li><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  添加 isShowMask 属性</span></li></ul>

#### XInput
<ul><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  添加 `novalidate` 及 `iconType` 可以禁用组件验证，手动显示 error 或者 success 样式</span></li><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  `is-type` 支持传入函数</span></li><li><span style="font-size:15px;"><span class="change change-change">change</span>  受限于vue2不能动态设置type，目前`type`支持 text password number email</span></li></ul>

#### XNumber
<ul><li><span style="font-size:15px;"><span class="change change-change">change</span>  fillable 值默认为false, 稍微保护一下不小心商城的后端接口没有做好数据校验的用户，导致用户粘贴负数还提交正确</span></li></ul>
### v2.0.14_COM

#### Grid
<ul><li><span style="font-size:15px;"><span class="change change-feature">feature</span>  增加`grid`九宫格组件</span></li></ul>
### v2.0.1_COM

#### Loading
<ul><li><span style="font-size:15px;"><span class="change change-fix">fix</span>  i18n 无配置</span></li></ul>

#### XInput
<ul><li><span style="font-size:15px;"><span class="change change-fix">fix</span>  修复type未定义的问题</span></li></ul>


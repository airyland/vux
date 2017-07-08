<template>
  <div :class="{'vux-number-round': buttonStyle === 'round'}" class="vux-inline-x-number">
    <div>
      <a @click="sub" class="vux-number-selector vux-number-selector-sub":class="{'vux-number-disabled':disabledMin}">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg>
      </a>
      <input v-model.number="currentValue" :name="name" class="vux-number-input" :style="{width: width}" :readonly="!fillable" pattern="[0-9]*" type="number" @blur="blur" />
      <a @click="add" class="vux-number-selector vux-number-selector-plus" :class="{'vux-number-disabled':disabledMax}">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg>
      </a>
    </div>
  </div>
</template>

<script>
import XNumber from '../x-number'

export default {
  name: 'inline-x-number',
  extends: XNumber
}
</script>

<style lang="less">
.vux-inline-x-number {
  display: inline-block;
}
</style>

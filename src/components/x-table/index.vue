<template>
  <table class="vux-table" :class="{'vux-table-bordered': fullBordered, 'vux-table-no-cell-bordered': !cellBordered, 'vux-table-no-content-bordered': !contentBordered}">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'x-table',
  props: {
    fullBordered: Boolean,
    cellBordered: {
      type: Boolean,
      default: true
    },
    contentBordered: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less">
@import '../../styles/1px.less';

.vux-table {
  line-height: 40px;
  position: relative;
  width: 100%;
  border-collapse: collapse;
  
  &:after {
    .setTopLine();
  }
  th {
    font-weight: 500
  }
}

.vux-table.vux-table-bordered {
  &:before {
    .setLeftLine();
  }
}

.vux-table td, .vux-table th {
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  text-align: center;
}

.vux-table td, .vux-table th {
  position:relative;
  border-right: 0;
  border-bottom: 0;
}

.vux-table td, .vux-table th {
  &:before {
    .setBottomLine();
  }
}

.vux-table.vux-table-no-content-bordered td {
  &:before {
    border-bottom-width: 0;
  }
}

.vux-table.vux-table-no-content-bordered tr:last-child td {
  &:before {
    border-bottom-width: 1px;
  }
}

.vux-table td, .vux-table th {
  &:after {
    .setRightLine();
  }
}

.vux-table.vux-table-no-cell-bordered td, .vux-table.vux-table-no-cell-bordered th {
  &:after {
    border-right-width: 0;
  }
}

.vux-table tr td:last-child, .vux-table tr th:last-child {
  &:after {
    border-right-width: 0;
  }
}

.vux-table.vux-table-bordered tr td:last-child, .vux-table.vux-table-bordered tr th:last-child {
  &:after {
    border-right-width: 1px;
  }
}
</style>

const Utils = {
  /**
   * 是否为闫年
   * @return {Boolse} true|false
   */
  isLeapYear: function(y: number): boolean {
    return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
  },

  /**
   * 返回星期数
   * @return {String}
   */
  getWhatDay: function(year: number, month: number, day: number): string {
    const date = new Date(year + '/' + month + '/' + day);
    const index = date.getDay();
    const dayNames = [
      '星期日',
      '星期一',
      '星期二',
      '星期三',
      '星期四',
      '星期五',
      '星期六'
    ];
    return dayNames[index];
  },

  /**
   * 返回星期数
   * @return {Number}
   */
  getMonthPreDay: function(year: number, month: number): number {
    const date = new Date(year + '/' + month + '/01');
    let day = date.getDay();
    if (day == 0) {
      day = 7;
    }
    return day;
  },

  /**
   * 返回月份天数
   * @return {Number}
   */
  getMonthDays: function(year: string, month: string): number {
    if (/^0/.test(month)) {
      month = month.split('')[1];
    }
    return ([
      0,
      31,
      this.isLeapYear(Number(year)) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31
    ] as number[])[month as any];
  },

  /**
   * 补齐数字位数
   * @return {string}
   */
  getNumTwoBit: function(n: number): string {
    n = Number(n);
    return (n > 9 ? '' : '0') + n;
  },

  /**
   * 日期对象转成字符串
   * @return {string}
   */
  date2Str: function(date: Date, split?: string): string {
    split = split || '-';
    const y = date.getFullYear();
    const m = this.getNumTwoBit(date.getMonth() + 1);
    const d = this.getNumTwoBit(date.getDate());
    return [y, m, d].join(split);
  },

  /**
   * 返回日期格式字符串
   * @param {Number} 0返回今天的日期、1返回明天的日期，2返回后天得日期，依次类推
   * @return {string} '2014-12-31'
   */
  getDay: function(i: number): string {
    i = i || 0;
    let date = new Date();
    const diff = i * (1000 * 60 * 60 * 24);
    date = new Date(date.getTime() + diff);
    return this.date2Str(date);
  },

  /**
   * 时间比较
   * @return {Boolean}
   */
  compareDate: function(date1: string, date2: string): boolean {
    const startTime = new Date(date1.replace('-', '/').replace('-', '/'));
    const endTime = new Date(date2.replace('-', '/').replace('-', '/'));
    if (startTime >= endTime) {
      return false;
    }
    return true;
  },

  /**
   * 时间是否相等
   * @return {Boolean}
   */
  isEqual: function(date1: string, date2: string): boolean {
    const startTime = new Date(date1).getTime();
    const endTime = new Date(date2).getTime();
    if (startTime == endTime) {
      return true;
    }
    return false;
  }
};

export default Utils;

/**
 * 2020/3/16
 * Author chencc
 * CalendarCore 日期时间选择器核心JS
 * 所产生的callback 均为同步流程 暂无异步流程
 */
import moment from 'moment'

class CalendarCore {
  constructor () {
    let d = new Date()
    this.data = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      date: d.getDate(),
      lang: 'zh_cn'
    }

    // 不确定时间规则
    this.ranges = {
      months: [31,false,31,30,31,30,31,31,30,31,30,31]
    }
    // month数组
    this.monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    this.lang = {}
    // 多语言设置
    this.lang['zh_cn'] = {
      weeks: ['日', '一', '二', '三', '四', '五', '六'],
      months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      year: '年',
      date: '日期',
      time: '时间',
      hours: '小时',
      minutes: '分钟',
      confirm: '确定',
      cancel: '取消',
      close: '关闭'
    }
  }

  init (options) {
    if (options.min !== '1900/01/01') this.data.min = this.handleData(options.min);
    if (options.max) this.data.max = this.handleData(options.max);
    if (options.value) this.data.value = this.handleData(options.value);

    let d = new Date();
    this.data = Object.assign({},this.data,{
        year: this.data.value ? moment(this.data.value).year() : d.getFullYear(),
        month: this.data.value ? moment(this.data.value).month() + 1 : d.getMonth() + 1,
        date: this.data.value ? moment(this.data.value).date() : d.getDate()
    })
    return this;
  }
  // 生成当前年份数组
  createYear (cb) {
    let year = parseInt(this.data.year)
    let yaerArr = []

    for (let i = 0; i < 10; i++) {
      yaerArr.push({
        year: year + i,
        disabled: this.compareDate(String(year + i), 'year')
      })
    }
    cb && cb(yaerArr)
    return this
  }

  // prev double 更新年份 一次更新10年
  updatePrevDouYear (val) {
    let yearTable = []
    for (let i = 10; i > 0; i--) {
      yearTable.push({
        year: val[0].year - i,
        disabled: this.compareDate(String(val[0].year - i), 'year')
      })
    }
    return yearTable
  }

  // next double year
  updateNextDouYear (val) {
    let yearTable = []
    for (let i = 1; i <= 10; i++) {
      yearTable.push({
        year: val[9].year + i,
        disabled: this.compareDate(String(val[9].year + i), 'year')
      })
    }
    return yearTable
  }

  // prev uear
  updatePreYear (val) {
    let yearTable = []
    for (let i = 0; i < 10; i++) {
      yearTable.push({
        year: val[i].year - 1,
        disabled: this.compareDate(String(val[i].year - 1), 'year')
      })
    }
    return yearTable
  }

  // next
  updateNextYear (val) {
    let yearTable = []
    for (let i = 0; i < 10; i++) {
      yearTable.push({
        year: val[i].year + 1,
        disabled: this.compareDate(String(val[i].year + 1), 'year')
      })
    }
    return yearTable
  }

  // 生成月份数组
  createMonth (cb) {
    let year = parseInt(this.data.year)

    const monthTable = []
    for (let i = 0; i < this.monthArr.length; i++) {
      monthTable.push({
        year: year,
        month: this.monthArr[i],
        disabled: this.compareDate(year + ' ' + this.monthArr[i], 'month')
      })
    }
    cb && cb(monthTable)
    return this
  }

  // 更新月份数据
  updateMonth (year) {
    const monthTable = []

    for (let i = 0; i < this.monthArr.length; i++) {
      monthTable.push({
        year: year,
        month: this.monthArr[i],
        disabled: this.compareDate(year + ' ' + this.monthArr[i], 'month')
      })
    }

    return monthTable
  }

  // 生成当前月份的日期数组
  createMonthDate (cb, data) {
    let year = data ? data.year : parseInt(this.data.year),
      month = data ? data.month : parseInt(this.data.month)
    
    // 将时间处理到该年该月的1号
    let d = new Date()
    d.setFullYear(year, month - 1, 1)

    // 得到当前月份日期总数
    let days = this.ranges.months[month - 1]
    if (!days) days = this.isleap(year) ? 29 : 28

    // 将当前月份日期放入table
    let table = []
    for (let i = 0; i < days; i++) {
      table.push({
        year: parseInt(year),
        month: parseInt(month),
        date: i + 1,
        status: 'current',
        disabled: this.compareDate(year + ' ' + this.digit(month) +  ' ' + this.digit(i + 1), 'date')
      });
    }

    // 判断第一周有几天是上个月的
    let first_week = d.getDay()
    if (first_week > 0) {
      let prev_month = month - 1
      let prev_month_year = year
      if (prev_month < 1) {
        prev_month = 12
        prev_month_year = year - 1
      }
      let prev_days = this.ranges.months[prev_month - 1]
      if (!prev_days) prev_days = this.isleap(year) ? 29 : 28
      for (let i = 0; i < first_week; i++) {
        table.unshift({
          year: parseInt(prev_month_year),
          month: parseInt(prev_month),
          date: prev_days - i,
          status: 'prev',
          disabled: this.compareDate(prev_month_year + ' ' + this.digit(prev_month) +  ' ' + this.digit(prev_days - i), 'date')
        })
      }
    }

    // 判断最后一周有几天是下个月的
    // 为保证格式不出现变化，采用6*7 - length
    let last_days = 6*7 - table.length;
    let next_month = month + 1
    let next_month_year = year
    if (next_month > 12) {
        next_month = 1
        next_month_year = year + 1
    }
    for (let i = 1; i < last_days + 1; i++) {
      table.push({
        year: parseInt(next_month_year),
        month: parseInt(next_month),
        date: i,
        status: 'next',
        disabled: this.compareDate(next_month_year + ' ' + this.digit(next_month) +  ' ' + this.digit(i), 'date')
      })
    }

    cb && cb({
      table: table,
      days: days
    })
    return this
  }

  // 更新当前月份日期
  updateMonthDate (data) {
    let value = {}
    this.createMonthDate((val) => {
      value = val
    }, data)

    return value
  }

  // 创建小时
  createHours (cb) {
    let options = [];
    for (let i = 0; i < 24; i++) {
        options.push(this.digit(i));
    }
    cb && cb({
        options: options
    })
    return this;
  }

  // 创建分钟
  createMinutes(cb) {
    let options = [];
    for (let i = 0; i < 60; i++) {
        options.push(this.digit(i));
    }
    cb && cb({
        options: options
    })
    return this;
  }

  // 是否闰年
  isleap(year) {
    return (year%4 === 0 && year%100 !== 0) || year%400 === 0
  }

  // 双数补位
  digit(num) {
    return num < 10 ? '0' + (num|0) : num
  }

  // 对比日期前后大小
  compareDate (val, type) {
    if (!this.data.min && !this.data.max) {
      return true
    } else if (this.data.min || this.data.max) {
      if (type === 'year') {
        let value = moment(val).format('YYYYMMDD')
        let minFlag = this.data.min && this.data.min.length >= 4 ? moment(this.data.min.slice(0,4)).format('YYYYMMDD') <= value : true
        let maxFlag = this.data.max && this.data.max.length >= 4 ? moment(this.data.max.slice(0,4)).format('YYYYMMDD') >= value : true
        return minFlag && maxFlag
      } else if (type === 'month') {
        let value = moment(val).format('YYYYMMDD')
        let minFlag = this.data.min && this.data.min.length >= 6 ? moment(this.data.min.slice(0,6) + '01').format('YYYYMMDD') <= value : true
        let maxFlag = this.data.max && this.data.max.length >= 6 ? moment(this.data.max.slice(0,6) + '01').format('YYYYMMDD') >= value : true
        return minFlag && maxFlag
      } else if (type === 'date') {
        let value = moment(val).format('YYYYMMDD')
        let minFlag = this.data.min && this.data.min.length >= 8 ? moment(this.data.min.slice(0,10)).format('YYYYMMDD') <= value : true
        let maxFlag = this.data.max && this.data.max.length >= 8 ? moment(this.data.max.slice(0,10)).format('YYYYMMDD') >= value : true
        return minFlag && maxFlag
      }
    }
  }

  // format Date 转换日期为 moment 可以转换的格式
  handleData (val) {
    let result = ''
    if (val.length <= 4) {
      result = val.slice(0,4)
    } else if (val.length > 4 && val.length <= 6) {
      result = val.slice(0,4) + '-' + val.slice(4,6)
    } else if (val.length > 6 && val.length <= 8) {
      result = val.slice(0,4) + '-' + val.slice(4,6) + '-' + val.slice(6,8)
    } else {
      console.log('Failed value format')
      return ''
    }
    return moment(result).format('YYYYMMDD')
  }
}

export default CalendarCore
/**
 * Author chencc
 * Date 2020/03/29
 */
import React, {Component} from 'react';
import CalendarCore from "./core";
import DateHeader from 'components/dateHeader'
import YearPanel from 'components/yearPanel'
import DatePanel from 'components/datePanel.js'
import MonthPanel from 'components/monthPanel'
import moment from 'moment'

import './scss/style.scss'

class Calendar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: this.props.value,
      type: this.props.type || 'date',
      min: this.props.min || '1900/01/01',
      max: this.props.max,
      currentPanel: this.props.type || 'date'
    }
    this.init = this.init.bind(this)
    this.selectYearType = this.selectYearType.bind(this)
    this.selectMonthType = this.selectMonthType.bind(this)
    this.selectYear = this.selectYear.bind(this)
    this.selectMonth = this.selectMonth.bind(this)
    this.selectDate = this.selectDate.bind(this)
    this.prevYear = this.prevYear.bind(this)
    this.nextYear = this.nextYear.bind(this)
    this.prevMonth = this.prevMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)

    this.changeValue = this.changeValue.bind(this)

    this.calendar = new CalendarCore()
  }
  componentDidMount () {
    this.init()
  }
  render () {
    const { currentPanel } = this.state
    return (
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <DateHeader 
            data = {this.state}
            selectYearType={this.selectYearType} 
            selectMonthType={this.selectMonthType} 
            prevYear={this.prevYear}
            nextYear={this.nextYear}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth} />
        </div>
        <div className="calendar-body">
          {
            currentPanel && currentPanel === 'year' &&
              <YearPanel 
                data={this.state} 
                selectYear={this.selectYear}/> ||
            currentPanel === 'month' &&
              <MonthPanel 
                selectMonth={this.selectMonth}
                data={this.state} /> || 
            currentPanel === 'date' &&
              <DatePanel
                selectDate = {this.selectDate}
                data={this.state} />
          }
        </div>
      </div>
    )
  }
  // 初始化 获取 当前年月日
  init () {
    let yearTable = [],
        monthTable = [],
        dateTable = []
    this.calendar.init({
      value: this.props.value,
      min: this.state.min,
      max:  this.state.max
    }).createYear((info) => {
      yearTable = info
    }).createMonth((info) => {
      monthTable = info
    }).createMonthDate((info) => {
      dateTable = info
    })

    this.setState({
      headerValue: this.calendar.data.year + '/' + this.calendar.data.month,              // calendar title
      yearTable: yearTable,                                                         // calendar year table
      monthTable: monthTable,                                                       // calendar month table
      dateTable: dateTable,                                                         // calendar date table
      weeks_list: this.calendar.lang[this.calendar.data.lang].weeks,                      // calendar language week
      year: this.calendar.data.year,                
      month: this.calendar.data.year + '/' + this.calendar.data.month,                    
      date: this.calendar.data.year + '/' + this.calendar.data.month + '/' + this.calendar.data.date,
      datetime: this.calendar.data.year + '' + this.calendar.data.month + '' + this.calendar.data.date
    })
  }
  // title select year 标题上选择年份
  selectYearType () {
    this.setState({
      currentPanel: 'year'
    })
  }
  // title select month 标题上选择月份
  selectMonthType () {
    this.setState({
      currentPanel: 'month'
    })
  }

  // selectYear  当选中某个年份时
  selectYear (val) {
    // 根据 type 类型  如果只是year则直接返回结果
    if (this.state.type === 'year') {
      this.changeValue(val)
      this.setState({
        year: val.year,
        headerValue: val.year + '/'
      })
    } else {
      // 选择年份后更新月份table
      const monthTable = this.calendar.updateMonth(val.year)
      this.setState({
        year: val,
        monthTable: monthTable,
        headerValue: val.year + '/' + this.state.month.split('/')[1],
        currentPanel: 'month'
      })
    }
  }

  // selectMonth
  selectMonth (val) {
    if (this.state.type === 'month') {
      this.setState({
        month: val.year + '/' + val.month,
        headerValue: val.year + '/' + val.month
      })
      this.changeValue(val)
    } else {
      // 选择月份后更新日期table
      const dateTable = this.calendar.updateMonthDate(val)
      this.setState({
        month: val.year + '/' + val.month,
        headerValue: val.year + '/' + val.month,
        dateTable: dateTable,
        currentPanel: 'date'
      })
    }
  }

  // selectDate
  selectDate (val) {
    if (val.status !== 'current') {
      // 选择月份后更新日期table
      const dateTable = this.calendar.updateMonthDate(val)
      this.setState({
        month: val.year + '/' + val.month,
        headerValue: val.year + '/' + val.month,
        dateTable: dateTable,
        date: val.year + '/' + val.month + '/' + val.date
      })
    } else {
      this.setState({
        date: val.year + '/' + val.month + '/' + val.date
      })
    }
    this.props.changeValue && this.changeValue(val)
  }

  // prev-double
  prevYear () {
    if (this.state.currentPanel === 'year') {
      const yearTable = this.calendar.updatePrevDouYear(this.state.yearTable)
      this.setState({
        yearTable: yearTable
      })
    } else {
      const yearTable = this.calendar.updatePreYear(this.state.yearTable)
      const monthTable = this.calendar.updateMonth(yearTable[0].year)
      const dateTable = this.calendar.updateMonthDate({
        year: yearTable[0].year,
        month: this.state.month.split('/')[1]
      })
      this.setState({
        yearTable: yearTable,
        monthTable: monthTable,
        dateTable: dateTable,
        headerValue: yearTable[0].year + '/' + this.state.month.split('/')[1],
      })
    }
  }

  // next-double
  nextYear () {
    if (this.state.currentPanel === 'year') {
      const yearTable = this.calendar.updateNextDouYear(this.state.yearTable)
      this.setState({
        yearTable: yearTable
      })
    } else {
      const yearTable = this.calendar.updateNextYear(this.state.yearTable)
      const monthTable = this.calendar.updateMonth(yearTable[0].year)
      const dateTable = this.calendar.updateMonthDate({
        year: yearTable[0].year,
        month: this.state.month.split('/')[1]
      })
      this.setState({
        yearTable: yearTable,
        monthTable: monthTable,
        dateTable: dateTable,
        headerValue: yearTable[0].year + '/' + this.state.month.split('/')[1],
      })
    }
  }
  
  // prev
  prevMonth () {
    const year = parseInt(this.state.headerValue.split('/')[0])
    const month = parseInt(this.state.headerValue.split('/')[1])
    if ((month - 1) <= 0) {
      const dateTable = this.calendar.updateMonthDate({
        year: year - 1,
        month: 12
      })
      this.setState({
        dateTable: dateTable,
        headerValue: year - 1 + '/' + 12
      })
    } else {
      const dateTable = this.calendar.updateMonthDate({
        year: year,
        month: month - 1
      })
      this.setState({
        dateTable: dateTable,
        headerValue: year + '/' + (month - 1)
      })
    }
  }

  // next
  nextMonth () {
    let year = parseInt(this.state.headerValue.split('/')[0])
    let month = parseInt(this.state.headerValue.split('/')[1])
    if ((month + 1) > 12) {
      const dateTable = this.calendar.updateMonthDate({
        year: year + 1,
        month: 1
      })
      this.setState({
        dateTable: dateTable,
        headerValue: year + 1 + '/' + 1
      })
    } else {
      const dateTable = this.calendar.updateMonthDate({
        year: year,
        month: month + 1
      })
      this.setState({
        dateTable: dateTable,
        headerValue: year + '/' + (month + 1)
      })
    }
  }

  // return component value
  changeValue (val) {
    let value = ''
    let formatDefault = ''
    if (this.state.type === 'date') {
      formatDefault = this.props.format || 'YYYYMMDD'
      value = String(val.year) + ' ' + String(this.calendar.digit(val.month)) + ' ' + String(this.calendar.digit(val.date))
    } else if (this.state.type === 'month') {
      formatDefault = this.props.format || 'YYYYMM'
      value = String(val.year) + ' ' + String(this.calendar.digit(val.month))
    } else if (this.state.type === 'year') {
      formatDefault = this.props.format || 'YYYY'
      value = String(val.year)
    }
    if (this.props.changeValue) {
      this.props.changeValue(moment(value).format(formatDefault))
    }
  }
}

export default Calendar
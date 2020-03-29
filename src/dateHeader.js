import React from 'react';

function DateHeader(props) {
  const year = props.data.headerValue && props.data.headerValue.split('/').length > 0 ? props.data.headerValue.split('/')[0] : ''
  const month = props.data.headerValue && props.data.headerValue.split('/').length > 1 ? props.data.headerValue.split('/')[1] : ''
  const currentPanel = props.data.currentPanel
  
  return (
    <div className="date-header">
      <span className="header-icon date-picker-prev-btn date-picker-prev-btn-arrow-double" onClick={() => {props.prevYear()}}></span>
      {
        currentPanel === 'date' && <span className="header-icon date-picker-prev-btn date-picker-prev-btn-arrow" onClick={() => {props.prevMonth()}}></span>
      }
      <span>
        <span className="header-title"
          onClick={() => {props.selectYearType()}}>{year} 年</span>
        {
          currentPanel === 'date' && <span className="header-title"
            onClick={() => {props.selectMonthType()}}>{month} 月</span>
        }
      </span>
      <span className="header-icon date-picker-next-btn date-picker-prev-btn-forward-double" onClick={() => {props.nextYear()}}></span>
      {
        currentPanel === 'date' && <span className="header-icon date-picker-next-btn date-picker-prev-btn-forward" onClick={() => {props.nextMonth()}}></span>
      }
    </div>
  )
}

export default DateHeader
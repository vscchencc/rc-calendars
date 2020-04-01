import React from 'react';
import { groupArray } from '../utils'

function DatePanel(props) {
  const data = props.data.dateTable ? groupArray(props.data.dateTable.table, 7) : [];
  const weeks_list = props.data.weeks_list
  const current = props.data.date ? props.data.date.split('/') : []

  return (
    <table className="date-wrapper">
      <thead>
        <tr>
          {
            weeks_list && (
              weeks_list.map((item, index) => (
                <th key={index}>{item}</th>
              ))
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          current.length > 0 && data.map((item, index) => {
            {   
              return (
                <tr key={index}>
                  {
                    item.map((val, i) => {
                      const classNameActive = parseInt(current[0]) === val.year && parseInt(current[1]) === val.month && parseInt(current[2]) === val.date ? 'active ' : ' '
                      const classNameCurrent = val.status !== 'current' ? ' prevandnext ' : ''
                      const classNameDisable = val.disabled ? '' : ' disable'
                      return (
                        <td key={i}>
                          <button className={classNameActive + classNameCurrent + classNameDisable} 
                            disabled={!val.disabled}
                            onClick={() => {props.selectDate(val)}}>{val.date}</button>
                        </td>
                      )
                    })
                  }
                </tr>
              )
            }
          })
        }
      </tbody>
    </table>
  )
}

export default DatePanel
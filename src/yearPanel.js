import React from 'react';
import { groupArray } from './utils'

function YearPanel (props) {
  const data = props.data.yearTable ? groupArray(props.data.yearTable, 3) : []
  const currentyear = props.data.year ? props.data.year : ''

  return(
    <table className="year-wrapper">
      <tbody>
        {
          String(currentyear).length > 0 && data.map((item, index) => {
            {   
              return (
                <tr key={index}>
                  {
                    item.map((val, i) => {
                      const buttonClass = (Number(currentyear) === val.year ? 'active' : '') + (val.disabled ? '' : 'disable')
                      return (
                        <td key={i}>
                          <button className={ buttonClass } disabled={!val.disabled} onClick={() => {props.selectYear(val)}}>{val.year}</button>
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

export default YearPanel
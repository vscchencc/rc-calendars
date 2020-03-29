import React from 'react'
import ReactDom from 'react-dom'


import Calendar from './index'
// import Calendar from '../dist/calendar';

ReactDom.render(
  <div>
    <Calendar 
      type = "date"
      value = "20200305"
      min="20200302"
      max="20200412"
      changeValue={(info) => {console.log(info)}}/>
  </div>,
  document.getElementById('app')
)
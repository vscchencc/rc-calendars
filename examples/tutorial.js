/**
 * Author chencc
 * Date 2020/04/01
 */
import React from 'react';
import Calendar from '../src/index'

import './style.scss'

function Tutorial () {
  return (
    <div>
      <div className="tutorial-wrapper">
        <p>Basic Usage</p>
        <div className="wrapper-content clearfix">
          <div className="wrapper-left">
            <Calendar type = "year"/>
            <Calendar type = "date"/>
          </div>
          <div className="wrapper-right">
            <Calendar type = "month"/>
          </div>
        </div>

        
        

        <Calendar 
          type = "date"
          value = "20200305"
          min="20200302"
          max="20200412"
          changeValue={(info) => {console.log(info)}}/>
      </div>
    </div>
      
  )
}

export default Tutorial
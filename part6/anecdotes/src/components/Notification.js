import React from 'react'
import { connect } from 'react-redux'
const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {props.notification!==null&&<div style={style}>{props.notification}</div>}
    </div> 
  )
}
const state=(state)=>{
  return{
    notification:state.notification
  }
}
export default connect(state)(Notification)
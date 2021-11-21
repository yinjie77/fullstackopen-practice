import React from "react";
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'
const Notification=()=>{
    const {message,className}=useSelector(state=>state.notification)

    if(message===null)
    return null

    return(
        <div >
          {message&&<Alert variant={className}>{message}</Alert>}
        </div>
    )
}
export default Notification
let prevTimeID = 0

const notificationReducer = (state = {},action) => {
  switch(action.type){
  case 'SHOW_NOTIFICATION': {
    return action.data
  }
  default: return state
  }
}

export const showNotifcation = (message, className) => {
  return async dispatch => {
    clearTimeout(prevTimeID)
    prevTimeID = setTimeout(() => dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        notification : null
      }
    }),3000)

    dispatch({
      type:'SHOW_NOTIFICATION',
      data: {
        message,
        className
      }
    })
  }
}

export default notificationReducer
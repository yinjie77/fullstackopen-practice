let flag=0
const notificationReducer=(state=null,aciton)=>{
    switch(aciton.type)
    {
        case 'SHOW_NOTIFICATION':
            console.log(aciton.data)
             return aciton.data.notification
        default:
            return state
    }
}
export const showNotifcation=(notification,time)=>{
    return async dispatch=>{
        dispatch({
            type:'SHOW_NOTIFICATION',
            data: {
                notification
            }
        })
        clearTimeout(flag)
        flag=setTimeout(() => {
            dispatch({
                type:'SHOW_NOTIFICATION',
                data:{
                    notification:null
                }
            })
        }, time*1000);
    }
   
}

export default notificationReducer
import React from 'react'
const PersonForm=(props)=>{
    return(
        <>
        <form onSubmit={props.submit}>
        <div>
          name: <input onChange={props.namechange} value={props.newName}/>
        </div>
        <div>
          number: <input onChange={props.numberchange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
        </>
    )
}
export default PersonForm
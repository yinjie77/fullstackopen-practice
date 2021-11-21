import React from 'react'

const Filter=(props)=>{
    return(
        <>
        filter shown with <input onChange={props.filter} />
        {
       props.FilterPerson.map(x=><div key={x.number}>{x.name} {x.number}</div>)
        }
        </>
    )
 
}
export default Filter


import React from "react";
// import NoteServer from '../services/NoteServer'
const Persons=({persons,Delete})=>{
    return(
        <>
    {  
      persons.map(x=><div key={x.name}>{x.name} {x.number} <button onClick={()=>Delete(x)}>delete</button></div>)
    }
        </>
    )
}
export default Persons
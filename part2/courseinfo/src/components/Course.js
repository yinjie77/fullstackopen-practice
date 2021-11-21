import React from 'react'
const Course=({courses})=>{
    return(
    <>
    {courses.map(x=>{
      return(
        <div key={x.id}>
        <Header course={x}/>
        <Content course={x}/>
        <Total course={x}/>
        </div>
      )
      
    })}
   
    </>
    )
    
  }
  const Header=(props)=>{
    return (
      <>
      <h1>{props.course.name}</h1>
      </>
    )
  }
  const Content=(props)=>{
    return(
      <>
      {/* {console.log(props.course)} */}
      {props.course.parts.map(x=><Part key={x.id} part={x}/>)}
      </>
    )
  }
  const Total =(props)=>{
    return (
      <>
     <strong>total of {props.course.parts.map(x=>x.exercises).reduce((x,y)=>x+y)} exercises</strong>
      </>
    )
  }
  const Part=(props)=>{
    return (
      <>
      {/* {console.log(props.part1)} */}
      <p>{props.part.name} {props.part.exercises}</p>
      </>
    )
  }
  export default Course
import React, { useState } from 'react'
const Button=({onClick,text})=>{
  return(
    <button onClick={onClick}>
    {text}
  </button>
  )
 
}
const Statistics = ({good,bad,neutral}) => {
  if(good!==0||bad!==0||neutral!==0)
 return(
   <>
   <StatisticLine text="good" value ={good} />
   <StatisticLine text="neutral" value ={neutral} />
   <StatisticLine text="bad" value ={bad} />
   <StatisticLine text="all" value ={good+neutral+bad} />
   <StatisticLine text="average" value ={(good-bad)/(good+neutral+bad)} />
   <StatisticLine text="positive" value ={good/(good+neutral+bad)} />
  
    </>
 )
 else
 {
   return(
   <div>No feedback given</div>
   )
 }
}
const StatisticLine=({text,value})=>{
  return(
    <div>{text} {value}</div>
     
  )
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const addGood=()=>{
    setGood(good+1)
  }
  const addNeutral=()=>{
    setNeutral(neutral+1)
  }
  const addbad=()=>{
    setBad(bad+1)
  }
  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={addGood} text='good'/>
      <Button onClick={addNeutral} text='neutral'/>
      <Button onClick={addbad} text='bad'/>
    <h2>statistics</h2>
    <Statistics good={good} bad={bad} neutral={neutral}/>
    
    </div>
  )
}

export default App
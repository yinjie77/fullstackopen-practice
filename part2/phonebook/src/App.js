import React, { useState,useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import NoteServer from './services/NoteServer'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ FilterPerson,setFilterPerson]=useState([])
  const [successMessage,setSuccessMessage]=useState(null)
  const [errorMessage,setErrorMessage]=useState(null)
  useEffect(()=>{
    NoteServer
    .getAll()
    .then(response=>{
      // console.log(response)
      setPersons(response)
    })
  },[])
  const submit=(event)=>{
   
    event.preventDefault()
    // console.log( (persons.map(x=>x.name)))
    // console.log( newName)
    
     if(persons.map(x=>x.name).includes(newName))
     {
      const a=persons.map(x=>x.name).indexOf(newName)
      const id=persons[a].id
      
      const newObject={
        name:newName,
        number:newNumber
      }
      if(window.confirm(`${newName} is already added to phonebook,replace the old number with a new one`))
      {
        NoteServer
        .update(id,newObject)
        .then(response=>setPersons(persons.map(x=>x.id!==response.id?x:response)))
        .then(()=>{
          setSuccessMessage(`${newName}'s phone number has been changed to ${newNumber} `)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000);
        })
        .catch(error=>{
          setErrorMessage(`${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000);
        })
        setPersons(persons.filter(x=>x.id!==id))
      }
     }
     
     else
     {
      // setPersons(persons.concat({name:newName,number:newNumber}))
      const noteObject={
        name:newName,
        number:newNumber
      }
      NoteServer
      .create(noteObject)
      .then(response=>{
        //  console.log(response)
        setPersons(persons.concat(response))
      })
      .then(()=>{
        setSuccessMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000);
      })
      .catch(error=>{
        setErrorMessage(`${error.response.data.error}`)
       setTimeout(() => {
         setErrorMessage(null)
       }, 3000);
        console.log(error.response.data)
      })
     }
    
    
  }
  const namechange=(event)=>{
    setNewName(event.target.value)
  }
  const numberchange=(event)=>{
    setNumber(event.target.value)
  }
  const filter=(event)=>{
    if(event.target.value==='')
    {setFilterPerson([])}
    else
    setFilterPerson(persons.filter(person=>person.name.toLowerCase().indexOf(event.target.value.toLowerCase())!==-1))

  }
  const Delete=(x)=>{
    if(window.confirm(`Delete ${x.name}`))
    {
        NoteServer
        .Delete(x.id)
        .then(()=>{
          NoteServer
          .getAll()
          .then(response=>setPersons(response))
        })
        
    }
}
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className={'success'}/>
      <Notification message={errorMessage} className={'error'}/>
      <Filter filter={filter} FilterPerson={FilterPerson}/>
      <h2>add a new</h2>
      <PersonForm submit={submit} namechange={namechange} numberchange={numberchange} newName={newName}/>
      <h2>Numbers</h2>
      <Persons persons={persons} Delete={Delete}/>
    </div>
  )
}

export default App
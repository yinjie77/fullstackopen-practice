import axios from 'axios'
import React,{useState,useEffect} from 'react'
const Showcountry=({country})=>{
  const [weather,setWeather]=useState({})
  const {name,capital,population,languages,flag}=country
  const api_key=process.env.REACT_APP_API_KEY
  useEffect(()=>{
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}=${capital}`)
    .then(response=>{
      console.log(response.data)
      // setWeather(response.data)
    })
  },[capital])

  return(
    <div>
      
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(x=><li key={x.name}>{x.name}</li>)}
      </ul>
      <img src={flag} width='200px' length='200px' alt='flag'/>
      <h2>weather in {capital}</h2>
      {/* <h3>temperature: {weather.current.temperature} </h3>
      <img src={weather.current.weather_icons[0]} width='100px' length='100px' alt='weather'/> */}
      
    </div>
  )
}
const ListCountries=({search})=>{
  const [country,setCountry]=useState([])
  const [single,setSingle]=useState({})
    useEffect(()=>{
      if(search!=='')
      {
        axios
        .get(`https://restcountries.eu/rest/v2/name/${search}`)
        .then(response=>{
          if(response.data===1)
          setSingle(response.data[0])
          else 
          setCountry(response.data)
        })
      }
      else if(search==='')
      {
        setSingle({})
        setCountry([])
    }
    },[search])
const show=(single)=>{
  setSingle(single)
}
  return(
    <>
    {country.length>=10&&<p>Too many matches,specify anonther filter</p>}
    {country.length>1&&country.length<10&&country.map(x=><div key={x.name}>{x.name} <button onClick={()=>show(x)}>show</button></div>)}
    {single.languages!==undefined&&<Showcountry country={single}/>}
    </>
  )
}
const App = () => {
  
  const [search,setSearch]=useState('')

  const searchchange=(event)=>{
    setSearch(event.target.value)    
  }
  return(
    <>
    <div>
    find countries <input onChange={searchchange}/>
    </div>
    <ListCountries search={search}/>
    </>
  )
}

export default App

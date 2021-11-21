import React from "react"
import { useState } from "react"
import { useDispatch} from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setLoggedUser } from "../reducer/loggedUserReducer"
import { showNotifcation } from "../reducer/notificationReducer"
import { Form, Button } from 'react-bootstrap'
const LoginForm=()=>{
  const dispatch=useDispatch()
  const [username,setUsersname]=useState('')
  const [password,setPassword]=useState('')

  const handleLogin=async(event)=>{
    event.preventDefault()
    try {
      const user=await loginService.login({
        username,password
      })
      window.localStorage.setItem(
        'loggedBlogappUser',JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
      setUsersname('')
      setPassword('')
      
    } catch (error) {
      console.log('aaa')
     dispatch(showNotifcation('wrong username or password(maybe the mongo is down)','danger')) 
    }
   
  }
    return(
      <>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control
          placeholder="username"
          id='loginusername' 
          type="text"
          value={username}
          name="usename"
          onChange={({target})=>{
            setUsersname(target.value)
          }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
          placeholder="password"
            id='loginpassword'
            type="password"
            value={password}
            name="password"
            onChange={({target})=>{
              setPassword(target.value)
            }}
          />
        </Form.Group>
        <Button id='loginbutton' type="submit">login</Button>
      </Form>
      </>
    )
    
  }

  export default LoginForm
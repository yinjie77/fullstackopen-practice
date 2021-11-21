import React ,{useState}from "react"
import { Form, Button } from 'react-bootstrap'
import UserService from '../services/users'
const CreateAccount=()=>{
    const [username,setUsername]=useState('')
    const [name,SetName]=useState('')
    const [password,setPassword]=useState('')

    const handleRegister=async (event)=>{
        event.preventDefault()
        try{
            const r=await UserService.register({username,name,password})
            console.log(r)
        setUsername('')
        SetName('')
        setPassword('')
        alert('你已经注册成功')
        }
        catch(error){
        alert('username已经存在，请换一个')
        }
        

    }
    return(
        <div>
        <Form onSubmit={handleRegister}>
        <Form.Group>
          <Form.Control
          placeholder="username （此栏的值在数据库中唯一，如果不行多试几个）" 
          type="text"
          value={username}
          onChange={({target})=>{
            setUsername(target.value)
          }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
          placeholder="name" 
          type="text"
          value={name}
          onChange={({target})=>{
            SetName(target.value)
          }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
          placeholder="password"
            type="password"
            value={password}
            onChange={({target})=>{
              setPassword(target.value)
            }}
          />
        </Form.Group>
        <Button  type="submit">registered</Button>
      </Form>
        </div>
    )
}

export default CreateAccount
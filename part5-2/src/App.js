import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddForm from './components/addForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import SingleBlog from './components/singleBlog'
import usersService from './services/users'
import CreateAccount from './components/CreateAccount'

import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import { initializeBlogs,setBlogs,addlike,deleteBlog } from './reducer/blogReducer'
import { setLoggedUser } from './reducer/loggedUserReducer'
import { addUsers } from './reducer/usersReducer'
import { showNotifcation } from './reducer/notificationReducer'
import { Navbar, Nav } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const loggedUser=useSelector(state=>state.loggedUser)
  const [users,setUsers]=useState([])

  const matchUser = useRouteMatch('/users/:id')
  console.log('a'+matchUser)
  const user = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null

  useEffect(()=>{
    dispatch(initializeBlogs())
  },[dispatch])
  

useEffect(()=>{
  const loggedUserJSON=window.localStorage.getItem('loggedBlogappUser')
  if(loggedUserJSON)
  {
    const user=JSON.parse(loggedUserJSON)
    dispatch(setLoggedUser(user))
    blogService.setToken(user.token)
  }
},[dispatch])

useEffect(()=>{
  (async()=>{
    const allUsers=await usersService.getALL()
    // console.log(allUsers)
    dispatch(addUsers(allUsers))
    setUsers(allUsers)
  })()
},[dispatch])
  
 const loginout=()=>{
   if(window.localStorage.getItem('loggedBlogappUser'))
   {
     window.localStorage.removeItem('loggedBlogappUser')
     dispatch(setLoggedUser(null))
    }

 }
 const addBlog=(blogObject,title)=>{

        dispatch(setBlogs(blogObject))
        dispatch(showNotifcation(`a new blog ${title} ! by ${loggedUser.username}`,'success')) 
        
  
 }

 const createBlog=()=>{
  return(
    <Togglable buttonLabel='create new blog'>
               <AddForm createBlog={addBlog} />
    </Togglable>
  )
 }
 const handleLikes = (id,likes) => {
  dispatch(addlike(id,likes+1))
  
}
const handleRemoving = async (blog) => {
  const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

  if(result){
    try{
      dispatch(deleteBlog(blog.id))
    }
    catch(exception){
     dispatch(showNotifcation('error','danger')) 
    }
  }
}
const padding = {
  padding: 10,
}


  return (
    <div className="container">
      <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#" as="span">
      <Link style={padding} to='/blogs'>blogs</Link> 
      </Nav.Link>
      <Nav.Link href="#" as="span">
      <Link style={padding} to='/users'>users</Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        {loggedUser?<em>{loggedUser.username} logged in</em> :<em><Link style={padding} to='/login'>login</Link>  <Link style={padding} to='/Register'>Register</Link></em>}
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

    {loggedUser&&<span> <button onClick={loginout} className='login-out'>logout</button> </span>}
            
      </div>
      <Notification/>

      {
         loggedUser===null
         ?
         <div>
           <h2>log in to application</h2>
          <Switch>
          <Route path='/Register'>
            <CreateAccount/>
          </Route>
          <Route path='/'>
          <LoginForm/>
          </Route>
          </Switch>
         </div>
        :
         <div>
           <h2>blogs （此博客仅供用户上传用户认为有价值的文章与资料）</h2>
            <Switch>
            <Route path="/users/:id">
              <User user={user} />
            </Route>
            <Route path='/users'>
               <Users users={users} />
            </Route>
            <Route path='/blogs/:id'>
          <SingleBlog handleLikes={handleLikes} handleRemoving={handleRemoving}/>
            </Route>
            <Route path='/'>
            {createBlog()}
            <Blog/>
            </Route>
            </Switch>
         </div> 
      }
    </div>
   
  )
}

export default App
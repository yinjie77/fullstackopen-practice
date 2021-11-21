import React from 'react'
import { Link } from 'react-router-dom'
const User=({user})=>{ 
    if(!user){
        return null
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <h3>Added blogs</h3>
            
            {user.blogs.map(blog=><div key={blog.id}>
                <Link  to={`/blogs/${blog.id}`}>{blog.title}</Link>
            {/* <a href={`/blogs/${blog.id}`}>
           {blog.title}
            </a> */}
            </div>)}
        </div>
    )
}

export default User
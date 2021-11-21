import React, { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import { makeComment } from '../reducer/blogReducer'
const SingleBlog=({handleLikes,handleRemoving})=>{
    const dispatch=useDispatch()
    const blogs=useSelector(state=>state.blogs)
    const id = useParams().id
    const blog = blogs.find((blog) => blog.id === id)
    const [comment,setComment]=useState('')
    const handleComment=(event,id)=>{
            event.preventDefault()
            // console.log(comment)
             dispatch(makeComment(comment,id))
            setComment('')
    }

    if(!blog)
    return null

    console.log(blog.comments)
    return(
        <div>
            <h1>{blog.title}</h1>
            <div>
                <a href={blog.url} target='_blank'>{blog.url}</a>
                <p>
                    {blog.likes}
                    <button onClick={()=>handleLikes(blog.id,blog.likes)}>
                        like
                    </button>
                </p>
                <p>{`added by ${blog.author}`}</p>
                <button onClick={()=>handleRemoving(blog)}>delete this blog</button><div>(only user can do this,If you're any other user, it doesn't matter how many times you click)</div>
            </div>
            <h3>comments</h3>
            <form onSubmit={(e)=>handleComment(e,blog.id)}>
                <input type='text' value={comment} onChange={(e)=>setComment(e.target.value)}/> <button>add comments</button>
            </form>
        
            <ul>

                {blog.comments.map(comment=><li>{comment}</li>)}
            </ul>
        </div>
    )
}
export default SingleBlog
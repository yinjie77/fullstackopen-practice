import React ,{useState}from "react";

const AddForm=({createBlog})=>{
    const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const addBlog=(event)=>{
    event.preventDefault()
    createBlog(
        {
            title:title,
            author:author,
            url:url
        },title
    ) 
    setTitle('')
    setAuthor('')
    setUrl('')
  }
    return(
        <>
    <form onSubmit={addBlog}>
      <div>
      title:
      <input 
      id='title'
      value={title}
      onChange={({target})=>setTitle(target.value)}
      />
     </div>
     <div>
      author:
      <input 
      id='author'
      value={author}
      onChange={({target})=>setAuthor(target.value)}
      />
     </div>
     <div>
      url:
      <input
      id='url'
      value={url}
      onChange={({target})=>setUrl(target.value)}
      />
     </div>
     <button id='create'>create</button>
    </form>
        </>
    )

}
export default AddForm
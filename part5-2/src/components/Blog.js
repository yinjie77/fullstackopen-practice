import React from 'react'
import {useSelector} from 'react-redux'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = () => {
  
 const blogs=useSelector(state=>state.blogs)
 blogs.sort((a,b)=>(a.likes>b.likes?-1:1))
 return (
   <div >
     <div>
       以下博客按照点赞次数从高到低排序
     </div>
     <Table>
       <tbody>
          {blogs.map(blog=>
           <tr key={blog.id}>
             <td>
             <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
             </td>
            </tr> 
            )}
       </tbody>
    </Table>
   
   </div>
  
 )
}
  
export default Blog
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create=async newObjcet=>{
  const config={
    headers:{Authorization:token}
  }
  const response=await axios.post(baseUrl,newObjcet,config)
  return response.data
}
const updateBlog = async blog => {
  const header = {
    headers: { Authorization: token }
  }

  const response = await axios.patch(`${baseUrl}/${blog.id}`,{ likes: blog.likes },header)
  return response.data
}
const removeBlog = async blog => {
  const header  = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${blog.id}`,header)
}

const makeComment = async (comment,id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`,{ comment })
  return response.data
}
export default { getAll ,create,setToken,updateBlog,removeBlog,makeComment}
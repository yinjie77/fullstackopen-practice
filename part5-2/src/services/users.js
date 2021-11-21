import axios from "axios";
const baseURL='/api/users'

const  getALL=async()=>{
    const response=await axios.get(baseURL)
    return response.data
}
const register=async(info)=>{
     const response=await axios.post(baseURL,info)
     return response.data
}
export default{
    getALL,
    register
}
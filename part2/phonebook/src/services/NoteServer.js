import axios from "axios";
const baseurl='/api/persons'

const getAll=()=>{
    const request=axios.get(baseurl)
    return request.then(response=>response.data)
}
const create=(noteObject)=>{
    const request=axios.post(baseurl,noteObject)
    return request.then(response=>response.data)
}

const update=(id,noteObject)=>{
    const request=axios.put(`${baseurl}/${id}`,noteObject)
    return request.then(response=>response.data)
}
const Delete=(id)=>{
    const request=axios.delete(`${baseurl}/${id}`)
    return request.then(response=>response.data)
}
const all={getAll,create,update,Delete}

export default all
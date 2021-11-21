import React,{useState,useEffect} from 'react'
import {useQuery,useLazyQuery} from '@apollo/client'
import { BOOKS_WITH_GENRE,USER} from '../queries'

const Recommend=({show})=>{
    const user=useQuery(USER)
    const [getbooks,result]=useLazyQuery(BOOKS_WITH_GENRE)
    const [books,setBooks]=useState('')
    console.log(user)
    useEffect(()=>{
        if(user.data)
        {
            getbooks({variables:{genre:user.data.me.favoriteGenre}})
        }
    },[getbooks,user])

    useEffect(()=>{
        if(result.data){
            setBooks(result.data.allBooks)
        }
    },[setBooks,result])
    if(!show)
    {
        return null
    }
    return(
        <div>
            <h2>recommendations</h2>
            <div>
                books in your favorite genre {user.data.me.favoriteGenre}
            </div>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                    author
                    </th>
                    <th>
                    published
                    </th>
                </tr>
                {books.map(a =>
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
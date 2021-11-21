import React from "react";
import { connect } from "react-redux";
import { addAnecdotes } from "../reducers/anecdoteReducer";
import { showNotifcation } from "../reducers/notificationReducer";
const AnecdoteForm=(props)=>{
    
    const add=async (event)=>{
        event.preventDefault()
        const content =event.target.anecdotes.value
        event.target.anecdotes.value=''
       props.addAnecdotes(content)
       props.showNotifcation(`you add new anecdotes ${content}`,5)
    }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name='anecdotes' /></div>
                <button >create</button>
            </form>
        </div>
    )
}

export default connect(null,{addAnecdotes,showNotifcation})(AnecdoteForm)
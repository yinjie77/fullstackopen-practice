import React from "react";
import { connect } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { showNotifcation } from "../reducers/notificationReducer";
const AnecdoteList=(props)=>{
    const vote = (anecdote) => {
        props.addVote(anecdote)
        props.showNotifcation(`you voted '${anecdote.content}'`,5)
      }
    return (
        <div>
          {props.anecdotes.sort((a,b) => a.votes < b.votes ? 1 : -1)&&props.anecdotes.map((anecdote,index) =>
            <div key={index}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
}
const mapStateToProps=(state)=>{
  return  {anecdotes:state.anecdotes.filter(x=>x.content.toLowerCase().indexOf(state.filter.toLowerCase())>-1)}
}
export default connect(mapStateToProps,{addVote,showNotifcation})(AnecdoteList)
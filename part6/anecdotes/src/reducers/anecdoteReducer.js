import anecdoteService from '../services/anecdotes'
const anecdoteReducer = (state = [], action) => {
  switch(action.type)
  {
      case 'ADD_VOTE':
          {
            return state.map(blog => blog.id === action.data ? {...blog,votes: blog.votes + 1}: blog)
          }
        case 'INIT_ANECDOTES':
            return action.data
        case 'ADD_ANECDOTES':
          return state.concat(action.data)
       default:
           return state
  }
}
export const addVote=(anecdote)=>{
  return async dispatch=>{
  await anecdoteService.updataAnecdote({...anecdote,votes:anecdote.votes+1})
    dispatch({
      type:'ADD_VOTE',
      data:anecdote.id
    })
  }
}
export const addAnecdotes=(content)=>{
  return async dispatch=>{
    const newAnecdote=await anecdoteService.createAnecdote(content)
    dispatch({
      type:'ADD_ANECDOTES',
      data:newAnecdote
    })
  }
}
export const initializeAnecdotes=()=>{
  return  async dispatch=>{
    const anecdotes=await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data:anecdotes
    })
  }
 
}
export default anecdoteReducer
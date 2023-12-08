import { createSlice } from "@reduxjs/toolkit"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    handleVotes(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(a => a.id === id)
      const votedAnecdoteUpdated = {...votedAnecdote, votes: votedAnecdote.votes + 1 }
      const updatedState = state.map(a => a === votedAnecdote ? votedAnecdoteUpdated : a)
      return updatedState
    },
    createAnecdote(state, action) {
      const content = action.payload
      const newObject = {
        content: content,
        id: getId(),
        votes: 0
      }
      return state.concat(newObject)
    }
  }
})

export const {handleVotes, createAnecdote} = anecdoteReducer.actions
export default anecdoteReducer.reducer
/* const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const id = action.payload.id
      const votedAnecdote = state.find(a => a.id === id)
      const votedAnecdoteUpdated = {...votedAnecdote, votes: votedAnecdote.votes + 1 }
      const updatedState = state.map(a => a === votedAnecdote ? votedAnecdoteUpdated : a)
      return updatedState
    }
    
    case 'CREATE': {
      const content = action.payload.content
      const newObject = {
        content: content,
        id: getId(),
        votes: 0
      }
      return state.concat(newObject)
    }
  }

  return state
}

export const handleVotes = (id) => {
  return {
    type: 'VOTE',
    payload: {id}
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    payload: {content}
  }
}

export default reducer */
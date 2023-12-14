import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    handleVotes(state, action) {
      return state.map(a => a.id === action.payload.id ? action.payload : a)
    },
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    setInitialAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {handleVotes, createAnecdote, setInitialAnecdotes} = anecdoteReducer.actions

export default anecdoteReducer.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setInitialAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(anecdote))
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(handleVotes(votedAnecdote))
  }
}

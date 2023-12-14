import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    handleVotes(state, action) {
      const id = action.payload
      const votedAnecdote = state.find(a => a.id === id)
      const votedAnecdoteUpdated = {...votedAnecdote, votes: votedAnecdote.votes + 1 }
      const updatedState = state.map(a => a === votedAnecdote ? votedAnecdoteUpdated : a)
      return updatedState
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